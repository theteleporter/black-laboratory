'use client';

import { useState, useEffect, useRef, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { experiments, resources, Project } from '../utils/projectData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatedPlaceholder } from './animated-placeholder'

export default function CMDK() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [hoveredPrev, setHoveredPrev] = useState(false);
  const [hoveredNext, setHoveredNext] = useState(false);
  const router = useRouter();

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
    setSelectedIndex(-1);
  }, [selectedCategory, inputValue]);

  const categories = ['design', 'engineering', 'inspiration', 'tools', 'references'] as const;
  const filteredResources = selectedCategory 
    ? resources.filter(project => project.category === selectedCategory)
    : resources;

  const allItems = [...experiments, ...filteredResources];

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = direction === 'left' ? -100 : 100;
      categoriesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex + 1) % allItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex - 1 + allItems.length) % allItems.length);
    } else if (e.key === 'Enter' && selectedIndex !== -1) {
      e.preventDefault();
      const selectedItem = allItems[selectedIndex];
      handleItemSelect(selectedItem);
    }
  };

  const handleItemSelect = (item: Project) => {
    setOpen(false);
    if (item.type === 'external') {
      window.open(item.url, '_blank');
    } else {
      router.push(item.url);
    }
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setInputValue('');
    setSelectedIndex(-1);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      ref={ref}
      onKeyDown={handleKeyDown}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[640px] max-h-[85vh] min-h-[380px] bg-[#1C1C1C] rounded-lg shadow-lg border border-[#585D63] overflow-hidden z-50"
    >
      <div className="relative">
        <Command.Input 
          ref={inputRef}
          value={inputValue}
          onValueChange={setInputValue}
          className="w-full text-sm bg-transparent text-[#EFEFEF] placeholder:text-[#6C6C6C] px-6 py-4 outline-none border-b border-[#333333] caret-transparent"
          placeholder=""
        />
        {!inputValue && (
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6C6C6C] pointer-events-none">
            <AnimatedPlaceholder />
          </div>
        )}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-[4px] h-5 bg-[#ff00ff]"
          style={{
            left: `calc(${inputRef.current?.selectionStart || 0} * 0.6rem + 1.5rem)`,
          }}
          animate={{
            opacity: [1, 1, 0, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            times: [0, 0.5, 0.5, 1],
          }}
        />
      </div>
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
                {experiments.map((project, index) => (
                  <Command.Item
                    key={project.name}
                    value={project.name}
                    onSelect={() => handleItemSelect(project)}
                    className={`px-4 py-2 space-y-1 text-sm text-[#EFEFEF] rounded-md hover:bg-[#282828] cursor-pointer flex items-center justify-between group ${
                      selectedIndex === index ? 'bg-[#282828]' : ''
                    }`}
                  >
                    {project.type === 'internal' ? (
                      <Link href={project.url} className="w-full">
                        <span>{project.name}</span>
                      </Link>
                    ) : (
                      <span>{project.name}</span>
                    )}
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            <Command.Group 
              heading={selectedCategory ? selectedCategory.toUpperCase() : "RESOURCES"} 
              className="px-2 text-[#6E6E6E]"
            >
              {filteredResources.map((project, index) => (
                <Command.Item
                  key={project.name}
                  value={project.name}
                  onSelect={() => handleItemSelect(project)}
                  className={`px-4 py-2 space-y-1 text-sm text-[#EFEFEF] rounded-md hover:bg-[#282828] cursor-pointer flex items-center justify-between group ${
                    selectedIndex === (selectedCategory ? index : index + experiments.length) ? 'bg-[#282828]' : ''
                  }`}
                >
                  {project.type === 'internal' ? (
                    <Link href={project.url} className="w-full">
                      <span>{project.name}</span>
                    </Link>
                  ) : (
                    <span>{project.name}</span>
                  )}
                </Command.Item>
              ))}
            </Command.Group>
          </motion.div>
        </AnimatePresence>
      </Command.List>

      <div className="border-t border-[#333333] p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2 relative w-full">
          <button
            onClick={() => scrollCategories('left')}
            onMouseEnter={() => setHoveredPrev(true)}
            onMouseLeave={() => setHoveredPrev(false)}
            className={`absolute left-0 z-10 bg-gradient-to-r from-[#1C1C1C] to-transparent pr-4 h-full flex items-center transition-colors duration-200 ${
              hoveredPrev ? 'text-white' : 'text-[#6E6E6E]'
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          <div
            ref={categoriesRef}
            className="flex items-center space-x-2 overflow-x-auto scrollbar-hide px-6 w-full"
          >
            <motion.div
              className="flex space-x-2"
              animate={{ x: selectedCategory ? -40 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                onClick={() => handleCategoryChange(null)}
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
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    selectedCategory === category 
                      ? 'bg-[#282828] text-white' 
                      : 'text-[#6E6E6E] hover:bg-[#282828] hover:text-white'
                  }`}
                >
                  {category.toUpperCase()}
                </button>
              ))}
              <div className="text-[#6E6E6E] text-xs py-1 px-2">⌘K</div>
            </motion.div>
          </div>
          <button
            onClick={() => scrollCategories('right')}
            onMouseEnter={() => setHoveredNext(true)}
            onMouseLeave={() => setHoveredNext(false)}
            className={`absolute right-0 z-10 bg-gradient-to-l from-[#1C1C1C] to-transparent pl-4 h-full flex items-center transition-colors duration-200 ${
              hoveredNext ? 'text-white' : 'text-[#6E6E6E]'
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </Command.Dialog>
  );
}

