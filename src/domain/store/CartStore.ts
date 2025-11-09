import { LucideDollarSign, LucideQrCode, LucideSquareStack } from 'lucide-react';
import { create } from 'zustand';
import { Supplier } from '../types/SupplierType';

const optionsPayment = [
  { value: 'efectivo', label: 'Efectivo', icon: LucideDollarSign },
  { value: 'transferencia', label: 'LLaves', icon: LucideQrCode },
  { value: 'mixto', label: 'Mixto', icon: LucideSquareStack },
];

export interface PaymentOption {
  value: string;
  label: string;
  icon: any;
}

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
  supplier: Supplier | null;
  paymentType: string;
  paymentOptions: PaymentOption[];
  totalItems: number;
  cash: number;
  transfer: number;
}

interface CartActions {
  updateTotals: () => void;
  clearCart: () => void;
  updateCash: (cash: number) => void;
  updateTransfer: (transfer: number) => void;
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, delta: 1 | -1) => void;
  removeItem: (id: string) => void;
  setPaymentType: (paymentType: string) => void;
  setSupplier: (supplier: Supplier | null) => void;
}

type CartStore = CartState & CartActions;

const calculateTotals = (items: CartItem[]) => {
  const IMPOCONSUMO_RATE = 0.08;
  const IMPOCONSUMO_STRING = "Impoconsumo 8%";

  let subtotal = 0;
  let taxAmount = 0;

  items.forEach((item) => {
    const totalItemPrice = item.price * item.quantity;
    let basePrice = totalItemPrice;
    let itemTax = 0;
    if (item.taxes === IMPOCONSUMO_STRING) {
      basePrice = totalItemPrice * IMPOCONSUMO_RATE;
      itemTax = totalItemPrice - basePrice;
    }
    subtotal += basePrice;
    taxAmount += itemTax;
  });
  const total = subtotal + taxAmount;
  return { 
    subtotal: Math.round(subtotal * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
    totalItems: items.reduce((acc, item) => acc + item.quantity, 0),
  };
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  subtotal: 0.00,
  taxAmount: 0.00,
  cash: 0.00,
  transfer: 0.00,
  total: 0.00,
  totalItems: 0,
  paymentOptions: optionsPayment,
  paymentType: 'efectivo',
  supplier: null,
  updateCash: (cash) => {
    set({ cash });
  },
  updateTransfer: (transfer) => {
    set({ transfer });
  },
  setSupplier: (supplier) => {
    set({ supplier });
  },
  setPaymentType: (paymentType) => {
    set({ paymentType });
  },
  updateTotals: () => {
    const { items } = get();
    const { subtotal, taxAmount, total, totalItems } = calculateTotals(items);
    set({ subtotal, taxAmount, total, totalItems });
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
    set({ items: [], subtotal: 0.00, taxAmount: 0.00, total: 0.00, paymentType: 'efectivo', supplier: null, cash: 0.00, transfer: 0.00});
  },
}));