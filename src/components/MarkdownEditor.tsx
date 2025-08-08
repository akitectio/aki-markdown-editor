import React, { useCallback, useEffect, useRef } from 'react';
import { Card, Tabs, Button, Textarea } from '@akitectio/aki-ui';
import { MarkdownEditorProps, ToolbarAction } from '@/types';
import { useMarkdownEditor, useAutoSave, useKeyboardShortcuts } from '@/hooks';
import MarkdownToolbar from './MarkdownToolbar';
import MarkdownPreview from './MarkdownPreview';

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
    value,
    defaultValue = '',
    onChange,
    placeholder = 'Start typing your markdown...',
    readOnly = false,
    className = '',
    height = '400px',
    theme = 'light',
    showPreview = true,
    showToolbar = true,
    onSave,
    autoSave = false,
    autoSaveInterval = 30000,
    syntaxHighlighting = true,
    wordWrap = true,
    resizable = true,
}) => {
    const {
        state,
        updateValue,
        undo,
        redo,
        updateCursorPosition,
        textareaRef,
    } = useMarkdownEditor(value || defaultValue);

    // Auto-save functionality
    useAutoSave(
        state.value,
        onSave || (() => { }),
        autoSaveInterval,
        autoSave && !!onSave
    );

    // Handle external value changes
    useEffect(() => {
        if (value !== undefined && value !== state.value) {
            updateValue(value, false);
        }
    }, [value, updateValue]);

    // Notify parent of changes only when state changes internally
    const prevStateValueRef = useRef(state.value);
    useEffect(() => {
        if (onChange && state.value !== prevStateValueRef.current) {
            prevStateValueRef.current = state.value;
            // Only call onChange if the change didn't come from external value prop
            if (value === undefined || state.value !== value) {
                onChange(state.value);
            }
        }
    }, [state.value, onChange, value]);

    const handleTextareaChange = useCallback((newValue: string) => {
        updateValue(newValue);
    }, [updateValue]);

    const applyMarkdownAction = useCallback((action: ToolbarAction) => {
        if (!textareaRef.current) return;

        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);

        let newText = '';
        let selectionStart = start;
        let selectionEnd = end;

        switch (action) {
            case 'bold':
                if (selectedText) {
                    newText = `**${selectedText}**`;
                    selectionStart = start;
                    selectionEnd = start + newText.length;
                } else {
                    newText = '**bold text**';
                    selectionStart = start + 2;
                    selectionEnd = start + 11;
                }
                break;

            case 'italic':
                if (selectedText) {
                    newText = `*${selectedText}*`;
                    selectionStart = start;
                    selectionEnd = start + newText.length;
                } else {
                    newText = '*italic text*';
                    selectionStart = start + 1;
                    selectionEnd = start + 12;
                }
                break;

            case 'strikethrough':
                if (selectedText) {
                    newText = `~~${selectedText}~~`;
                    selectionStart = start;
                    selectionEnd = start + newText.length;
                } else {
                    newText = '~~strikethrough~~';
                    selectionStart = start + 2;
                    selectionEnd = start + 15;
                }
                break;

            case 'code':
                if (selectedText) {
                    newText = `\`${selectedText}\``;
                    selectionStart = start;
                    selectionEnd = start + newText.length;
                } else {
                    newText = '`code`';
                    selectionStart = start + 1;
                    selectionEnd = start + 5;
                }
                break;

            case 'link':
                if (selectedText) {
                    newText = `[${selectedText}](url)`;
                    selectionStart = start + selectedText.length + 3;
                    selectionEnd = start + selectedText.length + 6;
                } else {
                    newText = '[link text](url)';
                    selectionStart = start + 1;
                    selectionEnd = start + 10;
                }
                break;

            case 'image':
                if (selectedText) {
                    newText = `![${selectedText}](url)`;
                    selectionStart = start + selectedText.length + 4;
                    selectionEnd = start + selectedText.length + 7;
                } else {
                    newText = '![alt text](url)';
                    selectionStart = start + 2;
                    selectionEnd = start + 10;
                }
                break;

            case 'heading1':
                newText = `# ${selectedText || 'Heading 1'}`;
                selectionStart = start + 2;
                selectionEnd = start + newText.length;
                break;

            case 'heading2':
                newText = `## ${selectedText || 'Heading 2'}`;
                selectionStart = start + 3;
                selectionEnd = start + newText.length;
                break;

            case 'heading3':
                newText = `### ${selectedText || 'Heading 3'}`;
                selectionStart = start + 4;
                selectionEnd = start + newText.length;
                break;

            case 'unordered-list':
                newText = `- ${selectedText || 'List item'}`;
                selectionStart = start + 2;
                selectionEnd = start + newText.length;
                break;

            case 'ordered-list':
                newText = `1. ${selectedText || 'List item'}`;
                selectionStart = start + 3;
                selectionEnd = start + newText.length;
                break;

            case 'quote':
                newText = `> ${selectedText || 'Quote'}`;
                selectionStart = start + 2;
                selectionEnd = start + newText.length;
                break;

            case 'horizontal-rule':
                newText = '\n---\n';
                selectionStart = start + newText.length;
                selectionEnd = selectionStart;
                break;

            case 'table':
                newText = `\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n`;
                selectionStart = start + 3;
                selectionEnd = start + 11;
                break;

            case 'code-block':
                newText = selectedText
                    ? `\`\`\`\n${selectedText}\n\`\`\``
                    : '```\nYour code here\n```';
                selectionStart = start + 4;
                selectionEnd = start + (selectedText ? selectedText.length + 4 : 18);
                break;

            case 'undo':
                undo();
                return;

            case 'redo':
                redo();
                return;

            default:
                return;
        }

        // Replace selected text
        const currentValue = textarea.value;
        const newValue = currentValue.substring(0, start) + newText + currentValue.substring(end);

        updateValue(newValue);

        // Update cursor position after React updates
        setTimeout(() => {
            textarea.setSelectionRange(selectionStart, selectionEnd);
            textarea.focus();
        }, 0);
    }, [undo, redo, updateValue]);

    // Keyboard shortcuts
    useKeyboardShortcuts({
        'mod+b': () => applyMarkdownAction('bold'),
        'mod+i': () => applyMarkdownAction('italic'),
        'mod+k': () => applyMarkdownAction('link'),
        'mod+z': () => applyMarkdownAction('undo'),
        'mod+y': () => applyMarkdownAction('redo'),
        'mod+shift+z': () => applyMarkdownAction('redo'),
    });

    const [activeTab, setActiveTab] = React.useState<'write' | 'preview'>('write');

    return (
        <div className={`markdown-editor ${theme === 'dark' ? 'dark' : ''} ${className}`}>
            <Card className="h-full flex flex-col">
                {showToolbar && (
                    <MarkdownToolbar
                        onAction={applyMarkdownAction}
                        disabled={readOnly}
                        theme={theme}
                    />
                )}

                {showPreview ? (
                    <Tabs value={activeTab} onValueChange={setActiveTab as any}>
                        <div className="flex justify-between items-center px-4 py-2 border-b">
                            <div className="flex">
                                <Button
                                    variant={activeTab === 'write' ? 'primary' : 'secondary'}
                                    size="sm"
                                    onClick={() => setActiveTab('write')}
                                    className="mr-2"
                                >
                                    Write
                                </Button>
                                <Button
                                    variant={activeTab === 'preview' ? 'primary' : 'secondary'}
                                    size="sm"
                                    onClick={() => setActiveTab('preview')}
                                >
                                    Preview
                                </Button>
                            </div>

                            {state.isModified && (
                                <div className="text-sm text-gray-500">
                                    Unsaved changes
                                </div>
                            )}
                        </div>

                        <div className="flex-1 overflow-hidden">
                            {activeTab === 'write' ? (
                                <div className="h-full p-4">
                                    <Textarea
                                        ref={textareaRef}
                                        value={state.value}
                                        onChange={handleTextareaChange}
                                        placeholder={placeholder}
                                        disabled={readOnly}
                                        className={`w-full h-full ${resizable ? 'resize-both' : 'resize-none'} border-0 focus:outline-none ${wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'
                                            } font-mono text-sm`}
                                        style={{ height: height }}
                                        onSelect={updateCursorPosition}
                                    />
                                </div>
                            ) : (
                                <MarkdownPreview
                                    value={state.value}
                                    syntaxHighlighting={syntaxHighlighting}
                                    className="h-full"
                                />
                            )}
                        </div>
                    </Tabs>
                ) : (
                    <div className="flex-1 p-4">
                        <Textarea
                            ref={textareaRef}
                            value={state.value}
                            onChange={handleTextareaChange}
                            placeholder={placeholder}
                            disabled={readOnly}
                            className={`w-full h-full ${resizable ? 'resize-both' : 'resize-none'} border-0 focus:outline-none ${wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'
                                } font-mono text-sm`}
                            style={{ height: height }}
                            onSelect={updateCursorPosition}
                        />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default MarkdownEditor;
