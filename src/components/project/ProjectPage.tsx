import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { ProjectPageLd } from "@/components/seo/JsonLd";
import { getProject, projectPage, type Project } from "@/content/cases";
import { site } from "@/content/site";
import styles from "./ProjectPage.module.css";

// A headline breaks where the Figma frame breaks it ("\n" in the content).
// The space before each <br> keeps the words apart in the text content
// (search snippets, copy-paste); at a line end it renders as nothing.
function Lines({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={line}>
          {line}
          {i < lines.length - 1 && (
            <>
              {" "}
              <br />
            </>
          )}
        </Fragment>
      ))}
    </>
  );
}

// Server component: no client JS beyond the shared Header and Reveal.
// Sections follow the Figma "Projet — …" frames: introduction and live site,
// the problem, the solution with three screenshots, the client's own words,
// the call to action, and the next project.
export default function ProjectPage({ project }: { project: Project }) {
  const { shots, captions } = project;
  const next = getProject(project.next);
  const author = project.testimonial.role
    ? `${project.testimonial.author}, ${project.testimonial.role}`
    : project.testimonial.author;

  return (
    <>
      <ProjectPageLd project={project} />
      <Header />
      <main id="main">
        {/* ── Introduction ───────────────────────────────── */}
        <section className={styles.hero} aria-labelledby="project-title">
          <div className={`grid ${styles.grid}`}>
            {/* LCP candidate on phones: it rises, it never fades. */}
            <h1 id="project-title" className={styles.title}>
              <Lines text={project.title} />
            </h1>

            <div className={styles.summary}>
              <p className={styles.client}>{project.client}</p>
              <p className={styles.text}>{project.summary}</p>
            </div>

            <dl className={styles.facts}>
              {project.facts.map((fact) => (
                <div key={fact.label} className={styles.fact}>
                  <dt className={styles.label}>{fact.label}</dt>
                  <dd className={styles.factValue}>{fact.value}</dd>
                </div>
              ))}
            </dl>

            <figure className={styles.preview}>
              <figcaption>
                <a
                  className={styles.siteLink}
                  href={project.site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.site.label}
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </figcaption>
              {/* Above the fold at desktop, so it loads eagerly; it is never
                  clipped or faded in, which would hold back LCP. */}
              <Image
                src={shots.desktop.src}
                alt={shots.desktop.alt}
                width={shots.desktop.width}
                height={shots.desktop.height}
                sizes="(min-width: 1025px) calc(100vw - 160px), calc(100vw - 40px)"
                priority
                className={styles.shot}
              />
            </figure>
          </div>
        </section>

        {/* ── The problem ────────────────────────────────── */}
        <section className={styles.section}>
          <Reveal className={`grid ${styles.grid}`}>
            <h2 className={`${styles.heading} ${styles.problemHeading}`}>
              <Lines text={project.problem.title} />
            </h2>
            <div className={styles.split}>
              <p className={styles.lead}>{project.problem.lead}</p>
              {project.problem.body.map((paragraph) => (
                <p key={paragraph} className={styles.text}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── The solution ───────────────────────────────── */}
        <section className={styles.section}>
          <div className={`grid ${styles.grid}`}>
            <Reveal className={styles.solutionIntro}>
              <h2 className={styles.heading}>
                <Lines text={project.solution.title} />
              </h2>
              <p className={styles.text}>{project.solution.lead}</p>
            </Reveal>

            <ul className={styles.decisions}>
              {project.solution.decisions.map((decision, i) => (
                <Reveal as="li" key={decision.title} order={i} className={styles.decision}>
                  <h3 className={styles.decisionTitle}>{decision.title}</h3>
                  <p className={styles.text}>{decision.body}</p>
                </Reveal>
              ))}
            </ul>

            <Reveal as="figure" className={styles.mobileView}>
              <Image
                src={shots.mobile.src}
                alt={shots.mobile.alt}
                width={shots.mobile.width}
                height={shots.mobile.height}
                sizes="(min-width: 1025px) 320px, 390px"
                className={styles.shot}
              />
              <figcaption className={styles.caption}>
                <span className={styles.label}>{captions.mobileLabel}</span>
                <span className={styles.captionText}>{captions.mobile}</span>
              </figcaption>
            </Reveal>

            <div className={styles.detailViews}>
              <Reveal as="figure" order={1} className={styles.detailView}>
                <Image
                  src={shots.process.src}
                  alt={shots.process.alt}
                  width={shots.process.width}
                  height={shots.process.height}
                  sizes="(min-width: 1025px) 66vw, calc(100vw - 40px)"
                  className={styles.shot}
                />
                <figcaption className={styles.label}>{captions.process}</figcaption>
              </Reveal>
              <Reveal as="figure" order={1} className={styles.detailView}>
                <Image
                  src={shots.form.src}
                  alt={shots.form.alt}
                  width={shots.form.width}
                  height={shots.form.height}
                  sizes="(min-width: 1025px) 66vw, calc(100vw - 40px)"
                  className={styles.shot}
                />
                <figcaption className={styles.label}>{captions.form}</figcaption>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── The client's words ─────────────────────────── */}
        <section className={styles.section}>
          <Reveal className={`grid ${styles.grid}`}>
            <h2 className={styles.testimonialTitle}>{project.testimonial.title}</h2>
            <figure className={styles.testimonial}>
              <blockquote className={styles.quote}>
                <p>« {project.testimonial.quote} »</p>
              </blockquote>
              <figcaption className={styles.text}>{author}</figcaption>
            </figure>
          </Reveal>
        </section>

        {/* ── Call to action: the free 30-minute call ────── */}
        <section className={styles.section}>
          <Reveal className={`grid ${styles.grid}`}>
            <div className={styles.ctaMessage}>
              <h2 className={styles.heading}>
                <Lines text={projectPage.cta.title} />
              </h2>
              <p className={styles.text}>{projectPage.cta.lead}</p>
            </div>
            <div className={styles.ctaAction}>
              <Button href={projectPage.cta.href} variant="primary">
                {site.callCta}
              </Button>
              <p className={styles.note}>{projectPage.cta.note}</p>
            </div>
          </Reveal>
        </section>

        {/* ── Next project ───────────────────────────────── */}
        {next && (
          <Link href={`/portfolio/${next.slug}`} className={styles.next}>
            <span className={styles.label}>{projectPage.nextLabel}</span>
            <span className={styles.nextClient}>
              {next.client}{" "}
              {/* Drawn, not typed: Montserrat's Latin subset has no arrows,
                  so a "→" fell back to a thin system glyph. */}
              <svg className={styles.arrow} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 12h15m-6-6 6 6-6 6" />
              </svg>
            </span>
            <span className={styles.text}>{next.teaser}</span>
          </Link>
        )}
      </main>
      <Footer anchorBase="/" />
    </>
  );
}
