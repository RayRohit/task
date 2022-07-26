import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { AuthSlice , LogCheck } from '../Redux/Auth/AuthSlice'


export default function Forms() {

    const {error} = useSelector((store)=>store.auth)

    const [people,setPeople] = useState({
        email:'',
        pass:''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleChange = (e) =>{
        let name= e.target.name;
        let value = e.target.value
        setPeople({...people,[name]:value})
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(AuthSlice.actions.login(people));
        navigate('/',{replace:'true'})
    }
    useEffect(()=>{
        dispatch(LogCheck())
    },[])
  
    

  return (
    <div>
        <div className='container-fluid pt-4'>
            <div className='row pt-3'>
                <div className=' offset-sm-3 col-sm-4 '>
                    <form className='shadow px-4 py-3 mt-4' onSubmit={handleSubmit}>
                        <h5 className='text-center'>Enter your credential's </h5>
                        <div>
                            <label htmlFor='email' className='fw-bold'  >Email :</label>
                            <input className='form-control fw-bold' type="email" name='email' id='email' onChange={handleChange}  />
                        </div>
                        <div>
                            <label htmlFor='pass' className='fw-bold' >Password :</label>
                            <input className='form-control fw-bold' type="password" name='pass' id='pass' onChange={handleChange}  />
                        </div>
                        <div>
                            {error === '' ? null : <p>{error}</p>}
                        </div>
                        <div className='pt-3'>
                            <button className='btn btn-primary' type='submit'>Login</button>
                        </div>
                        <div className='text-end p-2'>
                            <h6>Not an user , Please Sign up here
                                <span>
                                    <button className='btn fw-bold' onClick={()=>navigate('/signup')} >Sign-up</button>
                                </span>
                            </h6>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
