import React, { Suspense, useState } from 'react';
import { FolderOpen, FolderClosed, File } from 'lucide-react';
import './style.css';

interface FileTreeItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileTreeItem[];
}

const data: FileTreeItem[] = [
  {
    name: 'app',
    type: 'folder',
    children: [
      { 
        name: '.well-known', 
        type: 'folder',
        children: [
          { name: 'apple-app-site-association', type: 'file' },
          { name: 'assetlinks.json', type: 'file' },
        ]
      },
      { 
        name: 'blog', 
        type: 'folder',
        children: [
          { name: 'page.tsx', type: 'file' },
          { 
            name: '[slug]', 
            type: 'folder',
            children: [
              { name: 'page.tsx', type: 'file' },
              { name: 'opengraph-image.tsx', type: 'file' },
            ]
          },
        ]
      },
      { 
        name: 'components', 
        type: 'folder',
        children: [
          { name: 'header.tsx', type: 'file' },
          { name: 'footer.tsx', type: 'file' },
          { 
            name: 'ui', 
            type: 'folder',
            children: [
              { name: 'button.tsx', type: 'file' },
              { name: 'input.tsx', type: 'file' },
            ]
          },
        ]
      },
      {
        name: 'og',
        type: 'folder',
        children: [{ name: 'route.tsx', type: 'file' }],
      },
      { name: 'rss', type: 'folder' },
      { name: 'work', type: 'folder' },
      { name: 'favicon.ico', type: 'file' },
      { name: 'global.css', type: 'file' },
      { name: 'layout.tsx', type: 'file' },
    ],
  },
  {
    name: 'public',
    type: 'folder',
    children: [
      { name: 'images', type: 'folder' },
      { name: 'fonts', type: 'folder' },
    ],
  },
  { name: 'package.json', type: 'file' },
  { name: 'tsconfig.json', type: 'file' },
  { name: 'next.config.js', type: 'file' },
]

export default function Component() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="file-tree-container w-[300px] bg-[#1e1e1e] text-[#d4d4d4] border border-[#333] rounded-md font-mono text-sm justify-center flex min-h-100vh">
        <div className="flex items-center justify-center p-2 border-b border-[#333]">
          <span>Select File</span>
        </div>
        <div className="file-tree-content p-2">
          <FileTreeList items={data} />
        </div>
      </div>
    </div>
  );
}

function FileTreeList({ items }: { items: FileTreeItem[] }) {
  return (
    <ul className="list-none m-0 p-0">
      {items.map((item, index) => (
        <FileTreeItem key={index} item={item} />
      ))}
    </ul>
  );
}

function FileTreeItem({ item }: { item: FileTreeItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <li>
      <div
        className={`file-tree-item flex items-center gap-2 px-2 py-1 cursor-pointer ${
          item.type === 'folder' ? 'text-white' : 'text-[#9da5b4]'
        }`}
        onClick={item.type === 'folder' ? toggleOpen : undefined}
      >
        {item.type === 'folder' ? (
          isOpen ? (
            <FolderOpen className="w-4 h-4 text-[#dcb67a]" />
          ) : (
            <FolderClosed className="w-4 h-4 text-[#dcb67a]" />
          )
        ) : (
          <File className="w-4 h-4" />
        )}
        <span>{item.name}</span>
      </div>
      {item.type === 'folder' && item.children && (
        <ul
          className={`folder-content list-none m-0 pl-4 ${isOpen ? 'open' : 'closed'}`}
        >
          <li className="relative before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-[#333]">
            <Suspense fallback={<FileTreeSkeleton />}>
              <FileTreeList items={item.children} />
            </Suspense>
          </li>
        </ul>
      )}
    </li>
  );
}

const FileTreeSkeleton = () => {
  return (
    <div className="space-y-2">
      {/* Folder Item Skeleton */}
      <div className="flex items-center gap-2 animate-pulse">
        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
        <div className="w-3/4 h-4 bg-gray-400 rounded"></div>
      </div>
      {/* Nested Folder Items Skeleton */}
      <div className="space-y-2 pl-6">
        <div className="flex items-center gap-2 animate-pulse">
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          <div className="w-3/4 h-4 bg-gray-400 rounded"></div>
        </div>
        <div className="flex items-center gap-2 animate-pulse">
          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          <div className="w-3/4 h-4 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  );
};