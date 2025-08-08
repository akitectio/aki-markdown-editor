import { useState, useEffect, useCallback, useRef } from "react";
import { EditorState, MarkdownFile } from "@/types";

export const useMarkdownEditor = (initialValue: string = "") => {
  const [state, setState] = useState<EditorState>({
    value: initialValue,
    cursorPosition: 0,
    selectionStart: 0,
    selectionEnd: 0,
    history: [initialValue],
    historyIndex: 0,
    isModified: false,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const updateValue = useCallback(
    (newValue: string, addToHistory: boolean = true) => {
      setState((prev: EditorState) => {
        const newHistory = addToHistory
          ? [...prev.history.slice(0, prev.historyIndex + 1), newValue]
          : prev.history;

        return {
          ...prev,
          value: newValue,
          history: newHistory,
          historyIndex: addToHistory
            ? newHistory.length - 1
            : prev.historyIndex,
          isModified: newValue !== initialValue,
        };
      });
    },
    [initialValue]
  );

  const undo = useCallback(() => {
    setState((prev: EditorState) => {
      if (prev.historyIndex > 0) {
        const newIndex = prev.historyIndex - 1;
        return {
          ...prev,
          value: prev.history[newIndex],
          historyIndex: newIndex,
          isModified: prev.history[newIndex] !== initialValue,
        };
      }
      return prev;
    });
  }, [initialValue]);

  const redo = useCallback(() => {
    setState((prev: EditorState) => {
      if (prev.historyIndex < prev.history.length - 1) {
        const newIndex = prev.historyIndex + 1;
        return {
          ...prev,
          value: prev.history[newIndex],
          historyIndex: newIndex,
          isModified: prev.history[newIndex] !== initialValue,
        };
      }
      return prev;
    });
  }, [initialValue]);

  const updateCursorPosition = useCallback(() => {
    if (textareaRef.current) {
      const { selectionStart, selectionEnd } = textareaRef.current;
      setState((prev: EditorState) => ({
        ...prev,
        cursorPosition: selectionStart,
        selectionStart,
        selectionEnd,
      }));
    }
  }, []);

  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  return {
    state,
    updateValue,
    undo,
    redo,
    updateCursorPosition,
    canUndo,
    canRedo,
    textareaRef,
  };
};

export const useAutoSave = (
  value: string,
  onSave: (value: string) => void,
  interval: number = 30000,
  enabled: boolean = true
) => {
  const [lastSaved, setLastSaved] = useState<string>(value);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!enabled || value === lastSaved) return;

    const timeoutId = setTimeout(async () => {
      setIsSaving(true);
      try {
        await onSave(value);
        setLastSaved(value);
      } catch (error) {
        console.error("Auto-save failed:", error);
      } finally {
        setIsSaving(false);
      }
    }, interval);

    return () => clearTimeout(timeoutId);
  }, [value, lastSaved, onSave, interval, enabled]);

  const hasUnsavedChanges = value !== lastSaved;

  return { isSaving, hasUnsavedChanges };
};

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const enterFullscreen = useCallback(async () => {
    if (elementRef.current && "requestFullscreen" in elementRef.current) {
      try {
        await elementRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (error) {
        console.error("Failed to enter fullscreen:", error);
      }
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    if (document.exitFullscreen) {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (error) {
        console.error("Failed to exit fullscreen:", error);
      }
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    elementRef,
  };
};

export const useFileManager = () => {
  const [files, setFiles] = useState<MarkdownFile[]>([]);
  const [currentFileId, setCurrentFileId] = useState<string | null>(null);

  const createFile = useCallback((name: string, content: string = "") => {
    const newFile: MarkdownFile = {
      id: Date.now().toString(),
      name,
      content,
      lastModified: new Date(),
    };
    setFiles((prev: MarkdownFile[]) => [...prev, newFile]);
    setCurrentFileId(newFile.id);
    return newFile;
  }, []);

  const updateFile = useCallback((id: string, content: string) => {
    setFiles((prev: MarkdownFile[]) =>
      prev.map((file: MarkdownFile) =>
        file.id === id ? { ...file, content, lastModified: new Date() } : file
      )
    );
  }, []);

  const deleteFile = useCallback(
    (id: string) => {
      setFiles((prev: MarkdownFile[]) =>
        prev.filter((file: MarkdownFile) => file.id !== id)
      );
      if (currentFileId === id) {
        setCurrentFileId(null);
      }
    },
    [currentFileId]
  );

  const renameFile = useCallback((id: string, newName: string) => {
    setFiles((prev: MarkdownFile[]) =>
      prev.map((file: MarkdownFile) =>
        file.id === id
          ? { ...file, name: newName, lastModified: new Date() }
          : file
      )
    );
  }, []);

  const currentFile = files.find(
    (file: MarkdownFile) => file.id === currentFileId
  );

  return {
    files,
    currentFile,
    currentFileId,
    setCurrentFileId,
    createFile,
    updateFile,
    deleteFile,
    renameFile,
  };
};

export const useKeyboardShortcuts = (handlers: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { ctrlKey, metaKey, shiftKey, altKey, key } = event;
      const modifier = ctrlKey || metaKey;

      // Build shortcut string
      let shortcut = "";
      if (modifier) shortcut += "mod+";
      if (shiftKey) shortcut += "shift+";
      if (altKey) shortcut += "alt+";
      shortcut += key.toLowerCase();

      const handler = handlers[shortcut];
      if (handler) {
        event.preventDefault();
        handler();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handlers]);
};

export const useTheme = (defaultTheme: "light" | "dark" = "light") => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("markdown-editor-theme");
      if (stored === "light" || stored === "dark") {
        return stored;
      }

      // Check system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return defaultTheme;
  });

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("markdown-editor-theme", newTheme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e: MediaQueryListEvent) => {
        // Only update if no theme is explicitly set
        const stored = localStorage.getItem("markdown-editor-theme");
        if (!stored) {
          setTheme(e.matches ? "dark" : "light");
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return { theme, toggleTheme, isDark: theme === "dark" };
};
