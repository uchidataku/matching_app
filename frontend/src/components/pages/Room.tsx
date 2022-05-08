import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../App";
import {makeStyles} from "@mui/styles";
import {Avatar, Box, Button, Grid, TextField, Typography} from "@mui/material";
import {CreateMessageData, Message} from "../../interfaces/message";
import {Account} from "../../interfaces/account";
import SendIcon from '@mui/icons-material/Send';
import {createMessage} from "../../lib/api/messages";
import {getRoom} from "../../lib/api/rooms";
import {useParams} from "react-router-dom";

const useStyles = makeStyles(() => ({
    avatar: {
        width: 10,
        height: 10,
        margin: "0 auto"
    },
    formWrapper : {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 340
    },
    textInputWrapper : {
        width: "100%"
    },
    button: {
        margin: '5'
    }
}))

function Room() {
    const classes = useStyles()
    const params = useParams()
    const id = String(params.id)
    const [loading, setLoading] = useState<boolean>(true)
    const [otherAccount, setOtherAccount] = useState<Account>()
    const [messages, setMessages] = useState<Message[]>([])
    const [content, setContent] = useState<string>('')
    const { currentAccount } = useContext(AuthContext)

    const iso8601ToDateTime = (iso8601: string) => {
        const date = new Date(Date.parse(iso8601))
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()

        return year + "年" + month + "月" + day + "日" + hour + "時" + minute + "分"
    }

    const handleGetRoom = async () => {
        try {
            const res = await getRoom(id)
            console.log('- handleGetRoom')
            console.log(res)

            if (res?.status === 200) {
                setOtherAccount(res?.data.otherAccount)
                setMessages(res?.data.messages)
            } else {
                console.log("No other account")
            }
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if(!currentAccount) return

        e.preventDefault()

        const data: CreateMessageData = {
            message: {
                content: content
            }
        }

        try {
            const res = await createMessage(id, data)
            console.log(res)

            if (res.status === 200) {
                setMessages([...messages, res.data])
                setContent("")
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleGetRoom()
    }, [])

    return (
        <>
            {
                !loading ? (
                    <div style={{ maxWidth: 360 }}>
                        <Grid container justifyItems="center" style={{ marginBottom: "1rem" }}>
                            <Grid item>
                                <Avatar
                                    alt='avatar'
                                    src={otherAccount?.avatarUrl}
                                    className={classes.avatar}
                                />
                                <Typography
                                    variant="body2"
                                    component="p"
                                    gutterBottom
                                    style={{ marginTop: "0.5rem", marginBottom: "1rem", textAlign: "center" }}
                                >
                                    {otherAccount?.username}
                                </Typography>
                            </Grid>
                        </Grid>
                        {
                            messages.map((message: Message, index: number) => {
                                return (
                                    <Grid
                                        key={index}
                                        container
                                        justifyContent={message.accountId === otherAccount?.id ? "flex-start" : "flex-end"}
                                    >
                                        <Grid item>
                                            <Box
                                                borderRadius={message.accountId === otherAccount?.id ? "30px 30px 30px 0px" : "30px 30px 0px 30px"}
                                                bgcolor={message.accountId === otherAccount?.id ? "#d3d3d3" : "#ffb6c1"}
                                                color={message.accountId === otherAccount?.id ? "#000000" : "#ffffff"}
                                                m={1}
                                                border={0}
                                                style={{ padding: "1rem" }}
                                            >
                                                <Typography variant="body1" component="p">
                                                    {message.content}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                component="p"
                                                color="textSecondary"
                                                style={{ textAlign: message.accountId === otherAccount?.id ? "left" : "right" }}
                                            >
                                                {iso8601ToDateTime(message.createdAt?.toString() || "100000000")}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                        <Grid container justifyContent="center" style={{ marginTop: "2rem" }}>
                            <form className={classes.formWrapper} noValidate autoComplete='off'>
                                <TextField
                                    required
                                    multiline
                                    value={content}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                                    className={classes.textInputWrapper}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={!content ? true : false}
                                    onClick={handleSubmit}
                                    className={classes.button}
                                >
                                    <SendIcon/>
                                </Button>
                            </form>
                        </Grid>
                    </div>
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default Room