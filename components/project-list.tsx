'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { GitBranch, ChevronLeft } from 'lucide-react';

type Project = {
  name: string;
  url: string;
  type: 'internal' | 'external';
  forkedFrom?: string;
};

type ProjectCategories = {
  experiments: Project[];
  resources: {
    [key: string]: Project[];
  };
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
  resources: {
    design: [
      { name: "CMDK", url: "https://cmdk.paco.me", type: "external" },
      { name: "CRAFT - RAUNO", url: "https://rauno.me/craft", type: "external" },
      { name: "BASEMENT STUDIO", url: "https://basement.studio", type: "external" },
      { name: "ORIGIN UI", url: "https://originui.com", type: "external" },
     { name: "GEIST - VERCEL", url: "https://vercel.com/geist", type: "external" },
      { name: "PLAYBOOK - EBAY", url: "https://playbook.ebay.com/design-system/components", type: "external" },
      { name: "FAB MENU", url: "https://path-button.v0.build", type: "external" },
      { name: "VAUL", url: "https://vaul.emilkowal.ski", type: "external" },
      { name: "SONNER", url: "https://sonner.emilkowal.ski", type: "external" },
      { name: "SCROLLYTELLING", url: "https://scrollytelling.basement.studio", type: "external" },
      { name: "PQOQUBBW", url: "https://icons.pqoqubbw.dev", type: "external" },
      { name: "SHIFTNUDGE - MDS", url: "https://shiftnudge.com", type: "external" },
      { name: "UIWTF - RAUNO", url: "https://uiw.tf", type: "external" },
      { name: "IMPOSSIBLE CHECKBOX", url: "https://codepen.io/jordangoldworlDboss/pen/OJKopwJ", type: "external" },
      { name: "UI PLAYBOOK - RAUNO", url: "https://uiplaybook.dev", type: "external" },
      { name: "FLOW", url: "https://flow.rest", type: "external" },
      { name: "DEVOURING DETAILS", url: "https://devouringdetails.com", type: "external" },
      { name: "NUMBER FLOW", url: "https://number-flow.barvian.me", type: "external" },
     { name: "PRODUCT HOVERS - JHEY", url: "https://codepen.io/jh3y/pen/bNbGZVq", type: "external" },
     { name: "DEPARTURE MONO", url: "https://departuremono.com", type: "external" },
     { name: "PHOSPHOR ICONS", url: "https://phosphoricons.com", type: "external" },
    { name: "HEADLESS MOTION", url: "https://www.raphaelsalaja.com/projects/headless-motion", type: "external" },
     { name: "SPATIAL ARE.NA", url: "https://www.raphaelsalaja.com/projects/spatial.are.na", type: "external" },
     { name: "RAYCAST", url: "https://www.raycast.com", type: "external" },
     { name: "LINEAR", url: "https://linear.app", type: "external" },
     { name: "USER VALIDATION - JHEY", url: "https://codepen.io/jh3y/pen/gbYbmNB", type: "external" },
     { name: "TOLDO", url: "https://toldo.vercel.app", type: "external" },
     { name: "INSPX", url: "https://inspx.rauno.xyz", type: "external" },
      { name: "REACT SMOOTH RANGE INPUT", url: "https://react-smooth-range-input.vercel.app", type: "external" },
    ],
    engineering: [
      { name: "SWC", url: "https://swc.rs", type: "external" },
      { name: "GLTF - REACT THREE FIBER", url: "https://gltf.pmnd.rs", type: "external" },
      { name: "COBE - SHU DING", url: "https://cobe.vercel.app", type: "external" },
      { name: "CHROMA", url: "https://www.trychroma.com", type: "external" },
     { name: "RETRIEVAL POWERED BY OBJECT STORAGE", url: "https://www.trychroma.com/engineering/serverless", type: "external" },
     { name: "NEW ON THE WEB PLATFORM", url: "https://www.industrialempathy.com/new-on-the-web", type: "external" },
     { name: "SERVERLESS SERVERS", url: "https://vercel.com/blog/serverless-servers-node-js-with-in-function-concurrency", type: "external" },
     { name: "VERSION SKEW", url: "https://www.industrialempathy.com/posts/version-skew", type: "external" },
     { name: "DESIGNING EVEN LARGER APPLICATIONS", url: "https://www.industrialempathy.com/posts/designing-even-larger-applications", type: "external" },
    ],
    inspiration: [
      { name: "CRAFT - RAUNO", url: "https://rauno.me/craft", type: "external" },
      { name: "EMIL KOWALSKI", url: "https://emilkowal.ski/", type: "external" },
      { name: "MDS", url: "https://mds.is", type: "external" },
      { name: "DELBA OLIVIERA", url: "https://delba.dev", type: "external" },
      { name: "SHU DING", url: "https://shud.in", type: "external" },
     { name: "MALTE UBL", url: "https://industrialempathy.com", type: "external" },
     { name: "LANCE", url: "https://lancedraws.com", type: "external" },
    ],
    tools: [
     { name: "V0", url: "https://v0.dev", type: "external" },
      { name: "WEBVM", url: "https://webvm.io", type: "external" },
     { name: "POSTGRES SANDBOX", url: "https://database.build", type: "external" },
     { name: "GEIST GAUGE", url: "https://geist-gauge.vercel.app", type: "external" },
     { name: "AI SDK - VERCEL", url: "https://sdk.vercel.ai", type: "external" },
     { name: "SKETCHFAB", url: "https://sketchfab.com", type: "external" },
    { name: "VECTICON", url: "https://www.vecticon.co/tools/image-vectorizer", type: "external" },
    { name: "REACT SCAN", url: "https://react-scan.million.dev", type: "external" },
     { name: "TAURI", url: "https://tauri.app", type: "external" },
     { name: "CLOUDINARY", url: "https://cloudinary.com", type: "external" },
     { name: "FFMPEG ONLINE", url: "https://ffmpeg.wide.video", type: "external" },
    { name: "FFMPEG", url: "https://www.ffmpeg.org", type: "external" },
    { name: "TEMPLATES - VERCEL", url: "https://vercel.com/templates", type: "external" },
    { name: "SUPABASE", url: "https://supabase.com", type: "external" },
    ],
    references: [
      { name: "LIVEBLOCKS", url: "https://liveblocks.io", type: "external" },
      { name: "NEXT FILTER LIST", url: "https://next15-filterlist.vercel.app/done", type: "external" },
      { name: "CSS TRICKS", url: "https://css-tricks.com", type: "external" },
      { name: "SVG'S / SPRITES", url: "https://benadam.me/thoughts/react-svg-sprites", type: "external" },
      { name: "RUSTFINITY", url: "https://www.rustfinity.com", type: "external" },
      { name: "THE MAGIC OF CLIP PATH", url: "https://emilkowal.ski/ui/the-magic-of-clip-path", type: "external" },
      { name: "CRAFTING THE NEXT.JS WEBSITE", url: "https://rauno.me/craft/nextjs", type: "external" },
      { name: "PERSONAL COMPUTER - SKETCHFAB", url: "https://sketchfab.com/3d-models/personal-computer-b943e06de72c4b2b9ac6b9d7ca813f8f", type: "external" },
      { name: "WEB INTERFACE GUIDELINES - RAUNO", url: "https://interfaces.rauno.me", type: "external" },
      { name: "PARK UI", url: "https://park-ui.com", type: "external" },
     { name: "DESIGN SPELLS", url: "https://www.designspells.com", type: "external" },
     { name: "CREATING DIALOGS", url: "https://www.raphaelsalaja.com/playground/creating-dialogs", type: "external" },
    { name: "DELAYED BUTTON", url: "https://www.raphaelsalaja.com/playground/delayed-button", type: "external" },
     { name: "SHARED ANIMATIONS", url: "https://www.raphaelsalaja.com/playground/shared-animations", type: "external" },
     { name: "WHIM", url: "https://www.raphaelsalaja.com/projects/whim", type: "external" },
     { name: "COLOR MAGIC", url: "https://colormagic.app", type: "external" },
     { name: "INVISIBLE DETAILS OF INTERACTION DESIGN", url: "https://rauno.me/craft/interaction-design", type: "external" },
     { name: "IMAGE COMPONENT WITH NEXT.JS", url: "https://image-component.nextjs.gallery", type: "external" },
    ],
  },
};

export default function ProjectList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = `${containerRef.current.scrollHeight}px`;
    }
  }, [selectedCategory]);

  const renderProjects = (projects: Project[]) => (
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
              <span>{project.name}</span>
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
              <span>{project.name}</span>
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
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-stone-300 font-thin uppercase border-b border-[#212121] max-w-fit">experiments</h2>
        {renderProjects(projectCategories.experiments)}
      </div>
      <div>
        <h2 className="text-stone-300 font-thin uppercase border-b border-[#212121] max-w-fit">resources</h2>
        <div ref={containerRef} className="overflow-hidden">
          <div className={`transition-transform duration-300 ${selectedCategory ? 'translate-x-[-100%]' : ''}`}>
            <div className="flex">
              <div className="w-full shrink-0">
                <ul className="mt-2">
                  {Object.keys(projectCategories.resources).map((category) => (
                    <li key={category} className="mb-1">
                      <button
                        className="text-sm font-light py-1 px-0 w-full text-left text-stone-400 hover:bg-[#232323] hover:text-white transition-colors duration-200"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category.toUpperCase()}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full shrink-0">
                {selectedCategory && (
                  <div className="mt-2">
                    <button
                      className="text-sm font-light py-1 w-full text-stone-400 hover:bg-[#232323] hover:text-white transition-colors duration-200 flex items-center -ml-4"
                      onClick={() => setSelectedCategory(null)}
                    >
                      <ChevronLeft size={16} />
                      <span>Back</span>
                    </button>
                    {renderProjects(projectCategories.resources[selectedCategory])}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

