import { useState } from "react";
import { GoSearch } from "react-icons/go";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AiOutlineClose } from "react-icons/ai";


const Search = ({ onSearchIconClick }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleSearchBar = () => {
        setShowSearch(!showSearch);
        onSearchIconClick(!showSearch);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="flex justify-center items-center gap-5 h-16">
            <button onClick={toggleSearchBar} className="">
            {showSearch ? (
                    <AiOutlineClose className="text-white font-bold w-7 h-7 absolute right-96 transform -translate-x-2/3 -translate-y-4  max-w-md "/>
                    
                ) : (
                    <GoSearch className="text-white font-bold w-7 h-7"/>
                )}
            </button>
            {showSearch && (
                <Box
                    className="absolute  left-1/2 transform -translate-x-1/2 translate-y-0 w-full max-w-md"
                >
                    <TextField 
                       sx={{ 
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '9999px', 
                            '& fieldset': {
                                borderColor: 'white', 
                            },
                            '&:hover fieldset': {
                                borderColor: 'white', 
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white', 
                            },
                            input: {
                                color: 'white'
                            }
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', 
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'white', 
                        },
                    }}
                        fullWidth 
                        label="Search" 
                        id="fullWidth" 
                        value={searchTerm} 
                        onChange={handleSearchChange}
                       
                    />
                </Box>
            )}
        </div>
    );
};

export default Search;
