import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaFigma, FaExternalLinkAlt } from "react-icons/fa";

const projectList = [
  {
    title: "F325 – Bad Order Management",
    description:
      "An internal inventory system built for RGC's F325 team to log and track bad orders (damaged or returned stock) from company branches. The system lets the team create pullout batches for the principal to collect defective items, streamlining what was previously a manual returns process.",
    link: "https://f325.ramosco.net/",
    tags: ["PHP", "MySQL", "Inventory Management", "SSH", "Linux Deployment"],
    image: "/src/f325.png",
  },
  {
    title: "RGC Sales App Desktop",
    description:
      "Contributor to a two-part Business Management System for Mercury branches: a mobile app used by branch staff for day-to-day sales, order suggestions, stock checks, attendance, and store surveys, and a desktop app for monitoring and analyzing BMS data company-wide. Managed deployment of both apps on a Linux server environment.",
    link: "https://salesapp.ramosco.net/mobile/",
    tags: ["PHP", "MySQL", "Linux Deployment", "Web App", "Sales Monitoring", "API", "SSH"],
    image: "/src/salesappDesktop.png",
  },
  {
    title: "Sales App Web App",
    description:
      "Contributor to a two-part Business Management System for Mercury branches: a mobile app used by branch staff for day-to-day sales, order suggestions, stock checks, attendance, and store surveys, and a desktop app for monitoring and analyzing BMS data company-wide. Managed deployment of both apps on a Linux server environment.",
    link: "https://salesapp.ramosco.net/mobile/",
    tags: ["PHP", "MySQL", "Linux Deployment", "Web App", "Sales Monitoring", "API", "SSH"],
    image: "/src/salesappMobile.png",
  },
  {
    title: "OMS - Organizational Management System",
    description:
      "Contributor to a two-part Business Management System for Mercury branches: a mobile app used by branch staff for day-to-day sales, order suggestions, stock checks, attendance, and store surveys, and a desktop app for monitoring and analyzing BMS data company-wide. Managed deployment of both apps on a Linux server environment.",
    link: "https://oms.ramosco.net:8443",
    tags: ["PHP", "MySQL", "Linux Deployment", "Web App", "Sales Monitoring", "API", "SSH"],
    image: "/src/oms.png",
  },
   {
    title: "IT Asset Inventory System",
    description:
      "A Laravel-based IT asset monitoring system for tracking company hardware across its lifecycle — status (working, defective, disposal, disposed), department assignment, purchase/deployment dates, and QR code scanning for quick lookup. Includes dashboard stats and exportable reports.",
    link: "https://github.com/wards25/asset-monitoring",
    tags: ["Laravel", "PHP", "MySQL", "QR Code", "Blade"],
    image: "/src/assettrack.png",
  },
  {
    title: "Operating Expense Monitoring System",
    description:
      "A web-based system designed to monitor and manage business operating expenses, built with Slim PHP, Bootstrap, and integrated with a RESTful API for real-time data handling.",
    link: "https://github.com/wards25/merge_simple_project_v2",
    tags: ["Bootstrap", "jQuery", "Slim PHP", "Mustache JS", "MySQL", "RESTful API"],
    image: "/src/opex.png",
  },
  {
    title: "Animal Clinic Business Operation System",
    description:
      "A comprehensive web-based system designed to streamline the daily operations of an animal clinic, including appointment scheduling, patient records, and inventory management built using pure PHP, MySQL, and modern frontend technologies.",
    link: "https://github.com/wards25/Animal-Clinic-Business-Operation-System.git",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "MySQL"],
    image: "/src/clinic.png",
  },
  {
    title: "Sample Blog Site",
    description:
      "A minimal blog platform that allows users to read published posts. It features a clean and responsive UI with a REST API backend supporting user authentication, including secure login and signup functionalities. Ideal for learning full-stack development with real-time API integration.",
    link: "https://github.com/wards25/blog-site.git",
    tags: ["Bootstrap", "jQuery", "Slim PHP", "Mustache JS", "MySQL", "RESTful API"],
    image: "/src/blog.png",
  },
  {
    title: "El Cid's Kitchen – Website UI Design",
    description:
      "A sleek and modern restaurant website UI created in Figma for El Cid's Kitchen. The design features a clean navigation bar, eye-catching food imagery, and a dark wood-themed background for a warm and appetizing aesthetic.",
    link: "https://www.figma.com/proto/kCzF8xX08Lfb9SyzZTainQ/Home?node-id=4-4",
    tags: ["Figma", "UI/UX Design", "Prototype"],
    image: "/src/elcids.png",
  },
  {
    title: "Point of Sale System",
    description:
      "A basic Point of Sale system built using C#, designed for small businesses. It features essential functionalities such as product and sales management, along with a simple login and signup system for user access control. Perfect for learning or managing day-to-day sales in a straightforward desktop application.",
    link: "https://github.com/wards25/POS.git",
    tags: ["C#", "Windows Forms", "MySQL"],
    image: "/src/pos.png",
  },
];

const display = { fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace" };

const VISIBLE_TAGS = 4;

/* ---------- GitHub-style language bar ---------- */

// The colors GitHub uses for each language.
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  PHP: "#4F5D95",
  Blade: "#f7523f",
  "C#": "#178600",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Shell: "#89e051",
};
const FALLBACK_COLOR = "#8b949e";

function parseRepo(url) {
  const m = url?.match(/github\.com\/([^/]+)\/([^/#?]+)/);
  if (!m) return null;
  return { owner: m[1], name: m[2].replace(/\.git$/, "") };
}

// Projects with a GitHub link get their languages from GitHub's public API.
// Projects without one can set `languages: { PHP: 70, JavaScript: 30 }` by hand
// (any numbers work; they're treated as relative sizes). No data means no bar.
// Results are cached for the browser session because the unauthenticated API
// allows only 60 requests per hour per IP.
function useLanguages(project) {
  const [state, setState] = useState(() => {
    if (project.languages) return { data: project.languages, status: "done" };
    return { data: null, status: parseRepo(project.link) ? "loading" : "none" };
  });

  useEffect(() => {
    if (project.languages) return;
    const repo = parseRepo(project.link);
    if (!repo) return;

    const key = `gh-langs:${repo.owner}/${repo.name}`;
    try {
      const cached = sessionStorage.getItem(key);
      if (cached) {
        setState({ data: JSON.parse(cached), status: "done" });
        return;
      }
    } catch {
      /* storage unavailable: just fetch */
    }

    const controller = new AbortController();
    fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}/languages`, {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.status))))
      .then((data) => {
        try {
          sessionStorage.setItem(key, JSON.stringify(data));
        } catch {
          /* ignore */
        }
        setState({ data, status: "done" });
      })
      .catch((err) => {
        if (err.name !== "AbortError") setState({ data: null, status: "error" });
      });

    return () => controller.abort();
  }, [project.link, project.languages]);

  return state;
}

const formatPct = (n) => (n < 0.1 ? "<0.1%" : `${n.toFixed(1)}%`);

function LanguageBar({ data }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, v]) => sum + v, 0);
  if (!total) return null;

  // Show the top 3 and group the rest, so the legend stays compact on a card.
  const items = entries.slice(0, 3).map(([name, v]) => ({
    name,
    pct: (v / total) * 100,
    color: LANG_COLORS[name] ?? FALLBACK_COLOR,
  }));
  const rest = entries.slice(3).reduce((sum, [, v]) => sum + v, 0);
  if (rest > 0) items.push({ name: "Other", pct: (rest / total) * 100, color: FALLBACK_COLOR });

  const summary = items.map((i) => `${i.name} ${formatPct(i.pct)}`).join(", ");

  return (
    <div className="mt-5">
      <div
        role="img"
        aria-label={`Languages: ${summary}`}
        className="flex h-2 overflow-hidden rounded-full bg-slate-800"
      >
        {items.map((i) => (
          <span
            key={i.name}
            style={{ width: `${i.pct}%`, minWidth: 3, backgroundColor: i.color }}
          />
        ))}
      </div>
      <ul aria-hidden="true" className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {items.map((i) => (
          <li key={i.name} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: i.color }}
            />
            <span className="font-semibold text-slate-200">{i.name}</span>
            <span className="text-slate-400">{formatPct(i.pct)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// "#" means there's no public link, so don't render a button that goes nowhere.
function getLinkInfo(url) {
  if (!url || url === "#") return null;
  if (url.includes("github.com")) return { label: "View code", Icon: FaGithub };
  if (url.includes("figma.com")) return { label: "View prototype", Icon: FaFigma };
  return { label: "Visit site", Icon: FaExternalLinkAlt };
}

function ProjectCard({ project, index, reduceMotion }) {
  const [expanded, setExpanded] = useState(false);
  const linkInfo = getLinkInfo(project.link);
  const { data: langData, status: langStatus } = useLanguages(project);

  const tags = project.tags ?? [];
  const shownTags = expanded ? tags : tags.slice(0, VISIBLE_TAGS);
  const hiddenCount = tags.length - shownTags.length;
  const canExpand = project.description.length > 150 || tags.length > VISIBLE_TAGS;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 2) * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-700 bg-gray-900 transition-colors duration-300 hover:border-orange-400/60"
    >
      {project.image && (
        <div className="aspect-[16/10] overflow-hidden border-b border-slate-700 bg-slate-800">
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width="640"
            height="400"
            loading="lazy"
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 style={display} className="text-xl font-bold leading-snug text-white">
          {project.title}
        </h3>

        <p
          className={`mt-3 text-sm leading-relaxed text-slate-300 ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {project.description}
        </p>

        {canExpand && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-2 w-fit rounded text-sm text-slate-400 transition hover:text-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        {tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {shownTags.map((tag) => (
              <li
                key={tag}
                style={mono}
                className="rounded-md border border-slate-600 px-2 py-1 text-xs text-slate-300"
              >
                {tag}
              </li>
            ))}
            {hiddenCount > 0 && (
              <li
                style={mono}
                className="rounded-md px-2 py-1 text-xs text-slate-500"
                aria-label={`${hiddenCount} more technologies`}
              >
                +{hiddenCount}
              </li>
            )}
          </ul>
        )}

        {langStatus === "loading" && (
          <div
            aria-hidden="true"
            className="mt-5 h-2 animate-pulse rounded-full bg-slate-800"
          />
        )}
        {langStatus === "done" && langData && <LanguageBar data={langData} />}

        {/* Footer pinned to the bottom so cards in a row line up */}
        <div className="mt-auto pt-6">
          {linkInfo ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${linkInfo.label}: ${project.title}`}
              className="inline-flex items-center gap-2 rounded text-sm font-semibold text-orange-400 transition hover:text-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
            >
              <linkInfo.Icon aria-hidden="true" />
              {linkInfo.label}
            </a>
          ) : (
            <span className="text-sm text-slate-500">No public link</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="scroll-mt-16 bg-gray-950 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={display}
          className="mb-12 text-3xl font-extrabold tracking-tight text-white md:text-4xl"
        >
          Projects
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2">
          {projectList.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}