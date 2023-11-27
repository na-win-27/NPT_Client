// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff", // manually adjusted
    10: "#f6f6f6", // manually adjusted
    50: "#f0f0f0", // manually adjusted
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000", // manually adjusted
  },
  primary: {
    // blue
    900: "#0F3137",
    100: "#90EE90",
    200: "#40565A",
    300: "#2C494F",
    400: "#1C3D43",
    500: "#1B5A65", // manually adjusted
    600: "#18505A",
    700: "#15464F",
    800: "#123C43",
  },
  secondary: {
    // yellow
    50: "#f0f0f0", // manually adjusted
    100: "#fff2cc",
    200: "#F5BD98",
    300: "#F5A169",
    400: "#F5853B",
    500: "#FF6E0D",
    600: "#C4540A",
    700: "#933F07",
    800: "#622A05",
    900: "#312B28",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
    
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[500],
              light: tokensDark.primary[500],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[400],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[900],
              alt: tokensDark.primary[500],
            },
       
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
