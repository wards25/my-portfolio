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
    link: "https://github.com/wards25/Animal-Clinic-Business-Operation-System.git",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "MySQL"],
    image: "/src/clinic.png",
  },
  {
    title: "Sample Blog Site",
    description: "A minimal blog platform that allows users to read the publish posts. It features a clean and responsive UI with a REST API backend supporting user authentication, including secure login and signup functionalities. Ideal for learning full-stack development with real-time API integration.",
    link: "https://github.com/wards25/blog-site.git",
    tags: ["Bootstrap","jQuery" ,"Slim PHP", "Mustache JS", "MySQL", "RESTful API"],
    image: "/src/blog.png",
  },
  {
    title: "El Cid’s Kitchen – Website UI Design",
    description: "A sleek and modern restaurant website UI created in Figma for El Cid’s Kitchen. The design features a clean navigation bar, eye-catching food imagery, and a dark wood-themed background for a warm and appetizing aesthetic.",
    link: "https://www.figma.com/proto/kCzF8xX08Lfb9SyzZTainQ/Home?node-id=4-4",
    tags: ["Figma", "UI/UX Design", "Prototype"],
    image: "/src/elcids.png",
  },
  {
    title: "Point of Sale System",
    description: "A basic Point of Sale system built using C#, designed for small businesses. It features essential functionalities such as product and sales management, along with a simple login and signup system for user access control. Perfect for learning or managing day-to-day sales in a straightforward desktop application.",
    link: "https://github.com/wards25/POS.git",
    tags: ["C#", "Windows Forms", "MySQL"],
    image: "/src/pos.png",
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
