import React from 'react';
import { Card, CardContent, Typography, Button, Rating } from '@mui/material';
import { Product } from '../types';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import './ProductCard.css';

// Interface criada para definir os valores tratados neste componente.
interface ProductCardProps {
    product: Product;
    onBuyClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyClick }) => {
    return (
        <Card className='productCard'>
            {/* Componente auxiliar ao compontente Card, com a função de conter o conteudo do card. */}
            <CardContent>
                {/* Div criada com o propósito de conter os valores dos produtos, tais como nome, descrição, imagem, preço e avaliação. */}
                <div className='productCardContentHolderDiv'>
                    <Typography variant="h6" component="div" className='productCardImageHolderDiv'>
                        <img id='productCardImage' src={product.imagePath}></img>
                        <span>{product.name}</span>
                    </Typography>
                    <Typography variant="body2">
                        {product.description}
                    </Typography>
                    <Typography variant="subtitle1">
                        Price: ${product.price}
                    </Typography>
                    <Typography variant="subtitle1">
                        <Rating name="read-only" value={parseFloat(product.rating)} readOnly />
                    </Typography>
                </div>

                {/* Div criada com o propósito de conter o botão de comprar, tal Div foi criada com o proposito também de alinhar o botão e manter um padrão em todos os cards. */}
                <div className='productCardButtonHolderDiv'>
                    <Button
                        variant="contained"
                        onClick={onBuyClick}
                        className='productCardButton'
                    >
                        <ShoppingCart id='productCardShoppingCartIcon' />
                        Buy
                    </Button>
                </div>
            </CardContent>
        </Card >
    );
};

export default ProductCard;