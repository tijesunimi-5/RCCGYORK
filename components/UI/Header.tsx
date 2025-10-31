'use client'
import React, { useEffect, useState } from 'react'
import { FaBars, FaChurch, FaTimes } from 'react-icons/fa'
import { Button } from './Button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#service-times' },
    { name: 'About', href: '#about' },
    // { name: 'Ministries', href: '#ministries' },
    // { name: 'Events', href: '#events' },
    // { name: 'Give', href: '#give' },
    // { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/90 backdrop-blur-sm shadow-md'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3 group">
            <div className="p-2 bg-linear-to-br from-red-600 to-red-800 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
              <FaChurch className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl bg-linear-to-r from-red-700 to-red-900 bg-clip-text text-transparent">
                RCCG York
              </span>
              <span className="text-xs text-gray-600">Champions' Chapel</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-gray-700 hover:text-red-700 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-700 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <Button
              className="bg-linear-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 shadow-lg hover:shadow-xl transition-all"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#contact');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Plan Your Visit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block py-3 text-gray-700 hover:text-red-700 hover:bg-red-50 px-4 rounded-lg transition-colors"
              >
                {item.name}
              </a>
            ))}
            <Button
              className="w-full mt-4 bg-linear-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                const element = document.querySelector('#contact');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Plan Your Visit
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header
