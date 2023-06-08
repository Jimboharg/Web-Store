import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import { CartContext } from "../../contexts/cart.context";
import { Link } from "react-router-dom";

import Button from "../../components/button/button.component";

import "./item-specifics.styles.scss";

const ItemSpecifics = () => {
  const { itemId } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const { addItemToCart, setIsCartOpen, isCartOpen } = useContext(CartContext);

  let productType;
  let product;

  for (const category in categoriesMap) {
    const catObj = Object.values(categoriesMap[category]);
    product = catObj.find((item) => item.id.toString() === itemId.toString());
    if (product) {
      productType = category;
      break;
    }
  }

  // function findProductFromId(productId) {
  //   for (const category in categoriesMap) {
  //     productType = category;
  //     const catObj = Object.values(categoriesMap[category]);
  //     const foundProduct = catObj.find(
  //       (product) => product.id.toString() === productId.toString()
  //     );
  //     if (foundProduct) {
  //       return foundProduct;
  //     }
  //   }
  //   return null;
  // }

  //const product = findProductFromId(itemId);

  const clickHandler = () => {
    addItemToCart(product);
  };

  return (
    product && (
      <div className="product-page-container">
        <div className="product-detail-card-container">
          <div className="product-image-container">
            <img src={product.imageUrl} alt="" />
          </div>
          <div className="product-details-container">
            <div className="product-title-container">
              <h2>{product.name}</h2>
            </div>
            <div className="product-description-container">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum,
                nesciunt, soluta delectus repudiandae aut veniam eius dolores
                quo provident dignissimos ea blanditiis numquam autem, odit
                pariatur omnis nemo voluptate. Velit, eveniet. Eos magnam
                aliquid aut nam facere reprehenderit suscipit ipsam dolores
                nostrum laboriosam, ratione, non accusantium maxime provident
                odit doloremque.
              </p>
              <div className="price-container">
                <h2>£{product.price}</h2>
                <Button onClick={clickHandler}>Add to Basket</Button>
              </div>
              <Link to={"/shop/" + productType} className="back-to-category">
                &#10094; Back to
                {" " +
                  productType.charAt(0).toUpperCase() +
                  productType.slice(1)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ItemSpecifics;
