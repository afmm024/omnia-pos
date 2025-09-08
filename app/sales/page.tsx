"use client"
import React, { useState } from 'react';
import { Search, Calendar, Clock, Power, Edit, CreditCard } from 'lucide-react';

const BakeryPOS = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Menu');
  const [cart, setCart] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState('Select Table');

  const categories = [
    { id: 'all', name: 'All Menu', icon: '🍽️', items: '10 Items' },
    { id: 'breads', name: 'Breads', icon: '🍞', items: '20 Items' },
    { id: 'cakes', name: 'Cakes', icon: '🎂', items: '20 Items' },
    { id: 'donuts', name: 'Donuts', icon: '🍩', items: '20 Items' },
    { id: 'pastries', name: 'Pastries', icon: '🥐', items: '20 Items' },
    { id: 'sandwich', name: 'Sandwich', icon: '🥪', items: '20 Items' }
  ];

  const products = [
    { id: 1, name: 'Beef Crotch', category: 'Sandwich', price: 5.50, image: '🥪', type: 'Sandwich' },
    { id: 2, name: 'Buttermelt Croissant', category: 'Pastry', price: 4.00, image: '🥐', type: 'Pastry' },
    { id: 3, name: 'Cereal Cream Donut', category: 'Donut', price: 2.45, image: '🍩', type: 'Donut' },
    { id: 4, name: 'Cheesy Cheesecake', category: 'Cake', price: 3.75, image: '🍰', type: 'Cake' },
    { id: 5, name: 'Cheezy Sourdough', category: 'Bread', price: 4.50, image: '🍞', type: 'Bread' },
    { id: 6, name: 'Egg Tart', category: 'Tart', price: 3.25, image: '🥧', type: 'Tart' },
    { id: 7, name: 'Grains Pan Bread', category: 'Bread', price: 4.50, image: '🍞', type: 'Bread' },
    { id: 8, name: 'Spinchoco Roll', category: 'Pastry', price: 4.00, image: '🥐', type: 'Pastry' },
    { id: 9, name: 'Sliced Black Forest', category: 'Cake', price: 5.00, image: '🍰', type: 'Cake' },
    { id: 10, name: 'Solo Floss Bread', category: 'Bread', price: 4.50, image: '🍞', type: 'Bread' },
    { id: 11, name: 'Zoguma Pan Bread', category: 'Bread', price: 4.50, image: '🍞', type: 'Bread' }
  ];

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map( (item: any) => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getTotalPrice() * 0.10;
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getTax();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Menu */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <div className="w-6 h-1 bg-gray-600 mb-1"></div>
              <div className="w-6 h-1 bg-gray-600 mb-1"></div>
              <div className="w-6 h-1 bg-gray-600"></div>
            </button>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Wed 29 May 2024</span>
              <span className="mx-2">—</span>
              <Clock className="w-5 h-5" />
              <span className="text-sm">07:59 AM</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-red-500 font-medium">• Close Order</span>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Power className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex space-x-4 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex flex-col items-center p-4 rounded-xl min-w-[120px] transition-colors ${
                selectedCategory === category.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-medium text-sm">{category.name}</div>
              <div className="text-xs opacity-70">{category.items}</div>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search something sweet on your mind..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-5 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="text-4xl mb-3 text-center">{product.image}</div>
              <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  product.type === 'Sandwich' ? 'bg-orange-100 text-orange-600' :
                  product.type === 'Pastry' ? 'bg-green-100 text-green-600' :
                  product.type === 'Donut' ? 'bg-orange-100 text-orange-600' :
                  product.type === 'Cake' ? 'bg-pink-100 text-pink-600' :
                  product.type === 'Bread' ? 'bg-blue-100 text-blue-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {product.type}
                </span>
                <span className="font-semibold text-gray-800">${product.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Track Order Button */}
        <button className="fixed bottom-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:bg-blue-700 transition-colors">
          <span>Track Order</span>
          <div className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            3
          </div>
        </button>
      </div>

      {/* Right Panel - Order Details */}
      <div className="w-120 bg-white border-l border-gray-200 flex flex-col">
        {/* Order Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Customer's Name</h2>
            <Edit className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-sm text-gray-500 mb-4">Order Number: #000</div>
          
          <div className="flex space-x-2 mb-4">
            <select 
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Select Table</option>
              <option>Table 1</option>
              <option>Table 2</option>
              <option>Table 3</option>
            </select>
            <select className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Order Type</option>
              <option>Dine In</option>
              <option>Take Away</option>
              <option>Delivery</option>
            </select>
          </div>
          
          <div className="text-center text-gray-500 text-sm">No Item Selected</div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <div className="text-4xl mb-2">🛒</div>
              <p>Your cart is empty</p>
              <p className="text-sm">Add items from the menu</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{item.image}</div>
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500">${item.price.toFixed(2)} each</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => {
                        if (item.quantity > 1) {
                          setCart(cart.map(cartItem => 
                            cartItem.id === item.id 
                              ? { ...cartItem, quantity: cartItem.quantity - 1 }
                              : cartItem
                          ));
                        } else {
                          setCart(cart.filter(cartItem => cartItem.id !== item.id));
                        }
                      }}
                      className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="p-6 border-t border-gray-200">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Tax 10%</span>
              <span>${getTax().toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between font-semibold">
                <span>TOTAL</span>
                <span>${getFinalTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <span>Add Promo or Voucher</span>
              <div className="w-5 h-5 border border-gray-300 rounded"></div>
            </button>
            
            <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
              <CreditCard className="w-5 h-5" />
              <span>Payment Method</span>
            </button>
            
            <button 
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                cart.length > 0 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              disabled={cart.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BakeryPOS;