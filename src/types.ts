// Interface criada para definir os tipos de valores que cada produto deve conter.
export interface Product{
    name: string;
    price: string;
    imagePath: string;
    rating: string;
    description: string;
}

// Interface criada para definir 3 categorias de produtos e seguir da forma que esta proposto no JSON mockado.
export interface ProductCategories{
    foods: Product[];
    drinks: Product[];
    desserts: Product[];
}