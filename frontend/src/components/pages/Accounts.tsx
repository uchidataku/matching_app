import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../App";
import {Avatar, Dialog, DialogContent, Divider, Grid, Typography} from "@mui/material";

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
    const initialAccountState: Account = {
        id: "",
        email: "",
        username: "",
        gender: 0,
        birthday: "",
        prefecture: "",
        introduction: "",
        avatarUrl: ""
    }
    const { currentAccount } = useContext(AuthContext)
    const classes = useStyles()
    const [loading, setLoading] = useState<boolean>(true)
    const [accounts, setAccounts] = useState<Account[]>([])
    const [account, setAccount] = useState<Account>(initialAccountState)
    const [accountDetailOpen, setAccountDetailOpen] = useState<boolean>(false)

    const accountAge = (): number | void => {
        const birthday = account.birthday.toString().replace(/-/g, "")
        if (birthday.length !== 8) return

        const date = new Date()
        const today = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2)

        return Math.floor((parseInt(today) - parseInt(birthday)) / 10000)
    }

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
                                            setAccount(account)
                                            setAccountDetailOpen(true)
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
            <Dialog
                open={accountDetailOpen}
                keepMounted
                onClose={() => setAccountDetailOpen(false)}
            >
                <DialogContent>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Avatar
                                alt="avatar"
                                src={account?.avatarUrl}
                                className={classes.avatar}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item style={{ marginTop: "1rem" }}>
                            <Typography
                                variant="body1"
                                component="p"
                                gutterBottom
                                style={{ textAlign: "center" }}
                            >
                                {account.username} {accountAge()}歳 {account.prefecture}
                            </Typography>
                            <Divider/>
                            <Typography
                                variant="body2"
                                component="p"
                                gutterBottom
                                style={{ marginTop: "0.5rem", fontWeight: "bold" }}
                            >
                                自己紹介
                            </Typography>
                            <Typography
                                variant="body2"
                                component="p"
                                color="textSecondary"
                                style={{ marginTop: "0.5rem" }}
                            >
                                {account.introduction ? account.introduction : "よろしくお願いします。" }
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Accounts