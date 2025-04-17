import { BsCart2 } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const HeaderUp = () => {
    return (
        <div className="max-w-full h-auto flex flex-wrap md:flex-nowrap items-center border-b-[1px] justify-center md:justify-between px-4 md:px-10 py-2 gap-2">
            {/* Cashback Offer with Icon */}
            <div className="flex items-center gap-2 text-gray-800 text-xs md:text-sm font-medium">
                <BsCart2 className="text-cyan-600 text-lg" />
                <span>Get up to 25% cashback on your first order!</span>
            </div>

            {/* Email with Icon */}
            <div className="flex items-center gap-2 text-gray-600 text-xs md:text-sm">
                <MdEmail className="text-gray-700 text-lg" />
                <a href="mailto:Polygone01@gmail.com" className="hover:underline">
                    Polygone01@gmail.com
                </a>
            </div>
        </div>
    );
};

export default HeaderUp;
