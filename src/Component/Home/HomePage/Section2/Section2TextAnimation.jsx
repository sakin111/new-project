
import { motion } from 'framer-motion';

const splitText = (cardMix) => {
    return cardMix.split('');
}



const Section2TextAnimation = ({cardMix}) => {


    const characters = splitText(cardMix)



    const container = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05
          }
        }
      };



      const child = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      };


    return (
        <motion.div  className="animated-text"
        variants={container}
        initial="hidden"
        animate="visible">
       
      
        {characters.map((char, index) => (
          <motion.span key={index} variants={child} className='text-lg text-cyan-500 font-banglaFont'>
            {char}
          </motion.span>
        ))}
     </motion.div>
    );
};

export default Section2TextAnimation;