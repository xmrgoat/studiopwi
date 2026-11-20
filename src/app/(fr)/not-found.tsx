import NotFoundView from "@/components/pages/NotFoundView";

// notFound() inside the French site (an unknown project slug, say). URLs that
// match no route at all get app/global-not-found.tsx, in both languages.
export default function NotFound() {
  return <NotFoundView locale="fr" />;
}
