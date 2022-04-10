import React, {useContext} from "react";

import {makeStyles} from "@mui/styles";
import {AppBar} from "@mui/material";
import {Toolbar} from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import {IconButton} from "@mui/material";
import {Menu} from "@mui/material";
import {Link} from "react-router-dom";
import {AuthContext} from "../../App";

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
    const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
    const classes = useStyles()

    const AuthButtons = () => {
        if (!loading) {
            if (isSignedIn) {
                return <></>
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