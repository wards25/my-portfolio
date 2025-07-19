import React from "react";
import { motion } from "framer-motion";

const projectList = [
  {
    title: "Operating Expense Monitoring System",
    description: "A web-based system designed to monitor and manage business operating expenses, built with Slim PHP, Bootstrap, and integrated with a RESTful API for real-time data handling.",
    link: "#",
    tags: ["Bootstrap","jQuery" ,"Slim PHP", "Mustache JS", "MySQL", "RESTful API"],
    image: "/src/opex.png",
  },
  {
    title: "Animal Clinic Business Operation System",
    description: "A comprehensive web-based system designed to streamline the daily operations of an animal clinic, including appointment scheduling, patient records, and inventory management built using pure PHP, MySQL, and modern frontend technologies.",
    link: "#",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "MySQL"],
    image: "/src/project2.png",
  },
];

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="max-w-6xl mx-auto py-20 px-6 text-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Projects</h2>
      
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
        {projectList.map((project, i) => (
          <motion.div
            key={i}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-orange-500/30 transition duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              {project.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-orange-600/20 border border-orange-400 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-orange-400 hover:underline"
              >
                View Project →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
