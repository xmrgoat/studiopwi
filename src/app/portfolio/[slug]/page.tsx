import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/project/ProjectPage";
import { getProject, projects } from "@/content/cases";
import { site } from "@/content/site";

// Every project is prerendered; an unknown slug is a 404, not a render.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};

  const path = `/portfolio/${project.slug}`;
  const image = {
    url: project.shots.desktop.src,
    width: project.shots.desktop.width,
    height: project.shots.desktop.height,
    alt: project.shots.desktop.alt,
  };

  // The root layout's title template adds " · Studio PWI".
  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: path },
    // Replaces the root openGraph whole, so the site name is restated.
    openGraph: {
      type: "article",
      locale: "fr_CH",
      url: path,
      siteName: site.name,
      title: project.seo.title,
      description: project.seo.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.title,
      description: project.seo.description,
      images: [image.url],
    },
  };
}

export default async function Page({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
