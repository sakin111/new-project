import { useState } from "react";
import { motion, } from 'framer-motion';
import { GiLindenLeaf } from "react-icons/gi";
import { SlChemistry } from "react-icons/sl";

const Section1Span = ({ card }) => {

    const { ingredients, usage } = card


    const [isOpenA, setIsOpenA] = useState(false);
    const [isOpenB, setIsOpenB] = useState(false);





    return (
        <div className="ml-7">

            <div className="w-2/3 h-[1px] bg-slate-200 my-3 mt-7"></div>


            <div className=" w-full max-w-2/3 rounded-lg ">
                <motion.div className="" layout transition={{ layout: { duration: 1, type: "spring" } }} onClick={() => setIsOpenA(!isOpenA)}
                >
                    <motion.h2 layout={"position"} className="p-3 flex justify-start items-center gap-2 py-3 rounded-lg font-banglaFont textColor1"> <GiLindenLeaf className="text-teal-500 text-xl"/> উপাদান সমূহ</motion.h2>
                    {isOpenA &&
                        <motion.div className="my-2 rounded-lg  w-[500px] bg-white p-3 py-3">
                            <p className=" font-banglaFont textColor1">{ingredients}</p>
                        </motion.div>

                    }


                </motion.div>

                <div className="w-2/3 h-[1px] bg-slate-200 my-3"></div>


            </div>

            <div className=" w-full max-w-2/3 rounded-lg  ">
                <motion.div className="card" layout
                    onClick={() => setIsOpenB(!isOpenB)}
                >
                    <motion.h2 layout={"position"} className="p-3 py-3 rounded-lg flex justify-start items-center gap-2 font-banglaFont textColor1"> <SlChemistry  className="text-cyan-500 text-xl"/> প্রস্তুত প্রনালী</motion.h2>
                    {isOpenB &&
                        <motion.div className="my-2 rounded-lg w-[500px] bg-white p-3 py-3">
                            <p className="font-banglaFont textColor1">{usage}</p>
                        </motion.div>

                    }


                </motion.div>
            </div>
        </div>
    );
};



export default Section1Span;