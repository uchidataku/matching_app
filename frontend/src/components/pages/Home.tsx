import React, {useCallback, useContext, useState} from "react";
import {AuthContext} from "../../App";
import {makeStyles} from "@mui/styles";
import {
    Avatar, Box,
    Button,
    Card,
    CardContent,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    Divider, FormControl,
    Grid,
    IconButton, InputLabel, MenuItem, Select, TextField,
    Typography
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CancelIcon from '@mui/icons-material/Cancel';
import {useNavigate} from "react-router-dom";
import {UpdateAccountFormData} from "../../interfaces/account";
import {prefectures} from "../../data/prefectures";
import {updateAccount} from "../../lib/api/accounts";

const useStyles = makeStyles(() => ({
    avatar: {
        width: 10,
        height: 10
    },
    card: {
        width: 340
    },
    imageUploadBtn: {
        textAlign: "right"
    },
    input: {
        display: "none"
    },
    box: {
        marginBottom: "1.5rem"
    },
    preview: {
        width: "100%"
    }
}))

function Home() {
    const { isSignedIn, setIsSignedIn, currentAccount, setCurrentAccount } = useContext(AuthContext)

    const classes = useStyles()
    const navigate = useNavigate()
    const [editFormOpen, setEditFormOpen] = useState<boolean>(false)
    const [username, setUsername] = useState<string | undefined>(currentAccount?.username)
    const [prefecture, setPrefecture] = useState<string | undefined>(currentAccount?.prefecture)
    const [introduction, setIntroduction] = useState<string | undefined>(currentAccount?.introduction)
    const [image, setImage] = useState<string>('')
    const [preview, setPreview] = useState<string>('')

    const uploadImage = useCallback((e) => {
        const file = e.target.files[0]
        setImage(file)
    }, [])

    const previewImage = useCallback((e) => {
        const file = e.target.files[0]
        setPreview(window.URL.createObjectURL(file))
    }, [])

    const currentAccountAge = (): number | void => {
        if(!currentAccount) return
        const birthday = currentAccount.birthday.toString().replace(/-/g, "")
        if (birthday.length !== 8) return

        const date = new Date()
        const today = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2)

        return Math.floor((parseInt(today) - parseInt(birthday)) / 10000)
    }

    // TODO: UpdateAccountDataを使ったFormDataの作り方でなぜそうなるのか分からん
    const createFormData = (): UpdateAccountFormData => {
        const formData = new FormData()

        formData.append(`account[username]`, username || '')
        formData.append(`account[prefecture]`, prefecture || '')
        formData.append(`account[introduction]`, introduction || '')
        formData.append(`account[avatar]`, image)
        return formData;
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if(!currentAccount) return

        e.preventDefault()
        const data = createFormData()

        try {
            const res = await updateAccount(currentAccount.id, data)
            console.log('- handleSubmit')
            console.log(res)

            if (res.status === 200) {
                setEditFormOpen(false)
                setCurrentAccount(res.data)
                console.log('Success updated account')
            } else {
                console.log(res.data.message)
            }
        } catch (err) {
            console.log(err)
            console.log('Failed in update account')
        }
    }

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCurrentAccount(undefined)
        setIsSignedIn(false)
        localStorage.removeItem("APP_AUTH_TOKEN")
        navigate("/signin")
    }

    return (
        <>
            {
                isSignedIn && currentAccount ? (
                    <>
                        <Card className={classes.card}>
                            <CardContent>
                                <Grid container justifyContent='flex-end'>
                                    <Grid item>
                                        <IconButton
                                            onClick={() => setEditFormOpen(true)}
                                        >
                                            <SettingsIcon
                                                color='action'
                                                fontSize='small'
                                            />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent='center'>
                                    <Grid item>
                                        <Avatar
                                            alt='avatar'
                                            src={currentAccount.avatarUrl}
                                            className={classes.avatar}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent='center'>
                                    <Grid item style={{ marginTop: "1.5rem"}}>
                                        <Typography variant="body1" component="p" gutterBottom>
                                            {currentAccount.username} {currentAccountAge()}歳 {currentAccount.prefecture}
                                        </Typography>
                                        <Divider style={{ marginTop: "0.5rem"}}/>
                                        <Typography
                                            variant="body2"
                                            component="p"
                                            gutterBottom
                                            style={{ marginTop: "0.5rem", fontWeight: "bold" }}
                                        >
                                            自己紹介
                                        </Typography>
                                        {
                                            currentAccount.introduction ? (
                                                <Typography variant="body2" component="p" color="textSecondary">
                                                    {currentAccount.introduction}
                                                </Typography>
                                            ): (
                                                <Typography variant="body2" component="p" color="textSecondary">
                                                    よろしくお願いします。
                                                </Typography>
                                            )
                                        }
                                        <Button
                                            variant="outlined"
                                            onClick={handleLogout}
                                            color="primary"
                                            fullWidth
                                            startIcon={<ExitToAppIcon />}
                                            style={{ marginTop: "1rem"}}
                                        >
                                            ログアウト
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <form noValidate autoComplete="off">
                            <Dialog
                                open={editFormOpen}
                                onClose={() => setEditFormOpen(false)}
                            >
                                <DialogTitle style={{ textAlign: "center"}}>
                                    プロフィールの変更
                                </DialogTitle>
                                <DialogContent>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="ユーザーネーム"
                                        value={username}
                                        margin="dense"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                    />
                                    <FormControl
                                        variant="outlined"
                                        margin="dense"
                                        fullWidth
                                    >
                                        <InputLabel id="demo-simple-select-outlined-label">都道府県</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={prefecture}
                                            onChange={(e) => setPrefecture(e.target.value)}
                                            label="都道府県"
                                        >
                                            {
                                                prefectures.map((prefecture, index) =>
                                                    <MenuItem key={index + 1} value={prefecture}>{prefecture}</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        placeholder="1000文字以内で書いてください。"
                                        variant="outlined"
                                        multiline
                                        fullWidth
                                        label="自己紹介"
                                        rows="8"
                                        value={introduction}
                                        margin="dense"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setIntroduction(e.target.value)}}
                                    />
                                    <div className={classes.imageUploadBtn}>
                                        <input
                                            accept='image/*'
                                            className={classes.input}
                                            id='icon-button-file'
                                            type="file"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                uploadImage(e)
                                                previewImage(e)
                                            }}
                                        />
                                        <label htmlFor="icon-button-file">
                                            <IconButton
                                                color='primary'
                                                aria-label='upload picture'
                                                component='span'
                                            >
                                                <PhotoCameraIcon />
                                            </IconButton>
                                        </label>
                                    </div>
                                    {
                                        preview ? (
                                            <Box
                                                className={classes.box}
                                            >
                                                <IconButton
                                                    color="inherit"
                                                    onClick={() => setPreview('')}
                                                >
                                                    <CancelIcon />
                                                </IconButton>
                                                <img
                                                    src={preview}
                                                    alt="preview img"
                                                    className={classes.preview}
                                                />
                                            </Box>
                                        ) : null
                                    }
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={handleSubmit}
                                        color="primary"
                                        disabled={!username || !introduction ? true : false}
                                    >
                                        送信
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </form>
                    </>
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default Home