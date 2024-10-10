import useUser from "../../../Hook/useUser";




const ShowAddress = () => {

  const [userData ]= useUser()

  return (
    <div className="address-details">



     <h2>Address Details</h2>
    
    <p>
      <strong>Address:</strong> {userData.address || "Not provided"}
    </p>
    <p>
      <strong>Phone Number:</strong> {userData.phoneNumber || "Not provided"}
    </p>
    <p>
      <strong>Post Code:</strong> {userData.postCode || "Not provided"}
    </p>
 </div>



  );
};

export default ShowAddress;
