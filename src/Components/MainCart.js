import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css"
import { useDispatch } from 'react-redux';
import { cartActions } from '../Redux/cartSlice/cartSlice';
import { Form } from 'react-bootstrap';

export default function MainCart() {
    const [state, setState] = useState('')
    const [Products, setProducts] = useState([])
    const [Meals, setMeals] = useState([])
    const [Breakfast, setBreakfast] = useState([])
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({
        product: false,
        meals: false,
        breakfast: false,
        all: true
    })


    const options = {
        margin: 10,
        responsiveClass: true,
        nav: false,
        dots: false,
        loop: 'true',
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
            1024: {
                items: 3
            },
            1440: {
                items: 4
            },
            2560: {
                items: 5
            }
        },
    };

    useEffect(() => {
        try {
            axios(`http://localhost:3000/Products`)
                .then((res) => {
                    setProducts(res.data)
                })
                .catch((err) => console.log(err))
            axios(`http://localhost:3000/Meals`)
                .then((res) => {
                    setMeals(res.data)
                })
                .catch((err) => console.log(err))
            axios(`http://localhost:3000/Breakfast`)
                .then((res) => {
                    setBreakfast(res.data)
                })
                .catch((err) => console.log(err))
        }
        catch (err) {
            console.log(err);
        }
    }, [])


    useEffect(() => {
        if (!filters.breakfast && !filters.meals && !filters.product) setFilters({ ...filters, ['all']: true })
    }, [filters.breakfast, filters.meals, filters.product])



    return (
        <div className='pt-5'>
            <div className='container'>
                <div className='row '>
                    <div className='col-12 mt-3'>
                        <input type='text' className='form-control' onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className='col-12 mt-3'>
                        <Form.Group className="mb-3 d-flex flex-row justify-content-around">
                            <Form.Check type="checkbox" label="Products" onChange={() => {
                                setFilters({ ...filters, ['product']: !filters.product, ['all']: false })
                            }} />
                            <Form.Check type="checkbox" label="Meals" onChange={() => {
                                setFilters({ ...filters, ['meals']: !filters.meals, ['all']: false })
                            }} />
                            <Form.Check type="checkbox" label="Breakfast" onChange={() => {
                                setFilters({ ...filters, ['all']: false })
                                setFilters({ ...filters, ['breakfast']: !filters.breakfast, ['all']: false })
                            }} />
                        </Form.Group>
                    </div>
                    {
                        filters.all &&
                        <>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <h1>Products</h1>
                                    {
                                        Products.map((item) => {
                                            if (item.title.toLowerCase().includes(state.toLowerCase()))
                                                return (
                                                    <div className='col-sm-4 my-2 col-md-6 col-lg-4 col-xl-3'>
                                                        <div className="item" key={item.id}>
                                                            <div className='card border-0 shadow mx-auto p-2 ' style={{ width: "18rem" }}>
                                                                <div>
                                                                    <img className='img-fluid card-img-top d-block mx-auto rounded' style={{ width: "100px", height: "100px" }} src={item.image} alt={item.title} />
                                                                </div>
                                                                <div className='card-body text-center'>
                                                                    <h5 className='fst-italic' style={{ textShadow: "2px 2px 5px", fontSize: "12px" }}>{item.title}</h5>
                                                                    <h6 className='pt-2 fw-bold'>Price : ${item.price}</h6>
                                                                    <div>
                                                                        <button className='btn btn-info' onClick={() => dispatch(cartActions.AddToCart(item))}>Add To Cart</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <h1>Meals</h1>
                                    {
                                        Meals.map((item) => {
                                            if (item.title.toLowerCase().includes(state.toLowerCase()))
                                                return (
                                                    <div className='col-sm-4 my-2 col-md-6 col-lg-4 col-xl-3'>
                                                        <div className="item" key={item.id}>
                                                            <div className='card border-0 shadow mx-auto p-2 ' style={{ width: "18rem" }}>
                                                                <div>
                                                                    <img className='img-fluid card-img-top d-block mx-auto rounded' style={{ width: "100px", height: "100px" }} src={item.image} alt={item.title} />
                                                                </div>
                                                                <div className='card-body text-center'>
                                                                    <h5 className='fst-italic' style={{ textShadow: "2px 2px 5px", fontSize: "12px" }}>{item.title}</h5>
                                                                    <h6 className='pt-2 fw-bold'>Price : ${item.price}</h6>
                                                                    <div>
                                                                        <button className='btn btn-info' onClick={() => dispatch(cartActions.AddToCart(item))}>Add To Cart</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <h1>Breakfast</h1>
                                    {
                                        Breakfast.map((item) => {
                                            if (item.title.toLowerCase().includes(state.toLowerCase()))
                                                return (
                                                    <div className='col-sm-4 my-2 col-md-6 col-lg-4 col-xl-3'>
                                                        <div className="item" key={item.id}>
                                                            <div className='card border-0 shadow mx-auto p-2 ' style={{ width: "18rem" }}>
                                                                <div>
                                                                    <img className='img-fluid card-img-top d-block mx-auto rounded' style={{ width: "100px", height: "100px" }} src={item.image} alt={item.title} />
                                                                </div>
                                                                <div className='card-body text-center'>
                                                                    <h5 className='fst-italic' style={{ textShadow: "2px 2px 5px", fontSize: "12px" }}>{item.title}</h5>
                                                                    <h6 className='pt-2 fw-bold'>Price : ${item.price}</h6>
                                                                    <div>
                                                                        <button className='btn btn-info' onClick={() => dispatch(cartActions.AddToCart(item))}>Add To Cart</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    }
                    {
                        filters.meals &&
                        <>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <h1>Meals</h1>
                                    {
                                        Meals.map((item) => {
                                            if (item.title.toLowerCase().includes(state.toLowerCase()))
                                                return (
                                                    <div className='col-sm-4 my-2 col-md-6 col-lg-4 col-xl-3'>
                                                        <div className="item" key={item.id}>
                                                            <div className='card border-0 shadow mx-auto p-2 ' style={{ width: "18rem" }}>
                                                                <div>
                                                                    <img className='img-fluid card-img-top d-block mx-auto rounded' style={{ width: "100px", height: "100px" }} src={item.image} alt={item.title} />
                                                                </div>
                                                                <div className='card-body text-center'>
                                                                    <h5 className='fst-italic' style={{ textShadow: "2px 2px 5px", fontSize: "12px" }}>{item.title}</h5>
                                                                    <h6 className='pt-2 fw-bold'>Price : ${item.price}</h6>
                                                                    <div>
                                                                        <button className='btn btn-info' onClick={() => dispatch(cartActions.AddToCart(item))}>Add To Cart</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    }
                    {
                        filters.product &&
                        <>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <h1>Products</h1>
                                    {

                                        Products.map((item) => {
                                            if (item.title.toLowerCase().includes(state.toLowerCase()))
                                                return (
                                                    <div className='col-sm-4 my-2 col-md-6 col-lg-4 col-xl-3'>
                                                        <div className="item" key={item.id}>
                                                            <div className='card border-0 shadow mx-auto p-2 ' style={{ width: "18rem" }}>
                                                                <div>
                                                                    <img className='img-fluid card-img-top d-block mx-auto rounded' style={{ width: "100px", height: "100px" }} src={item.image} alt={item.title} />
                                                                </div>
                                                                <div className='card-body text-center'>
                                                                    <h5 className='fst-italic' style={{ textShadow: "2px 2px 5px", fontSize: "12px" }}>{item.title}</h5>
                                                                    <h6 className='pt-2 fw-bold'>Price : ${item.price}</h6>
                                                                    <div>
                                                                        <button className='btn btn-info' onClick={() => dispatch(cartActions.AddToCart(item))}>Add To Cart</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    }
                    {
                        filters.breakfast &&
                        <>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <h1>Breakfast</h1>
                                    {

                                        Breakfast.map((item) => {
                                            if (item.title.toLowerCase().includes(state.toLowerCase()))
                                                return (
                                                    <div className='col-sm-4 my-2 col-md-6 col-lg-4 col-xl-3'>
                                                        <div className="item" key={item.id}>
                                                            <div className='card border-0 shadow mx-auto p-2 ' style={{ width: "18rem" }}>
                                                                <div>
                                                                    <img className='img-fluid card-img-top d-block mx-auto rounded' style={{ width: "100px", height: "100px" }} src={item.image} alt={item.title} />
                                                                </div>
                                                                <div className='card-body text-center'>
                                                                    <h5 className='fst-italic' style={{ textShadow: "2px 2px 5px", fontSize: "12px" }}>{item.title}</h5>
                                                                    <h6 className='pt-2 fw-bold'>Price : ${item.price}</h6>
                                                                    <div>
                                                                        <button className='btn btn-info' onClick={() => dispatch(cartActions.AddToCart(item))}>Add To Cart</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}


