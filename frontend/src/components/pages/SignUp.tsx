import React, {useCallback, useContext, useState} from "react";
import {makeStyles} from "@mui/styles";
import {Link, useNavigate} from "react-router-dom"
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControl, Grid, IconButton,
    InputLabel, MenuItem, Select,
    TextField,
    Typography
} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {genderLabelFor, SignUpFormData} from "../../interfaces/account"
import {signUp} from "../../lib/api/auth";
import {AuthContext} from "../../App";
import AlertMessage from "../utils/AlertMessage";
import {genders} from "../../data/genders";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CancelIcon from "@mui/icons-material/Cancel";
import {prefectures} from "../../data/prefectures";

const useStyles = makeStyles(() => ({
    container: {
        marginTop: 6
    },
    submitBtn: {
        marginTop: 1,
        flexGrow: 1,
        textTransform: "none"
    },
    header: {
        textAlign: "center"
    },
    card: {
        padding: 2,
        maxWidth: 340
    },
    inputFileButton: {
        textTransform: "none"
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

function SignUp() {
    const classes = useStyles()
    const navigate = useNavigate()
    const { setIsSignedIn, setCurrentAccount } = useContext(AuthContext)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [prefecture, setPrefecture] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [preview, setPreview] = useState<string>('')
    const [birthday, setBirthday] = useState<Date | null>(
        new Date("2000-01-01T00:00:00")
    )
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

    const uploadImage = useCallback((e) => {
        const file = e.target.files[0]
        setImage(file)
    }, [])

    const previewImage = useCallback((e) => {
        const file = e.target.files[0]
        setPreview(window.URL.createObjectURL(file))
    }, [])

    const createFormData = (): SignUpFormData => {
        const formData = new FormData()

        formData.append(`account[email]`, email)
        formData.append(`account[password]`, password)
        formData.append(`account[passwordConfirmation]`, passwordConfirmation)
        formData.append(`account[username]`, username)
        formData.append(`account[gender]`, genderLabelFor(gender))
        formData.append(`account[prefecture]`, prefecture)
        formData.append(`account[birthday]`, String(birthday))
        formData.append(`account[avatar]`, image)
        return formData;
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault() // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        const data = createFormData()

        try {
            const res = await signUp(data)
            console.log(res)

            if (res.status === 201) {
                localStorage.setItem("APP_AUTH_TOKEN", res.data.token)
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
                    <CardHeader className={classes.header} title='????????????' />
                    <CardContent>
                        <TextField
                            variant='outlined'
                            required
                            fullWidth
                            label='?????????????????????'
                            value={email}
                            margin='dense'
                            onChange={event => setEmail(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="???????????????"
                            type="password"
                            placeholder="8????????????"
                            value={password}
                            margin="dense"
                            autoComplete="current-password"
                            onChange={event => setPassword(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="??????????????????????????????"
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
                            label="?????????????????????"
                            value={username}
                            margin="dense"
                            onChange={event => setUsername(event.target.value)}
                        />
                        <FormControl
                            variant="outlined"
                            margin="dense"
                            fullWidth
                        >
                            <InputLabel id="demo-simple-select-outlined-label">??????</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={gender}
                                // TODO: ????????????
                                onChange={(e) => setGender(e.target.value) }
                                label="??????"
                            >
                                {
                                    genders.map((gender: string, index: number) =>
                                        <MenuItem value={gender}>{gender}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            margin="dense"
                            fullWidth
                        >
                            <InputLabel id="demo-simple-select-outlined-label">????????????</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={prefecture}
                                onChange={(e) => setPrefecture(e.target.value)}
                                label="????????????"
                            >
                                {
                                    prefectures.map((prefecture, index) =>
                                        <MenuItem key={index +1} value={prefecture}>{prefecture}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid container justifyContent="space-around">
                                <DatePicker
                                    label="?????????"
                                    inputFormat="MM/dd/yyyy"
                                    value={birthday}
                                    onChange={(date: Date | null) => { setBirthday(date) }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                        </LocalizationProvider>
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
                        <Box className={classes.submitBtn}>
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                disabled={!email || !password || !passwordConfirmation || !username || !birthday ? true : false}
                                onClick={handleSubmit}
                            >
                                ??????
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </form>
            <AlertMessage
                open={alertMessageOpen}
                setOpen={setAlertMessageOpen}
                severity="error"
                message="???????????????????????????????????????????????????????????????"
            />
        </>
    )
}

export default SignUp