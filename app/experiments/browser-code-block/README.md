# Browser Code Block | Black Labs

This **Browser Code Block** component allows you to edit code inside a browser-like block and download it as a PNG image. It features a content-editable code editor area with line numbers, a styled window header, and a simple status bar. The component is designed to resemble a browser window, making it a unique and user-friendly tool for displaying and saving code snippets.

## Features

- **Editable Code Block**: The code block is content-editable, allowing you to modify the code directly within the component.
- **PNG Download**: After editing, you can download the code block as a PNG image.
- **Window Styling**: The code editor is styled to resemble a browser window with window controls and a status bar.
- **Customizable Design**: The component is built with Tailwind CSS and can be customized to match different themes.
- **Line Numbers**: The code editor displays line numbers to mimic a real code editing environment.

## How It Works

1. **Editable Code Area**: The main content area of the code block is a content-editable div where users can modify the code.
2. **Download Image**: Once the code is ready, you can download the code block as an image (PNG format) using the "Download" button below the editor.
3. **Clipboard Paste Support**: The component allows you to paste code directly into the code editor area from the clipboard.

## Usage

To use the **Browser Code Block** component in your Next.js project, follow these steps:

1. **Install Dependencies**:
   If you haven't installed the necessary dependencies yet, you can install them by running:

   ```bash
   npm install html-to-image file-saver

2. **Add the Component**: 
Import and use the component within your page:
   ```
   import Component from './browser-code-block';
   
   export default function Page() {
   return <Component />;
   }

3. **Customizing the Code**: The code displayed inside the code editor can be modified directly within the content area, as it is a content-editable field.


4. **Downloading the Image**: Once you are satisfied with the code, simply click the "Download" button to save the code block as a PNG image.


#### Customization

You can customize the appearance of the Browser Code Block by modifying the Tailwind CSS classes used throughout the component. For example, you can change the colors, font sizes, or the structure of the header and status bar.


#### Contributing

We welcome contributions to this project and are excited to see your ideas and improvements!