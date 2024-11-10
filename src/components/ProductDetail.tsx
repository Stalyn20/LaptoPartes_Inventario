import React from 'react';
import { Product, UserRole } from '../types';
import { X, AlertTriangle } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  role: UserRole;
  onUpdateStock: (id: string, newStock: number) => void;
}

export default function ProductDetail({
  product,
  onClose,
  role,
  onUpdateStock,
}: ProductDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Precio</h3>
              <p className="text-lg font-bold">${product.price}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Categoría</h3>
              <p className="text-lg">{product.category}</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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
            {role === 'admin' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onUpdateStock(product.id, product.stock - 1)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  disabled={product.stock <= 0}
                >
                  -
                </button>
                <span className="font-medium w-12 text-center">{product.stock}</span>
                <button
                  onClick={() => onUpdateStock(product.id, product.stock + 1)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}