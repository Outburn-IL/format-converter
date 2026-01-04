import { defineConfig } from 'tsup';

export default defineConfig([
  // Node build
  {
    entry: ['src/index.ts'],
    dts: true,
    format: ['cjs', 'esm'],
    outDir: 'dist',
    sourcemap: true,
    clean: true,
    target: 'node18',
    minify: false,
    treeshake: true,
    skipNodeModulesBundle: true,
    // Bundle any ESM-only deps to avoid require() errors in CJS build
    // Keep existing external dependencies since they should support both formats
    external: [],
    splitting: false,
    outExtension({ format }) {
      if (format === 'esm') return { js: '.mjs' };
      return { js: '.cjs' };
    }
  },

  // Browser build - bundled IIFE
  {
    entry: ['src/browser.ts'],
    dts: false,
    format: ['iife'],
    platform: 'browser',
    outDir: 'dist',
    sourcemap: true,
    clean: false, // Don't clean since we have multiple builds
    target: 'es2018',
    minify: true,
    treeshake: true,
    noExternal: ['csvtojson', 'fast-xml-parser'], // Only bundle browser-compatible deps
    splitting: false, // No splitting for browser bundle
    globalName: 'FormatUtils', // Global name for IIFE
    outExtension({ format }) {
      return { js: '.js' };
    }
  }
]);