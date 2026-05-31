'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isAdmin?: boolean;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  onEdit,
  onDelete,
  isAdmin = false,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative h-full"
    >
      <div className="h-full bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-lg overflow-hidden hover:border-amber-500/50 transition duration-300 shadow-lg hover:shadow-amber-500/20">
        {/* Image */}
        <div className="relative h-48 w-full bg-gray-800 overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between h-44">
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition duration-300 line-clamp-2">
              {name}
            </h3>
            {description && (
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {description}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              ${price.toFixed(2)}
            </span>
          </div>

          {/* Admin Actions */}
          {isAdmin && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={onEdit}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition duration-300"
              >
                Editar
              </button>
              <button
                onClick={onDelete}
                className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition duration-300"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
