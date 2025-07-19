import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <motion.section
      id="contact"
      className="max-w-3xl mx-auto py-20 px-4"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          className="p-3 rounded bg-gray-700 text-white"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          className="p-3 rounded bg-gray-700 text-white"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          className="p-3 rounded bg-gray-700 text-white"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition">Send Message</button>
      </form>
    </motion.section>
  );
}
