export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  description: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface User {
  username: string;
  role: UserRole;
  name: string;
}

export type UserRole = 'admin' | 'empleado';

export interface StockAlert {
  productId: string;
  message: string;
  type: 'low' | 'out';
}

export interface StockHistory {
  id: string;
  productId: string;
  quantity: number;
  type: 'in' | 'out';
  date: string;
  user: string;
}

export type Page = 'productos' | 'inventario' | 'alertas' | 'historial';