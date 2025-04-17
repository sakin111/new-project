import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "ProfitHub helped me turn my hobby into a sustainable income stream. The AdSense integration is seamless and the SEO tools have significantly increased my traffic.",
    name: "Sarah Johnson",
    role: "Lifestyle Blogger",
    initial: "S",
  },
  {
    quote:
      "I've tried many platforms, but none offered the monetization options that ProfitHub does. My revenue has increased by 75% since switching.",
    name: "Michael Chen",
    role: "Tech Reviewer",
    initial: "M",
  },
  {
    quote:
      "The analytics tools have been game-changing for understanding what my audience wants. This platform makes earning from content creation so much more accessible.",
    name: "Priya Patel",
    role: "Finance Creator",
    initial: "P",
  },
];

const slideVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 1 } },
  exit: { opacity: 0, x: -50, transition: { duration: 1 } },
};

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // 6 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-950 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimonials</h2>
        <p className="text-lg text-gray-400 mb-12">See What Our Users Are Saying</p>

        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute w-full px-4"
            >
              <p className="text-xl md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-lg mb-6">
                “{testimonials[index].quote}”
              </p>
              <div className="flex flex-col items-center justify-center">
                <div className="text-3xl font-bold bg-white text-black w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  {testimonials[index].initial}
                </div>
                <p className="text-md font-semibold">{testimonials[index].name}</p>
                <p className="text-sm text-gray-500">{testimonials[index].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
