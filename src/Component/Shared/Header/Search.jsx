import { useState } from "react";
import { GoSearch } from "react-icons/go";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AiOutlineClose } from "react-icons/ai";

const Search = ({ onSearchIconClick }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleSearchBar = () => {
    setShowSearch(!showSearch);
    onSearchIconClick(!showSearch);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative flex justify-center items-center gap-5 h-16">
      {/* Search Icon for smaller screens */}
      <button
        onClick={toggleDrawer}
        className="lg:hidden block text-black font-bold w-7 h-7"
      >
        {isDrawerOpen ? (
          <AiOutlineClose className="text-black w-7 h-7" />
        ) : (
          <GoSearch className="text-black font-bold w-7 h-7" />
        )}
      </button>

      {/* Search Bar for large/medium screens */}
      <Box className=" hidden lg:flex items-center gap-4 w-full max-w-3xl" sx={{width: 500, maxWidth : "100%"}}>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
              height: "50px",
              "& input": {
                height: "40px", 
                padding: "10px 14x", 
              },
              "& fieldset": {
                borderColor: "gray"
              },
              "&:hover fieldset": {
                borderColor: "gray"
              },
              "&.Mui-focused fieldset": {
                borderColor: "gray",
              },
              input: {
                color: "gray",
              },
            },
            "& .MuiInputLabel-root": {
              color: "gray",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "gray",
            },
          }}
          fullWidth
          label="Search"
          id="search-bar"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>

      {/* Drawer Search Bar for smaller screens */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 lg:hidden flex justify-start items-center"
          onClick={toggleDrawer} // Close the drawer if clicked outside
        >
          <div
            className="relative flex justify-center items-center w-4/12 bg-white h-full transition-all transform translate-x-0 lg:hidden"
            onClick={(e) => e.stopPropagation()} // Prevent drawer close when clicking inside
          >
            <Box className="w-full h-16 p-4">
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "9999px",
                    "& fieldset": {
                      borderColor: "gray",
                    },
                    "&:hover fieldset": {
                      borderColor: "gray",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "gray",
                    },
                    input: {
                      color: "black",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                }}
                fullWidth
                label="Search"
                id="drawer-search-bar"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
