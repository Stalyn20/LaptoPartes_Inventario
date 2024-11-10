import React from 'react';
import { Product, UserRole } from '../types';
import { AlertTriangle } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  role: UserRole;
  onUpdateStock: (id: string, newStock: number) => void;
  onProductClick: (product: Product) => void;
}

export default function ProductList({
  products,
  role,
  onUpdateStock,
  onProductClick,
}: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
          onClick={() => onProductClick(product)}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 line-clamp-2">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold">${product.price}</span>
              <div className="flex items-center space-x-2">
                {product.stock <= product.minStock && (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
                <span className={`font-medium ${
                  product.stock <= product.minStock ? 'text-red-500' : 'text-green-500'
                }`}>
                  Stock: {product.stock}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}