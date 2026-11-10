# Splat Explorer

A React Three Fiber application for exploring Gaussian splat 3D scans.

## Setup

1. **Install Node.js** if you haven't already:
   - Download from https://nodejs.org/ (LTS version recommended)
   - Or use a package manager like Homebrew: `brew install node`

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

   The app will open in your browser at `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

## Features

- **Multi-splat viewing**: Switch between 7 different Gaussian splat scans
- **Interactive controls**: Rotate, zoom, and pan through your scenes
- **Automatic camera fitting**: Camera automatically positions to frame the model
- **Responsive design**: Works on desktop and tablet
- **Modern UI**: Dark theme with intuitive navigation

## Controls

- **Rotate**: Left mouse button + drag
- **Zoom**: Mouse wheel
- **Pan**: Right mouse button + drag

## Project Structure

```
.
├── src/
│   ├── components/
│   │   └── SplatViewer.jsx    # 3D splat rendering component
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Styling
│   └── main.jsx                # Entry point
├── spz/                        # Gaussian splat files
│   ├── studio1.spz
│   ├── studio2.spz
│   └── ... (7 total)
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies
```

## Dependencies

- **React**: UI framework
- **React Three Fiber**: React renderer for Three.js
- **Three.js**: 3D graphics library
- **@react-three/drei**: Useful Three.js utilities (OrbitControls, etc.)
- **@sparkjsdev/spark**: Gaussian splat renderer for three.js (supports `.spz`)
