'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, ChevronLeft, ChevronRight } from 'lucide-react';
import { experiments, resources, Project } from '../utils/projectData';

const ITEMS_PER_PAGE = 20;
const LIST_HEIGHT = ITEMS_PER_PAGE * 32; // Each item is 32px high

export default function ProjectList() {
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

  const renderExperiments = () => (
    <ul>
      {experiments.map((project, index) => (
        <li key={project.name} className="text-sm relative">
          {project.type === 'internal' ? (
            <Link
              href={project.url}
              className="inline-flex w-full items-center justify-between font-light py-1 px-0 hover:bg-[#232323] transition-colors duration-200 group"
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <span>{project.name}</span>
              <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {project.forkedFrom && (
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <GitBranch size={12} />
                    <span>{project.forkedFrom}</span>
                  </div>
                )}
                <span className="text-xs text-stone-400">
                  {experiments.length - index}
                </span>
              </div>
            </Link>
          ) : (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-between font-light py-1 px-0 hover:bg-[#232323] transition-colors duration-200 group"
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <span>{project.name}</span>
              <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {project.forkedFrom && (
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <GitBranch size={12} />
                    <span>{project.forkedFrom}</span>
                  </div>
                )}
                <span className="text-xs text-stone-400">
                  {experiments.length - index}
                </span>
              </div>
            </a>
          )}
        </li>
      ))}
    </ul>
  );

  const renderResources = () => (
    <motion.ul 
      style={{ minHeight: LIST_HEIGHT }}
      className="relative"
    >
      <AnimatePresence mode="wait">
        {currentResources.map((project, index) => (
          <motion.li
            key={project.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1, delay: index * 0.03 }}
            className="text-sm relative"
          >
            {project.type === 'internal' ? (
              <Link
                href={project.url}
                className="inline-flex w-full items-center justify-between font-light py-1 px-0 hover:bg-[#232323] transition-colors duration-200 group"
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
              >
                <span>{project.name}</span>
                <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {project.forkedFrom && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <GitBranch size={12} />
                      <span>{project.forkedFrom}</span>
                    </div>
                  )}
                  <span className="text-xs text-stone-400">
                    {currentResources.length - index}
                  </span>
                </div>
              </Link>
            ) : (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-between font-light py-1 px-0 hover:bg-[#232323] transition-colors duration-200 group"
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
              >
                <span>{project.name}</span>
                <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {project.forkedFrom && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <GitBranch size={12} />
                      <span>{project.forkedFrom}</span>
                    </div>
                  )}
                  <span className="text-xs text-stone-400">
                    {currentResources.length - index}
                  </span>
                </div>
              </a>
            )}
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-stone-300 font-thin uppercase border-b border-[#212121] max-w-fit">experiments</h2>
        {renderExperiments()}
      </div>
      <div>
        <h2 className="text-stone-300 font-thin uppercase border-b border-[#212121] max-w-fit">resources</h2>
        <div className="mt-2 space-y-4">
          <div className="flex items-center space-x-2 relative">
            <button
              onClick={() => {
                const container = document.getElementById('category-container');
                if (container) container.scrollBy({ left: -100, behavior: 'smooth' });
              }}
              className="absolute left-0 z-10 bg-gradient-to-r from-[#161616] to-transparent pr-4 h-full flex items-center"
            >
            <span className='sr-only'>Previous</span>
              <ChevronLeft size={16} className="text-stone-400" />
            </button>
            <div
              id="category-container"
              className="flex overflow-x-auto gap-2 scrollbar-hide px-2"
            >
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
              ))}
            </div>
            <button
              onClick={() => {
                const container = document.getElementById('category-container');
                if (container) container.scrollBy({ left: 100, behavior: 'smooth' });
              }}
              className="absolute right-0 z-10 bg-gradient-to-l from-[#161616] to-transparent pl-4 h-full flex items-center"
            >
            <span className='sr-only'>Previous</span>
              <ChevronRight size={16} className="text-stone-400" />
            </button>
          </div>
          {renderResources()}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-stone-400 hover:text-white disabled:opacity-50"
            >
           <span className='sr-only'>Previous</span>
              <ChevronLeft size={20} />
            </button>
            <span className="text-stone-400 text-sm">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-stone-400 hover:text-white disabled:opacity-50"
            >
           <span className='sr-only'></span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

