import React, {createContext, useEffect, useState} from 'react';
import CommonLayout from "./components/layouts/CommonLayout";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignIn from "./components/pages/SignIn";
import {Account} from "./interfaces";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";

export const AuthContext = createContext({} as {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    isSignedIn: boolean
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    currentAccount: Account | undefined
    setCurrentAccount: React.Dispatch<React.SetStateAction<Account | undefined>>
})

function App() {
    const [loading, setLoading] = useState<boolean>(true)
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
    const [currentAccount, setCurrentAccount] = useState<Account | undefined>()

    const handleCurrentAccount = () => {
        if (currentAccount === undefined) {
            console.log("No CurrentAccount")
        }
        setLoading(false)
    }

    useEffect(() => {
        handleCurrentAccount()
    }, [setCurrentAccount])

    return (
        <Router>
            <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentAccount, setCurrentAccount}}>
                <CommonLayout>
                    <Routes>
                        <Route path='/signin' element={<SignIn/>}/>
                        <Route path='/signup' element={<SignUp/>}/>
                        <Route path='/' element={<Home/>}/>
                    </Routes>
                </CommonLayout>
            </AuthContext.Provider>
        </Router>
  );
}

export default App;
