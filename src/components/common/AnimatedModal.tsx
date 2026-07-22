import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function AnimatedModal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: AnimatedModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          {/* Backdrop fade animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Modal box pop/slide animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-2xl border border-slate-100 text-center space-y-4 z-10"
          >
            <h3 className="font-[TT_Norms_Pro] font-bold text-[20px] text-[#1F1F1F]">
              {title}
            </h3>
            <p className="font-[Gilroy-Regular] text-[16px] text-slate-600">
              {description}
            </p>
            <div className="pt-2">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
