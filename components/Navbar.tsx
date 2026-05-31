'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-amber-500/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
            >
              🍷 Bar
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-amber-400 transition duration-300"
            >
              Inicio
            </Link>
            <Link
              href="/menu"
              className="text-gray-300 hover:text-amber-400 transition duration-300"
            >
              Menú
            </Link>
            <Link
              href="/bebidas"
              className="text-gray-300 hover:text-amber-400 transition duration-300"
            >
              Bebidas
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition duration-300"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-amber-400 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            <Link
              href="/"
              className="block px-4 py-2 text-gray-300 hover:text-amber-400 hover:bg-white/5 rounded transition"
            >
              Inicio
            </Link>
            <Link
              href="/menu"
              className="block px-4 py-2 text-gray-300 hover:text-amber-400 hover:bg-white/5 rounded transition"
            >
              Menú
            </Link>
            <Link
              href="/bebidas"
              className="block px-4 py-2 text-gray-300 hover:text-amber-400 hover:bg-white/5 rounded transition"
            >
              Bebidas
            </Link>
            <Link
              href="/login"
              className="block px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded"
            >
              Admin
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
