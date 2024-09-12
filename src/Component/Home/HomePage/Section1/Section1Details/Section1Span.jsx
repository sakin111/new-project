import { useState } from "react";
import { motion } from 'framer-motion';
import { GiLindenLeaf } from "react-icons/gi";
import { SlChemistry } from "react-icons/sl";
import { IoChevronDown } from "react-icons/io5";

const Section1Span = ({ card }) => {
    const { ingredients, usage } = card;
    const [isOpenA, setIsOpenA] = useState(false);
    const [isOpenB, setIsOpenB] = useState(false);

    return (
        <div className="ml-3 md:ml-5 lg:ml-7">
            <div className="w-full md:w-2/3 lg:w-2/3 h-[1px] bg-slate-200 my-3 mt-7"></div>

            {/* Ingredients Section */}
            <div className="flex justify-between items-center max-w-full md:max-w-[400px] lg:max-w-[445px]">
                <div className="w-full">
                    <motion.div
                        className="card"
                        layout
                        onClick={() => setIsOpenA(!isOpenA)}
                    >
                        <motion.h2 layout={"position"} className="p-2 md:p-3 py-2 md:py-3 rounded-lg flex justify-start items-center gap-2 font-banglaFont textColor1 text-sm md:text-base lg:text-lg  sm:text-sm">
                            <GiLindenLeaf className="text-cyan-500 text-lg md:text-base sm:text-sm" />
                            উপাদান সমূহ
                        </motion.h2>
                        {isOpenA && (
                            <motion.div className="my-2 rounded-lg w-full md:w-[400px] lg:w-[500px] bg-white p-2 md:p-3 py-2 md:py-3">
                                <p className="font-banglaFont textColor1 text-sm  lg:text-lg md:text-base sm:text-sm">{ingredients}</p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
                <IoChevronDown className="text-cyan-500 text-base  font-thin md:text-base sm:text-sm" />
            </div>

            <div className="w-full md:w-2/3 lg:w-2/3 h-[1px] bg-slate-200 my-3 mt-7"></div>

            {/* Usage Section */}
            <div className="flex justify-between items-center max-w-full md:max-w-[400px] lg:max-w-[445px]">
                <div className="w-full">
                    <motion.div
                        className="card"
                        layout
                        onClick={() => setIsOpenB(!isOpenB)}
                    >
                        <motion.h2 layout={"position"} className="p-2 md:p-3 py-2 md:py-3 rounded-lg flex justify-start items-center gap-2 font-banglaFont textColor1 text-sm md:text-base lg:text-lg">
                            <SlChemistry className="text-cyan-500 text-lg md:text-xl" />
                            প্রস্তুত প্রনালী
                        </motion.h2>
                        {isOpenB && (
                            <motion.div className="my-2 rounded-lg w-full md:w-[400px] lg:w-[500px] bg-white p-2 md:p-3 py-2 md:py-3">
                                <p className="font-banglaFont textColor1 text-sm md:text-base lg:text-lg">{usage}</p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
                <IoChevronDown className="text-cyan-500 text-base md:text-lg font-thin" />
            </div>
        </div>
    );
};

export default Section1Span;
