import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  bookId: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
}

const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem("cartItems");
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
};

const saveCart = (items: CartItem[]) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const initialState: CartState = {
  items: loadCart(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ bookId: string; qty?: number }>,
    ) => {
      const { bookId, qty = 1 } = action.payload;
      const existing = state.items.find((i) => i.bookId === bookId);
      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({ bookId, qty });
      }
      saveCart(state.items);
    },
    setCartQty: (
      state,
      action: PayloadAction<{ bookId: string; qty: number }>,
    ) => {
      const { bookId, qty } = action.payload;
      if (qty <= 0) {
        state.items = state.items.filter((i) => i.bookId !== bookId);
      } else {
        const existing = state.items.find((i) => i.bookId === bookId);
        if (existing) {
          existing.qty = qty;
        }
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.bookId !== action.payload);
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const { addToCart, setCartQty, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
