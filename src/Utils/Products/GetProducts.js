import { filterData } from "../Products/FilterData";
import { sortData } from "../Products/SortData";

export function getProducts(stateValue) {
  const filteredProducts = filterData(stateValue.data, stateValue.filter);
  const sortedProducts = sortData(filteredProducts, stateValue.sort);
  return sortedProducts;
}
