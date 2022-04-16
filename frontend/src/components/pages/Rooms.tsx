import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";
import {Link, useNavigate} from "react-router-dom"
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    List,
    ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,
    TextField,
    Typography
} from "@mui/material";
import {Room} from "../../interfaces/room";
import {getRooms} from "../../lib/api/rooms";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        minWidth: 340,
        maxWidth: "100%"
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    }
}))

function Rooms() {
    const classes = useStyles()
    const [loading, setLoading] = useState<boolean>(true)
    const [rooms, setRooms] = useState<Room[]>([])

    const handleGetRooms = async () => {
        try {
            const res = await getRooms()
            if (res.status === 200) {
                console.log('========res.data======')
                console.log(res.data)
                setRooms(res.data.rooms)
            } else {
                console.log('No Rooms')
            }
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    useEffect(() => {
        handleGetRooms()
    }, [])

    return (
        <>
            {
                !loading ? (
                    rooms.length > 0 ? (
                        rooms.map((room: Room, index: number) => {
                            return (
                                <Grid container key={index} justifyItems="center">
                                    <List>
                                        <Link to={`rooms/${room.id}`} className={classes.link}>
                                            <div className={classes.root}>
                                                <ListItem alignItems="flex-start" style={{padding: 0 }}>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            alt="avatar"
                                                            src={room.otherAccount.avatarUrl}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={room.otherAccount.username}
                                                    />
                                                </ListItem>
                                            </div>
                                        </Link>
                                    </List>
                                </Grid>
                            )
                        })
                    ) : (
                        <Typography
                            component="p"
                            variant="body2"
                            color="textSecondary"
                        >
                            マッチング中の相手はいません
                        </Typography>
                    )
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default Rooms