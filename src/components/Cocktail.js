import { Link } from "react-router-dom";

const Cocktail = ({ id, alcohol, name, glass, img }) => {
  //   console.log(img, glass);
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={img} alt="cocktail drink" />
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{alcohol}</p>
        <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details">
          Details
        </Link>
      </div>
    </article>
  );
};

export default Cocktail;
