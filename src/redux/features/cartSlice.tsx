import { CartItem, Product } from "@/interfaces";
import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartState {
  cartItems: CartItem[];
  isLoading: boolean;
  error: any;
}

const initialState: CartState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "cart/fetchData",
  async (userId: string) => {
    const res = await fetch(`http://localhost:3000/api/cart/${userId}`);

    if (!res.ok) {
      console.log("Failed to Fetch Data From API");
    }

    const data = await res.json();
    console.log(data);

    return data; // Return the cart data as the payload
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increament: (state, action: PayloadAction<Product>) => {
      const item = state.cartItems.find(
        (el) => el.product._id === action.payload._id
      );

      if (item) {
        item.qty++;
      } else {
        state.cartItems.push({
          product: action.payload,
          qty: 1,
        });
      }
    },

    decrement: (state, action: PayloadAction<Product>) => {
      const item = state.cartItems.find(
        (el) => el.product._id === action.payload._id
      );

      if (item) {
        item.qty--;
        if (item.qty === 0) {
          state.cartItems = state.cartItems.filter(
            (el) => el.product._id !== action.payload._id
          );
        }
      }
    },
  },
});

const cartItems = (state: RootState) => state.cart.cartItems;

export const totalCartItemSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce((total: number, curr: CartItem) => (total += curr.qty), 0)
);

export const totalPriceSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, curr: CartItem) => (total += curr.qty * curr.product.price),
    0
  )
);

export const productQtySelector = createSelector(
  [cartItems, (cartItems, productId: string) => productId],
  (cartItems, productId) =>
    cartItems.find((el) => el.product._id === productId)?.qty
);
export const { increament, decrement } = cartSlice.actions;

export default cartSlice.reducer;
