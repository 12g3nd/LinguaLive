/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        accent: 'var(--accent)',
        chatUser: 'var(--chat-user)',
        chatAi: 'var(--chat-ai)',
        borderBase: 'var(--border)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseBreath: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        slideUp: 'slideUp 0.6s ease-out forwards',
        slideInRight: 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        pulseBreath: 'pulseBreath 1.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
