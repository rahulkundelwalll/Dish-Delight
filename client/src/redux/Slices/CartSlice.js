import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    console.log(err)
  }
};

export const CartSlice = createSlice({
  name: "cart",
  initialState: loadFromLocalStorage(), 
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
    remove: (state, action) => {
      const updatedState = state.filter((item) => item._id !== action.payload);
      state.length = 0; 
      state.push(...updatedState);
      saveToLocalStorage(updatedState); 
    },
  },
});

export const { add, remove } = CartSlice.actions;

export default CartSlice.reducer;
