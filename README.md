# Tao Chen — 个人学术主页（v2）

陈韬的个人学术网站，纯静态站点（HTML / CSS / 原生 JS，**无需构建步骤**），部署于 GitHub Pages。v2 改为 Jon Barron 式单栏学术布局：少文字、论文配图、全部直达链接、中英双语。

## 目录结构

```
tao-chen-website/
├── index.html              # 唯一页面（改文字就改这里 + script.js 里的中文）
├── 404.html
├── robots.txt
├── sitemap.xml             # 站点地图（含中英 hreflang）
├── _headers                # Cloudflare Pages 安全/缓存头
├── package.json            # 本地预览 + 一键部署脚本
└── assets/
    ├── styles.css          # 全部样式（顶部 :root 改配色/字体；@font-face 也在顶部）
    ├── script.js           # 交互 + I18N 中英文案字典
    ├── fonts/              # 自托管字体（woff2，国内可正常加载，勿删）
    ├── favicon.svg
    ├── apple-touch-icon.png# iOS 添加到主屏幕的图标
    ├── profile.jpg         # 头像原图（720px，用于生成上面两张图）
    ├── profile-360.webp    # 页面实际加载的小头像
    ├── Tao-CHEN-CV.pdf     # 可下载简历
    └── figs/               # 论文缩略图（webp）+ 实验平台照片
```

> **字体说明**：不再使用 Google Fonts 在线引入（fonts.googleapis.com 在大陆被墙，会导致国内访客白屏数十秒）。Inter / Newsreader 的 latin 子集 woff2 已下载到 `assets/fonts/`，由 `styles.css` 顶部的 `@font-face` 引用；中文自动回退到系统字体（PingFang / 宋体）。

## 本地预览

```bash
cd tao-chen-website
npm run dev        # 等价于 python3 -m http.server 8080
```

浏览器打开 http://localhost:8080 。中文版：右上角「中文」按钮，或直接访问 `http://localhost:8080/?lang=zh`。

## 中英双语怎么改文案

- **英文**：直接改 `index.html` 里的文字。
- **中文**：改 `assets/script.js` 顶部 `I18N.zh` 字典里对应 key 的值。
- 对应关系：HTML 元素上的 `data-i18n="key"` ↔ 字典里的 `key`。新增可译元素就加一个 `data-i18n` 属性 + 在 `I18N.en` 和 `I18N.zh` 各加一条。
- 默认英文；用户选择记在浏览器 localStorage；`?lang=zh` 链接可强制中文打开（适合发给国内联系人）。

## 常见微调位置

| 想改什么 | 改哪里 |
|---|---|
| 个人简介 / 身份 | `index.html` hero 区 + `script.js` 里 `hero.bio`（中英两处） |
| 换真人照片 | 覆盖 `assets/profile.jpg`（方形裁剪）后，重新生成 `profile-360.webp`：`python3 -c "from PIL import Image; Image.open('assets/profile.jpg').convert('RGB').resize((360,360),Image.LANCZOS).save('assets/profile-360.webp','WEBP',quality=86)"` |
| News 增删 | `index.html` 的 `<ul class="news">` + `script.js` 的 `news.*`（日期用 `<time datetime="YYYY-MM">` ） |
| 代表作（带图） | `index.html` 的 `.selpubs`，每篇是一个 `<article class="selpub">`；缩略图放 `assets/figs/`（4:3 时加 `width="900" height="675"`） |
| 论文全列表 | 按「在审 / 期刊 / 会议 / 专利」分四组，每组一个 `<ol class="publist">`，每条 `<li class="pub">`，标题用 `<a href="DOI链接">`（无链接就用纯 `<p class="pub__title">`） |
| 配色 / 字体 | `assets/styles.css` 顶部 `:root` |
| 更新简历 PDF | 覆盖 `assets/Tao-CHEN-CV.pdf` |
| 改 ORCID | hero 按钮区（`index.html` 搜 `orcid.org`）+ head 的 JSON-LD `sameAs`，两处同步 |

### 换/加论文缩略图

任意图片（论文里的关键图、TOC graphic 等）处理成 4:3、白底、≥900px 宽即可：

```bash
python3 -c "
from PIL import Image
im=Image.open('原图.png').convert('RGB'); im.thumbnail((900,675))
c=Image.new('RGB',(900,675),'white'); c.paste(im,((900-im.size[0])//2,(675-im.size[1])//2))
c.save('assets/figs/fig-xxx.webp','WEBP',quality=82)"
```

## 部署到 GitHub Pages

本仓库使用个人主页仓库名 `torin-chen.github.io`。推送到 `main` 分支后，GitHub Pages 会自动发布：

https://torin-chen.github.io/

若以后绑定自定义域名，请同步替换 `index.html`、`sitemap.xml` 和 `robots.txt` 中的站点地址。

## 备选：部署到 Cloudflare Pages

### 方式 A — 控制台拖拽上传（最简单）
1. 登录 https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Upload assets**。
2. 取项目名（如 `tao-chen`），把整个 `tao-chen-website` 文件夹拖进去。
3. 得到 `https://tao-chen.pages.dev`。以后更新再拖一次。

### 方式 B — 命令行（Wrangler）
```bash
cd tao-chen-website && npm run deploy
```
首次会弹浏览器登录 Cloudflare 授权。

### 方式 C — 连 GitHub 自动部署
推到 GitHub 仓库 → Pages **Connect to Git** → Framework preset = **None**、Build command 留空、Output directory = `/`。之后 push 即自动发布。

### 绑定自定义域名
Pages 项目 → **Custom domains** → 添加域名，按提示加 CNAME。

## ⚠️ 待办提醒
- **自定义域名**：SEO/分享标签（canonical、og:url、og:image、sitemap、robots）目前统一写的是 `https://torin-chen.github.io/`。如果以后绑定自定义域名，请在 `index.html`、`sitemap.xml`、`robots.txt` 三个文件里全局替换。
- ~~ORCID~~ 已添加（2026-06-12）：`0009-0002-5850-0959`（经 ORCID API 验证归属 Tao Chen），hero 按钮 + JSON-LD `sameAs` 两处都有。（注意：用论文 DOI 反查到的 `0000-0002-1942-9259` 是江普庆老师的，别误用。）
- ~~Google Scholar 链接 404~~ 已恢复：`citations?user=wLh8cHgAAAAJ` 经验证（2026-06-12）返回 200，链接有效。
- ~~CV 含手机号~~ 已解决：2026-06-12 更新的 TeX 源与 PDF 已无手机号。
