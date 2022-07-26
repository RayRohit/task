import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const url = ' http://localhost:3000/Users'
    const[person,SetPerson] = useState({
        fname:'',
        email:'',
        pass:'',
        phone:''
    })
    const navigate = useNavigate()
    const[error,setError] = useState('')
    const handleChange = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        if(person.pass !== value && name === "confirmpass"){
            setError('password not matching')
        }
        else if(person.pass === value){
            setError('')
        }
        if(name !== "confirmpass")
            SetPerson({...person,[name]:value})

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(url,person).then((res)=>{
        navigate('/',{replace:true})
        }).catch((err)=>console.log(err))
    }
  return (
    <div>
        <div className='container-fluid pt-4'>
            <div className='row pt-3'>
                <div className='offset-sm-3 col-sm-4'>
                    <form className='shadow px-5 py-3' onSubmit={handleSubmit}>
                        <h4 className='text-center fw-bold'>Sign Up Here</h4>
                        <div>
                            <label htmlFor='fname' className='fw-bold'>Name :</label>
                            <input type="text" name='fname' maxLength={20} id='fname' value={person.fname} onChange={handleChange}  className='form-control fw-bold' />
                        </div>
                        <div>
                            <label htmlFor='email' className='fw-bold'>Email :</label>
                            <input type="email" name='email' maxLength={25} id='email' value={person.email} onChange={handleChange}  className='form-control fw-bold' />
                        </div>
                        <div>
                            <label htmlFor='pass' className='fw-bold'>Password :</label>
                            <input type="password" name='pass' minLength={8} maxLength={16} id='pass' value={person.pass} onChange={handleChange} className='form-control fw-bold' />
                        </div>
                        <div>
                            <label htmlFor='confirmpass' className='fw-bold'>Confirm Password :</label>
                            <input type="password" name='confirmpass' minLength={8} maxLength={16} value={person.confirmpass} onChange={handleChange} id='confirmpass' className='form-control fw-bold' />
                            {error === '' ? null : <p>{error}</p>}
                        </div>
                        <div>
                            <label htmlFor='phone' className='fw-bold'>Phone :</label>
                            <input type="tel" name='phone' id='phone'  maxLength={10} value={person.phone} onChange={handleChange} className='form-control fw-bold' />
                        </div>
                        <div className='pt-3'>
                            <button className='btn btn-info' type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
