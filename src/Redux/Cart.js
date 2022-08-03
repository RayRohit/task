import React from 'react'
import { TbArrowBackUp } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { useSelector ,useDispatch} from 'react-redux'
import { cartActions } from './cartSlice/cartSlice'

export default function Cart() {
  const { cartItems,total } = useSelector((state) => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  return (
    <div className='p-3'>
      <button className='btn btn-dark' onClick={() => navigate(-1)}><TbArrowBackUp /></button>
      <h4 className='text-center fw-bold pt-4'>YOUR BAG</h4>
      <div className='container-fluid'>
        <div className='row'>
          {
            cartItems.map((item) => {
              return (
                <div className='col-sm-4'>
                  <div className='card border-0 shadow mx-auto p-2 mt-3' style={{ width: "18rem" }}>
                    <div>
                      <img className='img-fluid card-img-top d-block mx-auto rounded' style={{ width: "100px", height: "100px" }} src={item.image} alt={item.title} />
                    </div>
                    <div className='card-body text-center'>
                      <h5 className='fst-italic' style={{ textShadow: "2px 2px 5px", fontSize: "12px" }}>{item.title}</h5>
                      <h6 className='pt-2 fw-bold'>Price : ${item.price}</h6>
                      <div>
                        <button className='btn btn-danger' onClick={()=>dispatch(cartActions.RemoveFromCart(item))}>-</button>
                        <span className='fw-bold p-4'>{item.quantity}</span>
                        <button className='btn btn-info' onClick={()=>dispatch(cartActions.AddToCart(item))}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
          <div className='px-4'>
            <hr />
            <div className='d-flex'>
              <h4 className='fw-bold'>Total :</h4>
              <h5 className='fw-bold ms-auto'>${total}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
