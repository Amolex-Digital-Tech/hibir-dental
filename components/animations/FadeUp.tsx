"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export function FadeUp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}