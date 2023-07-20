'use client'
import styles from './Form.module.css'
import { FormEvent, useState } from 'react'
import { PageHeader } from '../components/PageHeader'


export function Form() {
    const userModel = {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        accessLevel: -1,
        description: "",
        password: "",
        profilePicture: "/images/profile_picture_placeholer.png"
    }

    const [formData, setFormData] = useState(userModel)

    const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/api/addUser",{
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" }
        })
        console.log(await res.json())
    }

    return (
        <div>
            <PageHeader>Register</PageHeader>
            <form onSubmit={(e) => submitHandler(e)}>
                <label htmlFor="username">Username:</label><br/>
                <input type="text" id="username" name="username" onChange={e => setFormData(prev => ({...prev, username: e.target.value}))}/><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="text" id="password" name="password" onChange={e => setFormData(prev => ({...prev, password: e.target.value}))}/><br/>
                <label htmlFor="email">Email:</label><br/>
                <input type="text" id="email" name="email" onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}/><br/>
                <label htmlFor="firstName">First name:</label><br/>
                <input type="text" id="firstName" name="firstName" onChange={e => setFormData(prev => ({...prev, firstName: e.target.value}))}/><br/>
                <label htmlFor="lastName">Last name:</label><br/>
                <input type="text" id="lastName" name="lastName" onChange={e => setFormData(prev => ({...prev, lastName: e.target.value}))}/><br/>
                <label htmlFor="accessLevel">Access Level:</label><br/>
                <input type="text" id="accessLevel" name="accessLevel" onChange={e => setFormData(prev => ({...prev, accessLevel: parseInt(e.target.value)}))}/><br/>
                <label htmlFor="description">Description:</label><br/>
                <input type="text" id="description" name="description" onChange={e => setFormData(prev => ({...prev, description: e.target.value}))}/><br/>
                <input type='submit'/>
            </form>
        </div>
    )
}
