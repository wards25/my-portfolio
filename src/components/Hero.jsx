import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";

/*
  Add to index.html <head> (or import in your CSS):
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
*/

// Defined once, outside the component, so the array keeps the same identity
// between renders. (A default param like `strings = [...]` creates a NEW array
// on every render, which made your useEffect restart Typed each time.)
const ROLES = ["Backend Developer", "Web Developer", "Problem Solver"];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/wards25", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/edwardjohn-js/", Icon: FaLinkedin },
  { label: "Facebook", href: "https://www.facebook.com/edwardjohn.delbarrio.7/", Icon: FaFacebook },
  { label: "Email", href: "mailto:edwardjohndelbarrio92@gmail.com", Icon: FaEnvelope },
];

const display = { fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace" };

export default function Hero({
  strings = ROLES,
  typeSpeed = 50,
  backSpeed = 30,
}) {
  const typedRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Respect "reduce motion": show the first role, no typing loop.
    if (reduceMotion) {
      typedRef.current.textContent = strings[0];
      return;
    }
    const typed = new Typed(typedRef.current, {
      strings,
      typeSpeed,
      backSpeed,
      backDelay: 1600,
      loop: true,
      cursorChar: "_",
      smartBackspace: true,
    });
    return () => typed.destroy();
  }, [strings, typeSpeed, backSpeed, reduceMotion]);

  // One orchestrated entrance instead of fading the whole section.
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  };
  const item = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center bg-gray-900 px-6 pb-16 pt-28"
      // faint dot grid: texture without decoration noise
      style={{
        backgroundImage:
          "radial-gradient(rgba(148,163,184,0.12) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <motion.div
        className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Left: intro */}
        <div className="text-center lg:text-left">
          <motion.h1
            variants={item}
            style={display}
            className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl"
          >
            Hi, I'm Edward.
          </motion.h1>

          <motion.p
            variants={item}
            style={mono}
            className="mt-5 h-8 text-xl text-orange-400 md:text-2xl"
            aria-label={strings.join(", ")}
          >
            <span ref={typedRef} aria-hidden="true" />
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-slate-300 lg:mx-0"
          >
            Experience in building the server side of web apps: databases, APIs, and the
            logic for keeping them reliable.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <a
              href="#contact"
              className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-gray-900 transition hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
            >
              Get in touch
            </a>
            <a
              href="#about"
              className="rounded-lg border border-slate-600 px-6 py-3 font-semibold text-white transition hover:border-orange-400 hover:text-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
            >
              About me
            </a>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-10 flex justify-center gap-5 lg:justify-start"
          >
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="block rounded-md p-1 text-2xl text-slate-400 transition hover:text-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right: the memorable element, an API response about you */}
        <motion.div
          variants={item}
          className="mx-auto w-full max-w-md overflow-hidden rounded-xl border border-slate-700 bg-gray-950/70 shadow-2xl lg:max-w-none"
        >
          <div
            style={mono}
            className="flex items-center justify-between border-b border-slate-700 px-4 py-3 text-xs text-slate-400"
          >
            <span>GET /api/edward</span>
            <span className="text-emerald-400">200 OK</span>
          </div>
          <pre
            style={mono}
            className="overflow-x-auto p-5 text-sm leading-7 text-slate-300"
          >
{`{
  `}<span className="text-orange-400">"specializing"</span>{`: "Backend Development",
  `}<span className="text-orange-400">"stack"</span>{`: ["PHP", "MySQL", "JavaScript"],
  `}<span className="text-orange-400">"focus"</span>{`: "APIs & data",
  `}<span className="text-orange-400">"available"</span>{`: true
}`}
          </pre>
        </motion.div>
      </motion.div>
    </section>
  );
}