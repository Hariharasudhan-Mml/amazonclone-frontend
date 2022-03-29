import "./Home.css";
import Header from "../../components/Header/Header";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import ReactStars from 'react-rating-stars-component'
import { Button } from "@material-ui/core";
import {useSelector } from "react-redux";
import { Done } from "@material-ui/icons";
import NumberFormat from 'react-number-format';
import Axios from 'axios';
import products from '../../cartItems'; // import product from  products array



const Home = () => {
    const Auth = useSelector(state => state.isAuthenticated);

    const addItem = async (id, desc,img, salePrice, brand,rating) => {
        if (!Auth) {
            let arr;
            if (localStorage.getItem('cart')) {
                arr = JSON.parse(localStorage.getItem('cart'));
                const newElem = products.find(elem => elem.id === id);
                arr.push(newElem)
                localStorage.setItem('cart', JSON.stringify(arr))
            } else {
                arr = [products.find(elem => elem.id === id)];
                localStorage.setItem('cart', JSON.stringify(arr))
            }
        } else {
            const token = localStorage.getItem('token');
            const response = await Axios.post('https://amazon-clone-by-hari.herokuapp.com/additems', {
                id,
                desc,
                img,
                salePrice,
                brand,
                rating
            }, {
                headers: {
                    'Authorization': token
                },
            });
            console.log(response)
        }
    }


    const Products = ({ id, imgsrc, description, brand, price, salePrice, prime, rating }) => {
        return <div className="product">
            <img src={imgsrc} />
            <p className="product__description">{description}</p>
            <p className="product__brand">{brand}</p>
            <div className="product__ratings">
                <ReactStars
                    size={24}
                    value={Number(rating)}
                    activeColor="#ffd700"
                />
                <p className="product__price">&#8377; <span className="saleprice"> <NumberFormat value={salePrice} thousandSeparator={true} displayType="text" /></span>{price && <span className="price"><NumberFormat value={price} thousandSeparator={true} displayType="text" /></span>}</p>
                <p className="product__discount"><>({Math.round(((Number(price) - Number(salePrice)) / Number(price)) * 100)}%)</><span className="save">you'll save &#8377;<NumberFormat value={Number(price) - Number(salePrice)} thousandSeparator={true} displayType="text" /></span></p>
            </div>
            {prime && <div className="product__prime"><Done /><span>Prime</span></div>}
            <Button className="addToCart" onClick={() => addItem(id, description, imgsrc, salePrice, brand,rating)}>Add to Cart</Button>
        </div>
    }








    return <div className="home">
        <Header />
        <Carousel autoPlay showThumbs={false}>
            <div>
                <img src="https://docs.getasa2.com/_images/carousel_layout_example_2.png" height="300px" />
                <p className="legend">1 image</p>
            </div>
            <div>
                <img src="http://csshint.com/wp-content/uploads/2020/11/Bootstrap-Carousel-Testimonials.jpg" height="300px" />
                <p className="legend">2 image</p>
            </div>
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZBdFun5pbo4yX6Mbf-r0K9-h4kAyPOBKLxg&usqp=CAU" height="300px" />
                <p className="legend">3 image</p>
            </div>
        </Carousel>
        <div className="products__container">
            {
                products.map((product, i) => (<Products key={i} id={product.id} imgsrc={product.img} description={product.desc} brand={product.brand} price={product.price} salePrice={product.salePrice} prime={product.prime} rating={product.rating} />))
            }
        </div>

    </div>
}


export default Home;





