import { useEffect } from 'react'

/**
 * First cut only (intro ↔ film): one flick = one full scene.
 * Once inside the film sticky runway, scroll is free so the
 * clip-path / scale can track the wheel.
 */
export function useHomeSceneSnap(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    let locked = false
    let unlockTimer = 0
    let targetTop: number | null = null

    const filmEl = () =>
      document.querySelector<HTMLElement>('.hero--video-canvas')

    const filmStart = () => {
      const film = filmEl()
      return film ? Math.round(film.offsetTop) : Math.round(window.innerHeight)
    }

    const goTo = (top: number) => {
      locked = true
      targetTop = top
      window.clearTimeout(unlockTimer)
      window.scrollTo({ top, behavior: 'smooth' })
      unlockTimer = window.setTimeout(() => {
        // Hard-settle in case smooth scroll undershoots
        if (Math.abs(window.scrollY - top) > 2) {
          window.scrollTo({ top, behavior: 'auto' })
        }
        locked = false
        targetTop = null
      }, 780)
    }

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return
      if (Math.abs(event.deltaY) < 4) return

      const next = filmStart()
      const y = window.scrollY
      const vh = window.innerHeight

      if (locked) {
        event.preventDefault()
        return
      }

      // Still on / leaving the first scene — only snap, never free-scroll mid-cut
      if (y < next - 4) {
        event.preventDefault()
        if (event.deltaY > 0) goTo(next)
        else if (y > 1) goTo(0)
        return
      }

      // Just landed on the film scene: flick up returns to intro.
      // Deeper into the film runway = free scroll (expand with finger).
      const intoFilm = y - next
      if (intoFilm < vh * 0.22 && event.deltaY < 0) {
        event.preventDefault()
        goTo(0)
      }
    }

    // If a gesture ends mid-cut, finish the snap
    const settle = () => {
      if (locked || targetTop != null) return
      const next = filmStart()
      const y = window.scrollY
      if (y <= 1 || y >= next - 1) return
      if (y < next * 0.5) goTo(0)
      else goTo(next)
    }

    let settleTimer = 0
    const onScroll = () => {
      if (locked) return
      window.clearTimeout(settleTimer)
      settleTimer = window.setTimeout(settle, 120)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(unlockTimer)
      window.clearTimeout(settleTimer)
    }
  }, [enabled])
}
