export interface Product{
    name: string;
    price: string;
    imagePath: string;
    rating: string;
    description: string;
}

export interface ProductCategories{
    food: Product[];
    drinks: Product[];
    dessert: Product[];
}