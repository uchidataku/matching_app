import React, {createContext, useEffect, useState} from 'react';
import CommonLayout from "./components/layouts/CommonLayout";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignIn from "./components/pages/SignIn";
import {Account} from "./interfaces/account";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import Rooms from "./components/pages/Rooms";
import Accounts from "./components/pages/Accounts";
import {getCurrentAccount} from "./lib/api/accounts";

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

    const handleGetCurrentAccount = async () => {
        console.log('- handleGetCurrentAccount')
        try {
            const res = await getCurrentAccount()
            console.log('===res==')
            console.log(res)

            if (res?.status === 200) {
                console.log('setCurrentAccount')
                setIsSignedIn(true)
                setCurrentAccount(res?.data)
            } else {
                console.log("No CurrentAccount")
            }
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    useEffect(() => {
        handleGetCurrentAccount()
    }, [setCurrentAccount])

    return (
        <Router>
            <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentAccount, setCurrentAccount}}>
                <CommonLayout>
                    <Routes>
                        <Route path='/signin' element={<SignIn/>}/>
                        <Route path='/signup' element={<SignUp/>}/>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/accounts' element={<Accounts/>}/>
                        <Route path='/rooms' element={<Rooms/>}/>
                    </Routes>
                </CommonLayout>
            </AuthContext.Provider>
        </Router>
  );
}

export default App;
