import { parseCookies, setCookie } from "nookies";
import React, { createContext, ReactElement, useEffect, useState } from "react";
import api from "../apis/api";
import Router from "next/router";

export type User = {
    name: string
    email: string

}

export type SignInDataParams = {
    email: string
    password: string
}

export type SignTypeReturn = {
    success: boolean
    msg: string
}

export type AuthContextType = {
    isAuthentication: boolean
    user: User | null
    signIn: (data: SignInDataParams) => Promise<void>
    destroyUserInfo: () => void

}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<User | null>(null);
    const isAuthentication =!!user;

    useEffect(() => {
        const { "auth.token": token, "auth.email": email } = parseCookies();

        if (token) {
            api.get("/api/auth/user-recover/get", { data: {
                email
            }}).then((res) => {
                setUser(res.data.user);
            });
        }

    }, []);
    
    const destroyUserInfo = () => {
        setUser(null);
    }

    const signIn = async ({ email, password }: SignInDataParams): Promise<void> => {
        const response = (await api.post("/api/auth/authentication", { email, password })).data;

        if (response.success) {
            setCookie(undefined, 'auth.token', response.token, { maxAge: 60 * 60 * 1 /* 1 hora */ });
            setCookie(undefined, 'auth.email', email, { maxAge: 60 * 60 * 1 /* 1 hora */ });
            setUser(response.user);
            
            console.log(response);

            Router.push("/");

        } else {
            console.log(response)
        }

        
    }

    return (
        <AuthContext.Provider value={{ isAuthentication, user, signIn, destroyUserInfo }}>
            { children }
        </AuthContext.Provider>
    );

}
