# File Tree | Black Labs

This is a **File Tree** component built for navigating directories and files in a web application. It mimics the behavior of a file explorer interface by supporting expandable and collapsible folders. The component can display various files and subdirectories in a nested structure.

## Features

- **Expand/Collapse**: Folders can be expanded or collapsed by clicking them, revealing or hiding their contents.
- **Directory/Files Representation**: Both directories (folders) and files are visually represented, with icons for easy differentiation.
- **Responsive Design**: The component is designed to adapt to different screen sizes.

## Usage

To use this component in your Next.js application, import the `FileTree` component and pass the required data for your file structure:

```tsx
import FileTree from './FileTree';

const fileTreeData = [
  {
    name: 'app',
    type: 'folder',
    children: [
      { name: 'index.tsx', type: 'file' },
      { name: 'utils', type: 'folder', children: [{ name: 'helpers.ts', type: 'file' }] },
    ],
  },
  { name: 'package.json', type: 'file' },
];

<FileTree data={fileTreeData} />;
```

## Customization

You can easily customize the appearance and functionality of the File Tree component by passing different props for structure or applying Tailwind CSS classes for styling.

### Contributing

We welcome contributions to this project and are excited to see your ideas and improvements!
