# Aki Markdown Editor

A modern, feature-rich markdown editor library built with React and Aki UI components. This library provides a complete markdown editing experience with live preview, toolbar actions, keyboard shortcuts, and extensible functionality.

![Aki Markdown Editor Demo](https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Aki+Markdown+Editor)

## Features

- 📝 **Rich Text Editing** - Full-featured markdown editor with syntax support
- 👁️ **Live Preview** - Real-time markdown rendering with syntax highlighting
- 🛠️ **Customizable Toolbar** - Extensive toolbar with common markdown actions
- ⌨️ **Keyboard Shortcuts** - Standard keyboard shortcuts (Ctrl+B, Ctrl+I, etc.)
- 💾 **Auto-save** - Configurable auto-save functionality
- 🌓 **Theme Support** - Light and dark theme support
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ♿ **Accessibility** - Built with accessibility in mind using Aki UI
- 🎨 **Customizable** - Extensive customization options
- 📦 **TypeScript** - Full TypeScript support with type definitions

## Installation

```bash
npm install aki-markdown-editor @akitectio/aki-ui
```

```bash
yarn add aki-markdown-editor @akitectio/aki-ui
```

```bash
pnpm add aki-markdown-editor @akitectio/aki-ui
```

## Basic Usage

```tsx
import React, { useState } from "react";
import { MarkdownEditor } from "aki-markdown-editor";
import "aki-markdown-editor/dist/style.css";

function App() {
  const [markdown, setMarkdown] = useState(
    "# Hello World\n\nStart typing your markdown here..."
  );

  return (
    <div className="container mx-auto p-4">
      <MarkdownEditor
        value={markdown}
        onChange={setMarkdown}
        height="500px"
        showPreview={true}
        showToolbar={true}
        placeholder="Start writing your markdown..."
      />
    </div>
  );
}

export default App;
```

## Advanced Usage

### With Auto-save

```tsx
import React, { useState } from "react";
import { MarkdownEditor } from "aki-markdown-editor";

function AdvancedEditor() {
  const [content, setContent] = useState("");

  const handleSave = async (value: string) => {
    // Save to your backend
    await fetch("/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: value }),
    });
  };

  return (
    <MarkdownEditor
      value={content}
      onChange={setContent}
      onSave={handleSave}
      autoSave={true}
      autoSaveInterval={10000} // Save every 10 seconds
      height="600px"
      theme="dark"
      syntaxHighlighting={true}
    />
  );
}
```

### Custom Toolbar

```tsx
import React from "react";
import { MarkdownEditor, ToolbarItem } from "aki-markdown-editor";

const customToolbarItems: ToolbarItem[] = [
  { type: "button", action: "bold", label: "Bold" },
  { type: "button", action: "italic", label: "Italic" },
  { type: "separator" },
  { type: "button", action: "link", label: "Link" },
  { type: "button", action: "image", label: "Image" },
];

function CustomToolbarEditor() {
  return (
    <MarkdownEditor
      toolbarItems={customToolbarItems}
      defaultValue="# Custom Toolbar Example"
    />
  );
}
```

### Using Individual Components

```tsx
import React, { useState } from "react";
import {
  MarkdownPreview,
  MarkdownToolbar,
  useMarkdownEditor,
} from "aki-markdown-editor";

function CustomEditor() {
  const [content, setContent] = useState("# Custom Implementation");
  const { applyAction } = useMarkdownEditor(content);

  return (
    <div className="flex h-96">
      <div className="flex-1">
        <MarkdownToolbar onAction={(action) => applyAction(action)} />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full p-4 border-0 resize-none font-mono"
        />
      </div>
      <div className="flex-1 border-l">
        <MarkdownPreview value={content} />
      </div>
    </div>
  );
}
```

## API Reference

### MarkdownEditor Props

| Prop                 | Type                      | Default             | Description                          |
| -------------------- | ------------------------- | ------------------- | ------------------------------------ |
| `value`              | `string`                  | `undefined`         | Controlled value                     |
| `defaultValue`       | `string`                  | `''`                | Default value for uncontrolled usage |
| `onChange`           | `(value: string) => void` | `undefined`         | Change handler                       |
| `placeholder`        | `string`                  | `'Start typing...'` | Placeholder text                     |
| `readOnly`           | `boolean`                 | `false`             | Read-only mode                       |
| `className`          | `string`                  | `''`                | Additional CSS classes               |
| `height`             | `string`                  | `'400px'`           | Editor height                        |
| `theme`              | `'light' \| 'dark'`       | `'light'`           | Theme                                |
| `showPreview`        | `boolean`                 | `true`              | Show preview tab                     |
| `showToolbar`        | `boolean`                 | `true`              | Show toolbar                         |
| `toolbarItems`       | `ToolbarItem[]`           | default items       | Custom toolbar items                 |
| `onSave`             | `(value: string) => void` | `undefined`         | Save handler                         |
| `autoSave`           | `boolean`                 | `false`             | Enable auto-save                     |
| `autoSaveInterval`   | `number`                  | `30000`             | Auto-save interval (ms)              |
| `syntaxHighlighting` | `boolean`                 | `true`              | Enable syntax highlighting           |
| `wordWrap`           | `boolean`                 | `true`              | Enable word wrapping                 |
| `lineNumbers`        | `boolean`                 | `false`             | Show line numbers                    |

### MarkdownPreview Props

| Prop                 | Type      | Default      | Description                |
| -------------------- | --------- | ------------ | -------------------------- |
| `value`              | `string`  | **required** | Markdown content to render |
| `className`          | `string`  | `''`         | Additional CSS classes     |
| `syntaxHighlighting` | `boolean` | `true`       | Enable syntax highlighting |
| `sanitize`           | `boolean` | `true`       | Sanitize HTML output       |

### MarkdownToolbar Props

| Prop       | Type                              | Default       | Description         |
| ---------- | --------------------------------- | ------------- | ------------------- |
| `onAction` | `(action: ToolbarAction) => void` | **required**  | Action handler      |
| `items`    | `ToolbarItem[]`                   | default items | Toolbar items       |
| `disabled` | `boolean`                         | `false`       | Disable all buttons |

## Hooks

### useMarkdownEditor

```tsx
const { state, updateValue, undo, redo, canUndo, canRedo, textareaRef } =
  useMarkdownEditor(initialValue);
```

### useAutoSave

```tsx
const { isSaving, hasUnsavedChanges } = useAutoSave(
  value,
  onSave,
  interval,
  enabled
);
```

### useFullscreen

```tsx
const {
  isFullscreen,
  enterFullscreen,
  exitFullscreen,
  toggleFullscreen,
  elementRef,
} = useFullscreen();
```

### useTheme

```tsx
const { theme, toggleTheme, isDark } = useTheme("light");
```

## Toolbar Actions

The following toolbar actions are available:

- `bold` - Make text bold
- `italic` - Make text italic
- `strikethrough` - Strikethrough text
- `code` - Inline code
- `link` - Insert link
- `image` - Insert image
- `heading1` - Heading 1
- `heading2` - Heading 2
- `heading3` - Heading 3
- `unordered-list` - Bullet list
- `ordered-list` - Numbered list
- `quote` - Blockquote
- `horizontal-rule` - Horizontal rule
- `table` - Insert table
- `code-block` - Code block
- `undo` - Undo
- `redo` - Redo
- `fullscreen` - Toggle fullscreen
- `preview` - Toggle preview

## Keyboard Shortcuts

| Shortcut                       | Action |
| ------------------------------ | ------ |
| `Ctrl+B` / `Cmd+B`             | Bold   |
| `Ctrl+I` / `Cmd+I`             | Italic |
| `Ctrl+K` / `Cmd+K`             | Link   |
| `Ctrl+Z` / `Cmd+Z`             | Undo   |
| `Ctrl+Y` / `Cmd+Y`             | Redo   |
| `Ctrl+Shift+Z` / `Cmd+Shift+Z` | Redo   |

## Styling

The editor comes with default styles, but you can customize it using CSS:

```css
/* Custom editor styles */
.markdown-editor {
  border: 2px solid #e2e8f0;
  border-radius: 8px;
}

.markdown-editor.dark {
  background-color: #1a202c;
  color: #e2e8f0;
}

.markdown-toolbar {
  background-color: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
}

.markdown-preview {
  background-color: #ffffff;
}
```

## Integration with Aki UI

This editor is built on top of Aki UI components, ensuring consistent design and accessibility. Make sure to install and set up Aki UI in your project:

```tsx
import { AkiUIProvider } from "@akitectio/aki-ui";

function App() {
  return (
    <AkiUIProvider theme="modern">
      <MarkdownEditor />
    </AkiUIProvider>
  );
}
```

## TypeScript Support

Full TypeScript support is included with comprehensive type definitions:

```tsx
import type {
  MarkdownEditorProps,
  ToolbarAction,
  EditorState,
} from "aki-markdown-editor";
```

## Examples

Check out the `/examples` directory for complete implementation examples:

- Basic usage
- Auto-save functionality
- Custom toolbar
- Theme switching
- File management
- Integration with popular frameworks

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Aki Ecosystem](https://github.com/akitectio)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## Support

- 📖 [Documentation](https://akitectio.github.io/aki-markdown-editor)
- 🐛 [Issue Tracker](https://github.com/akitectio/aki-markdown-editor/issues)
- 💬 [Discussions](https://github.com/akitectio/aki-markdown-editor/discussions)
- 📧 [Email Support](mailto:support@akitect.io)
