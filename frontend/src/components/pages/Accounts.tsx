import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../App";
import {Avatar, Button, Dialog, DialogContent, Divider, Grid, Typography} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import {Account} from "../../interfaces/account";
import {CreateLikeData, Like} from "../../interfaces/like";
import {getAccounts} from "../../lib/api/accounts";
import {makeStyles} from "@mui/styles";
import {createLike, getLikes} from "../../lib/api/likes";

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
    const [likedAccounts, setLikedAccounts] = useState<Account[]>([])

    const accountAge = (): number | void => {
        const birthday = account.birthday.toString().replace(/-/g, "")
        if (birthday.length !== 8) return

        const date = new Date()
        const today = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2)

        return Math.floor((parseInt(today) - parseInt(birthday)) / 10000)
    }

    const handleCreateLike = async (account: Account) => {
        console.log('- handleCreateLike')
        console.log('currentAccount_id: ' + currentAccount?.id)
        console.log('account_id: ' + account.id)
        if(!currentAccount) return;
        const data: CreateLikeData = { like: { toAccountId: account.id } }

        try {
            const res = await createLike(currentAccount.id, data)
            console.log('===res of createLike======')
            console.log(res)

            if (res?.status === 200) {
                setLikedAccounts([account, ...likedAccounts])
            } else {
                console.log('Failed')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleGetAccounts = async () => {
        console.log('- handleGetAccounts')
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

    const handleGetLikes = async () => {
        console.log('- handleGetLikes')
        console.log('currentAccount:' + currentAccount)
        if(!currentAccount) return;
        try {
            const res = await getLikes(currentAccount.id)
            console.log('====res of getLikes=====')
            console.log(res)

            if (res?.status === 200) {
                setLikedAccounts(res?.data)
            } else {
                console.log("No Likes")
            }
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    const isLikedAccount = (accountId: string | null): boolean  => {
        return likedAccounts.some((likedAccount: Account) => likedAccount.id === accountId)
    }

    useEffect(() => {
        handleGetAccounts()
        handleGetLikes()
    }, [currentAccount])

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
                    <Grid container justifyContent="center">
                        <Button
                            variant="outlined"
                            onClick={() => isLikedAccount(account.id) ? void(0) : handleCreateLike(account)}
                            color="secondary"
                            startIcon={isLikedAccount(account.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            disabled={isLikedAccount(account.id) ? true : false}
                            style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        >
                            {isLikedAccount(account.id)}
                        </Button>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Accounts