import React from 'react';
import { Product } from '../types';
import { AlertTriangle } from 'lucide-react';

interface StockAlertsProps {
  products: Product[];
}

export default function StockAlerts({ products }: StockAlertsProps) {
  const lowStockProducts = products.filter((p) => p.stock <= p.minStock);

  if (lowStockProducts.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <p className="ml-3 text-yellow-700">
            <span className="font-medium">Alertas de stock</span>
          </p>
        </div>
        <div className="mt-2">
          {lowStockProducts.map((product) => (
            <p key={product.id} className="text-sm text-yellow-700">
              • {product.name}: {product.stock} unidades restantes (Mínimo: {product.minStock})
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}