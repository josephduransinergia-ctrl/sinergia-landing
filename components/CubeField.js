"use client";
import { useRef, useEffect, useCallback } from "react";

// Campo de cubos isométricos que se repelen del cursor — la firma visual del logo de Sinergia
export default function CubeField({ count = 28 }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const cubes = useRef([]);
  const raf = useRef(null);

  const initCubes = useCallback((w, h) => {
    cubes.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      ox: 0, oy: 0, // original offset from repulsion
      vx: 0, vy: 0,
      size: 14 + Math.random() * 28,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.3,
      alpha: 0.15 + Math.random() * 0.35,
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: 0.3 + Math.random() * 0.5,
    }));
  }, [count]);

  const drawCube = useCallback((ctx, x, y, size, alpha) => {
    const h = size * 0.577;
    ctx.globalAlpha = alpha;
    // Top face — hueso
    ctx.fillStyle = "#DCD1BD";
    ctx.beginPath();
    ctx.moveTo(x, y - h);
    ctx.lineTo(x + size / 2, y - h / 2);
    ctx.lineTo(x, y);
    ctx.lineTo(x - size / 2, y - h / 2);
    ctx.closePath();
    ctx.fill();
    // Left face — azul
    ctx.fillStyle = "#234B6C";
    ctx.beginPath();
    ctx.moveTo(x - size / 2, y - h / 2);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x - size / 2, y + h / 2);
    ctx.closePath();
    ctx.fill();
    // Right face — verde
    ctx.fillStyle = "#97AF95";
    ctx.beginPath();
    ctx.moveTo(x + size / 2, y - h / 2);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x + size / 2, y + h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.parentElement.offsetWidth;
      h = canvas.parentElement.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!cubes.current.length) initCubes(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -1000, y: -1000 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const REPEL_RADIUS = 140;
    const REPEL_FORCE = 8;
    const DAMPING = 0.92;
    const RETURN_SPEED = 0.03;

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      const t = Date.now() * 0.001;

      for (const c of cubes.current) {
        const dx = c.x + c.ox - mouse.current.x;
        const dy = c.y + c.oy - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
          c.vx += (dx / dist) * force;
          c.vy += (dy / dist) * force;
        }

        c.vx *= DAMPING;
        c.vy *= DAMPING;
        c.ox += c.vx;
        c.oy += c.vy;
        c.ox *= (1 - RETURN_SPEED);
        c.oy *= (1 - RETURN_SPEED);

        const floatY = Math.sin(t * c.floatSpeed + c.floatOffset) * 6;
        drawCube(ctx, c.x + c.ox, c.y + c.oy + floatY, c.size, c.alpha);
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [initCubes, drawCube]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "auto", zIndex: 0 }} />;
}
