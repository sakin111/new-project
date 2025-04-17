
import useProductItem from "../../../Hook/useProductItem";
import "./Section1.css";
import { Link } from "react-router-dom";

const Section1 = () => {

    const [data, isLoading, error] = useProductItem();  
    const newItems = data.filter(item => item.filter === "new")
    
    if (isLoading) return <div>Loading....</div>;
    if (error) return <div>Error: {error.message}</div>;


    if (isLoading) return <div>Loading....</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="my-20 back-xs">
    <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-500 font-semibold p-3 text-center my-14">
       Our Latest Product
    </h1>


    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-12 mx-auto max-w-7xl cardXs xs sm:grid-col-2  lg:px-12 ">
        {newItems.map((item, idx) => (
         
            <div key={idx}>


                <Link to={`/card/${item._id}`} >
                <div className="w-full max-w-72 rounded-xl  shadow-lg dark:bg-[#18181B] md:w-[350px] sm:object-cover transition-transform transform  hover:scale-105">
                <div  className="w-full max-w-72 rounded-xl bg-white p-4  dark:bg-[#18181B]  md:w-[350px] sm:object-cover">
                                <img width={260} height={260} className="h-full w-full rounded-lg bg-black/40 xs-image" src={item.imageFront} alt="card" />
                            </div>
                    <div className=" font-semibold p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h6 className="text-sm md:text-sm lg:text-sm font-custom font-banglaFont  text-xs-1">{item.name}</h6>
                                <p className="text-neutral-400 font-semibold"> {item.category}</p>
                            </div>
                            <div>
                                <span className="rounded-sm px-1 py-1 text-neutral-400">
                                    
                                </span>
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

export default Section1;

