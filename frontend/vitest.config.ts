/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { config } from "@vue/test-utils";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',  // Symuluje przeglądarkę, wymagane dla Vue
    setupFiles: './tests/setupTests.ts', // Plik setup dla dodatkowych mocków
    deps: {
      inline: ['apexcharts'], // Zapewnia poprawne działanie `apexcharts`
    },
    coverage: {
      reporter: ['text', 'json', 'html'], // Generuje raporty pokrycia kodu
      exclude: ['node_modules/', 'tests/', 'vitest.config.ts'],
    }
  },
  resolve: {
    alias: {
      '@': '/src', // Ułatwia importowanie plików np. `import { useStore } from '@/stores/myStore'`
      '@stores': '/src/stores',
      '@components': '/src/components'
    }
  }
});
