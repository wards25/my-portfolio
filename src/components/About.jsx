import React from "react";
import { motion, useReducedMotion } from "framer-motion";
// Keep images inside src/assets and import them relatively.
// Tip: compress the photo (or convert to .webp); portraits like this are often 1-3 MB.
import edwardImg from "../assets/myphoto.jpg";

const STACK = ["JavaScript", "PHP", "Slim Framework", "RESTful API"];

const display = { fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace" };

// Slow, blurred color blobs that drift around: the "moving gradient" look.
// Tailwind class names are written out in full so they aren't purged.
const BLOBS = [
  {
    color: "bg-indigo-600/40",
    box: "h-[28rem] w-[28rem] -left-24 top-0",
    path: { x: [0, 120, -40, 0], y: [0, 60, 120, 0] },
    duration: 22,
  },
  {
    color: "bg-teal-500/30",
    box: "h-[32rem] w-[32rem] -right-32 bottom-0",
    path: { x: [0, -100, 40, 0], y: [0, -80, -20, 0] },
    duration: 26,
  },
  {
    color: "bg-orange-500/15",
    box: "h-80 w-80 left-1/2 top-1/3",
    path: { x: [0, 80, -60, 0], y: [0, -60, 40, 0] },
    duration: 30,
  },
];

function Aurora({ reduceMotion }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
    >
      {BLOBS.map((b) => (
        <motion.div
          key={b.box}
          className={`absolute rounded-full blur-3xl will-change-transform ${b.box} ${b.color}`}
          animate={reduceMotion ? undefined : b.path}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function About() {
  const reduceMotion = useReducedMotion();

  // whileInView + once:true replaces the useInView / isMobile / resize listener setup.
  // It animates one time and stays visible, instead of fading out and back in on every scroll.
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, ease: "easeOut", delay },
  });

  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100vh-3.5rem)] scroll-mt-14 items-center overflow-hidden bg-gray-950 px-6 py-16 md:py-20"
    >
      <Aurora reduceMotion={reduceMotion} />
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.h2
          {...reveal()}
          style={display}
          className="mb-10 text-3xl font-extrabold tracking-tight text-white md:text-4xl"
        >
          About
        </motion.h2>

        <div className="grid items-stretch gap-8 md:grid-cols-[1.25fr_0.75fr] md:gap-12">
          {/* Text card (same style as the Hero card) */}
          <motion.div
            {...reveal(0.1)}
            className="flex flex-col overflow-hidden rounded-xl border border-slate-700 bg-gray-900/70 shadow-2xl backdrop-blur-md"
          >
            <div
              style={mono}
              className="border-b border-slate-700 px-5 py-3 text-xs text-slate-400"
            >
              about.md
            </div>

            <div className="flex flex-1 flex-col justify-center space-y-5 p-6 text-base leading-relaxed text-slate-300 md:p-8">
              <p>
                Hi, I'm{" "}
                <strong className="font-semibold text-white">
                  Edward John Del Barrio
                </strong>
                , experienced web developer who specializes in back-end development.
              </p>
              <p>
                I build modern, user-friendly websites, and I keep learning new
                tools and frameworks to sharpen my craft and stay current with
                web trends.
              </p>
              <div>
                <p className="mb-3">Most of my work uses:</p>
                <ul className="flex flex-wrap gap-2">
                  {STACK.map((tech) => (
                    <li
                      key={tech}
                      style={mono}
                      className="rounded-md border border-slate-600 px-3 py-1 text-sm text-slate-200"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.figure
            {...reveal(0.2)}
            className="relative mx-auto h-[26rem] w-full max-w-xs overflow-hidden rounded-xl border border-slate-700 md:h-auto md:max-w-none"
          >
            <img
              src={edwardImg}
              alt="Portrait of Edward John Del Barrio in a white barong with a blue graduation sash"
              width="800"
              height="1000"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </motion.figure>
        </div>
      </div>
    </section>
  );
}