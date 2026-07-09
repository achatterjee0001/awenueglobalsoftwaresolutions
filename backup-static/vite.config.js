import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        products: resolve(__dirname, 'products.html'),
        productDetails: resolve(__dirname, 'product-details.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        blog: resolve(__dirname, 'blog.html'),
        blogDetails: resolve(__dirname, 'blog-details.html'),
        careers: resolve(__dirname, 'careers.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        error404: resolve(__dirname, '404.html'),
        designSystem: resolve(__dirname, 'design-system.html')
      }
    }
  }
});
