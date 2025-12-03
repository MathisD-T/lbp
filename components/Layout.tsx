import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from './UI';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Réalisations', path: '/portfolio' },
    { label: 'À Propos', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-white bg-dark">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/90 backdrop-blur-md py-3 shadow-lg border-b border-gray-800' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-16 h-16 flex items-center justify-center">
              <img
                src="/assets/logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-semibold uppercase tracking-wide hover:text-primary transition-colors ${location.pathname === link.path ? 'text-primary' : 'text-gray-300'}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/estimate">
              <Button size="sm">Demander une soumission</Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-dark z-40 lg:hidden transition-transform duration-300 pt-24 px-6 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-6 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className="text-2xl font-heading font-semibold text-white hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-full h-px bg-gray-800 my-4"></div>
          <Link to="/estimate" className="w-full">
            <Button fullWidth>Soumission Gratuite</Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-gray-800 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-28 h-28 flex items-center justify-center">
                  <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-white">Navigation</h4>
              <ul className="space-y-3">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-primary transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-white">Services</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-primary transition-colors"><Link to="/services">Rénovation complète</Link></li>
                <li className="hover:text-primary transition-colors"><Link to="/services">Cuisines & Salles de bain</Link></li>
                <li className="hover:text-primary transition-colors"><Link to="/services">Agrandissement</Link></li>
                <li className="hover:text-primary transition-colors"><Link to="/services">Commercial</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-white">Contact</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin className="text-primary shrink-0" size={18} />
                  <span>1234 Boul. Industriel,<br/>Montréal, QC, H1A 2B3</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-primary shrink-0" size={18} />
                  <a href="tel:+15145550199" className="hover:text-white">+1 (514) 555-0199</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-primary shrink-0" size={18} />
                  <a href="mailto:info@lesbeauxprojets.com" className="hover:text-white">info@lesbeauxprojets.com</a>
                </li>
              </ul>
              <div className="flex gap-4 mt-6">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">© 2024 Les Beaux Projets Construction. Tous droits réservés.</p>
            <div className="flex gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-white">Confidentialité</a>
              <a href="#" className="hover:text-white">Termes & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
