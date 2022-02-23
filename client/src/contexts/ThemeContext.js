import React,{useState, createContext, useEffect} from 'react';
export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const storedTheme = localStorage.getItem('theme');
  //const initialTheme = storedTheme ? true : false;
  //var setter = storedTheme === 'darkmode' ? true : false;
  const initialTheme = false
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme ? 'darkmode' : 'lightmode')
    console.log(localStorage)
  }, [theme]);

  return(
    <ThemeContext.Provider value={[theme, setTheme]}>
        {props.children}
    </ThemeContext.Provider>
  );
}