'use client'

import { CgMail } from "react-icons/cg";
import { FaArrowUp, FaChurch, FaFacebook, FaMapPin, FaPhone, FaYoutube } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#service-times' },
    { name: 'About Us', href: '#about' },
    { name: 'Ministries', href: '#ministries' },
  ];

  const resources = [
    // { name: 'Events', href: '#events' },
    // { name: 'Give', href: '#give' },
    { name: 'Contact', href: '#contact' },
    { name: 'Prayer Requests', href: '#contact' },
  ];

  const departments = [
    {name: "Youth Church", href: "/Youth"},
    {name: "Children Unit", href: "/children-unit"},
    {name: "Ushering Unit", href: "/ushering-unit"}
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-1 bg-linear-to-br from-white to-gray-500 rounded-xl shadow-lg">
                <img src="/logo.png" className='w-10 h-10' />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl text-white">RCCG York</span>
                <span className="text-sm text-red-400">Living Spring</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Raising champions who will dominate their generation for Christ.
              Part of the Redeemed Christian Church of God worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:livingspringyork@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors group">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-red-900/30 transition-colors">
                  <CgMail className="h-4 w-4" />
                </div>
                <span>livingspringyork@gmail.com</span>
              </a>
              <a href="tel:717-919-3033" className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors group">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-red-900/30 transition-colors">
                  <FaPhone className="h-4 w-4" />
                </div>
                <span>717-919-3033</span>
              </a>
              <a href="https://maps.google.com/maps/dir/?api=1&destination=1550+Eleventh+Ave,+York+PA+17402" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors group">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-red-900/30 transition-colors">
                  <FaMapPin className="h-4 w-4" />
                </div>
                <span>1550 Eleventh Avenue York, PA 17402</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
                // { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
                // { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-lg hover:bg-red-700 transition-all hover:scale-110 shadow-lg group"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-red-400 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white mb-6 text-lg">Resources</h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-red-400 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} RCCG York - Champions' Chapel. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-red-400 transition-colors">Privacy Policy</a>
              <span className="text-gray-700">|</span>
              <a href="#" className="hover:text-red-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-4 bg-linear-to-br from-red-600 to-red-800 text-white rounded-full shadow-2xl hover:shadow-xl transition-all hover:scale-110 z-40 group"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
}