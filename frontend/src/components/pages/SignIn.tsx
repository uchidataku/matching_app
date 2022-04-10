import React, {useContext, useState} from "react";
import {makeStyles} from "@mui/styles";
import {Link, useNavigate} from "react-router-dom"
import {Box, Button, Card, CardContent, CardHeader, TextField, Typography} from "@mui/material";
import {SignInData} from "../../interfaces";
import {signIn} from "../../lib/api/auth";
import {AuthContext} from "../../App";
import AlertMessage from "../utils/AlertMessage";

const useStyles = makeStyles(() => ({
    submitBtn: {
        paddingTop: 2,
        textAlign: "right",
        flexGrow: 1,
        textTransform: "none"
    },
    header: {
        textAlign: "center"
    },
    card: {
        padding: 2,
        maxWidth: 400
    },
    box: {
        paddingTop: "2rem"
    },
    link: {
        textDecoration: "none"
    }
}))

function SignIn() {
    const classes = useStyles()
    const navigate = useNavigate()
    const { setIsSignedIn, setCurrentAccount } = useContext(AuthContext)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault() // ユーザーにイベントが明示的に処理されない場合にその既定のアクションを通常通りに行うべきではないことを伝える

        const data: SignInData = {
            account: {
                email: email,
                password: password
            }
        }

        try {
            const res = await signIn(data)
            console.log(res)

            if (res.status === 200) {
                localStorage.setItem("AUTH_TOKEN", res.data.token)
                setIsSignedIn(true)
                setCurrentAccount(res.data.account)
                navigate("/")
                console.log("Signed in successfully!!")
            } else {
                setAlertMessageOpen(true)
            }
        } catch (err) {
            console.log(err)
            setAlertMessageOpen(true)
        }
    }

    console.log(alertMessageOpen)

    return (
        <>
            <form noValidate autoComplete='off'>
                <Card className={classes.card}>
                    <CardHeader className={classes.header} title='ログイン' />
                    <CardContent>
                        <TextField
                            variant='outlined'
                            required
                            fullWidth
                            label='メールアドレス'
                            value={email}
                            margin='dense'
                            onChange={event => setEmail(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="パスワード"
                            type="password"
                            placeholder="8文字以上"
                            value={password}
                            margin="dense"
                            autoComplete="current-password"
                            onChange={event => setPassword(event.target.value)}
                        />
                        <Box className={classes.submitBtn}>
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                disabled={!email || !password ? true : false}
                                onClick={handleSubmit}
                            >
                                送信
                            </Button>
                        </Box>
                        <Box textAlign="center" className={classes.box}>
                            <Typography variant="body2">
                                まだアカウントをお持ちでない方は
                                <Link to="/signup" className={classes.link}>
                                    こちら
                                </Link>
                                から作成してください。
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </form>
            <AlertMessage
                open={alertMessageOpen}
                setOpen={setAlertMessageOpen}
                severity="error"
                message="メールアドレスかパスワードが間違っています"
            />
        </>
    )
}

export default SignIn