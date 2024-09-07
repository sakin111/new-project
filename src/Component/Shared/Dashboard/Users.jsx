import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { MdOutlineDelete } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Users = () => {


  const { axiosSecure } = useAxiosSecure();

  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get('/users');
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }
  });



  const handleMakeAdmin = user => {
    axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }



  const handleDelete = user => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })
      }
    });
  }









  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;









  return (
    <>


      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        {item.photoUrl ? (
                          <img src={item.photoUrl} alt="" />
                        ) : (
                          <div className="text-xl text-center w-8 h-8  rounded-full bg-teal-300 text-white">{item.name.charAt(0).toUpperCase()}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{item.name}</div>
                </td>
                <td>
                  {item.email}
                </td>
                <td>
                  {item.role === 'admin' ? "Admin" : (
                    <button className="btn btn-lg bg-orange-500" onClick={() => handleMakeAdmin(item)}>
                      <FaUsers className="text-white text-2xl" />
                    </button>
                  )}
                </td>
                <td>
                  {users.role === 'admin' ? "Admin" : (<button className="btn btn-ghost btn-lg" onClick={() => handleDelete(item)}>
                    <MdOutlineDelete className="text-red-600"></MdOutlineDelete></button>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </>

  );
};

export default Users;