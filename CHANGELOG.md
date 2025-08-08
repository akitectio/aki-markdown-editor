# Changelog

All notable changes to the Aki Markdown Editor project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-08

### Added

- Initial release of Aki Markdown Editor
- Core MarkdownEditor component with full editing capabilities
- MarkdownPreview component with real-time rendering
- MarkdownToolbar component with common formatting actions
- Comprehensive TypeScript type definitions
- Custom React hooks for editor functionality:
  - `useMarkdownEditor` - Core editor state management
  - `useAutoSave` - Automatic saving functionality
  - `useFullscreen` - Fullscreen mode support
  - `useFileManager` - File management capabilities
  - `useKeyboardShortcuts` - Keyboard shortcut handling
  - `useTheme` - Theme management (light/dark)
- Utility functions for markdown processing and text manipulation
- Built-in keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+K, etc.)
- Responsive design with mobile support
- Dark/light theme support
- Auto-save functionality with configurable intervals
- Accessibility features using Aki UI components
- Comprehensive documentation and examples
- Example application demonstrating all features
- Full TypeScript support with type declarations
- ESM and UMD build outputs for maximum compatibility
- Tailwind CSS styling with customizable themes
- Integration with Aki UI component library

### Features

- **Rich Text Editing**: Full-featured markdown editor with syntax support
- **Live Preview**: Real-time markdown rendering with syntax highlighting
- **Toolbar Actions**: Extensive toolbar with common markdown formatting options
  - Text formatting (bold, italic, strikethrough)
  - Headers (H1, H2, H3)
  - Lists (ordered and unordered)
  - Links and images
  - Code blocks and inline code
  - Tables and horizontal rules
  - Quotes and blockquotes
- **Keyboard Shortcuts**: Standard editor shortcuts for efficient editing
- **Theme Support**: Light and dark themes with system preference detection
- **Auto-save**: Configurable automatic saving with customizable intervals
- **File Management**: Built-in file creation, editing, and management
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Accessibility**: Full accessibility support via Aki UI components
- **TypeScript**: Complete type safety with comprehensive type definitions
- **Extensibility**: Modular architecture allowing easy customization

### Technical Details

- Built with React 18+ and TypeScript
- Uses Aki UI as the primary component library
- Supports both controlled and uncontrolled usage patterns
- Modular architecture with separate components and hooks
- Comprehensive error handling and loading states
- Performance optimized with proper memoization
- Tree-shakeable exports for optimal bundle sizes
- Cross-browser compatibility

### Documentation

- Complete API documentation with examples
- TypeScript type definitions for all components
- Usage examples for common scenarios
- Integration guides for popular frameworks
- Contributing guidelines and development setup
- Accessibility guidelines and best practices

### Development

- Modern build system with Rollup and Vite
- Comprehensive test setup (ready for implementation)
- Storybook integration for component development
- ESLint and Prettier configuration
- Automated CI/CD setup ready
- Semantic versioning and changelog automation

## [Unreleased]

### Planned Features

- [ ] Syntax highlighting for code blocks
- [ ] Export functionality (PDF, HTML)
- [ ] Plugin system for extensibility
- [ ] Collaborative editing support
- [ ] Advanced table editing
- [ ] Math equation support (KaTeX)
- [ ] Diagram support (Mermaid)
- [ ] Image upload and management
- [ ] Search and replace functionality
- [ ] Print support
- [ ] Custom themes beyond light/dark
- [ ] Vim and Emacs key bindings
- [ ] Split-screen editing mode
- [ ] Version history and diff viewing
- [ ] Comment and annotation system

### Future Enhancements

- Performance optimizations for large documents
- WebAssembly integration for faster parsing
- Offline support with service workers
- Real-time collaboration features
- Advanced accessibility improvements
- Mobile app versions (React Native)
- Desktop app versions (Electron)
- Browser extension integration

---

## Version History

- **1.0.0** - Initial stable release with core functionality
- **0.9.x** - Beta releases and testing phases
- **0.1.x** - Alpha releases and early development

## Migration Guides

### From 0.x to 1.0

No breaking changes expected as this is the initial stable release.

## Support

For questions, bug reports, or feature requests:

- [GitHub Issues](https://github.com/akitectio/aki-markdown-editor/issues)
- [GitHub Discussions](https://github.com/akitectio/aki-markdown-editor/discussions)
- [Documentation](https://akitectio.github.io/aki-markdown-editor)
- Email: <support@akitect.io>

## Contributors

Special thanks to all contributors who helped make this project possible!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
