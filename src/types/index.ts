import React from "react";

export interface MarkdownEditorProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  height?: string;
  theme?: "light" | "dark";
  showPreview?: boolean;
  showToolbar?: boolean;
  toolbarItems?: ToolbarItem[];
  onSave?: (value: string) => void;
  autoSave?: boolean;
  autoSaveInterval?: number;
  syntaxHighlighting?: boolean;
  wordWrap?: boolean;
  lineNumbers?: boolean;
  resizable?: boolean;
}

export interface ToolbarItem {
  type: "button" | "separator" | "dropdown";
  label?: string;
  icon?: React.ReactNode;
  action?: () => void;
  shortcut?: string;
  tooltip?: string;
  items?: ToolbarItem[];
  disabled?: boolean;
}

export interface MarkdownPreviewProps {
  value: string;
  className?: string;
  syntaxHighlighting?: boolean;
  sanitize?: boolean;
}

export interface MarkdownToolbarProps {
  onAction: (action: ToolbarAction, value?: string) => void;
  items?: ToolbarItem[];
  disabled?: boolean;
  theme?: "light" | "dark";
}

export type ToolbarAction =
  | "bold"
  | "italic"
  | "strikethrough"
  | "code"
  | "link"
  | "image"
  | "heading1"
  | "heading2"
  | "heading3"
  | "unordered-list"
  | "ordered-list"
  | "quote"
  | "horizontal-rule"
  | "table"
  | "code-block"
  | "undo"
  | "redo"
  | "fullscreen"
  | "preview";

export interface EditorSettings {
  theme: "light" | "dark";
  fontSize: number;
  wordWrap: boolean;
  lineNumbers: boolean;
  autoSave: boolean;
  autoSaveInterval: number;
  syntaxHighlighting: boolean;
}

export interface MarkdownFile {
  id: string;
  name: string;
  content: string;
  lastModified: Date;
  path?: string;
}

export interface EditorState {
  value: string;
  cursorPosition: number;
  selectionStart: number;
  selectionEnd: number;
  history: string[];
  historyIndex: number;
  isModified: boolean;
}
