import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import edwardImg from "/src/myphoto.jpg"; // Replace with your actual path

const About = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use different viewport margins based on screen size
  const isInView = useInView(sectionRef, isMobile ? { margin: "0px" } : { margin: "-100px" });

  return (
    <motion.section
      id="about"
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 space-y-10 bg-[#0d1117]"
    >
      <h2 className="text-xl md:text-2xl font-semibold text-white">About</h2>

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full max-w-3xl">
        {/* Terminal box with glow */}
        <div className="flex-1 p-1 bg-purple-500/20 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.5)]">
          <div className="relative h-full bg-gradient-to-b from-[#0d1117] to-[#161b22] border border-[#30363d] shadow-inner rounded-xl w-full overflow-hidden backdrop-blur-md">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#30363d] bg-[#161b22]">
              <span className="h-3 w-3 bg-red-500 rounded-full"></span>
              <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
              <span className="h-3 w-3 bg-green-500 rounded-full"></span>
            </div>

            {/* Terminal text */}
            <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-white whitespace-pre-wrap leading-relaxed">
              <span className="text-green-400">➜</span>{" "}
              <span className="text-blue-400">About me</span>
              {"\n"}
              Hello! I'm <span className="text-purple-400">Edward John Del Barrio</span>, a passionate web developer dedicated to building modern, user-friendly websites. I specialize in back-end development, with a strong foundation in technologies like JavaScript, PHP, Slim Framework, and RESTful API.
              I'm constantly learning new tools and frameworks to improve my craft and stay updated with the latest web trends.
              {"\n"} {"\n"}
              Outside of coding, I’m deeply interested in exploring nature, try hiking scenic trails, capturing stunning landscapes with photography, stargazing under dark skies, or simply relaxing in a quiet place that brings fresh air, discovery, and a deeper connection to the outdoors
            </div>
          </div>
        </div>

        {/* Image block - responsive sizing */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={edwardImg}
            alt="Edward"
            className="w-full h-auto max-h-[300px] md:max-h-[500px] object-cover rounded-2xl border-2 border-[#30363d] shadow-[0_0_40px_rgba(139,92,246,0.4)]"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default About;