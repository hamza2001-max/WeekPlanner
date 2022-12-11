import axios from 'axios'
import React from 'react'

export const useSignup = () => {
    const signUp = async (email:string, password:string) => {
        const user = {email, password}
        const signUpJson = axios.post('/api/users/signup', user);
    }
}
