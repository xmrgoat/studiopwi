import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/project/ProjectPage";
import { projectMetadata, projectStaticParams } from "@/components/project/projectRoute";
import { getProject } from "@/content";

// Every project is prerendered; an unknown slug is a 404, not a render.
export const dynamicParams = false;
export const generateStaticParams = projectStaticParams;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return projectMetadata("fr", (await params).slug);
}

export default async function Page({ params }: Props) {
  const project = getProject("fr", (await params).slug);
  if (!project) notFound();
  return <ProjectPage locale="fr" project={project} />;
}
