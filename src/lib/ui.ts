/** Tailwind class 拼接小工具 */
export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** 内部链接统一加尾斜杠，和 trailingSlash: true 保持一致 */
export function href(path: string) {
  if (!path) return "/";
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("#")) return path;
  return path.endsWith("/") ? path : path + "/";
}
