import './category.styles.scss';
import ProductCard from '../../components/product-card/product-card.component';
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectCategoriesMap, selectCategoryIsLoading } from '../../store/categories/categories.selector';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner.component';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoryIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);


    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <h2 className='cat-title'>{category.toUpperCase()}</h2>

            {
                isLoading ? <Spinner /> : (<div className='category-container'>
                    {
                        products && products.map((product) => <ProductCard key={product.id} product={product} />)
                    }
                </div>)
            }

        </Fragment>

    );
};

export default Category;