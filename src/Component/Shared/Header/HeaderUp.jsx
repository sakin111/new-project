import { BsCart2 } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const HeaderUp = () => {
    return (
        <div className="max-w-full h-10  flex items-center border-y-2 justify-between px-10">
            {/* Cashback Offer with Icon */}
            <div className="flex items-center gap-2 text-gray-800 text-sm font-medium px-10">
                <BsCart2 className="text-cyan-600 text-lg" />
                <span>Get up to 25% cashback on your first order!</span>
            </div>

            {/* Email with Icon */}
            <div className="flex items-center gap-2 text-gray-600 text-sm px-10">
                <MdEmail className="text-gray-700 text-lg" />
                <a href="mailto:Polygone01@gmail.com" className="hover:underline">
                    Polygone01@gmail.com
                </a>
            </div>
        </div>
    );
};

export default HeaderUp;
