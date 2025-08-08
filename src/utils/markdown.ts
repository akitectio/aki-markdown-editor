// Import statements will be enabled when dependencies are available
// import { marked } from 'marked';
// import DOMPurify from 'dompurify';
// import hljs from 'highlight.js';

// Configure marked with syntax highlighting
// marked.setOptions({
//   highlight: (code: string, lang: string) => {
//     if (lang && hljs.getLanguage(lang)) {
//       try {
//         return hljs.highlight(code, { language: lang }).value;
//       } catch (err) {
//         console.error('Syntax highlighting error:', err);
//       }
//     }
//     return hljs.highlightAuto(code).value;
//   },
//   gfm: true,
//   breaks: true,
// });

export const parseMarkdown = (
  markdown: string,
  sanitize: boolean = true
): string => {
  // const html = marked(markdown) as string;
  // return sanitize ? DOMPurify.sanitize(html) : html;

  // Simplified markdown parsing for now
  let html = markdown
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*)\*/gim, "<em>$1</em>")
    .replace(/`(.*?)`/gim, "<code>$1</code>")
    .replace(
      /\[([^\]]*)\]\(([^)]*)\)/gim,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    .replace(/!\[([^\]]*)\]\(([^)]*)\)/gim, '<img alt="$1" src="$2" />')
    .replace(/\n$/gim, "<br />");

  return sanitize ? html : html;
};

export const insertTextAtCursor = (
  textarea: HTMLTextAreaElement,
  text: string,
  selectInserted: boolean = false
): void => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;

  const before = value.substring(0, start);
  const after = value.substring(end);

  textarea.value = before + text + after;

  if (selectInserted) {
    textarea.setSelectionRange(start, start + text.length);
  } else {
    textarea.setSelectionRange(start + text.length, start + text.length);
  }

  textarea.focus();
};

export const wrapSelectedText = (
  textarea: HTMLTextAreaElement,
  prefix: string,
  suffix: string = prefix
): void => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const selectedText = value.substring(start, end);

  if (selectedText) {
    const wrapped = `${prefix}${selectedText}${suffix}`;
    insertTextAtCursor(textarea, wrapped, true);
  } else {
    insertTextAtCursor(textarea, `${prefix}${suffix}`, false);
    textarea.setSelectionRange(start + prefix.length, start + prefix.length);
  }
};

export const insertLink = (
  textarea: HTMLTextAreaElement,
  url: string = "",
  text: string = ""
): void => {
  const linkText = text || "link text";
  const linkUrl = url || "https://";
  const markdown = `[${linkText}](${linkUrl})`;

  insertTextAtCursor(textarea, markdown, true);
};

export const insertImage = (
  textarea: HTMLTextAreaElement,
  url: string = "",
  alt: string = ""
): void => {
  const altText = alt || "image";
  const imageUrl = url || "https://";
  const markdown = `![${altText}](${imageUrl})`;

  insertTextAtCursor(textarea, markdown, true);
};

export const insertTable = (
  textarea: HTMLTextAreaElement,
  rows: number = 3,
  cols: number = 3
): void => {
  let table = "\n";

  // Header row
  table += "|";
  for (let i = 0; i < cols; i++) {
    table += ` Header ${i + 1} |`;
  }
  table += "\n";

  // Separator row
  table += "|";
  for (let i = 0; i < cols; i++) {
    table += " --- |";
  }
  table += "\n";

  // Data rows
  for (let i = 0; i < rows - 1; i++) {
    table += "|";
    for (let j = 0; j < cols; j++) {
      table += ` Cell ${i + 1}-${j + 1} |`;
    }
    table += "\n";
  }

  insertTextAtCursor(textarea, table);
};

export const insertCodeBlock = (
  textarea: HTMLTextAreaElement,
  language: string = ""
): void => {
  const code = `\`\`\`${language}\n// Your code here\n\`\`\`\n`;
  insertTextAtCursor(textarea, code);
};

export const insertHeading = (
  textarea: HTMLTextAreaElement,
  level: number
): void => {
  const prefix = "#".repeat(Math.max(1, Math.min(6, level))) + " ";

  const start = textarea.selectionStart;
  const value = textarea.value;

  // Find the start of the current line
  let lineStart = start;
  while (lineStart > 0 && value[lineStart - 1] !== "\n") {
    lineStart--;
  }

  // Check if the line already has a heading
  const lineEnd = value.indexOf("\n", start);
  const currentLine = value.substring(
    lineStart,
    lineEnd === -1 ? value.length : lineEnd
  );
  const headingMatch = currentLine.match(/^(#{1,6})\s/);

  if (headingMatch) {
    // Replace existing heading
    const newLine = currentLine.replace(/^#{1,6}\s/, prefix);
    textarea.setSelectionRange(
      lineStart,
      lineEnd === -1 ? value.length : lineEnd
    );
    insertTextAtCursor(textarea, newLine, false);
  } else {
    // Add heading to current line
    textarea.setSelectionRange(lineStart, lineStart);
    insertTextAtCursor(textarea, prefix, false);
  }
};

export const toggleList = (
  textarea: HTMLTextAreaElement,
  ordered: boolean = false
): void => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;

  // Find the selected lines
  let lineStart = start;
  while (lineStart > 0 && value[lineStart - 1] !== "\n") {
    lineStart--;
  }

  let lineEnd = end;
  while (lineEnd < value.length && value[lineEnd] !== "\n") {
    lineEnd++;
  }

  const selectedLines = value.substring(lineStart, lineEnd).split("\n");

  const modifiedLines = selectedLines.map((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine === "") return line;

    // Check if line is already a list item
    const isOrderedList = /^\d+\.\s/.test(trimmedLine);
    const isUnorderedList = /^[-*+]\s/.test(trimmedLine);

    if (ordered) {
      if (isOrderedList) {
        // Remove ordered list formatting
        return line.replace(/^\s*\d+\.\s/, "");
      } else if (isUnorderedList) {
        // Convert unordered to ordered
        return line.replace(/^\s*[-*+]\s/, `${index + 1}. `);
      } else {
        // Add ordered list formatting
        return `${index + 1}. ${trimmedLine}`;
      }
    } else {
      if (isUnorderedList) {
        // Remove unordered list formatting
        return line.replace(/^\s*[-*+]\s/, "");
      } else if (isOrderedList) {
        // Convert ordered to unordered
        return line.replace(/^\s*\d+\.\s/, "- ");
      } else {
        // Add unordered list formatting
        return `- ${trimmedLine}`;
      }
    }
  });

  textarea.setSelectionRange(lineStart, lineEnd);
  insertTextAtCursor(textarea, modifiedLines.join("\n"), true);
};

export const insertQuote = (textarea: HTMLTextAreaElement): void => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;

  if (start === end) {
    insertTextAtCursor(textarea, "> ");
  } else {
    const selectedText = value.substring(start, end);
    const quotedText = selectedText
      .split("\n")
      .map((line) => `> ${line}`)
      .join("\n");
    insertTextAtCursor(textarea, quotedText, true);
  }
};

export const insertHorizontalRule = (textarea: HTMLTextAreaElement): void => {
  insertTextAtCursor(textarea, "\n---\n");
};

// File handling utilities
export const downloadMarkdown = (
  content: string,
  filename: string = "document.md"
): void => {
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
};
