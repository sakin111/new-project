
import { RiDeleteBinLine } from "react-icons/ri";


const CartTable = ({ items, onDelete }) =>{
  
  

 return (

    <div className="w-full md:w-full px-12">
      <table className="min-w-full bg-white table-auto" aria-label="Cart items table">
        <thead>
          <tr>
            {["Product", "Name", "Quantity", "Actions"].map((header) => (
              <th key={header} className="px-3 py-3 text-left text-xs font-medium text-white bg-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items?.length > 0 ? (
            items.map((item) => (
              <tr key={item._id} className="h-24 border-b bg-white text-gray-800">
                <td className="px-6 py-4">
                  <img className="h-32 w-32 rounded-lg bg-slate-500 object-cover" src={item.image} alt={item.name} />
                </td>
                <td className="px-3 py-4">{item.name}</td>
                <td className="px-3 py-4">{item.quantity}</td>
                <td className="px-6 py-4">
                  <button
                    className="flex items-center rounded-md font-bold text-gray-700 hover:text-red-600"
                    onClick={() => onDelete(item)}
                  >
                    <RiDeleteBinLine className="w-7 h-7" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-8 text-4xl text-gray-300">
                No Cart Data Exists
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
  export default CartTable


  
  