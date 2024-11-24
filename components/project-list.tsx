import { useEffect, useState } from 'react'
import Link from 'next/link'

const projects = [
  { name: "MINIMALIST DESIGN", url: "/minimalist-design", type: "internal" },
  { name: "TYPOGRAPHY EXPLORATION", url: "/typography-exploration", type: "internal" },
  { name: "MONOCHROME STUDIES", url: "/monochrome-studies", type: "internal" },
  { name: "GRID SYSTEMS", url: "/grid-systems", type: "internal" },
  { name: "NEGATIVE SPACE", url: "/negative-space", type: "internal" },
  { name: "FUNCTIONAL AESTHETICS", url: "/functional-aesthetics", type: "internal" },
  { name: "GEOMETRIC PATTERNS", url: "/geometric-patterns", type: "internal" },
  { name: "CLEAN INTERFACES", url: "/clean-interfaces", type: "internal" },
  { name: "VISUAL HIERARCHY", url: "/visual-hierarchy", type: "internal" },
  { name: "SIMPLICITY IN FORM", url: "/simplicity-in-form", type: "internal" },
  // External links for demonstration
  { name: "DESIGN SYSTEMS", url: "https://example.com", type: "external" },
  { name: "MODERN UI", url: "https://ui.design", type: "external" },
  { name: "COLOR THEORY", url: "https://color-theory.org", type: "external" }
]

function traceScramble(original) {
  // Scramble some characters in the string
  const characters = original.split('');
  for (let i = 0; i < characters.length; i++) {
    if (Math.random() > 0.7) { // Scramble ~30% of characters
      characters[i] = String.fromCharCode(33 + Math.floor(Math.random() * 94)); // Random ASCII char
    }
  }
  return characters.join('');
}

export default function ProjectList() {
  const [displayNames, setDisplayNames] = useState(projects.map((p) => p.name));

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * projects.length); // Select random project
      const originalName = projects[randomIndex].name;

      // Temporarily scramble the name
      setDisplayNames((prev) =>
        prev.map((name, index) => (index === randomIndex ? traceScramble(originalName) : name))
      );

      // Restore the name after a short delay
      setTimeout(() => {
        setDisplayNames((prev) =>
          prev.map((name, index) => (index === randomIndex ? originalName : name))
        );
      }, 200); // Delay of 200ms for the glitch effect
    }, 3000); // Glitch every 3000ms

    return () => clearInterval(interval);
  }, []);

  return (
    <ul className="">
      {displayNames.map((name, index) => (
        <li key={index} className="text-sm">
          {projects[index].type === 'internal' ? (
            <Link
              href={projects[index].url}
              className="inline-block w-full font-light py-1 hover:bg-[#232323] transition-colors duration-200"
            >
              {name}
            </Link>
          ) : (
            <a
              href={projects[index].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full font-light py-1 hover:bg-[#232323] transition-colors duration-200"
            >
              {name}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

