import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";

export default function Hero({
  strings = ["Web Developer", "Web Enthusiast"],
  typeSpeed = 50,
  backSpeed = 30
}) {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings,
      typeSpeed,
      backSpeed,
      loop: true,
      cursorChar: "|",
      smartBackspace: true,
    };

    const typed = new Typed(typedRef.current, options);

    return () => typed.destroy();
  }, [strings, typeSpeed, backSpeed]);

  return (
    <motion.section
      id="hero"
      className="flex flex-col items-center justify-center h-screen text-center bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
        Hello, I'm <span className="text-orange-400">Edward</span>
      </h1>

      <p className="text-lg md:text-xl text-white font-mono leading-none">
        <span ref={typedRef} className="align-middle"></span>
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        <a
          href="#contact"
          className="px-6 py-2 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition duration-300"
        >
          Get in Touch
        </a>
        <a
          href="#about"
          className="px-6 py-2 border border-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition duration-300"
        >
          Read More
        </a>
      </div>

      {/* Social Links */}
      <div className="mt-10 flex gap-6 text-white text-2xl">
        <a
          href="https://github.com/wards25"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-400 transition duration-300"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/edwardjohn-js/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-400 transition duration-300"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.facebook.com/edwardjohn.delbarrio.7/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-400 transition duration-300"
        >
          <FaFacebook />
        </a>
        <a
          href="mailto:edwardjohndelbarrio92@gmail.com"
          className="hover:text-orange-400 transition duration-300"
        >
          <FaEnvelope />
        </a>
      </div>
    </motion.section>
  );
}
