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
    { name: "Postman", src: "/src/postman.png", type: "tool" }
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

            {/* Tech Stack Items */}
            <div className="overflow-x-auto whitespace-nowrap px-2">
                <div className="inline-flex gap-8">
                    {filteredTech.map((tech, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center space-y-2 min-w-[80px]"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
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
            </div>
        </section>
    );
};

export default Skills;
