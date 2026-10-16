# Vercel 操作教程 · bente-heat-reactive-knit

> 面向本项目（温变纱 B2C 站）。照着点即可，不需要懂前端。
> 记录日期：2026-10-16 ｜ 账号：tedgaolanqing-4072 ｜ 团队：ted-b2cb (Ted)

---

## 0. 先认清三个项目（别搞混）

登录 vercel.com 后，你的团队下有 **3 个项目**：

| 项目 | 对应站点 | 能不能动 |
|---|---|---|
| **bente-heat-reactive-knit** | 本站（温变纱 B2C） | ✅ 本项目，随便操作 |
| bente-website | **bentepromo.com（正式站）** | ⛔ 不要碰 |
| bente-decap-oauth | bentepromo 的后台 OAuth | ⛔ 不要碰 |

> **红线：只在 bente-heat-reactive-knit 里操作。** 一旦进错项目（尤其 bente-website），改设置/绑域名都可能影响正式站。

---

## 1. 进入项目

1. 打开 https://vercel.com
2. 右上角头像 → 确认选中的是团队 **ted-b2cb / Ted**
3. 顶部 **Overview** → 点 **bente-heat-reactive-knit**

---

## 2. 看部署记录 / 回滚

在项目页左侧 **Deployments**：

- 每条记录 = 一次部署；状态 **Ready**（成功）/**Error**（失败）/**Building**
- 点任意一条 → 可以看 **Build Logs**（构建日志）
- **想回滚**：在某个成功的旧部署右侧点 **⋯** → **Promote to Production** → 当前线上立刻切回那一版（不用重新构建，秒回）

---

## 3. 让 git push 自动上线（推荐做）

**现状：** 本站最早是用命令行部署的，**GitHub 还没接上**——我试过命令行连接，失败了，原因是 **Vercel 的 GitHub 应用还没被授权访问这个仓库**。这一步必须你在网页点一次。

**操作：**
1. vercel.com → 进入 **bente-heat-reactive-knit** → **Settings** → **Git**
2. 点 **Connect Git Repository** → 选 **GitHub**
3. 授权时选 **Only select repositories** → 只勾 **bente-heat-reactive-knit**（不要勾 bente-website，避免误连）
4. 连上后：
   - 以后只要 `git push` → **自动部署上线**
   - 开 PR 会生成 **Preview 预览环境**（独立网址，不影响正式）
   - 每次部署失败会自动跑一次构建日志，方便排查

**不想连也行**：每次改完在本地跑一行 `vercel --prod` 就发布（见 §7）。

---

## 4. 绑域名（上线正式域名时做）

1. 项目 → **Settings** → **Domains** → 输入你的域名 → **Add**
2. Vercel 会给 DNS 记录，去域名商（阿里云/GoDaddy/Cloudflare…）加：
   - 根域名 example.com：加 **A 记录** → 指向 Vercel 给的 IP（如 76.76.21.21）
   - www.example.com：加 **CNAME** → `cname.vercel-dns.com`
   - **最省事**：把域名的 **NS（DNS 服务器）** 直接改成 Vercel 给的 nameserver，剩下的它全自动
3. 生效后 Vercel 自动签发并续期 HTTPS 证书（通常几分钟～几小时）

> 现在本站用的是临时域名 `bente-heat-reactive-knit.vercel.app`，绑正式域名是加在**本项目**上，**不会影响 bentepromo.com**。

---

## 5. 构建失败了怎么查

1. **Deployments** → 点失败的那条 → **Build Logs**
2. 从上往下找**第一处 Error**（后面的报错往往是连带）
3. 本地复现：在仓库目录跑 `npm run build`（与 Vercel 用的命令完全相同），先本地过再推

---

## 6. 项目设置（改错会 build 失败，别乱动）

**Settings → Build and Deployment：**

| 项 | 当前值 |
|---|---|
| Framework Preset | Next.js |
| Build Command | npm run build |
| Output Directory | out |
| Node.js Version | 24.x |

**Settings → Environment Variables：**
目前**不需要**任何变量。以后接表单（Web3Forms/Formspree）或 Shopify 结账时，密钥**加在这里**，不要写进代码。

---

## 7. 命令行速查（不点网页也能干）

在本站仓库目录里执行：

```bash
vercel whoami                 # 看当前登录账号
vercel projects ls            # 列出团队所有项目（确认别搞混）
vercel link --yes             # 把当前目录连接到项目（已完成）
vercel --prod                 # 部署到生产环境
vercel ls                     # 看部署列表
vercel inspect <部署URL>       # 看某次部署详情
vercel logs <部署URL>          # 看运行日志
vercel domains ls             # 看已绑域名
vercel env ls                 # 看环境变量
vercel rollback               # 回滚到上一个生产部署
```

---

## 8. 红线（务必记住）

1. **只操作 bente-heat-reactive-knit**；bente-website = bentepromo.com 正式站，动它风险极高。
2. **改域名 / DNS 前先确认**，DNS 改错会导致正式站打不开。
3. **删项目前先确认**（删除可能连带域名解绑、需重新配置）。
4. GitHub 授权时**只勾本站仓库**，不要勾 bente-website。
5. 密钥/Token 只放 **Environment Variables**，不进代码、不进 git。
