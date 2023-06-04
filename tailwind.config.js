/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    // './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Typography
      fontFamily: {
        poppins: 'Poppins',
        roboto: 'Roboto',
      }, // Define custom fonts
      // fontSize: {}, // Define custom font sizes
      // fontWeight: {}, // Define custom font weights
      // letterSpacing: {}, // Define custom letter spacing
      // lineHeight: {}, // Define custom line heights

      // Colors
      colors: {
        primary: 'var(--color-red-800)', // Use the same color as sky-800
      },
      textColor: {
        primary: '#38BDF8', // Can always use CSS variables too e.g. "var(--color-primary)",
        secondary: '#B91C1C',
        brand: '#243c5a',
      }, // Define custom text colors
      backgroundColor: {
        primary: '#0EA5E9',
        secondary: '#B91C1C', // Custom secondary color
        warning: '#FFB717', // Custom brand color
      },
      // Define custom background colors
      borderColor: {}, // Define custom border colors

      gradientColorStops: {
        primary: '#FF69b4', // Solid color fallback
        'primary-start': '#B91C1C', // Gradient start color
        'primary-end': '#B91C1C', // Gradient end color
      },

      // Spacing
      spacing: {}, // Define custom spacing values
      margin: {}, // Define custom margin values
      padding: {}, // Define custom padding values

      // Border
      borderWidth: {}, // Define custom border widths
      borderRadius: {}, // Define custom border radii

      // Shadows
      boxShadow: {}, // Define custom box shadows

      // Z-index
      zIndex: {}, // Define custom z-index values

      // Opacity
      opacity: {}, // Define custom opacity values

      // Screens and Breakpoints
      // screens: {}, // Define custom screens and breakpoints

      // Transitions
      // transitionProperty: {}, // Define custom transition properties
      // transitionDuration: {}, // Define custom transition durations
      // transitionTimingFunction: {}, // Define custom transition timing functions
      // transitionDelay: {}, // Define custom transition delays

      // darkMode: false, // Set default mode to light
    },
  },

  plugins: [],
};
