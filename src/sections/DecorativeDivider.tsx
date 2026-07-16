import { motion } from "framer-motion";
import ornament from "../assets/oyu.png";

export default function DecorativeDivider() {
  return (
    <section className="relative overflow-hidden py-10">
      <div className="relative">
        
        {/* бесконечная лента */}
        <motion.div
          className="flex w-max"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="mx-6 flex w-full items-center justify-center"
            >
              <img
                src={ornament}
                alt=""
                className=" opacity-70"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}