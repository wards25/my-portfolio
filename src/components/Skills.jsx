import React, { useState } from "react";
import { motion } from "framer-motion";

const techStack = [
    { name: "HTML", src: "/src/html.png", type: "language" },
    { name: "CSS", src: "/src/css.png", type: "language" },
    { name: "JavaScript", src: "/src/js.png", type: "language" },
    { name: "jQuery", src: "/src/jquery.png", type: "framework" },
    { name: "PHP", src: "/src/php.png", type: "language" },
    { name: "Laravel", src: "/src/laravel.png", type: "framework" },
    { name: "Slim", src: "/src/slim-framework.png", type: "framework" },
    { name: "MySQL", src: "/src/mysql.png", type: "tool" },
    { name: "Git", src: "/src/git.png", type: "tool" },
    { name: "Github", src: "/src/github.png", type: "tool" },
    { name: "Bootstrap", src: "/src/bootstrap.png", type: "framework" },
    { name: "Postman", src: "/src/postman.png", type: "tool" },
    { name: "Figma", src: "/src/figma.png", type: "tool" },
    { name: "Docker", src: "/src/docker.png", type: "tool" },
    { name: "SSH", src: "/src/ssh.png", type: "tool" }
];

const filterTabs = ["All", "Languages", "Frameworks", "Tools"];

const Skills = () => {
    const [activeTab, setActiveTab] = useState("All");

    const filteredTech = techStack.filter((tech) => {
        if (activeTab === "All") return true;
        if (activeTab === "Languages") return tech.type === "language";
        if (activeTab === "Frameworks") return tech.type === "framework";
        if (activeTab === "Tools") return tech.type === "tool";
        return false;
    });

    const loopedTech = [...filteredTech, ...filteredTech];
    const isAllTab = activeTab === "All";

    return (
        <section id="skills" className="py-12 px-4 text-white text-center space-y-8">
            <h2 className="text-2xl md:text-3xl font-semibold">Skills</h2>

            {/* Tabs */}
            <div className="flex justify-center gap-4">
                {filterTabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1 border-b-2 transition-all duration-300 ${activeTab === tab
                                ? "border-indigo-500 text-indigo-400 font-semibold"
                                : "border-transparent hover:text-indigo-300"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {isAllTab ? (
                /* Auto-sliding version — All tab only */
                <div className="relative overflow-hidden w-full">
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#0d1117] to-transparent z-10" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#0d1117] to-transparent z-10" />

                    <motion.div
                        className="flex gap-10 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {loopedTech.map((tech, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center space-y-2 min-w-[80px]"
                            >
                                <img
                                    src={tech.src}
                                    alt={tech.name}
                                    className="w-14 h-14 hover:scale-110 transition-transform duration-300"
                                />
                                <span className="text-sm">{tech.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            ) : (
                /* Static centered version — Languages / Frameworks / Tools */
                <div className="flex flex-wrap justify-center gap-8 px-2">
                    {filteredTech.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            className="flex flex-col items-center space-y-2 min-w-[80px]"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                        >
                            <img
                                src={tech.src}
                                alt={tech.name}
                                className="w-14 h-14 hover:scale-110 transition-transform duration-300"
                            />
                            <span className="text-sm">{tech.name}</span>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Skills;