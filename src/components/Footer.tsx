"use client";

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-card border-t border-border py-6 mt-20"
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © 2025 OrderZap | Built with ❤️ using Next.js
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
