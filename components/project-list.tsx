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
  resources: Project[];
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
  resources: [
    { name: "RAUNO", url: "https://rauno.me", type: "external" },
    { name: "BASEMENT STUDIO", url: "https://basement.studio", type: "external" },
    { name: "CMDK", url: "https://cmdk.paco.me", type: "external" },
    { name: "ORIGIN UI", url: "https://originui.com", type: "external" },
    { name: "VAUL", url: "https://vaul.emilkowal.ski", type: "external" },
    { name: "SONNER", url: "https://sonner.emilkowal.ski", type: "external" },
    { name: "SCROLLYTELLING", url: "https://scrollytelling.basement.studio", type: "external" },
    { name: "EMIL KOWALSKI", url: "https://emilkowal.ski/", type: "external" },
    { name: "PQOQUBBW", url: "https://icons.pqoqubbw.dev", type: "external" },
    { name: "IMPOSSIBLE CHECKBOX", url: "https://codepen.io/jordangoldworlDboss/pen/OJKopwJ", type: "external" },
    { name: "PLAYBOOK - EBAY", url: "https://playbook.ebay.com/design-system/components", type: "external" },
    { name: "WEBVM", url: "https://webvm.io", type: "external" },
    { name: "NEXT FILTER LIST", url: "https://next15-filterlist.vercel.app/done", type: "external" },
    { name: "POSTGRES SANDBOX", url: "https://database.build", type: "external" },
    { name: "GEIST GAUGE", url: "https://geist-gauge.vercel.app", type: "external" },
    { name: "CSS TRICKS", url: "https://css-tricks.com", type: "external" },
    { name: "FAB MENU", url: "https://path-button.v0.build", type: "external" },
    { name: "SWC", url: "https://swc.rs", type: "external" },
    { name: "SVG'S / SPRITES", url: "https://benadam.me/thoughts/react-svg-sprites", type: "external" },
    { name: "LIVEBLOCKS", url: "https://liveblocks.io", type: "external" },
    { name: "BASEMENT CHRONICLES", url: "https://chronicles.basement.studio", type: "external" },
    { name: "WRAP BALANCER", url: "https://react-wrap-balancer.vercel.app", type: "external" },
  ],
};

function traceScramble(original: string): string {
  return original.split('').map(char => {
    if (/[a-zA-Z0-9]/.test(char) && Math.random() > 0.7) {
      return String.fromCharCode(33 + Math.floor(Math.random() * 94));
    }
    return char;
  }).join('');
}

export default function ProjectList() {
  const [displayNames, setDisplayNames] = useState(
    Object.fromEntries(
      Object.entries(projectCategories).map(([category, projects]) => [
        category,
        projects.map((p) => p.name)
      ])
    )
  );

  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    const projectNames = Object.fromEntries(
      Object.entries(projectCategories).map(([category, projects]) => [
        category,
        projects.map((p) => p.name)
      ])
    );

    const interval = setInterval(() => {
      const categories = Object.keys(projectCategories) as (keyof ProjectCategories)[];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomIndex = Math.floor(Math.random() * projectCategories[randomCategory].length);

      const originalName = projectNames[randomCategory][randomIndex];

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
            {projects.map((project, index) => (
              <li key={project.name} className="text-sm relative flex items-center justify-between">
                {project.type === 'internal' ? (
                  <Link
                    href={project.url}
                    className="inline-block w-full font-light py-1 hover:bg-[#232323] transition-colors duration-200"
                    onMouseEnter={() => setHoveredProject(project.name)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <span>{displayNames[category as keyof typeof displayNames][index]}</span>
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
                    <span>{displayNames[category as keyof typeof displayNames][index]}</span>
                  </a>
                )}

                {hoveredProject === project.name && (
                  <>
                    <span className="absolute right-0 items-center text-xs text-stone-400">
                      {projects.length - index}
                    </span>
                    {project.forkedFrom && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 text-xs flex items-center gap-1 text-gray-400 justify-end">
                        <GitBranch size={12} />
                        <span>{project.forkedFrom}</span>
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

