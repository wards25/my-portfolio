import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Change this one line if you move the icons (e.g. to "/icons" inside /public,
// which is the safer place for production builds than "/src").
const ICON_DIR = "/src";
const icon = (file) => `${ICON_DIR}/${file}`;

const TECH = [
  { name: "HTML", src: icon("html.png"), type: "language" },
  { name: "CSS", src: icon("css.png"), type: "language" },
  { name: "JavaScript", src: icon("js.png"), type: "language" },
  { name: "PHP", src: icon("php.png"), type: "language" },
  { name: "jQuery", src: icon("jquery.png"), type: "framework" },
  { name: "Laravel", src: icon("laravel.png"), type: "framework" },
  { name: "Slim", src: icon("slim-framework.png"), type: "framework" },
  { name: "Bootstrap", src: icon("bootstrap.png"), type: "framework" },
  { name: "MySQL", src: icon("mysql.png"), type: "tool" },
  { name: "Git", src: icon("git.png"), type: "tool" },
  { name: "Github", src: icon("github.png"), type: "tool" },
  { name: "Postman", src: icon("postman.png"), type: "tool" },
  { name: "Figma", src: icon("figma.png"), type: "tool" },
  { name: "Docker", src: icon("docker.png"), type: "tool" },
  { name: "SSH", src: icon("ssh.png"), type: "tool" },
];

const TABS = [
  { label: "All", type: null },
  { label: "Languages", type: "language" },
  { label: "Frameworks", type: "framework" },
  { label: "Tools", type: "tool" },
];

// Draft copy, based on what's in your Projects section. Edit freely.
const FOCUS = [
  {
    title: "Backend & APIs",
    text: "Server-side apps and RESTful APIs in PHP, built with Slim and Laravel.",
    stack: "PHP · Slim · Laravel",
  },
  {
    title: "Databases",
    text: "MySQL schemas and queries behind inventory, sales, and expense systems.",
    stack: "MySQL",
  },
  {
    title: "Deployment",
    text: "Getting apps live on Linux servers over SSH, including Docker setups.",
    stack: "Linux · SSH · Docker",
  },
];

const display = { fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif" };

const MASK =
  "[-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]";

function Tile({ tech }) {
  return (
    <div className="group flex w-28 shrink-0 flex-col items-center gap-3">
      <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/60 transition duration-300 group-hover:-translate-y-1 group-hover:border-orange-400">
        <img
          src={tech.src}
          alt=""
          width="56"
          height="56"
          loading="lazy"
          draggable="false"
          className="h-14 w-14 object-contain"
        />
      </div>
      <span className="text-sm text-slate-300 transition group-hover:text-white">
        {tech.name}
      </span>
    </div>
  );
}

// One scrolling strip. The list is repeated 6 times and the strip moves by half
// of its width, so it loops seamlessly and stays full on wide screens.
function MarqueeRow({ items, reverse = false }) {
  return (
    <div className={`overflow-hidden ${MASK}`}>
      <div
        className={`skills-marquee flex w-max ${reverse ? "skills-reverse" : ""}`}
        style={{ "--dur": `${items.length * 7.5}s` }}
      >
        {Array.from({ length: 6 }, (_, copy) => (
          <div key={copy} aria-hidden={copy > 0} className="flex gap-6 pr-6">
            {items.map((tech) => (
              <Tile key={tech.name} tech={tech} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("All");
  const reduceMotion = useReducedMotion();

  const activeType = TABS.find((t) => t.label === activeTab)?.type;
  const filtered = activeType ? TECH.filter((t) => t.type === activeType) : TECH;

  const showMarquee = activeTab === "All" && !reduceMotion;
  const half = Math.ceil(filtered.length / 2);

  return (
    <section id="skills" className="scroll-mt-14 bg-gray-900 px-6 py-16 md:py-24">
      <style>{`
        @keyframes skills-marquee { to { transform: translateX(-50%); } }
        .skills-marquee { animation: skills-marquee var(--dur, 60s) linear infinite; }
        .skills-reverse { animation-direction: reverse; }
        .skills-marquee:hover { animation-play-state: paused; }
      `}</style>

      {/* Heading + tabs */}
      <div className="mx-auto mb-14 flex max-w-5xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={display}
          className="text-3xl font-extrabold tracking-tight text-white md:text-4xl"
        >
          Skills
        </motion.h2>

        <div
          role="tablist"
          aria-label="Filter skills"
          className="flex w-fit max-w-full gap-1 overflow-x-auto rounded-lg border border-slate-700 p-1"
        >
          {TABS.map(({ label }) => {
            const active = activeTab === label;
            return (
              <button
                key={label}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(label)}
                className={`whitespace-nowrap rounded-md px-4 py-1.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 ${
                  active
                    ? "bg-orange-500 text-gray-900"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Logos: two strips moving in opposite directions, or a grid for filtered tabs */}
      {showMarquee ? (
        <div className="space-y-6">
          <MarqueeRow items={filtered.slice(0, half)} />
          <MarqueeRow items={filtered.slice(half)} reverse />
        </div>
      ) : (
        <div
          key={activeTab}
          className="mx-auto flex max-w-5xl flex-wrap justify-center gap-6"
        >
          {filtered.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Tile tech={tech} />
            </motion.div>
          ))}
        </div>
      )}

      {/* What I do: puts the logos in context */}
      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
        {FOCUS.map((f, i) => (
          <motion.div
            key={f.title}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
            className="rounded-xl border border-slate-700 bg-gray-950/60 p-6"
          >
            <h3 style={display} className="text-lg font-bold text-white">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{f.text}</p>
            <p
              className="mt-4 text-xs text-slate-400"
              style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
            >
              {f.stack}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}