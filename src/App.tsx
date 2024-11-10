import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ProductList from './components/ProductList';
import CategoryFilter from './components/CategoryFilter';
import StockAlerts from './components/StockAlerts';
import SearchBar from './components/SearchBar';
import ProductForm from './components/ProductForm';
import Login from './components/Login';
import InventoryHistory from './components/InventoryHistory';
import ProductDetail from './components/ProductDetail';
import { categories, initialProducts } from './data';
import { Product, User, StockHistory, Page } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('productos');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState<StockHistory[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleLogin = (user: User) => {
    setUser(user);
  };

  const updateStock = (productId: string, newStock: number) => {
    if (newStock < 0) return;
    
    setProducts((current) => {
      const product = current.find((p) => p.id === productId);
      if (!product) return current;
      
      const difference = newStock - product.stock;
      
      setHistory((prev) => [
        {
          id: Date.now().toString(),
          productId: product.name,
          quantity: Math.abs(difference),
          type: difference > 0 ? 'in' : 'out',
          date: new Date().toISOString(),
          user: user?.name || 'Unknown',
        },
        ...prev,
      ]);
      
      return current.map((product) =>
        product.id === productId ? { ...product, stock: newStock } : product
      );
    });
  };

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      id: (products.length + 1).toString(),
    };
    setProducts((current) => [...current, product]);
    
    setHistory((prev) => [
      {
        id: Date.now().toString(),
        productId: product.name,
        quantity: product.stock,
        type: 'in',
        date: new Date().toISOString(),
        user: user?.name || 'Unknown',
      },
      ...prev,
    ]);
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'productos':
        return (
          <>
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            {user.role === 'admin' && (
              <ProductForm categories={categories} onAddProduct={addProduct} />
            )}
            <ProductList
              products={filteredProducts}
              role={user.role}
              onUpdateStock={updateStock}
              onProductClick={setSelectedProduct}
            />
          </>
        );
      case 'inventario':
        return (
          <>
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            <ProductList
              products={filteredProducts}
              role={user.role}
              onUpdateStock={updateStock}
              onProductClick={setSelectedProduct}
            />
          </>
        );
      case 'alertas':
        return <StockAlerts products={products} />;
      case 'historial':
        return <InventoryHistory history={history} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header role={user.role} onRoleToggle={() => setUser(null)} />
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        role={user.role}
      />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          role={user.role}
          onUpdateStock={updateStock}
        />
      )}
    </div>
  );
}

export default App;