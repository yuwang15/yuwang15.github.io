import type { Locale } from './types'

type Messages = Record<string, string>

const zh: Messages = {
  'nav.collections': '作品',
  'nav.stores': '门店',
  'nav.brand': '品牌',
  'nav.viewAll': '全部作品',
  'nav.about': '品牌',
  'nav.contact': '微信',
  'nav.home': 'SYW 首页',
  'nav.open': '打开菜单',
  'nav.close': '关闭菜单',
  'nav.lang': '语言',

  'footer.pages': '页面',
  'footer.collections': '作品',
  'footer.brand': '品牌',
  'footer.stores': '门店',
  'footer.contactUs': '联系我们',
  'footer.wechat': '微信',
  'footer.follow': '关注',
  'footer.explore': '页面',
  'footer.contact': '微信',
  'footer.location': '门店',
  'footer.film': '视频',
  'footer.tag': '穿得好看，也穿得自在。',
  'footer.contactHint': '微信',
  'footer.qr': '微信二维码占位',
  'footer.douyin': '抖音',
  'footer.douyinId': '@SYW',
  'footer.copyright': '© SYW {year}',

  'contact.title': '联系我们',
  'contact.name': '姓名',
  'contact.email': '邮箱',
  'contact.phone': '电话',
  'contact.message': '留言',
  'contact.optional': '选填',
  'contact.rule': '邮箱与电话请至少填写一项。',
  'contact.send': '发送留言',
  'contact.bookStore': '预约到店',
  'contact.addresses': '门店地址',
  'contact.thanks': '已收到',
  'contact.thanksCopy': '我们会尽快回复你。',
  'contact.back': '返回首页',
  'contact.error.name': '请填写姓名。',
  'contact.error.message': '请填写留言。',
  'contact.error.reach': '请至少填写邮箱或电话其中一项。',
  'contact.error.email': '请填写有效的邮箱。',
  'contact.error.phone': '请填写有效的电话号码。',

  'home.tagline': '剪裁从容，神采自若。',
  'home.hero.aside': '成衣与配饰，以品质与持久设计为核。',
  'home.lookbook.open': '查看',
  'home.viewAll': '查看全部',
  'home.readMore': '了解品牌',

  'collections.eyebrow': 'SYW',
  'collections.title': '作品',
  'collections.lede': '看得到轮廓，也看得到呼吸。',
  'collections.open': '查看',
  'collections.all': '全部作品',
  'collections.findStore': '门店',
  'collections.footer': '',

  'stores.eyebrow': '门店',
  'stores.title': '门店',
  'stores.enter': '查看',
  'stores.back': '门店',
  'stores.footer': '预约请联系微信',

  'brand.eyebrow': '品牌',
  'brand.about': '关于 SYW',
  'brand.p1':
    'SYW 的成衣与配饰始终以卓越品质与持久设计为核心。',
  'brand.p2':
    '品牌的创意灵感源于对现代文化、全球都市生活与时尚潮流的持续关注。',
  'brand.p3':
    '对工艺、创新与材质的重视贯穿每一季系列，在审慎的选择与打磨中，让当代风格与恒久审美自然交融。',
  'brand.p4':
    '三个字母，各自落在一种态度上：风格是审美的分寸，青春是不轻易钝掉的好奇，野性是保留一点自己的余地。它们不必写在脸上，却应当藏进剪裁、面料与穿着的方式里。',
  'brand.pillar.style': '风格',
  'brand.pillar.youth': '青春',
  'brand.pillar.wild': '野性',
  'brand.style':
    '分寸感的审美。剪裁清楚，色彩克制，细节不喧哗——让衣裳经得起反复看，也经得起反复穿。',
  'brand.youth':
    '不是年龄的口号，而是保持好奇：愿意为好看停下来，愿意试一件不确定却心动的衣裳，愿意让自己被更新一点点。',
  'brand.wild':
    '留一点自己。在端庄里呼吸，在规矩里仍有余地——不必张扬，却也不必收得太干净。',
  'brand.films.eyebrow': '视频',
  'brand.films.title': '品牌视频',
  'brand.contactLabel': '联系',
  'brand.contactTitle': '联系',
  'brand.contactHint': '添加微信，预约到店或了解本季。',
  'brand.wechat.a': '品牌微信',
  'brand.wechat.b': '到店预约',
  'brand.altHero': 'SYW 门店',
  'brand.altStore': 'SYW 门店空间',
  'brand.altDetail': 'SYW 细节',
  'brand.altMid': 'SYW 细节',
  'brand.altFull': 'SYW 门店',

  'film.title': '写在画面里',
  'film.titleEn': 'In Frame',
  'film.summary': '光线、衣裳，与一句一句留在画面里的话。',
}

const en: Messages = {
  'nav.collections': 'Collections',
  'nav.stores': 'Stores',
  'nav.brand': 'Brand',
  'nav.viewAll': 'All collections',
  'nav.about': 'Brand',
  'nav.contact': 'WeChat',
  'nav.home': 'SYW Home',
  'nav.open': 'Open menu',
  'nav.close': 'Close menu',
  'nav.lang': 'Language',

  'footer.pages': 'Pages',
  'footer.collections': 'Collections',
  'footer.brand': 'Brand',
  'footer.stores': 'Stores',
  'footer.contactUs': 'Contact us',
  'footer.wechat': 'WeChat',
  'footer.follow': 'Follow',
  'footer.explore': 'Pages',
  'footer.contact': 'WeChat',
  'footer.location': 'Stores',
  'footer.film': 'Film',
  'footer.tag': 'Look good. Feel at ease.',
  'footer.contactHint': 'WeChat',
  'footer.qr': 'WeChat QR placeholder',
  'footer.douyin': 'Douyin',
  'footer.douyinId': '@SYW',
  'footer.copyright': '© SYW {year}',

  'contact.title': 'Contact us',
  'contact.name': 'Name',
  'contact.email': 'Email address',
  'contact.phone': 'Phone number',
  'contact.message': 'Message',
  'contact.optional': 'optional',
  'contact.rule': 'Please leave either an email or a phone number.',
  'contact.send': 'Send message',
  'contact.bookStore': 'Book an in-store appointment',
  'contact.addresses': 'Store addresses',
  'contact.thanks': 'Received',
  'contact.thanksCopy': 'We will get back to you soon.',
  'contact.back': 'Back to home',
  'contact.error.name': 'Please enter your name.',
  'contact.error.message': 'Please enter a message.',
  'contact.error.reach': 'Please provide either an email or a phone number.',
  'contact.error.email': 'Please enter a valid email.',
  'contact.error.phone': 'Please enter a valid phone number.',

  'home.tagline': 'Ease in the cut. Presence in the wear.',
  'home.hero.aside':
    'Ready-to-wear and accessories, grounded in quality and lasting design.',
  'home.lookbook.open': 'View',
  'home.viewAll': 'View all',
  'home.readMore': 'The brand',

  'collections.eyebrow': 'SYW',
  'collections.title': 'Collections',
  'collections.lede': 'Silhouette you can see. Breath you can feel.',
  'collections.open': 'View',
  'collections.all': 'All collections',
  'collections.findStore': 'Stores',
  'collections.footer': '',

  'stores.eyebrow': 'Stores',
  'stores.title': 'Stores',
  'stores.enter': 'View',
  'stores.back': 'Stores',
  'stores.footer': 'Appointments via WeChat',

  'brand.eyebrow': 'Brand',
  'brand.about': 'About SYW',
  'brand.p1':
    'SYW offers a wardrobe of ready-to-wear and accessories rooted in exceptional quality and lasting design.',
  'brand.p2':
    'The creative soul of the brand is fuelled by a deep connection to modern culture, dynamic global cities and compelling fashion movements.',
  'brand.p3':
    'With an emphasis on expert craftsmanship, innovation and materiality, collections are created with a mindful approach, seamlessly blending contemporary and timeless.',
  'brand.p4':
    'Three letters, three attitudes: Style as measure, Youth as curiosity that does not dull, Wild as room left for oneself. They need not be worn on the face—only held in the cut, the cloth, and the way of wearing.',
  'brand.pillar.style': 'Style',
  'brand.pillar.youth': 'Youth',
  'brand.pillar.wild': 'Wild',
  'brand.style':
    'Taste with measure. Clear cuts, restrained color, quiet detail—clothes that repay looking, and repay wearing.',
  'brand.youth':
    'Not a slogan of age, but curiosity kept: willing to pause for what looks right, to try what is uncertain yet alive, to let herself renew a little.',
  'brand.wild':
    'Keep a little of yourself. Breath inside composure; room inside the rule—no need to shout, and no need to tidy everything away.',
  'brand.films.eyebrow': 'Film',
  'brand.films.title': 'Brand film',
  'brand.contactLabel': 'Contact',
  'brand.contactTitle': 'Contact',
  'brand.contactHint': 'Add us on WeChat to book a visit or ask about the season.',
  'brand.wechat.a': 'Brand WeChat',
  'brand.wechat.b': 'Store booking',
  'brand.altHero': 'SYW store',
  'brand.altStore': 'SYW store interior',
  'brand.altDetail': 'SYW detail',
  'brand.altMid': 'SYW detail',
  'brand.altFull': 'SYW store',

  'film.title': 'In Frame',
  'film.titleEn': '写在画面里',
  'film.summary': 'Light, cloth, and words left inside the frame.',
}

const catalog: Record<Locale, Messages> = { zh, en }

export function translate(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const raw = catalog[locale][key] ?? catalog.zh[key] ?? key
  if (!vars) return raw
  return Object.entries(vars).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
    raw,
  )
}
