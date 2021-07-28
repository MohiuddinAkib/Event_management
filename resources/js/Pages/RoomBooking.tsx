import React from 'react';
import Authenticated from "@/Layouts/Authenticated";
import {Box, Button, Grid} from "@material-ui/core";

const RoomBooking: React.FC = (props) => {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Room Booking</h2>}
        >
            <Box mt={4.25}>
                <Grid container>
                    <Grid item>
                        <Button color={"primary"} variant={"contained"}>Create Room</Button>
                    </Grid>
                </Grid>
            </Box>
        </Authenticated>
    );
};

export default RoomBooking;
