import { motion } from 'framer-motion';

const headingWords = [
  "The",
  "Future",
  "of",
  "Vaccination",
  "Management."
];

const AnimatedHeading = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const child = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.h1
      className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 drop-shadow-md flex flex-wrap"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {headingWords.map((word, index) => (
        <motion.span 
          key={index}
          variants={child}
          className={`mr-3 ${word === "Vaccination" ? "text-primary" : ""}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default AnimatedHeading;
