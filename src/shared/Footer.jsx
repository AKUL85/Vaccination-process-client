import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <motion.footer
    id="contact"
    className="bg-gray-800 text-white pt-12 pb-6"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.8 }}
  >
    <div className="container mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-6">
      <div>
        <h5 className="text-xl font-bold mb-4 text-primary">VaxTrack</h5>
        <p className="text-gray-400 text-sm">Automating public health for a healthier nation.</p>
      </div>
      <div>
        <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="#features" className="hover:text-primary transition">Features</a></li>
          <li><Link to="/auth" className="hover:text-primary transition">Login</Link></li>
          <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
        </ul>
      </div>
      <div>
        <h5 className="text-lg font-semibold mb-4">Support</h5>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="#contact" className="hover:text-primary transition">FAQ</a></li>
          <li><a href="#contact" className="hover:text-primary transition">Help Center</a></li>
        </ul>
      </div>
      <div>
        <h5 className="text-lg font-semibold mb-4">Contact</h5>
        <p className="text-gray-400 flex items-center text-sm">
          <Phone className="w-4 h-4 mr-2 text-primary" /> +880-123-456789
        </p>
        <p className="text-gray-400 mt-2 text-sm">support@vaxtrack.com</p>
      </div>
    </div>
    <div className="container mx-auto px-4 lg:px-8 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} VaxTrack. All rights reserved.
    </div>
  </motion.footer>
);

export default Footer;
