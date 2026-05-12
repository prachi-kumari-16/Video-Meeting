import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"
import DeleteIcon from "@mui/icons-material/Delete";

export default function History() {

    const {getHistoryOfUser} = useContext(AuthContext);

    const [meetings, setMeetings] = useState([])

    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async() => {
            try{
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {

            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`
    }

    const deleteMeeting = (indexToDelete) => {
    const updatedMeetings = meetings.filter(
        (_, index) => index !== indexToDelete
    );

        setMeetings(updatedMeetings);
    };

    const clearAllMeetings = () => {
        setMeetings([]);
    };

    return (
        <div>

               <IconButton onClick={() => {
                        routeTo("/home")
                }}>
                            <HomeIcon />

                </IconButton>

                <Button
                    variant="contained"
                    color="error"
                    onClick={clearAllMeetings}
                    sx={{ marginLeft: 2 }}
                >
                    Clear All
                </Button>

            {
                (meetings.length !== 0 )? meetings.map((e, i) => {
                    return (

                        <>
                         
                            <Card key={i} variant="outlined">

                                 <CardContent>
                                    <Typography  sx={{ color: 'text.secondary', fontSize: 14 }}>
                                        Code: {e.meetingCode}
                                    </Typography>

                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Date: {formatDate(e.date)}
                                    </Typography>

                                    
                                </CardContent>

                                <CardActions>
                                    <IconButton onClick={() => deleteMeeting(i)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </CardActions>
                                                            

                                
                            </Card>
                        </>
                    )
                
                }) : <></>
            }
            
        </div>
    )
}