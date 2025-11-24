"use client";
import { useRef, useState } from "react";

export default function SpinWheel() {
  const canvasRef = useRef(null);
  const [rot, setRot] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const colors = [
    "#8ef000",
    "#ccf000",
    "#ff9900",
    "#ff3300",
    "#ff0080",
    "#8000ff",
    "#0040ff",
    "#00bfff",
  ];

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const extra = Math.floor(Math.random() * 360 + 720);
    const target = rot + extra;
    const duration = 2500;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const angle = rot + (extra * progress);
      setRot(angle);
      draw(angle);
      if (progress < 1) requestAnimationFrame(animate);
      else setSpinning(false);
    };

    requestAnimationFrame(animate);
  };

  const draw = (angle) => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const size = 320;
    c.width = size;
    c.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const seg = (2 * Math.PI) / colors.length;

    ctx.clearRect(0, 0, size, size);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((angle * Math.PI) / 180);

    for (let i = 0; i < colors.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = colors[i];
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, cx - 10, i * seg, (i + 1) * seg);
      ctx.lineTo(0, 0);
      ctx.fill();
    }

    ctx.restore();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(cx, 10);
    ctx.lineTo(cx - 12, 40);
    ctx.lineTo(cx + 12, 40);
    ctx.closePath();
    ctx.fill();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <canvas
        ref={canvasRef}
        className="border border-gray-400 rounded-full shadow-lg"
      />
      <button
        onClick={spin}
        className="px-4 py-2 rounded-xl bg-blue-500 text-white shadow hover:bg-blue-600"
      >
        Spin
      </button>
    </div>
  );
}
