import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const STORE_KEY = 'syw:scroll'
const MAX_ENTRIES = 50
/** 撑高兜底的最长时间；正常情况下内容长够就立刻撤掉 */
const SETTLE_TIMEOUT = 2000

/** 全站 html 上有 scroll-behavior: smooth，跳位置必须显式绕开它，否则会滚出一段动画 */
function jumpTo(top: number) {
  window.scrollTo({ top, left: 0, behavior: 'instant' as ScrollBehavior })
}

function readStore(): Record<string, number> {
  try {
    const raw = sessionStorage.getItem(STORE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, number>) : {}
  } catch {
    return {}
  }
}

function writeOffset(key: string, offset: number) {
  try {
    const store = readStore()
    store[key] = offset
    const keys = Object.keys(store)
    for (const stale of keys.slice(0, Math.max(0, keys.length - MAX_ENTRIES))) {
      delete store[stale]
    }
    sessionStorage.setItem(STORE_KEY, JSON.stringify(store))
  } catch {
    // 无痕模式下 sessionStorage 不可用，放弃记录即可
  }
}

export function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    const inherited = history.scrollRestoration
    history.scrollRestoration = 'manual'
    return () => {
      history.scrollRestoration = inherited
    }
  }, [])

  /**
   * 换页时新页面的 DOM 往往比旧页面矮，浏览器会立刻把滚动位置截短，
   * 而截短触发的 scroll 事件排在 useEffect 清理之前，会把刚才那一页的记录改成截短值。
   * 这个 ref 在提交阶段同步更新，于是旧监听器闭包里的 key 和它对不上，写入就被丢弃。
   */
  const activeKey = useRef(key)
  useLayoutEffect(() => {
    activeKey.current = key
  })

  useEffect(() => {
    // 先取出位置，再挂监听，否则监听可能把记录覆盖成 0
    const restoreTo = navigationType === 'POP' ? readStore()[key] : undefined
    const anchor = hash ? document.getElementById(hash.replace(/^#/, '')) : null

    const root = document.documentElement
    const inheritedMinHeight = root.style.minHeight
    let settleFrame = 0
    let restoring = false

    const release = () => {
      root.style.minHeight = inheritedMinHeight
      restoring = false
    }

    if (anchor) {
      anchor.scrollIntoView()
    } else if (restoreTo != null) {
      // 懒加载图片铺开前页面不够高，浏览器会把目标位置截短。
      // 先按目标位置把文档撑够高，一步跳到位，等真实内容长够了再撤掉撑高。
      restoring = true
      root.style.minHeight = `${restoreTo + window.innerHeight}px`
      jumpTo(restoreTo)
      const deadline = performance.now() + SETTLE_TIMEOUT
      const settle = () => {
        jumpTo(restoreTo)
        const tallEnough =
          document.body.scrollHeight >= restoreTo + window.innerHeight
        if (tallEnough || performance.now() > deadline) {
          release()
          return
        }
        settleFrame = requestAnimationFrame(settle)
      }
      settleFrame = requestAnimationFrame(settle)
    } else if (navigationType !== 'POP') {
      jumpTo(0)
    }

    let trackFrame = 0
    const track = () => {
      // 恢复过程中位置是我们自己写的，记下来只会把目标覆盖成截短后的值
      if (restoring || trackFrame || activeKey.current !== key) return
      trackFrame = requestAnimationFrame(() => {
        trackFrame = 0
        writeOffset(key, window.scrollY)
      })
    }
    window.addEventListener('scroll', track, { passive: true })

    return () => {
      window.removeEventListener('scroll', track)
      if (trackFrame) cancelAnimationFrame(trackFrame)
      if (settleFrame) cancelAnimationFrame(settleFrame)
      release()
    }
  }, [pathname, hash, key, navigationType])

  return null
}
