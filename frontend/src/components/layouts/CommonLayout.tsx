import React from "react";

import Header from "./Header";
import {Container, Grid, useScrollTrigger} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    container: {
        paddingTop: '3rem'
    }
}))

interface CommonLayoutProps {
    children: React.ReactElement
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
    const classes = useStyles()

    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <Container maxWidth='lg' className={classes.container}>
                    <Grid container justifyContent='center'>
                        <Grid item>
                            {children}
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    )
}

export default CommonLayout