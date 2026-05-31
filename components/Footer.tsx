'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-amber-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
              🍷 Bar Premium
            </h3>
            <p className="text-gray-400">Sistema de gestión moderna para bares y restaurantes.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-amber-400 transition">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/menu" className="hover:text-amber-400 transition">
                  Menú
                </a>
              </li>
              <li>
                <a href="/bebidas" className="hover:text-amber-400 transition">
                  Bebidas
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@bar.com</li>
              <li>Teléfono: +54 911 XXXX-XXXX</li>
              <li>Ubicación: Buenos Aires, Argentina</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex justify-between items-center">
          <p className="text-gray-400">
            © {currentYear} Bar Premium. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-amber-400 transition">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-400 transition">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
