import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-center p-4 text-sm">
      © {new Date().getFullYear()} Edward John Del Barrio . All rights reserved
    </footer>
  );
}