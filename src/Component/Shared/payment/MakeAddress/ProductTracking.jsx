import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes, FaBoxOpen, FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";


const ANIMATION_DURATION = 0.3;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

 const ProductTracking = () => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();
  const { axiosSecure } = useAxiosSecure();

  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["myOrder", user?.email],
    queryFn: async () => {
      if (!user?.email) throw new Error("User email not found");
      const res = await axiosSecure.get(`/myOrder?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const allItems = useMemo(
    () =>
      orders.flatMap((order) =>
        order.cartItems.map((item) => ({
          transactionId: order.transactionId,
          id: order._id,
          name: item.name,
          status: order.status,
          estimatedDelivery: order.estimatedDelivery,
          location: order.location,
        }))
      ),
    [orders]
  );

  const handleSearch = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  const filteredData = useMemo(
    () =>
      allItems.filter((item) => {
        const searchTerm = query.toLowerCase().trim();
        return (
          searchTerm === "" ||
          item.name.toLowerCase().includes(searchTerm) ||
          item.id.toLowerCase().includes(searchTerm) 
        
        );
      }),
    [allItems, query]
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "text-yellow-600 bg-yellow-100";
      case "Shipped":
        return "text-blue-600 bg-blue-100";
      case "Delivered":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <section className="px-4 py-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setModalOpen(true)}
          className="px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center gap-2 mx-auto"
        >
          <FaBoxOpen className="w-5 h-5" />
          Track Your Order
        </motion.button>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                variants={modalVariants}
                transition={{ duration: ANIMATION_DURATION }}
                className="bg-white w-full max-w-xl p-6 rounded-xl shadow-2xl relative"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setModalOpen(false)}
                >
                  <FaTimes className="w-5 h-5 text-gray-600" />
                </motion.button>

                <h3 className="text-2xl font-bold text-gray-800 mb-6">Track Your Order</h3>

                <form onSubmit={handleSubmit} className="mb-6">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={query}
                      onChange={handleSearch}
                      placeholder="Search by Order ID, Name, or Transaction ID"
                      className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    />
                  </div>
                </form>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                    </div>
                  ) : isError ? (
                    <div className="text-center py-8">
                      <p className="text-red-500 font-medium">Failed to load orders.</p>
                      <p className="text-gray-500 mt-2">Please try again later.</p>
                    </div>
                  ) : filteredData.length === 0 ? (
                    <div className="text-center py-8">
                      <FaBoxOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No orders found matching your search.</p>
                    </div>
                  ) : (
                    filteredData.map((item, index) => (
                      <motion.div
                        key={`${item.id}-${index}`}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-lg text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-500">Order ID: {item.id}</p>
                            <p className="text-sm text-gray-500">Transaction: {item.transactionId}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaTruck className="w-4 h-4" />
                            <span>Delivery: {item.estimatedDelivery}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaMapMarkerAlt className="w-4 h-4" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
export default  ProductTracking;
