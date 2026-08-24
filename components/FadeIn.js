"use client";
import { motion } from "framer-motion";

// Componente reutilizable de entrada en viewport. Propósito: preventing jarring change.
// translateY(20px) + opacity, 500ms ease-out, disparo una vez.
export default function FadeIn({ children, delay = 0, y = 20, x = 0, className = "", style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: `translate(${x}px, ${y}px)` }}
      whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
