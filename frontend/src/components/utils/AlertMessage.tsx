import React from "react";
import {Alert, AlertProps, Snackbar} from "@mui/material";

const ShowAlert = React.forwardRef<HTMLDivElement, AlertProps>(function InAlert(
    props,
    ref
) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} />
})

interface AlertMessageProps {
    open: boolean
    setOpen: Function
    severity: "error" | "success" | "info" | "warning"
    message: string
}

const AlertMessage = ({ open, setOpen, severity, message }: AlertMessageProps) => {
    const handleCloseAlertMessage = (e?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") return

        setOpen(false)
    }

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                // onClose={handleCloseAlertMessage}
            >
                <ShowAlert onClose={handleCloseAlertMessage} severity={severity}>
                    {message}
                </ShowAlert>
            </Snackbar>
        </>
    )
}

export default AlertMessage