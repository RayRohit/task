import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css"
// import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { cartActions } from '../Redux/cartSlice/cartSlice';

export default function MainCart() {
    const {cartItems} = useSelector((state)=>state.cart)
    const[cart,setCart] = useState([])
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    useEffect(()=>{
        try{
            axios("https://fakestoreapi.com/products")
            .then((res)=>{
                setCart(res.data)
            })
            .catch((err)=>console.log(err))
        }
        catch(err){
            console.log(err);
        }
    },[])
  
    const options = {
        margin: 10,
        responsiveClass: true,
        nav: true,
        dots: false,
        loop:'true',
        autoplay: false,
        navText: ["◀", "▶"],
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 2,
            },
            700: {
                items: 2,
            },
            1000: {
                items: 5,
            },
            1024 :{
                items:3
            },
            1440:{
                items:4
            },
            2560:{
                items:5
            }
        },
    };
  return (
    <div className='pt-5'>
        <>

            <OwlCarousel className="owl-theme" {...options}>
                  {
                      cart.map((item)=>{
                          return(
                              <div className="item" key={item.id}>
                                  <div className='card border-0 shadow mx-auto p-2 '   style={{width:"18rem"}}>
                                      <div>
                                          <img className='img-fluid card-img-top d-block mx-auto rounded' style={{width:"100px",height:"100px"}}  src={item.image} alt={item.title}/>
                                      </div>
                                      <div className='card-body text-center'>
                                          <h5 className='fst-italic' style={{textShadow:"2px 2px 5px",fontSize:"12px"}}>{item.title}</h5>
                                          <h6 className='pt-2 fw-bold'>Price : ${item.price}</h6>
                                          <div>
                                              <button className='btn btn-info' onClick={()=>dispatch(cartActions.AddToCart(item))}>Add To Cart</button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          )
                      })
                  }
            </OwlCarousel>
      </>
    </div>
  )
}
