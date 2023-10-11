import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios"
import { Context, server } from '../main'
import toast from 'react-hot-toast'
import '../styles/login.scss'
const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(`${server}/users/new`, { name, email, password },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                })
            toast.success(data.message)
            setIsAuthenticated(true)
            setLoading(false)
        } catch (error) {
            toast.error("Some error")
            console.log(error)
            setIsAuthenticated(false)
        }
    }

    if (isAuthenticated) return <Navigate to={"/"} />

    return (
        <div className='login'>
            <section>
                <form onSubmit={submitHandler}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type='name'
                        required
                        placeholder='Name' />

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        required
                        placeholder='Email' />

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        required
                        placeholder='Password' />

                    <button
                        type='submit' disabled={loading}>Sign up</button>
                    <h4>Or</h4>
                    <Link to='/login'>Log in</Link>
                </form>
            </section>
        </div>
    )
}

export default Register