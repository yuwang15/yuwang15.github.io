# 双线部署手册（国内 + 海外）

同一份 `dist` 产物部署到两条线路，用 DNS 按访问者所在地区分流：

| 线路 | 访问者 | 承载 | 部署命令 |
| --- | --- | --- | --- |
| 国内 | 中国大陆 | 阿里云 OSS + CDN | `npm run deploy:cn` |
| 海外 | 其他地区 | Vercel | `npm run deploy:global` |

两条一起发：`npm run deploy`。

国内线路必须完成 ICP 备案才能绑定自定义域名，海外线路不受此约束，所以备案审核期间可以先让 Vercel 单线跑着。

---

## 一、一次性准备（需要你本人操作）

这三步涉及账号、证件和付款，只能由你完成。

### 1. 注册域名

在阿里云买 `houseofsyw.com`，**用公司营业执照做实名认证**。

实名主体必须和后面的备案主体一致。用个人身份证注册再申请企业备案会被驳回，这是最常见的返工原因。

实名审核一般几小时到一天。通过后在域名控制台可以下载「域名证书」，备案时要用。

### 2. 买一台服务器换取备案服务码

工信部不直接受理备案，只通过「接入服务商」提交。阿里云需要先确认你是它的接入用户才肯代为提交，凭证就是**备案服务码**。

服务码只能由云服务器申请（ECS 或轻量应用服务器，需购买 3 个月以上），单买 OSS 或 CDN 申请不了。所以买最便宜的轻量应用服务器、买 3 个月即可，拿到服务码就行。

网站实际不跑在这台机器上（静态文件在 OSS + CDN），它闲置无妨。备案通过后即使到期不续费，备案也不会失效——但不要更换接入商，否则需要重新走接入备案。

### 3. 提交 ICP 备案

材料：营业执照、法人身份证、网站负责人身份证、域名证书。网站负责人需要在阿里云 App 里完成人脸核验。

流程与耗时：

1. 阿里云初审 —— 1～2 个工作日
2. 工信部短信核验 —— 收到短信后 24 小时内必须回复，否则作废
3. 省通信管理局审核 —— 通常 7～20 个工作日

通过后 30 日内还要做**公安联网备案**（[beian.gov.cn](https://beian.gov.cn)，线上填表）。备案号需要展示在网站页脚。

---

## 二、国内线路配置（阿里云）

### OSS

1. 建 Bucket，地域就近选（如华东 2 上海），读写权限设为**公共读**。
2. 开启「静态页面托管」：
   - 默认首页：`index.html`
   - 默认 404 页：`index.html`
   - 返回码设为 **200**

第 2 步是让 SPA 路由能工作的关键。这个站用 `react-router`，`/collections/aw26` 这类路径在 OSS 上并不存在对应文件，必须回退到 `index.html` 由前端接管。如果返回码留在 404，浏览器能显示页面但状态码是错的，搜索引擎会当成死链。这与 `vercel.json` 里的 `rewrites` 是同一件事的两种写法。

### CDN

1. 添加加速域名 `www.houseofsyw.com`，源站类型选 **OSS 域名**，选中上面那个 Bucket。
2. 回源 host 设为 Bucket 的外网域名。
3. 申请免费 DV 证书，开启 HTTPS 并打开「强制跳转 HTTPS」。
4. 性能优化里开启 Gzip / Brotli 压缩。

CDN 绑定自定义域名会校验备案，没备案过不去。

### 环境变量

部署脚本读三个变量，建议写进 shell 配置：

```bash
export OSS_BUCKET=syw-web
export OSS_ENDPOINT=oss-cn-shanghai.aliyuncs.com
export CDN_DOMAIN=www.houseofsyw.com   # 可选，设了就自动刷新 CDN
```

还需要装并登录 ossutil：

```bash
brew install ossutil
ossutil config
```

CDN 自动刷新依赖 `aliyun` CLI，没装就手动去控制台刷新，脚本会提示。

---

## 三、DNS 境内外分流

在阿里云 DNS（域名解析）里给同一个主机记录配两条不同线路的记录。免费版就支持境内/境外线路拆分。

| 主机记录 | 记录类型 | 线路 | 记录值 |
| --- | --- | --- | --- |
| `www` | CNAME | 境内 | CDN 控制台给的 CNAME 地址 |
| `www` | CNAME | 默认（境外） | `cname.vercel-dns.com` |

「默认」线路必须保留，它兜住所有非境内来源的解析请求。

根域名 `houseofsyw.com` 不能直接用 CNAME。建议主站统一用 `www`，根域名在阿里云 DNS 里加一条「显性 URL」记录 301 跳到 `https://www.houseofsyw.com`。同时在 Vercel 项目里把 `houseofsyw.com` 也加为域名并设置重定向到 `www`，两边行为才一致。

配完用这两条命令验证解析是否按预期分流：

```bash
dig www.houseofsyw.com @223.5.5.5    # 阿里 DNS，应返回 CDN 地址
dig www.houseofsyw.com @8.8.8.8      # Google DNS，应返回 Vercel 地址
```

---

## 四、缓存策略

`deploy-cn.sh` 分三批上传，各自带不同的 `Cache-Control`，与 `vercel.json` 保持一致：

| 内容 | 策略 | 原因 |
| --- | --- | --- |
| `*.js` `*.css` `*.woff2` | `max-age=31536000, immutable` | Vite 产出带内容 hash，改动即换名 |
| 图片、视频等 | `max-age=2592000`（30 天） | 文件名固定，需要保留可重新校验的余地 |
| `*.html` | `no-cache` | 每次都要拿到最新的资源引用 |

图片不能设成一年 immutable：这些文件名不带 hash，换了当季大片后，浏览器本地的旧副本在过期前不会去问服务器，而 CDN 刷新只能清边缘节点、碰不到已经落在用户设备上的副本。

上传顺序是先资源、后 HTML，这样部署过程中进来的访客不会拿到一份指向尚未上传文件的页面。

---

## 五、部署产物瘦身

`dist` 完整体积约 1.3G，实际上传 814M。裁剪规则在 `scripts/deploy-cn.rsync-filter`，与 `.vercelignore` 对齐。

被排除的主要是原始 JPG——运行时由 `/assets/.rsp/` 下的高质量 WebP（q=90）通过 `srcset` 提供，原图只用于本地二次编辑。二维码图片是例外，派生脚本跳过了 `qr/` 目录，所以那几张必须保留原图。

先看裁剪结果、不上传：

```bash
npm run deploy:cn -- --dry-run
```

### 重要：派生图不在版本库里

`public/assets/.rsp/` 被 gitignore（567M），而 `src/data/responsive.manifest.json` 在版本库里。二者必须同步：manifest 一旦有内容，打包出的 `srcset` 就会指向 `.rsp` 下的文件，此时构建环境必须先跑 `npm run images:responsive` 重新生成派生图，否则线上所有图片 404。

因此：

- `npm run deploy:cn` 和 `deploy:global` 都会先执行 `images:responsive`
- GitHub Actions 里加了同样的步骤，并缓存 `.rsp` 目录以免每次重跑
- **不要依赖 Vercel 的 Git 自动构建**部署海外线路。那条路径拿不到 gitignore 掉的 `.rsp`，除非在 Vercel 上也配好 Python 与 Pillow。用本地 `npm run deploy:global`（走 Vercel CLI，会带上本地 `.rsp`）。

---

## 六、视频压缩

首页 hero 是 `autoPlay + loop` 自动播放 campaign 影片，每个首屏访客都会拉取整段视频，所以这批文件的体积直接决定 CDN 流量账单和国内移动端的首屏体验。

已统一转码为 1080p / 30fps / H.264 CRF 26，无声片源去掉空音轨：

| 文件 | 压缩前 | 压缩后 | 说明 |
| --- | --- | --- | --- |
| `video.mp4` | 75M | 22M | 原为 60fps，背景循环用不到 |
| `campaign/aw25.mp4` | 72M | 9.5M | 原为 1920×3414、17Mbps |
| `campaign/ss26.mp4` | 47M | 20M | |
| `campaign/aw26.mp4` | 44M | 44M | 原码率已仅 1.2Mbps，重压无收益，未改动 |
| `brand/syw.mp4` | 1.9M | 1.9M | 体积本就很小，未改动 |

重新压缩某个文件时用这条命令（有音轨的去掉 `-an`，换成 `-c:a aac -b:a 96k`）：

```bash
ffmpeg -i in.mp4 -an -vf "fps=30,scale=1080:-2:flags=lanczos" \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p \
  -movflags +faststart out.mp4
```

`-movflags +faststart` 把索引写到文件头，浏览器才能边下边播而不是等整段下载完。所有片源都必须带上。

CRF 数字越大体积越小：hero 用 CRF 28 可以再降到 17M，实测画质差别肉眼难辨，若后续要进一步压流量费可以考虑。
