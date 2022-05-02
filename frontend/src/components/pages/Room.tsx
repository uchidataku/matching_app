import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../App";
import {makeStyles} from "@mui/styles";
import {Avatar, Grid} from "@mui/material";

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
        marginLeft: 1
    }
}))

function Room() {
    const classes = useStyles()
    const id = 'hoge'
    const [loading, setLoading] = useState<boolean>(true)
    const { currentAccount } = useContext(AuthContext)
    return (
        <>
            {
                !loading ? (
                    <div style={{ maxWidth: 360 }}>
                        <Grid container justifyItems="center" style={{ marginBottom: "1rem" }}>
                            <Grid item>
                                <Avatar/>
                            </Grid>
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