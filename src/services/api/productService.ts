import mock_products from "../../mock/json/mock_products.json";
import { ProductCategories } from "../../types";

const ProductService = {
    getProducts: async () : Promise<ProductCategories> => {
        try{
            return Promise.resolve(mock_products.products);
        } catch(error){
            console.log('Error fetching products: ',error);
            throw error;
        }
    }
};

export default ProductService;