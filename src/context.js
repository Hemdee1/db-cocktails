import { useCallback, useContext, useEffect, useState } from "react";
import React from "react";

const AppContext = React.createContext();
const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktail, setCocktail] = useState([]);

  const fetchCocktail = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        setLoading(false);
        const newCocktail = drinks.map((item) => {
          const {
            idDrink: id,
            strAlcoholic: alcohol,
            strDrink: name,
            strGlass: glass,
            strDrinkThumb: img,
          } = item;
          return {
            id,
            alcohol,
            name,
            glass,
            img,
          };
        });
        setCocktail(newCocktail);
      } else {
        setCocktail([]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchCocktail();
  }, [fetchCocktail]);

  return (
    <AppContext.Provider value={{ loading, setSearchTerm, cocktail }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
