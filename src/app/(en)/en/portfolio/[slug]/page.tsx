import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/project/ProjectPage";
import { projectMetadata, projectStaticParams } from "@/components/project/projectRoute";
import { getProject } from "@/content";

// /en/portfolio/<slug>: the same projects as the French site, prerendered.
export const dynamicParams = false;
export const generateStaticParams = projectStaticParams;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return projectMetadata("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  const project = getProject("en", (await params).slug);
  if (!project) notFound();
  return <ProjectPage locale="en" project={project} />;
}
