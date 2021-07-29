import clsx from "clsx"
import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import {useForm} from "@inertiajs/inertia-react";
import {useErrorFlash} from "@/hooks/useErrorFlash";
import Authenticated from "@/Layouts/Authenticated";
import {useSuccessFlash} from "@/hooks/useSuccessFlash";
import {ReservationStatus} from "@/constants/ReservationStatus";
import {
    Box,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox, Chip, Dialog, DialogContent, TextField, DialogActions
} from "@material-ui/core";

const RoomBooking: React.FC = (props) => {
    console.log(props)
    const {setData, data, post, processing, errors, reset, hasErrors} = useForm({
        text: "",
        color: ""
    })

    const [openCreationDialog, setOpenCreationDialog] = React.useState(false)

    useErrorFlash()
    useSuccessFlash()

    const approveReservation = (reservationId: number) => {
        Inertia.put(window.route("reservations.approve", reservationId))
    }

    const rejectReservation = (reservationId: number) => {
        Inertia.put(window.route("reservations.reject", reservationId))
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Room Booking</h2>}
        >
            <Box pt={4.25} px={2}>
                <Box mb={2}>
                    <Grid container justify={"flex-end"}>
                        <Grid item>
                            <Button color={"primary"} disableElevation onClick={() => setOpenCreationDialog(true)}
                                    variant={"contained"}>Create Room</Button>
                        </Grid>
                    </Grid>
                </Box>

                <Grid container>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>user</TableCell>
                                        <TableCell>Department</TableCell>
                                        <TableCell>Room</TableCell>
                                        <TableCell>Number of people</TableCell>
                                        <TableCell>Start date</TableCell>
                                        <TableCell>End date</TableCell>
                                        <TableCell>Notes</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>All day</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.reservations.map((reservation) => (
                                        <TableRow key={reservation.id}>
                                            <TableCell>
                                                {reservation.title}
                                            </TableCell>
                                            <TableCell>{reservation.user.name}</TableCell>
                                            <TableCell>{reservation.department}</TableCell>
                                            <TableCell>{reservation.room.text}</TableCell>
                                            <TableCell>{reservation.numberOfPeople}</TableCell>
                                            <TableCell>{reservation.startDate}</TableCell>
                                            <TableCell>{reservation.endDate}</TableCell>
                                            <TableCell>{reservation.notes}</TableCell>
                                            <TableCell><Chip className={clsx("text-white", {
                                                "bg-yellow-500": reservation.status === ReservationStatus.PENDING,
                                                "bg-green-500": reservation.status === ReservationStatus.APPROVED,
                                                "bg-red-500": reservation.status === ReservationStatus.REJECTED,
                                            })}
                                                             label={reservation.status}/></TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    color={"primary"}
                                                    checked={reservation.allDay}/>
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={approveReservation.bind(null, reservation.id)}>
                                                    Approve
                                                </Button>
                                                <Button onClick={rejectReservation.bind(null, reservation.id)}>
                                                    Reject
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>

            <Dialog open={openCreationDialog} onClose={() => setOpenCreationDialog(false)}>
                <form onSubmit={e => {
                    e.preventDefault()
                    post(window.route("rooms.store"), {
                        onSuccess: () => {
                            reset("text" as any, "color" as any)
                            setOpenCreationDialog(false)
                        }
                    } as any)
                }}>
                    <DialogContent>
                        <Box minWidth={400}>
                            <Box mb={2}>
                                <TextField
                                    fullWidth
                                    label={"Text"}
                                    error={hasErrors}
                                    value={data.text}
                                    variant={"outlined"}
                                    helperText={errors.text}
                                    onChange={(e) => {
                                        setData("text", e.target.value)
                                    }}
                                />
                            </Box>

                            <Box>
                                <TextField
                                    fullWidth
                                    label={"Color"}
                                    error={hasErrors}
                                    value={data.color}
                                    variant={"outlined"}
                                    helperText={errors.color}
                                    onChange={(e) => {
                                        setData("color", e.target.value)
                                    }}
                                />
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button type={"submit"} color={"primary"} disabled={processing}>
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Authenticated>
    );
};

export default RoomBooking;
