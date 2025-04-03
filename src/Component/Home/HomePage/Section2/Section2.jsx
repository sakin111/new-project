
import { Link } from "react-router-dom";
import useProductItem from "../../../Hook/useProductItem";

const Section2 = () => {
  
const [data, isLoading, error] = useProductItem();  
const bestItem = data.filter(item => item.filter === "best")

if (isLoading) return <div>Loading....</div>;
if (error) return <div>Error: {error.message}</div>;



    return (
        <div className="my-20 back-xs">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-500 font-semibold p-3 text-center my-14 ">
                Our Best Product
            </h1>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-12 lg:p-12 mx-auto max-w-7xl cardXs xs sm:grid-col-2">
                {bestItem.map((item, idx) => (
                    <div key={idx}>
                           
                                <Link to={`/card/${item._id}`}>
   
                        <div className="w-full max-w-72 space-y-3 rounded-xl bg-white p-4 shadow-lg dark:bg-[#18181B]  md:w-[350px] sm:object-cover">
                            <div className="relative flex h-48 w-full justify-center lg:h-[260px]">
                                <img width={260} height={260} className="h-full w-full rounded-lg bg-black/40 xs-image" src={item.imageFront} alt="card" />
                            </div>
                            <div className="space-y-2 font-semibold">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h6 className="text-sm md:text-sm lg:text-sm font-custom font-banglaFont textColor1 text-xs-1">{item.name}</h6>
                                        <p className="textColor1">$ {item.size[0].price}</p>
                                    </div>
                                  
                                </div>
                            </div>
                      
                        </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Section2 ;