

import { motion } from "framer-motion";

const FlipLink = ({ children,  }) => {

const DURATION = 0.25;
const STAGGER = 0.025;
 
return(
    <motion.a
    initial="initial"
    whileHover="hovered"
    
    className="relative block overflow-hidden whitespace-nowrap text-xl font-black uppercase sm:text-xl md:text-xl lg:text-xl"
    style={{
      lineHeight: 0.75,
    }}
  >
    <div>
      {children.split("").map((l, i) => (
        <motion.span
          variants={{
            initial: {
              y: 0,
            },
            hovered: {
             y: "-100%",
            },
          }}
          transition={{
            duration: DURATION,
            ease: "easeInOut",
            delay: STAGGER * i,
          }}
          className="inline-block"
          key={i}
        >
          {l}
        </motion.span>
      ))}
    </div>
    <div className="absolute inset-0">
      {children.split("").map((l, i) => (
        <motion.span
          variants={{
            initial: {
              y: "100%",
            },
            hovered: {
             y: 0,
            },
          }}
          transition={{
            duration: DURATION,
            ease: "easeInOut",
            delay: STAGGER * i,
          }}
          className="inline-block"
          key={i}
        >
          {l}
        </motion.span>
      ))}
    </div>
  </motion.a>

)}
export default FlipLink;