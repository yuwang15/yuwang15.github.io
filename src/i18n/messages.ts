import type { Locale } from './types'

type Messages = Record<string, string>

const zh: Messages = {
  'nav.collections': '系列',
  'nav.films': '品牌视频',
  'nav.services': '服务',
  'nav.brand': '关于我们',
  'nav.viewAll': '全部系列',
  'nav.about': '关于我们',
  'nav.contact': '微信',
  'nav.home': 'SYW 首页',
  'nav.open': '打开菜单',
  'nav.close': '关闭菜单',
  'nav.lang': '语言',

  'footer.pages': '探索',
  'footer.collections': '系列',
  'footer.films': '品牌视频',
  'footer.brand': '关于我们',
  'footer.services': '服务',
  'footer.contactUs': '加盟合作',
  'footer.wechat': '微信',
  'footer.follow': '关注',
  'footer.explore': '页面',
  'footer.contact': '微信',
  'footer.location': '门店',
  'footer.film': '品牌视频',
  'footer.tag': '穿得好看，也穿得自在。',
  'footer.contactHint': '微信',
  'footer.qr': '微信二维码占位',
  'footer.douyin': '抖音',
  'footer.douyinId': '@SYW',
  'footer.copyright': '© SYW {year}',

  'services.eyebrow': 'SYW',
  'services.title': '服务',
  'services.lede': '微信问询，或走进门店。需要时，我们在。',
  'services.paths.label': '线上与到店',
  'services.online.title': '微信沟通',
  'services.online.body':
    '尺码、现货与搭配，欢迎通过微信咨询。也可查看模特试穿视频，并预约到店。',
  'services.online.cta': '联系顾问',
  'services.boutique.title': '走进门店',
  'services.boutique.body':
    '营业时间内欢迎直接到店试穿与选购，无需预约。',
  'services.offers.title': '我能帮你做什么',
  'services.offers.custom.title': '定制',
  'services.offers.custom.body': '可按需求为你定制。',
  'services.offers.wash.title': '洗涤',
  'services.offers.wash.body': '可协助衣物洗涤护理。',
  'services.offers.tryon.title': '试穿',
  'services.offers.tryon.body': '到店可试穿当季衣裳。',
  'services.offers.exchange.title': '退换',
  'services.offers.exchange.body': '可办理调换与退货，细则以购买门店为准。',
  'services.visit.title': '到店体验',
  'services.visit.lede': '添加官方微信，咨询门店地址、营业时间与当季在售款式。',
  'services.visit.wechat': '微信联系',
  'services.faq.title': '常见问题',
  'services.faq.walkin.q': '尺码拿不准怎么办？',
  'services.faq.walkin.a':
    '欢迎到店试穿。如无法到店，也可以通过官方微信联系我们，我们将根据您的身高、体型及穿着偏好提供尺码建议，并提供部分款式的试穿参考。',
  'services.faq.contact.q': '如何联系 SYW？',
  'services.faq.contact.a':
    '无论是商品咨询、尺码建议、现货查询、预约到店、售后服务，还是合作洽谈，都可以通过官方微信联系我们，我们会尽快回复您的消息。',
  'services.faq.exchange.q': '退换货政策是什么？',
  'services.faq.exchange.a':
    '退换货请以店铺最新规则为准。如有任何疑问，欢迎通过官方微信联系我们，我们将为您提供协助。',
  'services.faq.collaborate.q': '合作咨询',
  'services.faq.collaborate.a':
    '欢迎买手店、品牌、媒体、造型团队及其他创意合作伙伴与我们联系。合作咨询可通过官方微信或加盟合作页面留言，我们期待与您交流。',

  'contact.title': '加盟合作',
  'contact.name': '姓名',
  'contact.email': '邮箱',
  'contact.phone': '电话',
  'contact.message': '留言',
  'contact.optional': '选填',
  'contact.rule': '邮箱与电话请至少填写一项。',
  'contact.send': '发送留言',
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
  'home.hero.season': 'Fall/Winter 2026 Collection',
  'home.hero.name': 'Ridge',
  'home.hero.scroll': 'Scroll to explore',
  'home.lookbook.open': '查看',
  'home.viewAll': '查看全部',
  'home.readMore': '了解品牌',

  'collections.eyebrow': 'SYW',
  'collections.title': '系列',
  'collections.lede': '看得到轮廓，也看得到呼吸。',
  'collections.open': '查看',
  'collections.all': '全部系列',
  'collections.findStore': '门店',
  'collections.footer': '',

  'stores.eyebrow': '门店',
  'stores.title': '门店',
  'stores.map': '查看地图',

  'brand.eyebrow': '关于我们',
  'brand.about': '关于 SYW',
  'brand.p1':
    '二十年，我们守在中高端女装这一侧——把美学做成可穿的分寸，而不是一句标签。',
  'brand.p2':
    'SYW 的成衣与配饰始终以卓越品质与持久设计为核心。',
  'brand.p3':
    '灵感来自当代生活与潮流，工艺与材质贯穿每一季，让当代风格与恒久审美自然交融。',
  'brand.p4':
    '三个字母，各自落在一种态度上：风格、青春、野性——藏进剪裁、面料与穿着的方式里。',
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
  'films.title': '品牌视频',
  'films.lede': '看衣裳怎样被光线慢慢说清楚。',
  'brand.contactLabel': '联系',
  'brand.contactTitle': '联系',
  'brand.contactHint': '添加微信，预约到店或了解本季。',
  'brand.wechat': '品牌微信',
  'brand.wechat.a': '品牌微信',
  'brand.wechat.b': '品牌微信',
  'brand.wechat.c': '品牌微信',
  'brand.altHero': 'SYW 品牌形象',
  'brand.altStore': 'SYW 系列画面',
  'brand.altDetail': 'SYW 系列画面',
  'brand.altMid': 'SYW 系列画面',
  'brand.altFull': 'SYW 品牌形象',

  'film.title': '写在画面里',
  'film.titleEn': 'In Frame',
  'film.summary': '光线、衣裳，与一句一句留在画面里的话。',
}

const en: Messages = {
  'nav.collections': 'Lookbook',
  'nav.films': 'Film',
  'nav.services': 'Services',
  'nav.brand': 'About',
  'nav.viewAll': 'All lookbooks',
  'nav.about': 'About',
  'nav.contact': 'WeChat',
  'nav.home': 'SYW Home',
  'nav.open': 'Open menu',
  'nav.close': 'Close menu',
  'nav.lang': 'Language',

  'footer.pages': 'Explore',
  'footer.collections': 'Lookbook',
  'footer.films': 'Film',
  'footer.brand': 'About',
  'footer.services': 'Services',
  'footer.contactUs': 'Partnership',
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

  'services.eyebrow': 'SYW',
  'services.title': 'Services',
  'services.lede':
    'Ask on WeChat, or walk into a boutique. We are here when you need us.',
  'services.paths.label': 'Online and in store',
  'services.online.title': 'WeChat',
  'services.online.body':
    'Ask about sizing, stock, and styling. Watch model try-on videos, or arrange a store visit.',
  'services.online.cta': 'Contact an advisor',
  'services.boutique.title': 'In store',
  'services.boutique.body':
    'Walk in during opening hours to try on and shop. No appointment needed.',
  'services.offers.title': 'How we can help',
  'services.offers.custom.title': 'Custom',
  'services.offers.custom.body': 'Made-to-order pieces on request.',
  'services.offers.wash.title': 'Care',
  'services.offers.wash.body': 'Garment cleaning and care support.',
  'services.offers.tryon.title': 'Fitting',
  'services.offers.tryon.body': 'Try on the season’s pieces in store.',
  'services.offers.exchange.title': 'Exchanges',
  'services.offers.exchange.body': 'Returns and exchanges follow the boutique of purchase.',
  'services.visit.title': 'Visit us',
  'services.visit.lede':
    'Message us on WeChat for store locations, opening hours, and what is currently in stock.',
  'services.visit.wechat': 'WeChat',
  'services.faq.title': 'FAQs',
  'services.faq.walkin.q': 'What if I’m unsure about my size?',
  'services.faq.walkin.a':
    'You’re welcome to visit our store for a fitting. If you’re unable to visit, feel free to contact us via WeChat. We’ll recommend the most suitable size based on your measurements and preferred fit, and can provide fitting references for selected styles.',
  'services.faq.contact.q': 'How can I contact SYW?',
  'services.faq.contact.a':
    'Whether you have questions about products, sizing, availability, in-store appointments, after-sales support, or collaborations, you can reach us through our official WeChat. We’ll get back to you as soon as possible.',
  'services.faq.exchange.q': 'What is your return and exchange policy?',
  'services.faq.exchange.a':
    'Please refer to our latest store policy for return and exchange information. If you have any questions, feel free to contact us via WeChat, and we’ll be happy to assist you.',
  'services.faq.collaborate.q': 'Collaboration Inquiries',
  'services.faq.collaborate.a':
    'We welcome inquiries from retailers, brands, media, stylists, and other creative partners. For collaboration opportunities, please reach out via WeChat or through our partnership page. We look forward to hearing from you.',

  'contact.title': 'Partnership',
  'contact.name': 'Name',
  'contact.email': 'Email address',
  'contact.phone': 'Phone number',
  'contact.message': 'Message',
  'contact.optional': 'optional',
  'contact.rule': 'Please leave either an email or a phone number.',
  'contact.send': 'Send message',
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
  'home.hero.season': 'Fall/Winter 2026 Collection',
  'home.hero.name': 'Ridge',
  'home.hero.scroll': 'Scroll to explore',
  'home.lookbook.open': 'View',
  'home.viewAll': 'View all',
  'home.readMore': 'The brand',

  'collections.eyebrow': 'SYW',
  'collections.title': 'Lookbook',
  'collections.lede': 'Silhouette you can see. Breath you can feel.',
  'collections.open': 'View',
  'collections.all': 'All lookbooks',
  'collections.findStore': 'Stores',
  'collections.footer': '',

  'stores.eyebrow': 'Stores',
  'stores.title': 'Stores',
  'stores.map': 'Open map',

  'brand.eyebrow': 'About',
  'brand.about': 'About SYW',
  'brand.p1':
    'Twenty years on the side of refined women’s wear—turning aesthetics into something you can put on, not a label you recite.',
  'brand.p2':
    'SYW ready-to-wear and accessories are rooted in exceptional quality and lasting design.',
  'brand.p3':
    'Inspired by contemporary life and fashion, craft and material run through every season—blending the present with the timeless.',
  'brand.p4':
    'Three letters, three attitudes—Style, Youth, Wild—held in the cut, the cloth, and the way of wearing.',
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
  'films.title': 'Film',
  'films.lede': 'How light slowly tells the clothes.',
  'brand.contactLabel': 'Contact',
  'brand.contactTitle': 'Contact',
  'brand.contactHint': 'Add us on WeChat to book a visit or ask about the season.',
  'brand.wechat': 'Brand WeChat',
  'brand.wechat.a': 'Brand WeChat',
  'brand.wechat.b': 'Brand WeChat',
  'brand.wechat.c': 'Brand WeChat',
  'brand.altHero': 'SYW brand film',
  'brand.altStore': 'SYW lookbook',
  'brand.altDetail': 'SYW lookbook',
  'brand.altMid': 'SYW lookbook',
  'brand.altFull': 'SYW brand film',

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
