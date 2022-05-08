import React, {useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom"
import {
    Avatar,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
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
            console.log('- handleGetRooms')
            console.log(res)
            if (res.status === 200) {
                setRooms(res.data)
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
                                        <Link to={`${room.id}`} className={classes.link}>
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