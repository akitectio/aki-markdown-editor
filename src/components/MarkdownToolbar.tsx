import React from 'react';
import { Button } from '@akitectio/aki-ui';
import { MarkdownToolbarProps, ToolbarAction } from '@/types';

interface ToolbarButtonProps {
    action: ToolbarAction;
    onClick: (action: ToolbarAction) => void;
    disabled?: boolean;
    isActive?: boolean;
    theme?: 'light' | 'dark';
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    action,
    onClick,
    disabled = false,
    isActive = false,
    theme = 'light',
}) => {
    const getButtonContent = (action: ToolbarAction) => {
        switch (action) {
            case 'bold':
                return { text: 'B', title: 'Bold (Ctrl+B)' };
            case 'italic':
                return { text: 'I', title: 'Italic (Ctrl+I)' };
            case 'strikethrough':
                return { text: '~~', title: 'Strikethrough' };
            case 'code':
                return { text: '</>', title: 'Inline Code' };
            case 'link':
                return { text: '🔗', title: 'Link (Ctrl+K)' };
            case 'image':
                return { text: '📷', title: 'Image' };
            case 'heading1':
                return { text: 'H1', title: 'Heading 1' };
            case 'heading2':
                return { text: 'H2', title: 'Heading 2' };
            case 'heading3':
                return { text: 'H3', title: 'Heading 3' };
            case 'unordered-list':
                return { text: '• UL', title: 'Bulleted List' };
            case 'ordered-list':
                return { text: '1. OL', title: 'Numbered List' };
            case 'quote':
                return { text: '❝', title: 'Quote' };
            case 'horizontal-rule':
                return { text: '⎯⎯⎯', title: 'Horizontal Rule' };
            case 'table':
                return { text: '⊞', title: 'Table' };
            case 'code-block':
                return { text: '{ }', title: 'Code Block' };
            case 'undo':
                return { text: '↶', title: 'Undo (Ctrl+Z)' };
            case 'redo':
                return { text: '↷', title: 'Redo (Ctrl+Y)' };
            case 'fullscreen':
                return { text: '⛶', title: 'Toggle Fullscreen' };
            case 'preview':
                return { text: '👁', title: 'Toggle Preview' };
            default:
                return { text: action, title: action };
        }
    };

    const { text, title } = getButtonContent(action);

    // Determine button styling based on theme
    const buttonClasses = `px-3 py-2 min-w-[40px] h-8 font-mono text-sm flex items-center justify-center transition-colors duration-200 ${theme === 'dark'
            ? 'text-white hover:text-gray-200 hover:bg-gray-700'
            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
        }`;

    return (
        <Button
            variant={isActive ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onClick(action)}
            disabled={disabled}
            title={title}
            className={buttonClasses}
        >
            <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                {text}
            </span>
        </Button>
    );
};

const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({
    onAction,
    disabled = false,
    theme = 'light',
}) => {
    const renderToolbarItems = () => {
        const groups: ToolbarAction[][] = [
            ['bold', 'italic', 'strikethrough'],
            ['code', 'link', 'image'],
            ['heading1', 'heading2', 'heading3'],
            ['unordered-list', 'ordered-list', 'quote'],
            ['horizontal-rule', 'table', 'code-block'],
        ];

        return groups.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
                <div className="flex items-center">
                    {group.map((action) => (
                        <ToolbarButton
                            key={action}
                            action={action}
                            onClick={onAction}
                            disabled={disabled}
                            theme={theme}
                        />
                    ))}
                </div>
                {groupIndex < groups.length - 1 && (
                    <div className="separator h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1" />
                )}
            </React.Fragment>
        ));
    };

    return (
        <div className={`markdown-toolbar border-b p-3 ${theme === 'dark'
            ? 'border-gray-700 bg-gray-800'
            : 'border-gray-200 bg-gray-50'
            }`}>
            <div className="flex items-center gap-1 flex-wrap">
                {renderToolbarItems()}
            </div>
        </div>
    );
};

export default MarkdownToolbar;
