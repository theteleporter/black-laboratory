'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GitBranch } from 'lucide-react';

type Project = {
  name: string;
  url: string;
  type: 'internal' | 'external';
  forkedFrom?: string;
};

type ProjectCategories = {
  experiments: Project[];
  materials: Project[];
};

const projectCategories: ProjectCategories = {
  experiments: [
    { name: "ROBOT HEAD", url: "/experiments/robot-head", type: "internal" },
    { name: "BROWSER CODE BLOCK", url: "/experiments/browser-code-block", type: "internal" },
    { name: "LETTER GRAVEYARD", url: "/experiments/letter-graveyard", type: "internal", forkedFrom: "rauchg" },
    { name: "LOGO GENERATOR", url: "/experiments/logo-experiments", type: "internal", forkedFrom: "rauchg" },
    { name: "COMMAND CARD", url: "/experiments/command-card", type: "internal", forkedFrom: "rauchg" },
    { name: "DYNAMIC AVATAR", url: "/experiments/dynamic-avatar", type: "internal" },
    { name: "AVATAR MICRO SERVICE", url: "/experiments/avatar-micro-service", type: "internal" },
    { name: "WORD ART", url: "/experiments/word-art", type: "internal", forkedFrom: "rauchg" },
    { name: "FILE TREE", url: "/experiments/file-tree", type: "internal" },
    { name: "TELEBALL", url: "https://ball.theteleporter.me", type: "external" },
    { name: "CREPT STUDIO", url: "https://crept.studio", type: "external" },
    { name: "STRALUR", url: "https://ship.theteleporter.me/aff", type: "external" },
  ],
  materials: [
    { name: "RAUNO", url: "https://rauno.me", type: "external" },
    { name: "BASEMENT STUDIO", url: "https://basement.studio", type: "external" },
    { name: "CMDK", url: "https://cmdk.paco.me", type: "external" },
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

  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Sort projects in descending order
  const sortedProjects = Object.fromEntries(
    Object.entries(projectCategories).map(([category, projects]) => [
      category,
      [...projects].reverse(), // Reverse to make the latest project appear first
    ])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const categories = Object.keys(sortedProjects) as (keyof ProjectCategories)[];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomIndex = Math.floor(Math.random() * sortedProjects[randomCategory].length);

      const originalName = sortedProjects[randomCategory][randomIndex].name;

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
      {Object.entries(sortedProjects).map(([category, projects]) => (
        <div key={category}>
          <h2 className="text-stone-300 font-thin uppercase border-b border-[#212121] max-w-fit">{category}</h2>
          <ul>
            {projects.map((project, index) => (
              <li key={index} className="text-sm relative flex items-center justify-center">
                {project.type === 'internal' ? (
                  <Link
                    href={project.url}
                    className="inline-block w-full font-light py-1 hover:bg-[#232323] transition-colors duration-200"
                    onMouseEnter={() => setHoveredProject(project.name)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {displayNames[category as keyof typeof displayNames][index]}
                  </Link>
                ) : (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full font-light py-1 hover:bg-[#232323] transition-colors duration-200"
                    onMouseEnter={() => setHoveredProject(project.name)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {displayNames[category as keyof typeof displayNames][index]}
                  </a>
                )}

                {/* Show number at the end of the link when hovered */}
                {hoveredProject === project.name && (
                  <div className="absolute right-0 text-xs text-gray-400">
                    {index + 1} {/* Show number based on the index */}
                  </div>
                )}

                {/* Conditional Fork Icon and Message */}
                {hoveredProject === project.name && project.forkedFrom && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 text-xs flex items-center gap-1 text-gray-400 justify-end">
                    <GitBranch size={12} />
                    <span>{project.forkedFrom}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
