import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface AnimatedCollapseProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function AnimatedCollapse({
  isOpen,
  children,
}: AnimatedCollapseProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
