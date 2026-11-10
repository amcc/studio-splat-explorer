import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SplatViewer from "./components/SplatViewer";
import FlyControls from "./components/FlyControls";
import "./App.css";

const splats = [
  "room-1.spz",
  "room-2.spz",
  "both-rooms.spz",
  "front.spz",
  "back-yard.spz",
];

export default function App() {
  const [selected, setSelected] = useState(splats[0]);
  const [status, setStatus] = useState("loading");

  return (
    <div className="container">
      <div className="sidebar">
        <div className="splat-list">
          <h1>Studio</h1>
          {/* <h3>Available Scans</h3> */}
          {splats.map((splat) => (
            <button
              key={splat}
              className={`splat-button ${selected === splat ? "active" : ""}`}
              onClick={() => setSelected(splat)}
            >
              {splat.replace(".spz", "").replace("-", " ")}
            </button>
          ))}
        </div>
        <div className="controls-info">
          <h3>Controls</h3>
          <ul>
            <li>
              <strong>Look:</strong> Left mouse drag
            </li>
            <li>
              <strong>Move:</strong> W A S D / arrow keys
            </li>
            <li>
              <strong>Up / down:</strong> E / Q
            </li>
            <li>
              <strong>Dolly:</strong> Scroll wheel
            </li>
            <li>
              <strong>Faster:</strong> Hold Shift
            </li>
            <li>
              <strong>Pan:</strong> Right mouse drag
            </li>
          </ul>
        </div>
      </div>

      <div className="viewport">
        {status === "loading" && <div className="loading">Loading…</div>}
        {status === "error" && (
          <div className="loading">Failed to load scan</div>
        )}
        <Canvas
          gl={{ antialias: false }}
          camera={{ position: [0, 0, 5], fov: 60 }}
        >
          <SplatViewer url={`/spz/${selected}`} onStatus={setStatus} />
          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.05}
            enableZoom={false}
            rotateSpeed={-0.5}
          />
          <FlyControls speed={1} />
        </Canvas>
      </div>
    </div>
  );
}
