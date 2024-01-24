import mock_products from "../../mock/json/mock_products.json";
import { ProductCategories } from "../../types";

const ProductService = {
    // Função criada para obter os valores do JSON de produtos mockados.
    getProducts: async (): Promise<ProductCategories> => {
        try {
            // Utilização de Promise para simular a chamada de uma API.
            return Promise.resolve(mock_products.products);
        } catch (error) {
            console.log('Error fetching products: ', error);
            throw error;
        }
    }
};

export default ProductService;