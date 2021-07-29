import React from 'react';
import {Inertia} from "@inertiajs/inertia";
import {useForm} from "@inertiajs/inertia-react";
import {useErrorFlash} from "@/hooks/useErrorFlash";
import Authenticated from "@/Layouts/Authenticated";
import {useSuccessFlash} from "@/hooks/useSuccessFlash";
import {
    Box,
    Button, Checkbox, Chip, Dialog, DialogActions, DialogContent,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@material-ui/core";

const UserManagement: React.FC = (props) => {
    console.log(props)
    const {setData, data, post, processing, errors, reset, hasErrors} = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    const [openCreationDialog, setOpenCreationDialog] = React.useState(false)

    useErrorFlash()
    useSuccessFlash()

    const removeUser = (userId: number) => {
        Inertia.delete(window.route("user_management.destroy", userId))
    }

    const revertRemovedUser = (userId: number) => {
        Inertia.put(window.route("user_management.revert", userId))
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Management</h2>}>
            <Box pt={4.25} px={2}>
                <Box mb={2}>
                    <Grid container justify={"flex-end"}>
                        <Grid item>
                            <Button color={"primary"} disableElevation onClick={() => setOpenCreationDialog(true)}
                                    variant={"contained"}>Create User</Button>
                        </Grid>
                    </Grid>
                </Box>

                <Grid container>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Deleted</TableCell>
                                        <TableCell>Role</TableCell>
                                        {props.isAdmin && <TableCell>Actions</TableCell>}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Checkbox
                                                    color={"primary"}
                                                    checked={!!user.deleted_at}/>
                                            </TableCell>
                                            <TableCell>{user.roles.map(role => role.name).join(", ")}</TableCell>
                                            {props.isAdmin && <TableCell>
                                                <Button onClick={removeUser.bind(null, user.id)}>
                                                    Remove
                                                </Button>
                                                <Button onClick={revertRemovedUser.bind(null, user.id)}>
                                                    Revert
                                                </Button>
                                            </TableCell>}
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
                    post(window.route("user_management.store"), {
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
                                    label={"Name"}
                                    error={hasErrors}
                                    value={data.name}
                                    variant={"outlined"}
                                    helperText={errors.name}
                                    onChange={(e) => {
                                        setData("name", e.target.value)
                                    }}
                                />
                            </Box>

                            <Box>
                                <TextField
                                    fullWidth
                                    label={"Email"}
                                    error={hasErrors}
                                    value={data.email}
                                    variant={"outlined"}
                                    helperText={errors.email}
                                    onChange={(e) => {
                                        setData("email", e.target.value)
                                    }}
                                />
                            </Box>

                            <Box>
                                <TextField
                                    fullWidth
                                    label={"Password"}
                                    error={hasErrors}
                                    variant={"outlined"}
                                    value={data.password}
                                    helperText={errors.password}
                                    onChange={(e) => {
                                        setData("password", e.target.value)
                                    }}
                                />
                            </Box>

                            <Box>
                                <TextField
                                    fullWidth
                                    error={hasErrors}
                                    variant={"outlined"}
                                    label={"password confirmation"}
                                    value={data.password_confirmation}
                                    helperText={errors.password_confirmation}
                                    onChange={(e) => {
                                        setData("password_confirmation", e.target.value)
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

export default UserManagement;
