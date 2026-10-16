#!/usr/bin/env node
// ============================================================
// 上线前自检
//
// 用法：cd 你的站点 && npm run build && node ../路径/scripts/preflight.mjs
//      （或在站点目录里： node <工厂目录>/scripts/preflight.mjs）
//
// 检查 out/ 里的产物有没有明显的上线事故。
// ============================================================

import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const outDir = path.join(cwd, "out");
const errors = [];
const warnings = [];
const ok = [];

if (!fs.existsSync(outDir)) {
  console.error("❌ 没找到 out/ 目录。先跑 npm run build");
  process.exit(1);
}

// ---- 读 site.config.ts 里的几个关键值 ----
const cfgPath = path.join(cwd, "site.config.ts");
let cfgRaw = "";
if (fs.existsSync(cfgPath)) cfgRaw = fs.readFileSync(cfgPath, "utf8");
const grab = (re) => { const m = cfgRaw.match(re); return m ? m[1] : null; };
const domain = grab(/^\s*domain:\s*"([^"]+)"/m) ?? grab(/^\s*domain:\s*'([^']+)'/m);
const seoTitle = grab(/^\s*title:\s*"((?:[^"\\]|\\.)*)"/m);
const seoDesc = grab(/^\s*description:\s*"((?:[^"\\]|\\.)*)"/m);
const email = grab(/^\s*email:\s*"([^"]*)"/m);

// ---- 1. 关键文件是否存在 ----
const must = ["index.html", "products/index.html", "about/index.html", "contact/index.html", "sitemap.xml", "robots.txt"];
for (const f of must) {
  if (fs.existsSync(path.join(outDir, f))) ok.push("存在 " + f);
  else errors.push("缺少产物：out/" + f);
}

if (!fs.existsSync(path.join(outDir, "admin/index.html"))) {
  warnings.push("没有 out/admin/index.html，Decap 后台不可用（不用后台可以忽略）");
}

// ---- 2. 域名 ----
if (!domain) errors.push("site.config.ts 里读不到 domain");
else if (/example|your-domain|TODO/i.test(domain)) errors.push("domain 还是占位符：" + domain);
else ok.push("domain = " + domain);

// ---- 3. 检查产物里有没有残留占位符 ----
const placeholderRe = /example-industry\.com|YOUR_GITHUB_USER|YOUR-OAUTH-GATEWAY|Replace this with|example keyword/i;
let placeholderHits = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!/\.(html|xml|txt|json)$/.test(e.name)) continue;
    const txt = fs.readFileSync(p, "utf8");
    if (placeholderRe.test(txt)) placeholderHits.push(path.relative(outDir, p));
  }
};
walk(outDir);
if (placeholderHits.length) {
  errors.push("产物里还有占位符文字（共 " + placeholderHits.length + " 个文件），例：" + placeholderHits.slice(0, 5).join(", "));
} else {
  ok.push("没有残留占位符");
}

// ---- 4. SEO 长度 ----
if (seoTitle) {
  if (seoTitle.length > 65) warnings.push("首页 title " + seoTitle.length + " 字符，建议 <= 60");
  else ok.push("首页 title 长度 " + seoTitle.length);
}
if (seoDesc) {
  if (seoDesc.length > 160) warnings.push("首页 description " + seoDesc.length + " 字符，建议 <= 155");
  else ok.push("首页 description 长度 " + seoDesc.length);
}

// ---- 5. 每个 html 是否都有 title / description / canonical ----
const htmls = [];
const collect = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "admin" && e.name !== "_next") collect(p); }
    else if (e.name === "index.html") htmls.push(p);
  }
};
collect(outDir);

const missingDesc = [];
const missingCanonical = [];
for (const h of htmls) {
  const t = fs.readFileSync(h, "utf8");
  const rel = path.relative(outDir, h);
  if (!/<meta name="description"/.test(t)) missingDesc.push(rel);
  if (!/<link rel="canonical"/.test(t)) missingCanonical.push(rel);
}
if (missingDesc.length) errors.push("这些页面没有 meta description：" + missingDesc.join(", "));
else ok.push("全部 " + htmls.length + " 个页面都有 meta description");
if (missingCanonical.length) warnings.push("这些页面没有 canonical：" + missingCanonical.join(", "));
else ok.push("全部页面都有 canonical");

// ---- 6. 图片体积 ----
const imgDir = path.join(outDir, "images");
let big = [];
let totalImg = 0;
const walkImg = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkImg(p);
    else if (/\.(png|jpe?g|webp|gif|svg)$/i.test(e.name)) {
      const size = fs.statSync(p).size;
      totalImg += size;
      if (size > 300 * 1024) big.push(path.relative(outDir, p) + " (" + Math.round(size / 1024) + "KB)");
    }
  }
};
if (fs.existsSync(imgDir)) walkImg(imgDir);
if (big.length) warnings.push("图片超过 300KB，会拖慢打开速度：" + big.slice(0, 10).join(", "));
else if (totalImg) ok.push("图片总体积 " + Math.round(totalImg / 1024) + "KB，没有单张超标");

// ---- 7. 邮箱 ----
if (!email) warnings.push("没配 contact.email，询盘就接不到了");
else if (/example\./i.test(email)) errors.push("contact.email 还是占位邮箱：" + email);
else ok.push("联系邮箱 " + email);

// ---- 输出 ----
console.log("");
for (const m of ok) console.log("  ✅ " + m);
if (warnings.length) { console.log(""); for (const m of warnings) console.log("  ⚠️  " + m); }
if (errors.length) { console.log(""); for (const m of errors) console.log("  ❌ " + m); }
console.log("");

if (errors.length) {
  console.log("❌ 自检不通过，有 " + errors.length + " 个必须修的问题。先别上线。");
  process.exit(1);
}
console.log("✅ 自检通过" + (warnings.length ? "（有 " + warnings.length + " 条提醒，自己判断）" : "，可以上线"));
