
import { useEffect, useState} from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useUserStore from "../../Store/Store";
import useUser from "../../Hook/useUser";

const Address = () => {

const {user, isLoading, error, refetch } = useUser()
  const { address, phoneNumber, postCode, setAddress, setPhoneNumber, setPostCode ,setEmail, } = useUserStore();
  const [errors, setErrors] = useState({});
  const {axiosSecure }= useAxiosSecure()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!address) newErrors.address = "Address is required.";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    if (!postCode) newErrors.postCode = "Post code is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    setErrors({});
    await handleMakeAddress();
  };

console.log(user, "this is address users")
  

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setAddress(user.address || "");
      setPhoneNumber(user.phone || "");
      setPostCode(user.postCode || "");
  
      // Add logging to check updates
      console.log("Updated Address:", user.address);
      console.log("Updated Phone:", user.phone);
      console.log("Updated PostCode:", user.postCode);

      console.log("Zustand State after setting:", useUserStore.getState());
    }
  }, [user,setEmail, setAddress, setPhoneNumber, setPostCode]);

  


  const handleMakeAddress = async () => {
    if (!user) return;

    try {
      const res = await axiosSecure.patch(`/users/email/${user.email}`, {
        address,
        phoneNumber,
        postCode,
      });

      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.name}'s address has been updated!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Failed to update ${user.name}'s address.`,
        showConfirmButton: true,
      });
    }
  };



if(isLoading) return <div>Loading.....</div>
if(error) return <div>Error.....</div>





 console.log({address})


  return (
    <div className="min-h-screen w-full bg-white pt-10">
      {address ? (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Address</h2>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Phone:</strong> {phoneNumber}</p>
          <p><strong>Post Code:</strong> {postCode}</p>
        </div>
      ) : (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Address Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.address ? "border-red-500" : "border-gray-300"} rounded-md`}
                placeholder="123 Main St."
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} rounded-md`}
                placeholder="(123) 456-7890"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Post Code</label>
              <input
                type="text"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.postCode ? "border-red-500" : "border-gray-300"} rounded-md`}
                placeholder="12345"
              />
              {errors.postCode && <p className="text-red-500 text-sm">{errors.postCode}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Address;
