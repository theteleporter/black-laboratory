'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, ChevronLeft, ChevronRight } from 'lucide-react';
import { experiments, resources, Project } from '../utils/projectData';

const ITEMS_PER_PAGE = 20;
const LIST_HEIGHT = ITEMS_PER_PAGE * 32; // Each item is 32px high

export default function ExperimentsList() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredResources = selectedCategory
    ? resources.filter(project => project.category === selectedCategory)
    : resources;

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResources = filteredResources.slice(startIndex, endIndex);

  const categories = ['design', 'engineering', 'inspiration', 'tools', 'references'];

  const renderProjects = (projects: Project[]) => (
    // <motion.ul 
    <ul
 //  style={{ minHeight: LIST_HEIGHT }}
      className="relative"
    >
     {/** <AnimatePresence mode="wait">**/}
        {projects.map((project, index) => (
      //    <motion.
          <li
            key={project.name}
      //      initial={{ opacity: 0, y: 10 }}
    //        animate={{ opacity: 1, y: 0 }}
   //         exit={{ opacity: 0, y: -10 }}
       //     transition={{ duration: 0.2, delay: index * 0.05 }}
            className="text-sm relative flex items-center justify-between"
          >
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
      //        <motion.div
               <div
          //      initial={{ opacity: 0 }}
      //          animate={{ opacity: 1 }}
         //       exit={{ opacity: 0 }}
                className="flex items-center space-x-4"
              >
                <span className="text-xs text-stone-400">
                  {projects.length - index}
                </span>
                {project.forkedFrom && (
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <GitBranch size={12} />
                    <span>{project.forkedFrom}</span>
                  </div>
                )}
     {     /**    </motion.div>**/}</div>
            )}
      {/**    </motion.li>**/}</li>
        ))}
  {  /**  </AnimatePresence>**/}
  {/**  </motion.ul>**/}
  </ul>
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-stone-300 font-thin uppercase border-b border-[#212121] max-w-fit">experiments</h2>
        {renderProjects(experiments)}
      </div>
      <div>
        <h2 className="text-stone-300 font-thin uppercase border-b border-[#212121] max-w-fit">resources</h2>
        <div className="mt-2 space-y-4">
          <div className="flex overflow-x-hidden gap-2">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setCurrentPage(1);
              }}
              className={`text-xs font-light py-1 px-3 rounded-full transition-colors duration-200 ${
                selectedCategory === null 
                  ? 'bg-[#232323] text-white' 
                  : 'text-stone-400 hover:bg-[#232323] hover:text-white'
              }`}
            >
              ALL
            </button>
            <div style={{ minHeight: LIST_HEIGHT }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`text-xs font-light py-1 px-3 rounded-full transition-colors duration-200 ${
                  selectedCategory === category 
                    ? 'bg-[#232323] text-white' 
                    : 'text-stone-400 hover:bg-[#232323] hover:text-white'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}</div>
          </div>
          {renderProjects(currentResources)}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-stone-400 hover:text-white bg-[#232323] disabled: bg-transparent disabled:opacity-50"
            >
              <ChevronLeft size={20} />
             <span className="sr-only">
             Previous 
             </span>
            </button>
            <span className="text-stone-400 text-sm">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-stone-400 hover:text-white bg-[#232323] disabled: bg-transparent disabled:opacity-50"
            >
              <ChevronRight size={20} />
            <span className="sr-only">
             Next
             </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}