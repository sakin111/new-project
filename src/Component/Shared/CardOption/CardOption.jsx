import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useCart from "../../Hook/useCart";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useCookiesData from "../../Hook/useCookiesData";
import useAuth from "../../Hook/useAuth";

const CardOption = () => {
  const { axiosSecure } = useAxiosSecure();
  const [cartData, error, isLoading, refetch] = useCart();
  const { cartCookies, refetch: cookieRefetch } = useCookiesData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChecked = async (item) => {
    try {
      const check = { check: "checked" };
      let response;

      if (user?.email) {
        response = await axiosSecure.patch(`/addToCart/${item._id}`, check);
      } else {
        response = await axiosSecure.patch(`/addToCartCookies/${item._id}`, check);
      }

      if (response.data.modifiedCount > 0) {
        refetch();
        if (!user?.email) {
          cookieRefetch();
          navigate(`/addToCartCookies/${item._id}`)
        }
       else{
        navigate(`/addToCart/${item._id}`);
       }
      }
    } catch (error) {
      console.error("Failed to approve the order", error);
    }
  };

  const handleDeleteCart = async (cart) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#006400",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/addToCart/${cart._id}`);
        if (res.data.deletedCount > 0 || res.data.message === "Item successfully deleted") {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your cart has been deleted.",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error deleting the item:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting the item.",
          icon: "error",
        });
      }
    }
  };

  if (isLoading) {
    return <p>Loading cart data...</p>;
  }

  if (error) {
    return <p>Error fetching cart data: {error.message}</p>;
  }

  const itemsToRender = user?.email ? cartData : cartCookies;

  return (
    <div className="overflow-x-hidden min-h-screen bg-white">
      <table className="min-w-[1200px] bg-white shadow-md mt-7 mx-auto table-auto">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Checkout</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemsToRender && itemsToRender.length > 0 ? (
            itemsToRender.map((item) => (
              <tr className="h-24 border-b bg-stone-100 text-gray-800" key={item._id}>
                <td className="px-6 py-4 text-left">
                  <img className="h-11 w-11 rounded-lg bg-slate-500 object-cover" src={item.image} alt={item.name} />
                </td>
                <td className="px-3 py-4 text-left font-banglaFont text-gray-600">{item.name}</td>
                <td className="px-3 py-4 text-left">
                  <div className="flex justify-start">
                    <span className="text-gray-600 rounded-md text-center py-2 px-3 border border-gray-400">{item.quantity}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-left hidden md:table-cell">
                  {item.check === "checked" ? (
                    <p className="text-white bg-teal-600 w-24 h-7 rounded-md p-1 text-center">checked</p>
                  ) : (
                    <button
                      className="flex items-center rounded-full bg-teal-400 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-teal-500"
                      onClick={() => handleChecked(item)}
                    >
                      Checkout
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 text-left">
                  <button
                    className="flex items-center rounded-md font-bold text-red-600 transition-all duration-300 hover:text-red-800"
                    onClick={() => handleDeleteCart(item)}
                  >
                    <RiDeleteBinLine />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-8 text-4xl text-gray-300">
                <h1>No Cart Data Exist</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CardOption;
