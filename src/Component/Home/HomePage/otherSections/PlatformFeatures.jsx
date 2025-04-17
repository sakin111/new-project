
import { motion } from "framer-motion";



const PlatformFeatures = () => {
    const features = [
        {
          title: "Branding Made Easy",
          description:
            "Customize your storefront with your logo, colors, and brand voice to create a seamless identity.",
          icon: "🎨",
        },
        {
          title: "Marketing Automation",
          description:
            "Run email campaigns, schedule posts, and manage promotions effortlessly with built-in tools.",
          icon: "📢",
        },
        {
          title: "Conversion Optimization",
          description:
            "Tools like A/B testing and heatmaps help you refine user experience and increase sales.",
          icon: "📈",
        },
        {
          title: "Customer Management",
          description:
            "Manage orders, customer inquiries, and reviews from a single, powerful dashboard.",
          icon: "🤝",
        },
        {
          title: "Integrated Analytics",
          description:
            "Track traffic, sales, bounce rates, and more with real-time data and custom reports.",
          icon: "📊",
        },
        {
          title: "Scalable Infrastructure",
          description:
            "Whether you're just starting or scaling fast, our platform grows with your business needs.",
          icon: "🚀",
        },
      ];
    
      const containerVariants = {
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      };
    
      const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      };
    
      return (
        <section className="w-full py-16 px-6 bg-white">
          <motion.div
            className="max-w-6xl mx-auto text-center"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Built for Business Success
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              From branding to growth, we’ve packed everything you need to launch and scale your business.
            </p>
          </motion.div>
    
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="p-6 bg-gray-50 shadow-sm border border-gray-200 rounded-xl hover:shadow-md transition-all"
                variants={cardVariants}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      );
  };
  
  export default PlatformFeatures;
  