import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { Fragment } from "react";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";
import { ReactComponent as Applogo } from "../../assets/crown.svg";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../store/user/user.selector";


const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to={'/'}>
                    <Applogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to={'/shop'}> Shop</NavLink>
                    {
                        currentUser ? (<NavLinks as='span' className="nav-link"
                            onClick={signOutUser}>Sign out</NavLinks>)
                            : (<NavLink to={'/auth'}> Sign In</NavLink>)
                    }

                    <CartIcon />

                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;  