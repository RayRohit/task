import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import signup from '../images/signup.png'

export default function Signup() {
    const url = ' http://localhost:3000/Users'
    const [person, SetPerson] = useState({
        fname: '',
        email: '',
        pass: '',
        phone: ''
    })
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (person.pass !== value && name === "confirmpass") {
            setError('password not matching')
        }
        else if (person.pass === value) {
            setError('')
        }
        if (name !== "confirmpass")
            SetPerson({ ...person, [name]: value })

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(url, person).then((res) => {
            navigate('/', { replace: true })
        }).catch((err) => console.log(err))
    }
    return (
        <div style={{ backgroundImage: 'url(/sign.jpg)', width: '100%', height: '100vh' }}>
            <div className='container-fluid pt-4'>
                <div className='row justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <div className='col-sm-4'>
                        <form className='shadow rounded px-5 py-3 text-light' onSubmit={handleSubmit} >
                            <div className='text-center'>
                                <img src={signup} alt='login logo' width='100px ' />
                            </div>
                            <div>
                                <label htmlFor='fname' className='fw-bold'>Name :</label>
                                <input type="text" name='fname' maxLength={20} id='fname' value={person.fname} onChange={handleChange} className='form-control fw-bold' />
                            </div>
                            <div>
                                <label htmlFor='email' className='fw-bold'>Email :</label>
                                <input type="email" name='email' maxLength={25} id='email' value={person.email} onChange={handleChange} className='form-control fw-bold' />
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
                                <input type="tel" name='phone' id='phone' maxLength={10} value={person.phone} onChange={handleChange} className='form-control fw-bold' />
                            </div>
                            <div className='pt-3'>
                                <button className='btn btn-primary' type='submit'>Submit</button>
                            </div>
                            <div className='text-end p-2'>
                                <h6>Already a user , Login here</h6>
                                <button className='btn fw-bold text-light' onClick={() => navigate('/')} >Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
