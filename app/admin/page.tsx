'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import ProductForm from '../../components/ProductForm';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  image?: string;
  isActive: boolean;
}

export default function AdminPanel() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'comidas' | 'bebidas'>('comidas');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async (formData: Omit<Product, 'id' | 'isActive'>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      if (editingProduct) {
        // Actualizar producto existente
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const updated = await res.json();
          setProducts(products.map(p => p.id === updated.id ? updated : p));
        }
      } else {
        // Crear nuevo producto
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const newProduct = await res.json();
          setProducts([...products, newProduct]);
        }
      }

      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const filteredProducts = products.filter(p => p.categoryId === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
            Panel Administrativo
          </h1>
          <p className="text-gray-400">Gestiona productos, precios y menú</p>
        </div>
        <Button variant="danger" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Tabs and Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8"
        >
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory('comidas')}
              className={`px-6 py-2 rounded-lg font-medium transition duration-300 ${
                selectedCategory === 'comidas'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              🍽️ Comidas
            </button>
            <button
              onClick={() => setSelectedCategory('bebidas')}
              className={`px-6 py-2 rounded-lg font-medium transition duration-300 ${
                selectedCategory === 'bebidas'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              🍷 Bebidas
            </button>
          </div>

          <Button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
          >
            + Nuevo Producto
          </Button>
        </motion.div>

        {/* Product Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <ProductForm
              product={editingProduct}
              onSubmit={handleSaveProduct}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              defaultCategory={selectedCategory}
            />
          </motion.div>
        )}

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-lg overflow-hidden"
        >
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/50 border-b border-amber-500/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-400">Nombre</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-400">Descripción</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-400">Precio</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-400">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredProducts.map((product) => (
                    <motion.tr
                      key={product.id}
                      whileHover={{ backgroundColor: 'rgba(217, 119, 6, 0.05)' }}
                      className="hover:bg-amber-500/5 transition duration-200"
                    >
                      <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                      <td className="px-6 py-4 text-gray-400 max-w-xs truncate">
                        {product.description || '-'}
                      </td>
                      <td className="px-6 py-4 text-amber-400 font-semibold">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setShowForm(true);
                          }}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition duration-200"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition duration-200"
                        >
                          Eliminar
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No hay productos en esta categoría</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
