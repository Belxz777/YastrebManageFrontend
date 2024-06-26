"use server"
import { cookies} from 'next/headers';
import { host } from './types';

 interface LoginData {
    login: string
    password: string
}
   async function sendUserLoginData(data: LoginData): Promise<OutCome> {
    const res = await fetch(`${host}users/login`, {
        method: 'POST',
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json'
        },
    body: JSON.stringify(data)
    })
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Ошибка при входе попробуйте еще раз , статус ${res.statusText} `,); 
    }
    const receiveddata: OutCome = await res.json();
    const cookiesApi = cookies()
    cookiesApi.set('jwt', receiveddata.token,{
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        httpOnly: true,
        secure: true,
    })
    return receiveddata
}

export default sendUserLoginData;