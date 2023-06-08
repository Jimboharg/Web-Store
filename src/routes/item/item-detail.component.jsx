import { Routes, Route } from "react-router-dom";
import ItemSpecifics from "../item-specifics/item-specifics.component";

const ItemDetail = () => {
  return (
    <Routes>
      <Route path=":itemId" element={<ItemSpecifics />} />
    </Routes>
  );
};

export default ItemDetail;
