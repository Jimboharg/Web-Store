import { Link } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";
import SeeAll from "../see-all/see-all.component";

import "./category-preview.styles.scss";

const CategoryPreview = ({ products, title }) => {
  const numberOfProductsToPreview = 5;


  return (
    <div className="category-preview-container">
      <div className="category-preview-title-container">
        <h2>
          <Link className="title" to={title}>
            {title.toUpperCase()}
          </Link>
        </h2>
      </div>
      <div className="preview" id={title}>
        {products.map(
          (item, index) => 
            index < numberOfProductsToPreview && (
              <ProductCard key={item.id} product={item}/>
            )
        )}
        <SeeAll title={title} />
      </div>
    </div>
  );
};

export default CategoryPreview;
