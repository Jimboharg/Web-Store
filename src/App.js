import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import ItemDetail from "./routes/item/item-detail.component";

// shop/* means that anything after shop/ should be matched and forwarded to the shop page 
// whereby the shop page will take care of further routes

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="item/*" element={<ItemDetail />} />     
      </Route>
    </Routes>
  );
};

export default App;
