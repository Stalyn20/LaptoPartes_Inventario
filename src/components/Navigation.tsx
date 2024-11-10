import React from 'react';
import { Package, Search, AlertTriangle, History } from 'lucide-react';
import { UserRole, Page } from '../types';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  role: UserRole;
}

export default function Navigation({ currentPage, onPageChange, role }: NavigationProps) {
  const navItems = [
    {
      id: 'productos' as Page,
      name: 'Productos',
      icon: Package,
      allowed: ['admin', 'empleado'],
    },
    {
      id: 'inventario' as Page,
      name: 'Inventario',
      icon: Search,
      allowed: ['admin', 'empleado'],
    },
    {
      id: 'alertas' as Page,
      name: 'Alertas',
      icon: AlertTriangle,
      allowed: ['admin', 'empleado'],
    },
    {
      id: 'historial' as Page,
      name: 'Historial',
      icon: History,
      allowed: ['admin'],
    },
  ];

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {navItems
              .filter((item) => item.allowed.includes(role))
              .map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === item.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </nav>
  );
}