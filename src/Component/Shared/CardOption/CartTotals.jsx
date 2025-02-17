const CartTotals = ({ subTotal, isChecked, onCheckedChange, onCheckout }) => (
    <div className="w-full ml-[50rem] md:w-4/12 bg-white shadow-md rounded-md p-6">
      <div className="w-full h-[1px] bg-slate-300"></div>
      <p className="text-lg font-medium text-gray-600">Subtotal: ৳ {subTotal.toFixed(2)}</p>

      <div className="mt-4">
        <label className="flex items-center space-x-3">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-teal-500" checked={isChecked} onChange={onCheckedChange} />
          <span className="text-gray-600">I agree to proceed with checkout</span>
        </label>
      </div>
      <button
        className={`mt-6 w-full text-white font-bold py-3 rounded-md transition-all ${
          isChecked ? "bg-teal-500 hover:bg-teal-600" : "bg-gray-300 cursor-not-allowed"
        }`}
        onClick={onCheckout}
        disabled={!isChecked}
      >
        Proceed to Checkout
      </button>
    </div>
  );

  export default CartTotals
