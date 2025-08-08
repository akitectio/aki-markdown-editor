import React, { useState } from 'react';
import { MarkdownEditor, MarkdownPreview } from '../src';

const EXAMPLE_MARKDOWN = `# Aki Markdown Editor Demo

Welcome to the **Aki Markdown Editor**! This is a modern, feature-rich markdown editor built with React and Aki UI.

## Features

- ✨ **Live Preview** - See your markdown rendered in real-time
- 🛠️ **Rich Toolbar** - All the tools you need for markdown editing
- ⌨️ **Keyboard Shortcuts** - Work efficiently with common shortcuts
- 🎨 **Themes** - Light and dark theme support
- 💾 **Auto-save** - Never lose your work again

## Basic Syntax Examples

### Text Formatting

You can make text *italic* or **bold**, or even ***both***.

You can also use ~~strikethrough~~ text and \`inline code\`.

### Lists

Unordered list:
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

Ordered list:
1. First item
2. Second item
3. Third item

### Links and Images

[Visit Akitect.io](https://akitect.io)

![Placeholder Image](https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Sample+Image)

### Code Blocks

\`\`\`javascript
function hello() {
  console.log('Hello from Aki Markdown Editor!');
}

hello();
\`\`\`

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
\`\`\`

### Blockquotes

> "The best way to predict the future is to create it."
> 
> — Peter Drucker

### Tables

| Feature | Status | Priority |
|---------|--------|----------|
| Live Preview | ✅ Done | High |
| Auto-save | ✅ Done | Medium |
| Themes | ✅ Done | Low |
| Export | 🚧 In Progress | Medium |

### Horizontal Rule

---

## Try It Out!

Start editing this text to see the live preview in action. Use the toolbar buttons or keyboard shortcuts to format your text.

**Keyboard Shortcuts:**
- \`Ctrl+B\` / \`Cmd+B\` - Bold
- \`Ctrl+I\` / \`Cmd+I\` - Italic  
- \`Ctrl+K\` / \`Cmd+K\` - Link
- \`Ctrl+Z\` / \`Cmd+Z\` - Undo
- \`Ctrl+Y\` / \`Cmd+Y\` - Redo

Enjoy writing with Aki Markdown Editor! 🚀`;

const ExampleApp: React.FC = () => {
    const [content, setContent] = useState(EXAMPLE_MARKDOWN);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [showPreview, setShowPreview] = useState(true);
    const [autoSave, setAutoSave] = useState(false);

    const handleSave = async (value: string) => {
        console.log('Saving content:', value.slice(0, 100) + '...');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const handleExport = () => {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'document.md';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8">
                    <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Aki Markdown Editor
                    </h1>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        A modern, feature-rich markdown editor built with React and Aki UI
                    </p>
                </header>

                <div className="mb-6 flex flex-wrap gap-4">
                    <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className={`px-4 py-2 rounded-lg border ${theme === 'dark'
                                ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700'
                                : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Theme
                    </button>

                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className={`px-4 py-2 rounded-lg border ${theme === 'dark'
                                ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700'
                                : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {showPreview ? '📝 Editor Only' : '👁️ Show Preview'}
                    </button>

                    <button
                        onClick={() => setAutoSave(!autoSave)}
                        className={`px-4 py-2 rounded-lg border ${autoSave
                                ? theme === 'dark'
                                    ? 'bg-green-800 text-white border-green-600'
                                    : 'bg-green-100 text-green-900 border-green-300'
                                : theme === 'dark'
                                    ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700'
                                    : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        💾 Auto-save {autoSave ? 'ON' : 'OFF'}
                    </button>

                    <button
                        onClick={handleExport}
                        className={`px-4 py-2 rounded-lg border ${theme === 'dark'
                                ? 'bg-blue-800 text-white border-blue-600 hover:bg-blue-700'
                                : 'bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200'
                            }`}
                    >
                        📥 Export MD
                    </button>
                </div>

                <div className="mb-8">
                    <MarkdownEditor
                        value={content}
                        onChange={setContent}
                        onSave={autoSave ? handleSave : undefined}
                        autoSave={autoSave}
                        autoSaveInterval={5000}
                        height="600px"
                        theme={theme}
                        showPreview={showPreview}
                        showToolbar={true}
                        syntaxHighlighting={true}
                        wordWrap={true}
                        placeholder="Start writing your markdown here..."
                        className="shadow-lg"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Standalone Preview
                        </h2>
                        <MarkdownPreview
                            value={content}
                            syntaxHighlighting={true}
                            className="max-h-96 overflow-auto shadow-lg"
                        />
                    </div>

                    <div>
                        <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Raw Markdown
                        </h2>
                        <pre className={`p-4 rounded-lg max-h-96 overflow-auto text-sm font-mono shadow-lg ${theme === 'dark'
                                ? 'bg-gray-800 text-gray-200'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                            {content}
                        </pre>
                    </div>
                </div>

                <footer className={`mt-16 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p>
                        Built with ❤️ using{' '}
                        <a
                            href="https://github.com/akitectio/aki-ui"
                            className="text-blue-500 hover:text-blue-600"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Aki UI
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default ExampleApp;
