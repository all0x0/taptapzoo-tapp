import { AnimatePresence, motion } from "framer-motion";

interface TextUpProps {
  animate: boolean;
  points: number;
}

const TextUp = ({ animate, points }: TextUpProps) => {
  console.log("animate", animate);

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence>
        {animate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-green-500 mt-4"
          >
            +{points}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TextUp;
