"use client";
import { motion } from "framer-motion";
export default function FadeIn({ children, delay = 0, y = 24, x = 0, className = "", style = {}, once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: `translate(${x}px, ${y}px)` }}
      whileInView={{ opacity: 1, transform: "translate(0px, 0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className} style={style}
    >{children}</motion.div>
  );
}
