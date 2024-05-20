const getDesignTokens = (mode) => ({
    palette: {
        mode,
        applicationTheme: {
            main: "#6082B6",
            primary:"#6495ED",
            secondary:"",
            bgColor:"#FFFFFF",
            textColor:"#000000",
            textColor2:"#FFFFFF",
        },
        
    },
    typography: {
        fontFamily: ['"Open Sans", "sans-serif"'].join(','),
        h1: {
            fontSize: 60,
            fontWeight: 600,
            lineHeight: 78 / 70,
            letterSpacing: -0.2,
        },
        h2: {
            fontSize: 48,
            fontWeight: 600,
            lineHeight: 1.2,
        },
        h3: {
            fontSize: 42,
            lineHeight: 1.2,
        },
        h4: {
            fontSize: 36,
            fontWeight: 500,
            lineHeight: 1.5,
        },
        h5: {
            fontSize: 20,
            fontWeight: 600,
        },
        h6: {
            fontSize: 18,
        },
        subtitle1: {
            fontSize: 18,
        },
        subtitle2: {
            fontSize: 16,
        },
        body1: {
            fontWeight: 400,
            fontSize: 15,
        },
        body2: {
            fontWeight: 400,
            fontSize: 14,
        },
        caption: {
            fontWeight: 400,
            fontSize: 12,
        },
    },
});

export default function getLPTheme(mode) {
    return {
        ...getDesignTokens(mode),
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        "& .MuiOutlinedInput-root": {
                            color: "#000",
                            fontWeight: "400",
                            // Class for the border around the input field
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "black",
                              borderWidth: "1.5px",
                            },
                            "&.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "black",
                                  borderWidth: "1.5px",
                                },
                                
                              },
                              
                          },
                          // Class for the label of the input field
                          "& .MuiInputLabel-outlined": {
                            color: "black",
                            fontWeight: "500",
                            "&.Mui-focused": {
                                color: "black",
                                 
                            },
                          },
                        ...(theme.palette.mode === 'dark' && {
                            
                        }),
                    }),
                },
            },
           
        },
    };
}