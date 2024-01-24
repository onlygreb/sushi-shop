import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, ShoppingCart as ShoppingCartIcon, Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Toolbar, IconButton, Badge, InputBase, Button, alpha, Box } from '@mui/material';
import theme from '../../theme';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import './Home.css';
import { Product, ProductCategories } from '../../types';
import ProductService from '../../services/api/productService';
import ProductCard from '../../components/ProductCard';

// Declaração de componentes estilizados utilizando MaterialUI como referencia.
const SearchInput = styled(InputBase)({
    color: 'inherit',
    marginLeft: '8px',
    width: '100%',
});

const SearchContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    width: '100%',
});

const CategoryButton = styled(Button)({
    color: 'inherit',
    marginRight: '8px',
});

export default function Home() {
    const categories = ['Foods', 'Drinks', 'Desserts'];
    const [menuDrawerState, setMenuDrawerState] = useState(false);
    const [foods, setFoods] = useState<Product[]>([]);
    const [drinks, setDrinks] = useState<Product[]>([]);
    const [desserts, setDesserts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount, setCartCount] = useState(0);

    // Função para viajar até a categoria selecionada.
    const handleCategoryClick = (category: string) => {
        let categoryText: HTMLElement | null = document.getElementById(category.toLowerCase() + "Text");

        if (categoryText) {
            categoryText.scrollIntoView();
        }
    };

    // Função para auxiliar na busca por produtos.
    const handleSearchInput = (e: any) => {
        setSearchQuery(e.target.value);
    }

    // Função para incrementar o contador de produtos no carrinho.
    const buyProduct = () => {
        let value = cartCount + 1;
        setCartCount(value);
    }

    // useEffect utilizado para buscar os produtos utilizando o JSON mockado.
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response: ProductCategories = await ProductService.getProducts();
                setFoods(response.foods);
                setDrinks(response.drinks);
                setDesserts(response.desserts);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    });

    // Variaveis criadas para conter os produtos e mapear na criação dos cards.
    let filteredFoods;
    let filteredDrinks;
    let filteredDesserts;

    // Operador logico utilizadoo para filtrar os produtos utilizando o valor do campo de busca como referencia.
    if (searchQuery != '') {
        filteredFoods = foods.filter((food) => food.name.toLowerCase().includes(searchQuery.toLowerCase()));
        filteredDrinks = drinks.filter((drink) => drink.name.toLowerCase().includes(searchQuery.toLowerCase()));
        filteredDesserts = desserts.filter((dessert) => dessert.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
        filteredFoods = foods;
        filteredDrinks = drinks;
        filteredDesserts = desserts;
    }

    return (
        <ThemeProvider theme={theme}>
            <div className='mainDiv'>
                {/* Componente de AppBar utilizado para criar uma barra superior na aplicação contendo os botões e o campo de busca. */}
                <AppBar position="static">
                    <Toolbar>
                        {/* Componente de IconButton criado para ser utilizado apenas quando o usuario estiver em um dispositivo mobile. */}
                        <IconButton className='menuMobileButton' color="inherit" onClick={() => {
                            setMenuDrawerState(!menuDrawerState);
                        }}>
                            <MenuIcon />
                        </IconButton>

                        {/* Div criada com um map interno gerando um botão para cada categoria fornecida pela variavel >categories< */}
                        <div style={{ display: 'flex' }}>
                            {categories.map((category) => (
                                <CategoryButton
                                    key={category}
                                    color="inherit"
                                    onClick={() => handleCategoryClick(category)}
                                    className='categoryButton'
                                >
                                    {category}
                                </CategoryButton>
                            ))}
                        </div>

                        {/* Componente SearchContainer criado para conter o campo de busca no qual fornece seu valor como referencia para os filtros dos produtos. */}
                        <SearchContainer>
                            <div className='searchInputDiv' style={{ backgroundColor: alpha(theme.palette.common.white, 0.15) }}>
                                <SearchInput
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchQuery}
                                    onChange={handleSearchInput}
                                />
                                <SearchIcon style={{ margin: '5px' }} />
                            </div>
                        </SearchContainer>

                        <IconButton color="inherit" aria-label="shopping cart">
                            <Badge badgeContent={cartCount} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>


                    </Toolbar>
                </AppBar>

                {/* Drawer de botões utilizado para navegação enquanto o usuario estiver em um dispositivo mobile. */}
                <div className={menuDrawerState ? 'mobileDrawerActive' : 'mobileDrawer'}>
                    <div className='drawerCategoryButtonsHolder'>
                        {categories.map((category) => (
                            <CategoryButton
                                key={category}
                                color="inherit"
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </CategoryButton>
                        ))}
                    </div>
                </div>

                {/* Div que possui o conteudo da pagina, sendo esse conteudo os cards para cada produto separado por categoria. */}
                <div className='contentDiv'>
                    <center>
                        <h1 id='foodsText'>
                            Foods
                        </h1>
                    </center>
                    <div className='productCardsHolder'>
                        {
                            filteredFoods.length > 0 ?
                                filteredFoods.map((food) => (
                                    <ProductCard key={food.name} product={food} onBuyClick={buyProduct} />
                                )) : <h3>There's no product to show!</h3>
                        }
                    </div>
                    <center>
                        <h1 id='drinksText'>
                            Drinks
                        </h1>
                    </center>
                    <div className='productCardsHolder'>
                        {
                            filteredDrinks.length > 0 ?
                                filteredDrinks.map((drink) => (
                                    <ProductCard key={drink.name} product={drink} onBuyClick={buyProduct} />
                                )) : <h3>There's no product to show!</h3>
                        }
                    </div>
                    <center>
                        <h1 id='dessertsText'>
                            Desserts
                        </h1>
                    </center>
                    <div className='productCardsHolder'>
                        {
                            filteredDesserts.length > 0 ?
                                filteredDesserts.map((dessert) => (
                                    <ProductCard key={dessert.name} product={dessert} onBuyClick={buyProduct} />
                                )) : <h3>There's no product to show!</h3>
                        }
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}