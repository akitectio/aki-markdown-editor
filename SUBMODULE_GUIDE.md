# Aki UI Submodule Guide

This project uses Aki UI as a Git submodule to ensure we have the latest components and full control over the UI library.

## 🚀 Initial Setup

When you first clone this repository:

```bash
# Clone the repository
git clone https://github.com/akitectio/aki-markdown-editor.git
cd aki-markdown-editor

# Install dependencies (this will automatically init submodules via postinstall)
npm install
```

## 📦 Manual Submodule Management

### Initialize Submodules

```bash
npm run submodule:init
# or manually:
git submodule update --init --recursive
```

### Update Aki UI to Latest

```bash
npm run submodule:update
# or manually:
git submodule update --remote
```

### Build Aki UI

```bash
npm run submodule:build
# or manually:
cd lib/aki-ui && npm install && npm run build
```

## 🔧 Development Workflow

### Building the Library

```bash
npm run build:lib
```

This will:

1. Build the Aki UI submodule
2. Build the markdown editor library using Rollup

### Development Server

```bash
npm run dev
```

This starts Vite dev server with hot reload using the local Aki UI.

## 📁 Project Structure

```
aki-markdown-editor/
├── lib/
│   └── aki-ui/          # Git submodule
│       ├── dist/        # Built Aki UI components
│       └── src/         # Aki UI source code
├── src/
│   ├── components/      # Markdown editor components
│   └── types/          # TypeScript definitions
└── dist/               # Built library output
```

## ⚠️ Important Notes

### Submodule State

- The submodule points to a specific commit of Aki UI
- To get the latest changes, run `npm run submodule:update`
- Always test after updating the submodule

### Building Dependencies

- Aki UI must be built before building the markdown editor
- The `build:lib` script handles this automatically
- If you modify Aki UI, rebuild it with `npm run submodule:build`

### Git Workflow

When making changes that involve the submodule:

```bash
# 1. Update submodule to latest
npm run submodule:update

# 2. Test your changes
npm run dev

# 3. Commit the submodule update
git add lib/aki-ui
git commit -m "Update Aki UI submodule"

# 4. Push changes
git push
```

## 🐛 Troubleshooting

### Submodule Not Initialized

```bash
npm run submodule:init
```

### Build Failures

```bash
# Clean and rebuild everything
rm -rf node_modules lib/aki-ui/node_modules
npm install
npm run submodule:build
```

### Version Conflicts

Check that both projects use compatible versions of:

- React
- TypeScript
- Vite

### Submodule Out of Sync

```bash
# Reset submodule to tracked commit
git submodule update --force
```

## 📚 Benefits of Using Submodule

1. **Always Latest**: Easy access to latest Aki UI features
2. **Local Development**: Modify Aki UI components if needed
3. **Version Control**: Exact tracking of which Aki UI version is used
4. **Build Integration**: Seamless build process
5. **Independence**: No dependency on npm registry uptime

## 🚀 CI/CD Considerations

Make sure your CI pipeline:

1. Initializes submodules: `git submodule update --init --recursive`
2. Builds Aki UI before building the main library
3. Caches `lib/aki-ui/node_modules` for faster builds

Example GitHub Actions step:

```yaml
- name: Checkout with submodules
  uses: actions/checkout@v3
  with:
    submodules: recursive

- name: Install and build
  run: |
    npm install
    npm run build:lib
```
