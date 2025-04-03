import { GiLindenLeaf } from "react-icons/gi";
import { SlChemistry } from "react-icons/sl";

const Section1Span = ({ card }) => {
    const {  usage, materials, specifications } = card;

    const content = materials? materials : specifications || "No Details available.";

    return (
        <div className="ml-3 md:ml-5 lg:ml-7">
            <div className="w-full md:w-2/3 lg:w-2/3 h-[1px] bg-slate-200 my-3 mt-7"></div>

            {/* Ingredients Section */}
            <div className="max-w-full md:max-w-[400px] lg:max-w-[445px]">
                <div className="p-2 md:p-3 py-2 md:py-3 rounded-lg flex items-center gap-2">
                    <GiLindenLeaf className="text-cyan-500 text-lg md:text-base" />
                    <h2 className="text-sm md:text-base lg:text-lg text-gray-800 font-semibold">Details</h2>
                </div>
                <div className="my-2 rounded-lg w-full md:w-[400px] lg:w-[500px] bg-white p-2 md:p-3 py-2 md:py-3">
                    <p className="text-sm lg:text-base md:text-base text-gray-700">{content}</p>
                </div>
            </div>

            <div className="w-full md:w-2/3 lg:w-2/3 h-[1px] bg-slate-200 my-3 mt-7"></div>

            {/* Usage Section */}
            <div className="max-w-full md:max-w-[400px] lg:max-w-[445px]">
                <div className="p-2 md:p-3 py-2 md:py-3 rounded-lg flex items-center gap-2">
                    <SlChemistry className="text-cyan-500 text-lg md:text-xl" />
                    <h2 className="text-sm md:text-base lg:text-lg text-gray-800 font-semibold">Usage</h2>
                </div>
                <div className="my-2 rounded-lg w-full md:w-[400px] lg:w-[500px] bg-white p-2 md:p-3 py-2 md:py-3">
                    <p className="text-sm md:text-base lg:text-lg text-gray-700">{usage}</p>
                </div>
            </div>
        </div>
    );
};

export default Section1Span;