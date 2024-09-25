import { create } from "zustand";

const useUserStore = create((set) => ({
  email: "", // Add an email property
  address: "",
  phoneNumber: "",
  postCode: "",

  // Setters to update state
  setEmail: (newEmail) => set({ email: newEmail }), // Setter for email
  setAddress: (newAddress) => set({ address: newAddress }),
  setPhoneNumber: (newPhoneNumber) => set({ phoneNumber: newPhoneNumber }),
  setPostCode: (newPostCode) => set({ postCode: newPostCode }),

  clearUserInfo: () => set({ email: "", address: "", phoneNumber: "", postCode: "" }),
}));

export default useUserStore;
