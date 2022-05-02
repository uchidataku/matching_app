import React, {useContext} from "react";

import {makeStyles} from "@mui/styles";
import {AppBar} from "@mui/material";
import {Toolbar} from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import {IconButton} from "@mui/material";
import {Menu} from "@mui/material";
import {Link, useNavigate} from "react-router-dom"
import {AuthContext} from "../../App";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const useStyles = makeStyles(() => ({
    iconButton: {},
    title: {
        flexGrow: 1,
        textDecoration: "none",
        color: "inherit"
    },
    linkBtn: {
        textTransform: "none"
    }
}))

function Header() {
    const { loading, isSignedIn, setIsSignedIn, setCurrentAccount } = useContext(AuthContext)
    const classes = useStyles()

    const AuthButtons = () => {
        if (!loading) {
            if (isSignedIn) {
                return (
                    <>
                        <IconButton
                            component={Link}
                            to='/accounts'
                            edge='start'
                            className={classes.linkBtn}
                            color='inherit'
                        >
                            <PersonSearchIcon />
                        </IconButton>
                        <IconButton
                            component={Link}
                            to='/rooms'
                            edge='start'
                            className={classes.linkBtn}
                            color='inherit'
                        >
                            <ChatBubbleIcon />
                        </IconButton>
                    </>
                )
            } else {
                return (
                    <Button
                        component={Link}
                        to="signin"
                        color="inherit"
                        className={classes.linkBtn}
                    >
                        ログイン
                    </Button>
                )
            }
        } else {
            return <></>
        }
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    {/*<IconButton*/}
                    {/*    edge="start"*/}
                    {/*    className={classes.iconButton}*/}
                    {/*    color="inherit"*/}
                    {/*>*/}
                    {/*</IconButton>*/}
                    <Typography
                        component={Link}
                        to="/"
                        variant="h6"
                        className={classes.title}
                    >
                        Matching App
                    </Typography>
                    <AuthButtons />
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;