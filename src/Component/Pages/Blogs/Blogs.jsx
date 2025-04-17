import { useState } from "react";
import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "Top 10 Must-Have Products in 2025",
    excerpt: "Discover the most trending and essential products you shouldn't miss this year.",
    image: "https://images.unsplash.com/photo-1620987278429-ab178d6eb547?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    date: "April 6, 2025",
    author: "John Doe",
  },
  {
    id: 2,
    title: "How to Choose the Right Product for Your Needs",
    excerpt: "A complete guide to help you make informed purchasing decisions.",
    image: "https://plus.unsplash.com/premium_photo-1681408059631-f587608582ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxyaWdodCUyMHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    date: "April 4, 2025",
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "Why Sustainable Shopping is the Future",
    excerpt: "Learn how eco-friendly products are reshaping the market.",
    image: "https://plus.unsplash.com/premium_photo-1737241774648-4bb74a75f470?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "April 2, 2025",
    author: "Alice Green",
  },
];

export default function Blogs() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="px-4 py-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Latest Blog Posts</h2>
        <p className="text-gray-600 mb-10 text-lg">
          Stay updated with our latest tips, guides, and product updates.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
              onMouseEnter={() => setHovered(blog.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{blog.author}</span>
                  <span>{blog.date}</span>
                </div>
                {hovered === blog.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-indigo-600 font-medium cursor-pointer"
                  >
                    Read More →
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
