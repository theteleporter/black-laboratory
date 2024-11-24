'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Project = {
  name: string;
  url: string;
  type: 'internal' | 'external';
};

type ProjectCategories = {
  experiments: Project[];
  animations: Project[];
  shipped: Project[];
};

const projectCategories: ProjectCategories = {
  experiments: [
    { name: "ROBOT HEAD", url: "/experiments/robot-head", type: "internal" },
    { name: "TELEBALL", url: "https://ball.theteleporter.me", type: "internal" },
    { name: "MONOCHROME STUDIES", url: "/monochrome-studies", type: "internal" },
  ],
  animations: [
    { name: "STRALUR", url: "https://ship.theteleporter.me/aff", type: "external" },
    { name: "NEGATIVE SPACE", url: "/negative-space", type: "internal" },
    { name: "FUNCTIONAL AESTHETICS", url: "/functional-aesthetics", type: "internal" },
  ],
  shipped: [
    { name: "CREPT STUDIO", url: "https://crept.studio", type: "external" },
    { name: "CLEAN INTERFACES", url: "/clean-interfaces", type: "internal" },
    { name: "VISUAL HIERARCHY", url: "/visual-hierarchy", type: "internal" },
    { name: "SIMPLICITY IN FORM", url: "/simplicity-in-form", type: "internal" },
    { name: "DESIGN SYSTEMS", url: "https://example.com", type: "external" },
    { name: "MODERN UI", url: "https://ui.design", type: "external" },
    { name: "COLOR THEORY", url: "https://color-theory.org", type: "external" },
  ],
};

function traceScramble(original: string): string {
  const characters = original.split('');
  for (let i = 0; i < characters.length; i++) {
    if (Math.random() > 0.7) {
      characters[i] = String.fromCharCode(33 + Math.floor(Math.random() * 94));
    }
  }
  return characters.join('');
}

export default function ProjectList() {
  const [displayNames, setDisplayNames] = useState(
    Object.fromEntries(
      Object.entries(projectCategories).map(([category, projects]) => [
        category,
        projects.map((p) => p.name),
      ])
    )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const categories = Object.keys(projectCategories) as (keyof ProjectCategories)[];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomIndex = Math.floor(Math.random() * projectCategories[randomCategory].length);

      const originalName = projectCategories[randomCategory][randomIndex].name;

      setDisplayNames((prev) => ({
        ...prev,
        [randomCategory]: prev[randomCategory].map((name, index) =>
          index === randomIndex ? traceScramble(originalName) : name
        ),
      }));

      setTimeout(() => {
        setDisplayNames((prev) => ({
          ...prev,
          [randomCategory]: prev[randomCategory].map((name, index) =>
            index === randomIndex ? originalName : name
          ),
        }));
      }, 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-5">
      {Object.entries(projectCategories).map(([category, projects]) => (
        <div key={category}>
          <h2 className="text-stone-300 font-thin uppercase border-b border-[#212121] max-w-fit">{category}</h2>
          <ul>
            {displayNames[category as keyof typeof displayNames].map((name, index) => (
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
        </div>
      ))}
    </div>
  );
}