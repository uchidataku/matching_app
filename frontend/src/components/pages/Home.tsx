import React, {useContext} from "react";
import {AuthContext} from "../../App";

function Home() {
    const { currentAccount } = useContext(AuthContext)

    return (
        <>
            {
                currentAccount ? (
                    <>
                        <h2>メールアドレス: {currentAccount?.email}</h2>
                        <h2>ユーザーネーム: {currentAccount?.username}</h2>
                    </>
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default Home