import React from 'react';
import { Card } from '@akitectio/aki-ui';
import { MarkdownPreviewProps } from '@/types';

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
    value,
    className = '',
}) => {
    const parseMarkdown = (markdown: string): string => {
        // Basic markdown parsing (will be replaced with marked when deps are available)
        let html = markdown
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')

            // Bold
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/__(.*?)__/gim, '<strong>$1</strong>')

            // Italic
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/_(.*?)_/gim, '<em>$1</em>')

            // Code inline
            .replace(/`(.*?)`/gim, '<code>$1</code>')

            // Links
            .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

            // Images
            .replace(/!\[([^\]]*)\]\(([^)]*)\)/gim, '<img alt="$1" src="$2" />')

            // Line breaks
            .replace(/\n$/gim, '<br />');

        // Code blocks
        html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');

        // Lists
        html = html.replace(/^\* (.+)/gim, '<ul><li>$1</li></ul>');
        html = html.replace(/^\d+\. (.+)/gim, '<ol><li>$1</li></ol>');

        // Blockquotes
        html = html.replace(/^> (.+)/gim, '<blockquote>$1</blockquote>');

        // Horizontal rule
        html = html.replace(/^---$/gim, '<hr />');

        return html;
    };

    const htmlContent = parseMarkdown(value);

    return (
        <Card className={`markdown-preview h-full overflow-auto ${className}`}>
            <div className="p-6">
                <div
                    className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none
                     prose-headings:text-gray-900 prose-p:text-gray-700
                     prose-a:text-blue-600 prose-strong:text-gray-900
                     prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                     prose-pre:bg-gray-900 prose-pre:text-gray-100
                     prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50
                     prose-ul:text-gray-700 prose-ol:text-gray-700
                     prose-li:text-gray-700"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </div>
        </Card>
    );
};

export default MarkdownPreview;
