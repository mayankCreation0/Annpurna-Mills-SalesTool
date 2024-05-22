const getDesignTokens = (mode) => ({
    palette: {
        mode,
        applicationTheme: {
            main: "#6082B6",
            primary: "#6495ED",
            secondary: "#FFA500", // Added secondary color
            bgColor: mode === 'dark' ? "#333333" : "#FFFFFF",
            textColor: mode === 'dark' ? "#FFFFFF" : "#000000",
            textColor2: mode === 'dark' ? "#CCCCCC" : "#333333",
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
                            color: theme.palette.applicationTheme.textColor,
                            fontWeight: "400",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.applicationTheme.textColor,
                                borderWidth: "1.5px",
                            },
                            "&.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme.palette.applicationTheme.primary,
                                    borderWidth: "1.5px",
                                },
                            },
                        },
                        "& .MuiInputLabel-outlined": {
                            color: theme.palette.applicationTheme.textColor,
                            fontWeight: "500",
                            "&.Mui-focused": {
                                color: theme.palette.applicationTheme.primary,
                            },
                        },
                        ...(theme.palette.mode === 'dark' && {
                            "& .MuiOutlinedInput-root": {
                                color: theme.palette.applicationTheme.textColor2,
                            },
                            "& .MuiInputLabel-outlined": {
                                color: theme.palette.applicationTheme.textColor2,
                            },
                        }),
                    }),
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        textTransform: 'none',
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: theme.palette.applicationTheme.primary,
                            color: theme.palette.applicationTheme.bgColor,
                        },
                        ...(theme.palette.mode === 'dark' && {
                            color: theme.palette.applicationTheme.textColor2,
                        }),
                    }),
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        backgroundColor: theme.palette.applicationTheme.main,
                        ...(theme.palette.mode === 'dark' && {
                            backgroundColor: theme.palette.applicationTheme.bgColor,
                        }),
                    }),
                },
            },
            MuiTypography: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        color: theme.palette.applicationTheme.textColor,
                        ...(theme.palette.mode === 'dark' && {
                            color: theme.palette.applicationTheme.textColor2,
                        }),
                    }),
                },
            },
        },
    };
}
