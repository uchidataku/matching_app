import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../App";
import {Avatar, Grid, Typography} from "@mui/material";

import {Account} from "../../interfaces/account";
import {getAccounts} from "../../lib/api/accounts";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    avatar: {
        width: 10,
        height: 10
    }
}))


function Accounts() {
    const { currentAccount } = useContext(AuthContext)
    const classes = useStyles()
    const [loading, setLoading] = useState<boolean>(true)
    const [accounts, setAccounts] = useState<Account[]>([])

    const handleGetAccounts = async () => {
        try {
            const res = await getAccounts()
            console.log(res)

            if (res?.status === 200) {
                setAccounts(res?.data)
            } else {
                console.log("No Accounts")
            }
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    useEffect(() => {
        handleGetAccounts()
    }, [])

    return (
        <>
            {
                !loading ? (
                    accounts?.length > 0 ? (
                        <Grid container justifyContent="center">
                            {
                                accounts?.map((account: Account, index: number) => {
                                    return (
                                        <div key={index} onClick={() => {

                                        }}>
                                            <Grid item style={{ margin: "0.5rem", cursor: "pointer" }}>
                                                <Avatar
                                                    alt="avatar"
                                                    src={account?.avatarUrl}
                                                    className={classes.avatar}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    component="p"
                                                    gutterBottom
                                                    style={{ marginTop: "0.5rem", textAlign: "center" }}
                                                >
                                                    {account.username}
                                                </Typography>
                                            </Grid>
                                        </div>
                                    )
                                })
                            }
                        </Grid>
                    ) : (
                        <Typography
                            component="p"
                            variant="body2"
                            color="textSecondary"
                        >
                            まだ1人もユーザーがいません。
                        </Typography>
                    )
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default Accounts