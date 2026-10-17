import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  title: string;
  summary: string;
  image?: string;
  images?: string[];
  price?: number;
  specs: Spec[];
  keywords: string[];
  order: number;
  bodyHtml: string;
};

export type Page = {
  slug: string;
  title: string;
  description?: string;
  bodyHtml: string;
};

marked.setOptions({ gfm: true, breaks: false });

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

export function getAllProducts(): Product[] {
  const dir = path.join(CONTENT_DIR, "products");
  return readDir(dir)
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: String(data.slug ?? file.replace(/\.md$/, "")),
        title: String(data.title ?? ""),
        summary: String(data.summary ?? ""),
        image: data.image ? String(data.image) : undefined,
        images: Array.isArray(data.images) ? (data.images as string[]) : [],
        price: typeof data.price === "number" ? data.price : Number(data.price) || 0,
        specs: Array.isArray(data.specs) ? (data.specs as Spec[]) : [],
        keywords: Array.isArray(data.keywords) ? (data.keywords as string[]) : [],
        order: typeof data.order === "number" ? data.order : 999,
        bodyHtml: marked.parse(content) as string,
      } satisfies Product;
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getProduct(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getPage(slug: string): Page | undefined {
  const file = path.join(CONTENT_DIR, "pages", slug + ".md");
  if (!fs.existsSync(file)) return undefined;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    slug,
    title: String(data.title ?? ""),
    description: data.description ? String(data.description) : undefined,
    bodyHtml: marked.parse(content) as string,
  };
}
