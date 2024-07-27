
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import "./Section1.css"
import { Link } from "react-router-dom";

const Section1 = () => {


    const axiosPublic = useAxiosPublic();

    const { data = [], isLoading, error } = useQuery({
        queryKey: ['card'],
        queryFn: async () => {
            try {
                const response = await axiosPublic.get('/card');
                return response.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw error;
            }
        }
    });

    if (isLoading) return <div>Loading....</div>
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1 className="text-5xl text-gray-500 font-semibold p-3  text-center my-14 textColor1">পুষ্টিকর পোরিজ মিক্স</h1>


            <div className="grid grid-cols-4 gap-5 mx-auto max-w-7xl">
                {
                    data.map((item, idx) => (

                        <div key={idx}>

                            <div className="w-full max-w-[340px] space-y-3 rounded-xl bg-white p-4 shadow-lg dark:bg-[#18181B]">
                                <div className="relative flex h-48 w-full justify-center lg:h-[260px]">
                                    <div className="absolute left-4 right-4 top-4 flex items-center justify-between">



                                    </div>
                                    <img width={260} height={260} className="h-full w-full rounded-lg bg-black/40" src={item.imageFront} alt="card" />
                                </div>
                                <div className="space-y-2 font-semibold ">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h6 className="text-sm md:text-base lg:text-md font-custom font-banglaFont textColor1">{item.name}</h6>
                                            
                                            <p className="textColor1">TK {item.size[0].price}
                                            </p>
                                        </div>
                                        <div>
                                        <span className="rounded-sm px-1 py-1 font-base text-white  bg-gradient-to-r from-cyan-400 to-violet-400 ">{item.age} Months</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center justify-between gap-6 text-sm md:text-base">
                                    <Link to={`/card/${item._id}`}><button className="rounded-lg bg-[#49B2FF] px-4 py-2 font-semibold text-white duration-300 hover:scale-105 hover:bg-sky-600">View Details</button></Link>
                                 
                                </div>
                            </div>

                        </div>


                    ))
                }
            </div>
        </div>
    );
};

export default Section1;