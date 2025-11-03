import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SModalProps {
  children: ReactNode;
  end?: boolean;
  start?: boolean;
}

const SModal = ({ children, end = false, start = false }: SModalProps) => {
  return (
    <motion.div
      className={`fixed inset-0 z-100 flex items-center justify-center bg-black/20 backdrop-blur-sm md:items-center ${
        end
          ? "md:justify-end"
          : start
          ? "md:justify-start"
          : "md:justify-center"
      }  sm:items-end sm:justify-center`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`${
          end ? "md:mr-10" : start ? "md:ml-10" : ""
        } bg-white rounded-lg p-[30px] w-max top-40`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full">{children}</div>
      </motion.div>
    </motion.div>
  );
};
export default SModal;
