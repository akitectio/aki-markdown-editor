# Contributing to Aki Markdown Editor

We welcome contributions to the Aki Markdown Editor! This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/aki-markdown-editor.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/akitectio/aki-markdown-editor.git

# Navigate to project directory
cd aki-markdown-editor

# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build:lib
```

## Project Structure

```
aki-markdown-editor/
├── src/
│   ├── components/          # React components
│   │   ├── MarkdownEditor.tsx
│   │   ├── MarkdownPreview.tsx
│   │   └── MarkdownToolbar.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── index.ts
│   ├── types/              # TypeScript type definitions
│   │   ├── index.ts
│   │   └── aki-ui.d.ts
│   ├── utils/              # Utility functions
│   │   └── markdown.ts
│   ├── styles/             # CSS and styling
│   │   └── index.css
│   ├── examples/           # Example implementations
│   │   └── ExampleApp.tsx
│   └── index.ts            # Main entry point
├── dist/                   # Built library output
├── docs/                   # Documentation
├── .storybook/            # Storybook configuration
└── tests/                 # Test files
```

## Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Provide proper type annotations
- Use interfaces for props and complex objects
- Avoid `any` types

### React

- Use functional components with hooks
- Follow React best practices
- Use proper error boundaries
- Implement accessibility features

### Styling

- Use Tailwind CSS for styling
- Follow responsive design principles
- Ensure dark mode compatibility
- Use Aki UI components exclusively

### Code Quality

- Write clean, readable code
- Add comments for complex logic
- Use meaningful variable and function names
- Keep functions small and focused

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write unit tests for all components
- Include integration tests for complex interactions
- Test accessibility features
- Aim for high test coverage

### Test Structure

```typescript
// Component.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Component } from "./Component";

describe("Component", () => {
  it("should render correctly", () => {
    render(<Component />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should handle user interactions", () => {
    const onChange = jest.fn();
    render(<Component onChange={onChange} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    });

    expect(onChange).toHaveBeenCalledWith("test");
  });
});
```

## Submitting Changes

### Commit Messages

Follow conventional commits:

```
feat: add new toolbar button for table insertion
fix: resolve issue with markdown parsing
docs: update API documentation
style: improve button hover effects
refactor: simplify markdown utility functions
test: add tests for preview component
```

### Pull Request Process

1. Ensure your code follows the style guidelines
2. Add tests for new features
3. Update documentation as needed
4. Run the full test suite
5. Create a pull request with a clear description

### Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Updated existing tests

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or marked as breaking)
```

## Code Style

### ESLint Rules

We use ESLint with the following key rules:

- No unused variables
- Prefer const over let
- Use semicolons
- 2-space indentation
- Single quotes for strings
- Trailing commas in multiline

### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## Documentation

### API Documentation

- Document all public APIs
- Include usage examples
- Provide TypeScript type information
- Keep documentation up to date

### Component Documentation

````typescript
/**
 * MarkdownEditor component for editing markdown content
 *
 * @param value - Current markdown content
 * @param onChange - Callback when content changes
 * @param showPreview - Whether to show preview tab
 * @param theme - Editor theme (light/dark)
 *
 * @example
 * ```tsx
 * <MarkdownEditor
 *   value={content}
 *   onChange={setContent}
 *   showPreview={true}
 *   theme="dark"
 * />
 * ```
 */
````

## Release Process

### Versioning

We use semantic versioning (SemVer):

- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes (backward compatible)

### Release Checklist

1. Update version in package.json
2. Update CHANGELOG.md
3. Run full test suite
4. Build library: `npm run build:lib`
5. Create git tag
6. Push to repository
7. Publish to npm

## Getting Help

- Check existing issues and discussions
- Create a new issue for bugs
- Start a discussion for questions
- Join our Discord community
- Email: support@akitect.io

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Aki Markdown Editor! 🚀
