import { createTheme } from "@mui/material/styles";


const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ab3331',
            light: '#F5DDDB',
            dark: '#a22127',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#F5DDDB',
            contrastText: '#201A19',
        }, 
        text: {
            primary: '#201A19',
        }
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffb3ad',
            contrastText: '#68000a'
        }, 
        secondary: {
            main: '#e7bdb9', 
            contrastText: '#442927'
        },
    },
    components: {
        // @ts-ignore
        MuiCalendarPicker: {
            styleOverrides: {
                root: {
                    color: "white"
                }
            }
        },
    }
});

export {lightTheme, darkTheme} 