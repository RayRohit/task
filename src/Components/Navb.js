import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { IconContext } from 'react-icons'
import { BsFillCartFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AuthActions } from '../Redux/Auth/AuthSlice'
export default function Navb() {
    const { quantity } = useSelector((state) => state.cart)
    const { fname } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch(state => state.auth)

    return (
        <>
            <Navbar expand="lg" variant='dark' bg='dark'>
                <Container>
                    <Navbar.Brand className='fw-bolder'>Hello { fname }</Navbar.Brand>

                    <Nav className=' d-flex ms-auto'>
                        <div className='p-2'>
                            <button className='btn btn-dark' onClick={() => navigate('/cart')}>
                                <IconContext.Provider value={{ size: "20px" }}>
                                    <BsFillCartFill /><span>({quantity})</span>
                                </IconContext.Provider>
                            </button>
                        </div>
                        <div className='p-2'>
                            <button className='btn btn-light' onClick={() => {
                                dispatch(AuthActions.logout(false))
                                navigate('/', { replace: true })
                            }}>
                                Logout
                            </button>
                        </div>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
