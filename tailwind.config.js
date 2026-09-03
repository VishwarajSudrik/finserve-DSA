/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0F172A',
          'navy-light': '#1E293B',
          'navy-lighter': '#334155',
          blue: '#2563EB',
          'blue-dark': '#1D4ED8',
          'blue-deep': '#1E40AF',
          'blue-light': '#3B82F6',
          'blue-bg': '#EFF6FF',
          green: '#059669',
          'green-light': '#10B981',
          'green-dark': '#047857',
          'green-bg': '#ECFDF5',
          slate: '#F8FAFC',
          'slate-dark': '#F1F5F9',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'fintech': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'fintech-lg': '0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'fintech-card': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px 0 rgba(15, 23, 42, 0.03)',
      },
      borderRadius: {
        'fintech': '0.625rem',
      }
    },
  },
  plugins: [],
}
