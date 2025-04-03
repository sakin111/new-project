import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import useProductItem from "../../Hook/useProductItem";


const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const [data] = useProductItem();

  // Filter products based on search query
  const filteredProducts = searchQuery
    ? data.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

   console.log(data, "this is data")

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Search Results for {searchQuery}
      </h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={product.imageFront || "https://via.placeholder.com/200"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-700 truncate">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.category}</p>
                <Link to={`/card/${product._id}`}>
                  <button className="mt-3 w-full bg-blue-500 text-white text-sm py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-lg text-center">No products found for {searchQuery}. Try another search!</p>
      )}
    </div>
  );
};

export default SearchResults;