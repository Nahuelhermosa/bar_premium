'use client';

import { useState } from 'react';
import Button from './Button';

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    description?: string;
    price: number;
    categoryId: string;
    image?: string;
  } | null;
  defaultCategory?: 'comidas' | 'bebidas';
  onSubmit: (payload: {
    name: string;
    description?: string;
    price: number;
    categoryId: string;
    image?: string;
  }) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({
  product,
  defaultCategory = 'comidas',
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price.toString() || '');
  const [categoryId, setCategoryId] = useState(product?.categoryId || defaultCategory);
  const [image, setImage] = useState(product?.image || '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!name.trim() || !price.trim() || !categoryId) {
      setError('Nombre, precio y categoría son obligatorios.');
      return;
    }

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Ingresa un precio válido.');
      return;
    }

    setSaving(true);
    await onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: parsedPrice,
      categoryId,
      image: image.trim() || undefined,
    });
    setSaving(false);
  };

  return (
    <div className="bg-gray-950/80 border border-amber-500/20 rounded-3xl p-8 shadow-2xl shadow-amber-500/20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          {product ? 'Editar producto' : 'Nuevo producto'}
        </h2>
        <p className="text-gray-400 mt-2">
          {product ? 'Ajusta la información y guarda los cambios.' : 'Agrega un nuevo producto al menú.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <div className="text-red-400 text-sm">{error}</div>}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-gray-700 bg-gray-900/80 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
            placeholder="Ej. Risotto de hongos"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full rounded-2xl border border-gray-700 bg-gray-900/80 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
            placeholder="Describe el producto brevemente"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Precio</label>
            <input
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="w-full rounded-2xl border border-gray-700 bg-gray-900/80 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
              placeholder="Ej. 12.50"
              inputMode="decimal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
            <select
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className="w-full rounded-2xl border border-gray-700 bg-gray-900/80 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
            >
              <option value="comidas">Comidas</option>
              <option value="bebidas">Bebidas</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Imagen URL</label>
            <input
              value={image}
              onChange={(event) => setImage(event.target.value)}
              className="w-full rounded-2xl border border-gray-700 bg-gray-900/80 px-4 py-3 text-white focus:border-amber-400 focus:outline-none"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-2">
          <Button type="submit" variant="primary" size="lg" className="flex-1" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar producto'}
          </Button>
          <Button type="button" variant="secondary" size="lg" className="flex-1" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
