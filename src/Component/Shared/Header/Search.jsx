import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useProductItem from "../../Hook/useProductItem";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data] = useProductItem();
  const navigate = useNavigate();

  // Filter products based on search input
  const filteredProducts = searchTerm
    ? data.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Handle input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Navigate to filtered product list page
  const handleProductClick = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setIsDrawerOpen(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center gap-5 h-16 w-full">
      {/* Mobile Search Icon */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="lg:hidden block text-black font-bold w-7 h-7"
      >
        {isDrawerOpen ? (
          <AiOutlineClose className="text-black w-7 h-7" />
        ) : (
          <GoSearch className="text-black font-bold w-7 h-7" />
        )}
      </button>

      {/* Desktop Search Bar */}
      <Box
        className="hidden lg:flex flex-col items-center gap-4 w-full max-w-3xl relative"
        sx={{ width: 500, maxWidth: "100%" }}
      >
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
              height: "50px",
              "& input": { height: "40px", padding: "10px 14px" },
              "& fieldset": { borderColor: "gray" },
              "&:hover fieldset": { borderColor: "gray" },
              "&.Mui-focused fieldset": { borderColor: "gray" },
              input: { color: "gray" },
            },
            "& .MuiInputLabel-root": { color: "gray" },
            "& .MuiInputLabel-root.Mui-focused": { color: "gray" },
          }}
          fullWidth
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === "Enter" && handleProductClick()}
        />

        {/* Search Results Dropdown (Desktop) */}
        {filteredProducts.length > 0 && (
          <div className="absolute top-[58px] bg-white border border-gray-300 w-full max-w-3xl rounded shadow-md z-50">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleProductClick}
              >
                {product.name}
              </div>
            ))}
          </div>
        )}
      </Box>

      {/* Mobile Drawer Search Bar */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0  bg-gray-800 bg-opacity-50 z-50 lg:hidden flex justify-center items-center"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className="relative w-4/5 bg-white p-4 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "5px",
                  height: "50px",
                  "& input": { height: "40px", padding: "10px 14px" },
                  "& fieldset": { borderColor: "gray" },
                  "&:hover fieldset": { borderColor: "gray" },
                  "&.Mui-focused fieldset": { borderColor: "gray" },
                  input: { color: "black" },
                },
                "& .MuiInputLabel-root": { color: "black" },
                "& .MuiInputLabel-root.Mui-focused": { color: "black" },
              }}
              fullWidth
              label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter" && handleProductClick()}
            />

            {/* Search Results Dropdown (Mobile) */}
            {filteredProducts.length > 0 && (
              <div className="mt-2 bg-white border border-gray-300 rounded shadow-md">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={handleProductClick}
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
