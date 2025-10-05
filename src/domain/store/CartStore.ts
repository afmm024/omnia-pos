import { create } from 'zustand';


export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  taxes: string;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
}

interface CartActions {
  updateTotals: () => void;
  clearCart: () => void;
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, delta: 1 | -1) => void;
  removeItem: (id: string) => void;
}

type CartStore = CartState & CartActions;

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const TAX_RATE = 0;
  const taxAmount = subtotal * TAX_RATE;
  const total = subtotal + taxAmount;
  
  return { subtotal, taxAmount, total };
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  subtotal: 0.00,
  taxAmount: 0.00,
  total: 0.00,

  updateTotals: () => {
    const { items } = get();
    const { subtotal, taxAmount, total } = calculateTotals(items);
    set({ subtotal, taxAmount, total });
  },

  addItem: (product) => {
    set((state) => {
      const itemIndex = state.items.findIndex((i) => i.id === product.id);
      let newItems: CartItem[];

      if (itemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity: 1 }];
      }
      
      return { items: newItems };
    });
    
    get().updateTotals(); 
  },

  updateQuantity: (id, delta) => {
    set((state) => {
      const newItems = state.items
        .map((item) => {
          if (item.id !== id) return item;
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(0, newQuantity) }; 
        })
        .filter((item) => item.quantity > 0);
        
      return { items: newItems };
    });
    get().updateTotals(); 
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
    get().updateTotals(); 
  },

  clearCart: () => {
    set({ items: [], subtotal: 0.00, taxAmount: 0.00, total: 0.00 });
  },
}));