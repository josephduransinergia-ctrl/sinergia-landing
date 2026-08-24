"use client";
import { motion, useScroll, useSpring } from "framer-motion";
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  return <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "var(--azul)", transformOrigin: "0%", scaleX, zIndex: 200 }} />;
}
