import { motion } from "framer-motion";
import ornament from "../assets/oyu.png";

export default function DecorativeDivider2() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <img
            key={index}
            src={ornament}
            alt=""
            className="h-24 w-auto opacity-15"
          />
        ))}
      </motion.div>
    </div>
  );
}