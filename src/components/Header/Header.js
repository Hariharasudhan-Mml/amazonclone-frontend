import { ArrowDownward, ArrowDropDown, Menu, Search, ShoppingBasket, RoomOutlined ,ShoppingCart} from '@material-ui/icons'
import './Header.css';
import { useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux';


const Header = () => {

    const navigate=useNavigate();
    const name=useSelector(state=>state.username);
    const Auth=useSelector(state=>state.isAuthenticated);

    return <div className="header">
        <div className="header__top">
            <img className="header__logo" src="https://www.seekpng.com/png/full/18-181177_amazon-logo-png-magnetic-rinse-cup-with-toothbrush.png" onClick={()=>window.location='/'} />
            <div className="header__address">
                <p className="small">Hello</p>
                <p className="bold"><RoomOutlined/>Select your Address</p>
            </div>
            <div className='header__input'>
                <input type="text" />
                <Search />
            </div>
            <div className='header__accounts' onClick={()=>window.location='/signup'}>
                { !Auth ?<><p className='small'>Hello sign-in</p><p className='bold'> Account's & Lists</p></>:<p className='bold  username'>{name}</p>}
            </div>
            <div className='header__orders'>
                <p className='small'>Returns</p>
                <p className='bold'> & Orders</p>
            </div>
            <div className='header__cart' onClick={()=>navigate('/cart')}>
                <ShoppingCart/> Cart
            </div>
        </div>
        <div className="header__nav">
            <div className='header__nav--left'>
                <Navlink Icon={Menu} name="all" />
                <Navlink name="best sellers" />
                <Navlink name="mobiles " />
                <Navlink name="today's deals" />
                <Navlink name="customer service" />
                <Navlink name="electronics" />
                <Navlink Icon={ArrowDropDown} name="prime" />
                <Navlink name="fashion" />
                <Navlink name="books " />
                <Navlink name="new releases" />
            </div>
            <div className='header__nav--right'>
                <h2>Shopping made easy | Download the app</h2>
            </div>
        </div>
    </div>
}


export default Header;



const Navlink = ({ Icon, name }) => {
    return <div className='navlink'>
        {Icon && <Icon />}
        <p>{name}</p>
    </div>
}
