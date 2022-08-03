import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AuthSlice, LogCheck } from '../Redux/Auth/AuthSlice'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import loginlogo from '../images/user.png'


export default function Forms() {

    const { error } = useSelector((store) => store.auth)
    const [passwordType, setPassWordType] = useState('password')
    const [people, setPeople] = useState({
        email: '',
        pass: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value
        setPeople({ ...people, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(AuthSlice.actions.login(people));
        navigate('/', { replace: 'true' })
    }
    useEffect(() => {
        dispatch(LogCheck())
    }, [])
    const handleToggle = () => {
        if (passwordType === 'password') {
            setPassWordType('text')
            console.log('pass', passwordType);
        }
        else {
            setPassWordType('password')
            console.log('text', passwordType);
        }
    }


    return (
        <div style={{ backgroundImage: 'url(/loginbg.webp)',backgroundSize:'cover',width:'100%',height:'100vh' }}>
            <div className='container-fluid'>
                <div className='row justify-content-center align-items-center border border-1' style={{height:'100vh'}}>
                    <div className=' col-sm-4 ' >
                        <form className='shadow rounded px-4 py-3 text-light' onSubmit={handleSubmit} >
                            <div className='text-center'>
                                <img src={loginlogo} alt='login logo'  width='100px ' />
                            </div>
                            <div>
                                <label htmlFor='email' className='fw-bold'  >Email :</label>
                                <input className='form-control fw-bold' type="email" name='email' id='email' onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor='pass' className='fw-bold' >Password :</label>
                                <div className='input-group'>
                                    <input className='form-control fw-bold' type={passwordType} name='pass' id='pass' onChange={handleChange} />
                                    <button class="btn btn-light" type="button" onClick={handleToggle} >{passwordType === 'password' ? <AiFillEye /> : <AiFillEyeInvisible />}</button>
                                </div>
                            </div>
                            <div>
                                {error === '' ? null : <p>{error}</p>}
                            </div>
                            <div className='pt-3'>
                                <button className='btn btn-primary' type='submit'>Login</button>
                            </div>
                            <div className='text-end p-2'>
                                <h6>Not an user , Please Sign up here</h6>
                                <button className='btn fw-bold text-light' onClick={() => navigate('/signup')} >Sign-up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
