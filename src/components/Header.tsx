import React from 'react';
import { UserRole } from '../types';
import { Settings, Package } from 'lucide-react';

interface HeaderProps {
  role: UserRole;
  onRoleToggle: () => void;
}

export default function Header({ role, onRoleToggle }: HeaderProps) {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8" />
            <h1 className="text-2xl font-bold">LaptoPartes</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onRoleToggle}
              className="flex items-center space-x-2 bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Rol: {role === 'admin' ? 'Administrador' : 'Empleado'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}