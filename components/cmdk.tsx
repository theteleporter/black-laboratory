'use client';

import { useState, useEffect, useRef } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { experiments, resources, Project } from '../utils/projectData';

export default function CMDK() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    const handleTwoFingerTap = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('touchstart', handleTwoFingerTap);
    return () => document.removeEventListener('touchstart', handleTwoFingerTap);
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      if (categoriesRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = categoriesRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  const categories = ['design', 'engineering', 'inspiration', 'tools', 'references'] as const;
  const filteredResources = selectedCategory 
    ? resources.filter(project => project.category === selectedCategory)
    : resources;

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = direction === 'left' ? -100 : 100;
      categoriesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      ref={ref}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[640px] max-h-[85vh] min-h-[380px] bg-[#1C1C1C] rounded-lg shadow-lg border border-[#585D63] overflow-hidden"
    >
      <Command.Input 
        className="w-full text-sm bg-transparent text-[#EFEFEF] placeholder:text-[#6C6C6C] px-6 py-4 outline-none border-b border-[#333333]"
        placeholder="START TYPING..."
      />
      <Command.List className="overflow-y-auto h-[300px] py-2">
        <Command.Empty className="p-4 text-sm flex justify-center flex-col text-center text-[#A5A5A5]">
          NO RESULTS FOUND.
        </Command.Empty>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory ?? 'all'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {!selectedCategory && (
              <Command.Group heading="EXPERIMENTS" className="px-2">
                {experiments.map((project) => (
                  <Command.Item
                    key={project.name}
                    value={project.name}
                    onSelect={() => {
                      setOpen(false);
                      if (project.type === 'external') {
                        window.open(project.url, '_blank');
                      } else {
                        window.location.href = project.url;
                      }
                    }}
                    className="px-4 py-2 space-y-1 text-sm text-[#EFEFEF] rounded-md hover:bg-[#282828] cursor-pointer flex items-center justify-between group"
                  >
                    <span>{project.name}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            <Command.Group 
              heading={selectedCategory ? selectedCategory.toUpperCase() : "RESOURCES"} 
              className="px-2 text-[#6E6E6E]"
            >
              {filteredResources.map((project) => (
                <Command.Item
                  key={project.name}
                  value={project.name}
                  onSelect={() => {
                    setOpen(false);
                    if (project.type === 'external') {
                      window.open(project.url, '_blank');
                    } else {
                      window.location.href = project.url;
                    }
                  }}
                  className="px-4 py-2 space-y-1 text-sm text-[#EFEFEF] rounded-md hover:bg-[#282828] cursor-pointer flex items-center justify-between group"
                >
                  <span>{project.name}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </motion.div>
        </AnimatePresence>
      </Command.List>

      <div className="border-t border-[#333333] p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2 relative">
          {showLeftArrow && (
            <button
              onClick={() => scrollCategories('left')}
              className="absolute left-0 z-10 bg-gradient-to-r from-[#1C1C1C] to-transparent pr-4 h-full flex items-center"
            >
              <ChevronLeft size={16} className="text-[#6E6E6E]" />
            </button>
          )}
          <div
            ref={categoriesRef}
            className="flex items-center space-x-2 overflow-x-auto scrollbar-hide"
          >
            <motion.div
              className="flex space-x-2"
              animate={{ x: selectedCategory ? -40 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  !selectedCategory 
                    ? 'bg-[#282828] text-white' 
                    : 'text-[#6E6E6E] hover:bg-[#282828] hover:text-white'
                }`}
              >
                ALL
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    selectedCategory === category 
                      ? 'bg-[#282828] text-white' 
                      : 'text-[#6E6E6E] hover:bg-[#282828] hover:text-white'
                  }`}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </motion.div>
          </div>
          {showRightArrow && (
            <button
              onClick={() => scrollCategories('right')}
              className="absolute right-0 z-10 bg-gradient-to-l from-[#1C1C1C] to-transparent pl-4 h-full flex items-center"
            >
              <ChevronRight size={16} className="text-[#6E6E6E]" />
            </button>
          )}
        </div>
        <div className="text-[#6E6E6E] text-xs px-2">⌘K</div>
      </div>
    </Command.Dialog>
  );
}

