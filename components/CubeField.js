"use client";
import { useRef, useEffect, useCallback } from "react";

// Campo de cubos isométricos que se repelen del cursor.
// Fix: cubos distribuidos mejor, radio de repulsión más amplio, todos reaccionan.
export default function CubeField({ count = 32 }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const cubes = useRef([]);
  const raf = useRef(null);

  const initCubes = useCallback((w, h) => {
    // Distribuir en grid con jitter para que todos queden dentro del área visible
    const cols = Math.ceil(Math.sqrt(count * (w / h)));
    const rows = Math.ceil(count / cols);
    const cellW = w / cols;
    const cellH = h / rows;
    cubes.current = [];
    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      cubes.current.push({
        homeX: (col + 0.5) * cellW + (Math.random() - 0.5) * cellW * 0.6,
        homeY: (row + 0.5) * cellH + (Math.random() - 0.5) * cellH * 0.6,
        ox: 0, oy: 0,
        vx: 0, vy: 0,
        size: 16 + Math.random() * 26,
        alpha: 0.18 + Math.random() * 0.35,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.25 + Math.random() * 0.45,
      });
    }
  }, [count]);

  const drawCube = useCallback((ctx, x, y, size, alpha) => {
    const h = size * 0.577;
    ctx.globalAlpha = alpha;
    // Top — hueso
    ctx.fillStyle = "#DCD1BD";
    ctx.beginPath();
    ctx.moveTo(x, y - h); ctx.lineTo(x + size / 2, y - h / 2);
    ctx.lineTo(x, y); ctx.lineTo(x - size / 2, y - h / 2); ctx.closePath(); ctx.fill();
    // Left — azul
    ctx.fillStyle = "#234B6C";
    ctx.beginPath();
    ctx.moveTo(x - size / 2, y - h / 2); ctx.lineTo(x, y);
    ctx.lineTo(x, y + h); ctx.lineTo(x - size / 2, y + h / 2); ctx.closePath(); ctx.fill();
    // Right — verde
    ctx.fillStyle = "#97AF95";
    ctx.beginPath();
    ctx.moveTo(x + size / 2, y - h / 2); ctx.lineTo(x, y);
    ctx.lineTo(x, y + h); ctx.lineTo(x + size / 2, y + h / 2); ctx.closePath(); ctx.fill();
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
      initCubes(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse: escuchar en el document para que no se pierda al moverse rápido
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    document.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const REPEL_RADIUS = 180;
    const REPEL_FORCE = 12;
    const DAMPING = 0.88;
    const RETURN = 0.04;

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      const t = Date.now() * 0.001;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const c of cubes.current) {
        // Posición actual = home + offset
        const cx = c.homeX + c.ox;
        const cy = c.homeY + c.oy;

        // Vector desde el mouse al cubo
        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repulsión: todos los cubos dentro del radio reaccionan
        if (dist < REPEL_RADIUS && dist > 1) {
          const strength = Math.pow(1 - dist / REPEL_RADIUS, 2) * REPEL_FORCE;
          c.vx += (dx / dist) * strength;
          c.vy += (dy / dist) * strength;
        }

        // Amortiguamiento y retorno al home
        c.vx *= DAMPING;
        c.vy *= DAMPING;
        c.ox += c.vx;
        c.oy += c.vy;
        c.ox += (0 - c.ox) * RETURN;
        c.oy += (0 - c.oy) * RETURN;

        // Float vertical sutil
        const floatY = Math.sin(t * c.floatSpeed + c.floatOffset) * 5;

        drawCube(ctx, c.homeX + c.ox, c.homeY + c.oy + floatY, c.size, c.alpha);
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [initCubes, drawCube]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "auto", zIndex: 0 }} />;
}
