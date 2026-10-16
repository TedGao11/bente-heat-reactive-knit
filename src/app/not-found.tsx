import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">404</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-slate-600">
        The page you are looking for has moved or never existed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-md bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
      >
        Back to home
      </Link>
    </Container>
  );
}
