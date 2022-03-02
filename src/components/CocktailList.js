import { useGlobalContext } from "../context";
import Loading from "./Loading";
import Cocktail from "./Cocktail";

const CocktailList = () => {
  const { loading, cocktail } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (cocktail.length < 1) {
    return (
      <section className="section about-section">
        <h2>No cocktail to display</h2>
      </section>
    );
  }
  return (
    <section className="section">
      <h1 className="section-title">cocktail</h1>
      <div className="cocktails-center">
        {cocktail.map((item, index) => {
          return <Cocktail {...item} key={index} />;
        })}
      </div>
    </section>
  );
};

export default CocktailList;
