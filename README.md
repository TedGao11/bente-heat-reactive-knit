# 极简试探站模板

**这是什么**：一个配置驱动的静态网站模板。填好 `site.config.ts` + `content/`，
推到 GitHub，Vercel 自动上线。

**产物**：纯静态（`out/` 目录）。不需要服务器、不需要数据库、不需要常驻进程。

---

## 目录结构

```
site.config.ts           <- 站点身份：品牌 / 行业词 / 联系方式 / Hero 文案 / SEO
content/products/*.md    <- 产品条目（一个文件 = 一个产品页）
content/pages/about.md   <- 关于我们
src/                     <- 模板代码（一般不用改）
public/admin/            <- Decap 后台（访问 /admin）
```

**分层原则**：`site.config.ts` 管「站是什么」，`content/` 管「站里有什么」。

---

## 本地跑起来

```bash
npm install
npm run dev        # http://localhost:3000

npm run build      # 产物在 out/
npx serve out      # 本地预览构建结果
```

---

## 上线前必须改的 5 个地方

1. `site.config.ts` -> `domain`：真实域名，不带 https:// 和末尾斜杠
2. `site.config.ts` -> `brand.name` / `industry.name` / `industry.keywords`
3. `site.config.ts` -> `contact.email`：建议用域名邮箱（sales@你的域名.com）
4. `site.config.ts` -> `seo.title` / `seo.description`
5. `content/products/*.md`：换成这个行业的真实产品

## 上线后要做的事

- 把 sitemap 提交给 Google Search Console：`https://你的域名/sitemap.xml`
- 把 `site.seo.googleSiteVerification` 填上 GSC 给的验证码
- 装 Vercel Analytics 或 GA4 看流量

---

## 换行业 = 换 3 个地方

1. `site.config.ts` 全部文案
2. `content/products/*.md` 换成这个行业的产品
3. `public/images/` 换成这个行业的图

**代码一行不用改。** 这就是「工厂」的意思。

---

## 接询盘

在 `site.config.ts` 里配 `form`：

| provider | 去哪拿 key | 免费额度 |
|---|---|---|
| `web3forms` | https://web3forms.com（填邮箱即可，30 秒） | 250 条/月 |
| `formspree` | https://formspree.io 建一个 form | 50 条/月 |
| `none` | 不用配，只显示邮箱 + WhatsApp | — |

配 `none` 也能接询盘，只是没有表单。**第一版先用 none 上线，有流量了再换。**
