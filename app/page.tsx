'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '../components/Button';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium">
            ✨ Bienvenido a Bar Premium
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
        >
          Gestión Moderna para tu Bar
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Plataforma elegante y profesional para administrar menú, bebidas, precios y mucho más.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
        >
          <Link href="/menu">
            <Button size="lg">
              Ver Menú
            </Button>
          </Link>
          <Link href="/bebidas">
            <Button size="lg" variant="secondary">
              Nuestras Bebidas
            </Button>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          {[
            {
              icon: '🍽️',
              title: 'Menú Completo',
              description: 'Catálogo de comidas y bebidas organizado por categorías',
            },
            {
              icon: '⚡',
              title: 'Gestión Rápida',
              description: 'Panel administrativo para actualizar precios y productos',
            },
            {
              icon: '🔒',
              title: 'Seguro',
              description: 'Acceso protegido con autenticación de administrador',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-6 bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-lg hover:border-amber-500/50 transition duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-y border-amber-500/20 py-16"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Comienza a administrar tu bar hoy
          </h2>
          <p className="text-gray-300 mb-8">
            Acceso administrativo para gestionar tu negocio de forma profesional
          </p>
          <Link href="/login">
            <Button size="lg">
              Panel de Administración
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
