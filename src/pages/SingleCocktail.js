import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState([]);

  const fetchCocktail = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url + id);
      const data = await response.json();
      const drinks = data.drinks[0];

      if (drinks) {
        const {
          strDrink: name,
          strAlcoholic: alcohol,
          strCategory: category,
          strGlass: glass,
          strDrinkThumb: image,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = drinks;

        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ];

        const newCocktail = {
          name,
          alcohol,
          category,
          glass,
          image,
          ingredients,
        };

        setLoading(false);
        setCocktail(newCocktail);
      } else {
        setCocktail([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchCocktail();
  }, [id, fetchCocktail]);

  if (loading) {
    return <Loading />;
  }

  const { name, alcohol, category, glass, image, ingredients } = cocktail;

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {alcohol}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {ingredients &&
              ingredients.map((item, index) => {
                return item ? <span key={index}>{item},</span> : null;
              })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
