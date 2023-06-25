import { Product } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: Array<Product>;
  totalAmount: number;
  totalQuantity: number;
  isLoading: boolean;
  error: any;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
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

    return data; // Return the cart data as the payload
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state: CartState,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) {
      const newItem = action.payload.product;
      const existingItem = state.items.find((item) => item._id === newItem._id);

      state.totalQuantity = state.totalQuantity + action.payload.quantity;
      state.totalAmount =
        state.totalAmount +
        action.payload.quantity * action.payload.product.price;

      if (!existingItem) {
        const totalPrice = newItem.price * action.payload.quantity;
        state.items.push({
          ...newItem,
          quantity: action.payload.quantity,
          totalPrice,
        });
      } else {
        const totalPrice =
          existingItem.totalPrice +
          existingItem.price * action.payload.quantity;
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = totalPrice;
      }
    },

    removeProduct(state: CartState, action: PayloadAction<string>) {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },

    removeFromCart(state: CartState, action: PayloadAction<string>) {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item._id === productId);

      state.totalQuantity--;

      state.totalAmount = state.totalAmount - existingItem?.price!;

      if (existingItem?.quantity === 1) {
        state.items = state.items.filter((item) => item._id !== productId);
      } else {
        existingItem!.quantity--;
        existingItem!.totalPrice =
          existingItem!.totalPrice - existingItem?.price!;
      }
    },
    clearCart(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    // handle async actions with builder methods
    builder.addCase(fetchData.pending, (state) => {
      // set loading state to true
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { cartItems, totalQuantity, totalAmount } = action.payload;
      state.items = cartItems;
      state.totalAmount = totalAmount;
      state.totalQuantity = totalQuantity;
      state.isLoading = false;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      // set loading state to false and error state to true
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

// Action creators are generated for each case reducer function
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

// Old Working code of CARTsLICE

// import { CartItem, Product } from "@/interfaces";
// import {
//   PayloadAction,
//   createAsyncThunk,
//   createSelector,
//   createSlice,
// } from "@reduxjs/toolkit";
// import { RootState } from "../store";

// export interface CartState {
//   cartItems: CartItem[];
//   isLoading: boolean;
//   error: any;
// }

// const initialState: CartState = {
//   cartItems: [],
//   isLoading: false,
//   error: null,
// };

// export const fetchData = createAsyncThunk(
//   "cart/fetchData",
//   async (userId: string) => {
//     const res = await fetch(`http://localhost:3000/api/cart/${userId}`);

//     if (!res.ok) {
//       console.log("Failed to Fetch Data From API");
//     }

//     const data = await res.json();

//     return data; // Return the cart data as the payload
//   }
// );

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     increament: (state, action: PayloadAction<Product>) => {
//       const item = state.cartItems.find(
//         (el) => el.product._id === action.payload._id
//       );

//       if (item) {
//         item.qty++;
//       } else {
//         state.cartItems.push({
//           product: action.payload,
//           qty: 1,
//         });
//       }
//     },

//     decrement: (state, action: PayloadAction<Product>) => {
//       const item = state.cartItems.find(
//         (el) => el.product._id === action.payload._id
//       );

//       if (item) {
//         item.qty--;
//         if (item.qty === 0) {
//           state.cartItems = state.cartItems.filter(
//             (el) => el.product._id !== action.payload._id
//           );
//         }
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     // handle async actions with builder methods
//     builder.addCase(fetchData.pending, (state) => {
//       // set loading state to true
//       state.isLoading = true;
//     });
//     builder.addCase(fetchData.fulfilled, (state, action) => {
//       // set loading state to false and update cartItems with data
//       state.isLoading = false;
//       state.cartItems = action.payload;
//     });
//     builder.addCase(fetchData.rejected, (state, action) => {
//       // set loading state to false and error state to true
//       state.isLoading = false;
//       state.error = action.error;
//     });
//   },
// });

// const cartItems = (state: RootState) => state.cart.cartItems;

// export const totalCartItemSelector = createSelector([cartItems], (cartItems) =>
//   cartItems.reduce((total: number, curr: CartItem) => (total += curr.qty), 0)
// );

// export const totalPriceSelector = createSelector([cartItems], (cartItems) =>
//   cartItems.reduce(
//     (total: number, curr: CartItem) => (total += curr.qty * curr.product.price),
//     0
//   )
// );

// export const productQtySelector = createSelector(
//   [cartItems, (cartItems, productId?: string) => productId],
//   (cartItems, productId) =>
//     cartItems.find((el) => el.product._id === productId)?.qty
// );
// export const { increament, decrement } = cartSlice.actions;

// export default cartSlice.reducer;
