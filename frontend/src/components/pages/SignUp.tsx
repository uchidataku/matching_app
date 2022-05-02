import React, {useContext, useState} from "react";
import {makeStyles} from "@mui/styles";
import {Link, useNavigate} from "react-router-dom"
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    InputLabel, MenuItem, Select,
    TextField,
    Typography
} from "@mui/material";
import {SignUpParams} from "../../interfaces/account"
import {signUp} from "../../lib/api/auth";
import {AuthContext} from "../../App";
import AlertMessage from "../utils/AlertMessage";
import {genders} from "../../data/genders";

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

function SignUp() {
    const classes = useStyles()
    const navigate = useNavigate()
    const { setIsSignedIn, setCurrentAccount } = useContext(AuthContext)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [gender, setGender] = useState<number>(0)
    const [prefecture, setPrefecture] = useState<string>('')
    const [introduction, setIntroduction] = useState<string>('')
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault() // ユーザーにイベントが明示的に処理されない場合にその既定のアクションを通常通りに行うべきではないことを伝える

        const data: SignUpParams = {
            account: {
                email: email,
                password: password,
                passwordConfirmation: passwordConfirmation,
                username: username,
                gender: gender,
                prefecture: prefecture,
                introduction: introduction
            }
        }

        try {
            const res = await signUp(data)
            console.log(res)

            if (res.status === 201) {
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

    return (
        <>
            <form noValidate autoComplete='off'>
                <Card className={classes.card}>
                    <CardHeader className={classes.header} title='新規登録' />
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
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="パスワード（確認用）"
                            type="password"
                            value={passwordConfirmation}
                            margin="dense"
                            autoComplete="current-password"
                            onChange={event => setPasswordConfirmation(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="ユーザーネーム"
                            value={username}
                            margin="dense"
                            onChange={event => setUsername(event.target.value)}
                        />
                        <FormControl
                            variant="outlined"
                            margin="dense"
                            fullWidth
                        >
                            <InputLabel id="demo-simple-select-outlined-label">性別</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={gender}
                                // TODO: できない
                                // onChange={(e: React.ChangeEvent<{ value: unknown }>) => setGender(e.target.value as number)}
                                label="性別"
                            >
                                {
                                    genders.map((gender: string, index: number) =>
                                        <MenuItem value={index}>{gender}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                        <Box className={classes.submitBtn}>
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                disabled={!email || !password || !passwordConfirmation || !username ? true : false}
                                onClick={handleSubmit}
                            >
                                送信
                            </Button>
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

export default SignUp