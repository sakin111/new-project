import { motion } from 'framer-motion';

const splitText = (card) => {
    return card.split('');
}

const Section1TextAnimation = ({ card }) => {
    const characters = splitText(card);

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
        <motion.div className="animated-text"
            variants={container}
            initial="hidden"
            animate="visible">
            {characters.map((char, index) => (
                <motion.span key={index} variants={child} className=' md:text-base lg:text-xl text-cyan-500 font-banglaFont sm:text-xs'>
                    {char}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default Section1TextAnimation;
