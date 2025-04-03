import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { GiCancel } from "react-icons/gi";

const AllCart = () => {
  const { axiosSecure } = useAxiosSecure();

  const { data: allCartItem = [], refetch, isLoading, isError } = useQuery({
    queryKey: ["myOrder"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/myOrder"); // Await the axios call
        return res.data; // Return the fetched data
      } catch (error) {
        console.error("Unable to get the myOrder data", error);
        throw new Error("Failed to fetch data");
      }
    },
  });

  // handle approve button
  const handleApprove = async (approve) => {
    try {
      const res = await axiosSecure.patch(`/myOrder/${approve._id}`);

      if (res.data.modifiedCount > 0) {
        // Refetch the data after successful approval
        refetch();

        // Show success message
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Product item is Approved`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Failed to approve the order", error);

      // Show error message if the request fails
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to approve the order",
        showConfirmButton: true,
      });
    }
  };

// delete form the data base




const handleDeleteAllCartItem = async (allDelete) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const DeleteRes = await axiosSecure.delete(`/myOrder/${allDelete._id}`);
      if (DeleteRes.data.deletedCount > 0) {
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Failed to delete the order", error);
     
    }
  }
};





  if (isLoading) return <div className="loading-spinner"></div>;
  if (isError) return <div className="">Error: unable to get the data</div>;

  return (
    <div className="p-6 bg-gray-100 space-y-4">
      {allCartItem.map((item) => (
        <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <img
              className="w-24 h-24 object-cover rounded-lg"
              src={item.products.image}
              alt={item.products.name}
            />
            <div>
              <h4 className="text-gray-700 font-semibold">
                {item.products.name}
              </h4>
              <p className="text-gray-500">Price: ৳{item.products.price}</p>
              <p className="text-gray-500">
                Quantity: {item.products.quantity}
              </p>
              <p className="text-gray-500">Category: {item.products.category}</p>
            </div>
          </div>
       

          <div className="mt-4">
          <button
                    className="flex items-center rounded-md font-bold text-red-600 transition-all duration-300 hover:text-red-800"
                    onClick={() => handleDeleteAllCartItem(item)}
                    
                  >
                    <GiCancel />
                  </button>
          </div>


          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Address: {item.address}</p>
            <p>Post Code: {item.postCode}</p>
            <p>Phone: {item.phone}</p>
            <p>shipping charges: {item.Zone}</p>
            <p>Method: {item.method}</p>
            <p>Order Date: {new Date(item.date).toLocaleDateString()}</p>
          </div>
          <div className="mt-4">
            {item.approve === "approved" ? (
              <p className="text-white bg-teal-600 w-24 h-7 rounded-md p-1  text-center">Approved</p>
            ) : (
              <button
                className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-cyan-600"
                onClick={() => handleApprove(item)} // Approve button
              >
                Approve Order
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllCart;
