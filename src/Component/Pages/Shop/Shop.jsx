import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useInView } from "react-intersection-observer";
import  { useEffect } from "react";
import { Link } from "react-router-dom";

// --- Fetch Products Function ---
const fetchProducts = (axiosInstance) => async ({ pageParam = 1 }) => {
  console.log(`Fetching page: ${pageParam}`);
  const limit = 5; // Number of items per page

  try {
    const response = await axiosInstance.get(`/card?page=${pageParam}&limit=${limit}`);
    const itemsData = response.data;

    if (!Array.isArray(itemsData)) {
      console.error("API did not return an array:", itemsData);
      throw new Error("Invalid data format received from API");
    }

    console.log(`Fetched ${itemsData.length} items on page ${pageParam}`);

    // Check if there is more data, if not restart pagination
    const hasMore = itemsData.length === limit;
    return {
      items: itemsData,
      nextPage: hasMore ? pageParam + 1 : 1, // Restart from page 1 when no more items
      currentPage: pageParam,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// --- Shop Component ---
const Shop = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data,
    error,
    status,
    fetchNextPage,

    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["shopProducts"],
    queryFn: ({ pageParam }) => fetchProducts(axiosPublic)({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.nextPage, // Will restart from 1 when no more data
  });

  // --- Intersection Observer Hook ---
  const { ref, inView } = useInView({ threshold: 0.1 });

  // --- Fetch More Data When InView Changes ---
  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage().catch((err) => console.error("Fetching error:", err));
    }
  }, [inView, isFetchingNextPage]);

  // --- Loading and Error States ---
  if (status === "pending") return <div>Loading products...</div>;
  if (status === "error") return <div>Error loading products: {error?.message}</div>;

  return (
    <div>
      <h1 className="mt-9"></h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {data?.pages?.map((page, pageIndex) => (
          page?.items?.map((item, itemIndex) => (
            <div
              key={`${pageIndex}-${itemIndex}`}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <Link to={`/card/${item._id}`}>
              <img
                src={item.imageFront || "https://via.placeholder.com/200"}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-700 truncate">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.category}</p>
              
               
                
              </div>
              </Link>
            </div>
          ))
        ))}
      </ul>

      {/* --- Sentinel Element for Infinite Scroll --- */}
      <div ref={ref} style={{ height: "10px" }}>
        {isFetchingNextPage && <p>Loading more products...</p>}
      </div>
    </div>
  );
};

export default Shop;
