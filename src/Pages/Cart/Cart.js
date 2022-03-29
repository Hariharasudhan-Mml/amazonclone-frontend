import { useDispatch, useSelector } from 'react-redux';
import "./Cart.css";
import ReactStars from 'react-rating-stars-component';
import { Button } from '@material-ui/core';
import { Done, CheckCircle } from '@material-ui/icons';
import NumberFormat from 'react-number-format';
import Header from '../../components/Header/Header';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Razorpay from 'razorpay';
const Cart = () => {


   
    const [cartItems, setCartItem] = useState([]);
    const getTotal = (total, item) => (total += Number(item.salePrice));
    const cartTotal = cartItems? cartItems.reduce(getTotal, 0) : 0;
    ////////////

    const Auth = useSelector(state => state.isAuthenticated);
    const name = useSelector(state => state.username)



    /////////////

    const proceedCheckout = async () => {
        if(Auth){
        loadScript();
        var options = {
            'key':process.env.REACT_APP_RAZORPAY_KEY_ID,
            "amount":0,
            "name": "",
            "description": '',
            "order_id": '',
            "handler": function (response) {
                console.log('payment =====' + response)
                var values = {
                    razorpay_signature: response.razorpay_signature,
                    razorpay_order_id: response.razorpay_order_id,
                    transactionid: response.razorpay_payment_id,
                    transactionamount:cartTotal*100
                };

                Axios.post('https://amazon-clone-by-hari.herokuapp.com/payment', values).then(res => alert(res.data)).catch(e => alert(e.message))
            },

            "prefill": {
                "name": name,
                "email": '123@getMaxListeners.com',
                "contact": '123455778'
            },
            "theme": {
                "color": "#528ff0"
            },
        };

        Axios.post('https://amazon-clone-by-hari.herokuapp.com/order', { amount:cartTotal*100}).then(res=>{
            options.order_id=res.data.order.id;
            options.amount=res.data.order.amount;
            
            const rzp=new window.Razorpay(options);
            rzp.open();
        }).catch(e=>console.log(e))
    }else{
        alert('login to proceed further');
        window.location='/signup'
    }
    }

    const loadScript = () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!Auth) {
            // localStorage.setItem('cart', JSON.stringify(cartItems))
            setCartItem(localStorage.getItem('cart') !== 'null' ? JSON.parse(localStorage.getItem('cart')) : []);
            // console.log(localStorage.getItem('cart') !== 'null' ? JSON.parse(localStorage.getItem('cart')): [])
            console.log('local storage --item' + JSON.parse(localStorage.getItem('cart')))
            // setCartTotal(() => cartItems.reduce(getTotal, 0))
            console.log('useState items===' + cartItems)
            console.info(localStorage.getItem('cart'));
        }
        else {
            console.log('authenticated')

            const fetchItems = async () => {
                const response = await Axios.get('https://amazon-clone-by-hari.herokuapp.com/getitem', {
                    headers: {
                        "Authorization": localStorage.getItem('token')
                    }
                });
                if (response.data.msg) {
                    alert(response.data.msg)
                } else {
                    const { items } = response.data;
                    setCartItem(items);
                }
            }
            fetchItems();
        }
        // setCartTotal(cartItems.reduce(getTotal, 0));
    }, [])


    // Remove Item from the localStorage
    const removeItem = (id) => {
        if (!Auth) {
            setCartItem(cartItems.filter(elem => id != elem.id))
            localStorage.setItem('cart', JSON.stringify(cartItems))
        } else {
            const removeItems = async () => {
 const updated = await Axios.post('https://amazon-clone-by-hari.herokuapp.com/removeitem', {
                    id
                }, {
                    headers: {
                        "Authorization": localStorage.getItem('token')
                    },
                });
                setCartItem(updated.data.items);
            }
            removeItems();
        }
        // setCartTotal(cartItems.reduce(getTotal, 0));

    }


    // subComponent       
    // subcomponent starts here
    const CartItem = ({ id, imgsrc, description, price, prime, rating }) => {

        return <div className='cart__item'>
            <div className='cartItem__img'>
                <img src={imgsrc} />
            </div>
            <div className='cartItem__details'>
                <p className='cartItem__description'>{description}</p>
                <ReactStars size={24} value={Number(rating)} />
                {prime && <div className="product__prime"><Done /><span>Prime</span></div>}
                {Number(price) > 1000 && <div className='cartItem__shipping'>Eligible for Free shipping</div>}
                <Button className='cart__deleteBtn' size='small' onClick={() => removeItem(id)}>Delete</Button>
            </div>
            <p className='cartItem__price'> &#8377; <NumberFormat value={price} thousandSeparator={true} displayType="text" /></p>
        </div>
    }

    // subcomponent ends here

    return <>
        <Header />
        <div className="cart">
            <div className='cart__left'>
                <div className='cart__top'>
                    <h1>Shopping Cart</h1>
                    <p>Price</p>
                </div>
                {
                    cartItems ? cartItems.map(({ id, img, desc, salePrice, prime, rating }, index) => <CartItem key={index} id={id} imgsrc={img} description={desc} price={salePrice} prime={prime} rating={rating} />)
                        : <h2>No items in your cart</h2>}
                <div className='cart__total'>
                    {cartItems && <p>Subtotal({cartItems && cartItems.length} items) : <b><NumberFormat thousandSeparator={true} value={cartTotal} displayType="text" /></b></p>}
                </div>
            </div>
            <div className='cart__right'>
                <div className='cart__hint'>
                    <CheckCircle /><p><span>
                        Part of your order qualifies for FREE Delivery</span>. Select this option at checkout. Details</p>
                </div>
                <div className='cart__total'>
                    {cartItems ? <p>Subtotal({cartItems.length} items) : <b><NumberFormat thousandSeparator={true} value={cartTotal} displayType="text" /></b></p> : <h3>Cart Empty</h3>}
                </div>
                {cartItems && <Button size='small' className='cart__proceedBtn' onClick={proceedCheckout}>Proceed to Buy</Button>}
            </div>
        </div>
    </>
}


export default Cart;
