"use client"

import React, { useState } from 'react'
import { Folder, File } from 'lucide-react'

interface FileTreeItem {
  name: string
  type: 'file' | 'folder'
  children?: FileTreeItem[]
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

export default function FileTree() {
  return (
    <div className="file-tree-container w-[300px] bg-[#1e1e1e] text-[#d4d4d4] border border-[#333] rounded-md font-mono text-sm">
      <div className="flex items-center justify-between p-2 border-b border-[#333]">
        <span>Select File</span>
      </div>
      <div className="file-tree-content p-2">
        <FileTreeList items={data} />
      </div>
      <style jsx>{`
        .file-tree-container {
          max-height: 400px;
          display: flex;
          flex-direction: column;
        }
        .file-tree-content {
          overflow-y: auto;
          flex-grow: 1;
        }
        .file-tree-content::-webkit-scrollbar {
          width: 8px;
        }
        .file-tree-content::-webkit-scrollbar-track {
          background: #1e1e1e;
        }
        .file-tree-content::-webkit-scrollbar-thumb {
          background-color: #555;
          border-radius: 4px;
        }
        .file-tree-item {
          position: relative;
          overflow: hidden;
        }
        .file-tree-item::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.1);
          opacity: 0;
          transition: opacity 0.2s ease-in-out;
          pointer-events: none;
        }
        .file-tree-item:hover::after {
          opacity: 1;
        }
        .file-tree-item:active::after {
          background-color: rgba(255, 255, 255, 0.2);
        }
        .folder-content {
          overflow: hidden;
          transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
        }
        .folder-content.closed {
          max-height: 0;
          opacity: 0;
        }
        .folder-content.open {
          max-height: 1000px;
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

function FileTreeList({ items }: { items: FileTreeItem[] }) {
  return (
    <ul className="list-none m-0 p-0">
      {items.map((item, index) => (
        <FileTreeItem key={index} item={item} />
      ))}
    </ul>
  )
}

function FileTreeItem({ item }: { item: FileTreeItem }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <li>
      <div
        className={`file-tree-item flex items-center gap-2 px-2 py-1 cursor-pointer ${
          item.type === 'folder' ? 'text-white' : 'text-[#9da5b4]'
        }`}
        onClick={item.type === 'folder' ? toggleOpen : undefined}
      >
        {item.type === 'folder' ? (
          <Folder className="w-4 h-4 text-[#dcb67a]" />
        ) : (
          <File className="w-4 h-4" />
        )}
        <span>{item.name}</span>
      </div>
      {item.type === 'folder' && item.children && (
        <ul className={`folder-content list-none m-0 pl-4 ${isOpen ? 'open' : 'closed'}`}>
          <li className="relative before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-[#333]">
            <FileTreeList items={item.children} />
          </li>
        </ul>
      )}
    </li>
  )
}
