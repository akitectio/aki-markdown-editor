import React from 'react';
import { Button, ButtonGroup, Separator } from '@akitectio/aki-ui';
import { MarkdownToolbarProps, ToolbarAction } from '@/types';

interface ToolbarButtonProps {
    action: ToolbarAction;
    onClick: (action: ToolbarAction) => void;
    disabled?: boolean;
    isActive?: boolean;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    action,
    onClick,
    disabled = false,
    isActive = false,
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
                return { text: '• List', title: 'Bulleted List' };
            case 'ordered-list':
                return { text: '1. List', title: 'Numbered List' };
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

    return (
        <Button
            variant={isActive ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onClick(action)}
            disabled={disabled}
            title={title}
            className="px-2 py-1 min-w-0 font-mono text-sm"
        >
            {text}
        </Button>
    );
};

const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({
    onAction,
    disabled = false,
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
                <ButtonGroup>
                    {group.map((action) => (
                        <ToolbarButton
                            key={action}
                            action={action}
                            onClick={onAction}
                            disabled={disabled}
                        />
                    ))}
                </ButtonGroup>
                {groupIndex < groups.length - 1 && <Separator orientation="vertical" className="h-6" />}
            </React.Fragment>
        ));
    };

    return (
        <div className="markdown-toolbar border-b border-gray-200 p-2 bg-gray-50">
            <div className="flex items-center gap-2 flex-wrap">
                {renderToolbarItems()}
            </div>
        </div>
    );
};

export default MarkdownToolbar;
