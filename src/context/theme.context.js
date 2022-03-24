import { createContext } from "react";
import { createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

function ThemeWrapper(props) {


    const theme = createTheme({
       
        status: {
          danger: '#e53e3e',
        },
        palette: {
          primary: {
            main: "#547980",
            darker: '#053e85',
          },
         secondary:{
            main: '#594F4F',
         },
          btn: {
            main: "#45ADA8",
            contrastText: '#fff',
          },

          grisazulado: {
            main: "#9DE0AD"
          },
          gris: {
              main: "#E5FCC2"
          }

        },
      });



  // creamos el obj con todo el contexto
  const passedContext = {
    theme
  }


  return (
    <ThemeContext.Provider value={passedContext}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeWrapper }