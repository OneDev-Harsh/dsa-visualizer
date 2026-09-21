'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Code2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-[#1e1e22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <Link href="/" className="flex items-center gap-2 text-[#ececec] hover:text-[#3b82f6] transition-colors">
            <Code2 className="h-5 w-5 text-[#3b82f6]" />
            <span className="font-semibold text-sm">DSA Visualizer</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/algorithms" className="text-[13px] text-[#6b6b76] hover:text-[#ececec] transition-colors">
              Explorer
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#6b6b76] hover:text-[#ececec] transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-[#1e1e22] bg-[#0a0a0c]/95 backdrop-blur-md"
          >
            <div className="px-4 py-3 space-y-1">
              <Link
                href="/algorithms"
                className="block text-[13px] text-[#8e8e9a] hover:text-[#ececec] transition-colors py-2.5"
                onClick={() => setMenuOpen(false)}
              >
                Explorer
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
