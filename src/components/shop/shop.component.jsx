import { Route, Routes } from 'react-router-dom';
import './shop.styles.scss';
import CategoriesPreview from '../../routes/category-preview/categories-preview.component';
import Category from '../../routes/category/category.component';
import { useEffect } from 'react';
import { fetchCategoriesAsync } from '../../store/categories/categories.action';
import { useDispatch } from 'react-redux';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, [dispatch]);

    return (

        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    );
}

export default Shop;