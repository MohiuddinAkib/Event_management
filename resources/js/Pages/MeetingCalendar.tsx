import React from 'react';
import dayjs from "dayjs";
import {useSnackbar} from "notistack";
import {useForm} from "@inertiajs/inertia-react";
import {useFetchUsers} from "@/hooks/useFetchUsers";
import Authenticated from "@/Layouts/Authenticated";
import {useErrorFlash} from "@/hooks/useErrorFlash";
import {IReservation} from "@/interfaces/IReservation";
import {Box, Paper, useTheme} from "@material-ui/core";
import {useSuccessFlash} from "@/hooks/useSuccessFlash";
import {useFetchResources} from "@/hooks/useFetchResources";
import {ReservationStatus} from "@/constants/ReservationStatus";
import {ChangeSet, EditingState, IntegratedEditing, ViewState} from '@devexpress/dx-react-scheduler';
import {
    Toolbar,
    DayView,
    WeekView,
    MonthView,
    Scheduler,
    Appointments,
    ViewSwitcher,
    DateNavigator,
    TodayButton,
    AppointmentForm,
    ConfirmationDialog,
    AppointmentTooltip, Resources,
} from '@devexpress/dx-react-scheduler-material-ui';

const Appointment = ({
                         children, style, ...restProps
                     }) => {
    console.log("rest props", restProps)
    const theme = useTheme()

    return (<Appointments.Appointment
        {...restProps}
        style={{
            ...style,
            backgroundColor: restProps.data.status === ReservationStatus.PENDING ? theme.palette.warning.main : restProps.data.status === ReservationStatus.REJECTED ? theme.palette.error.main : theme.palette.success.main,
            borderRadius: '8px',
        }}
    >
        {children}
    </Appointments.Appointment>)
};

const BasicLayout = ({onFieldChange, appointmentData, ...restProps}) => {
    const {data, loading} = useFetchUsers()

    const onCustomFieldChange = (fieldName) => (nextValue) => {
        onFieldChange({[fieldName]: nextValue});
    };

    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >
            <AppointmentForm.Label
                text="Department"
                type={"ordinaryLabel"}
            />
            <AppointmentForm.TextEditor
                type={"ordinaryTextEditor"}
                placeholder="Number of people"
                value={appointmentData.department}
                onValueChange={onCustomFieldChange("department")}
            />

            <AppointmentForm.Label
                text="Name"
                type={"ordinaryLabel"}
            />
            <AppointmentForm.Select
                availableOptions={data}
                placeholder="User name"
                type={"outlinedSelect"}
                value={appointmentData.userId ?? ''}
                onValueChange={onCustomFieldChange("userId")}
            />

            <AppointmentForm.Label
                text="Number of people"
                type={"ordinaryLabel"}
            />
            <AppointmentForm.TextEditor
                type={"numberEditor"}
                placeholder="Number of people"
                value={appointmentData.numberOfPeople}
                onValueChange={onCustomFieldChange("numberOfPeople")}
            />
        </AppointmentForm.BasicLayout>
    );
};

const MeetingCalendar: React.FC<{ reservations: IReservation[], errors: Record<string, string>, auth: { user: { id: number, name: string, email: string } } }> = (props) => {
    console.log("props", props)
    const {data: rooms, loading} = useFetchResources()

    useErrorFlash()
    useSuccessFlash()
    const {data, setData, post, delete: deleteReservation, put, processing, errors, transform} = useForm({
        title: "",
        user_id: 0,
        department: "",
        number_of_people: 0,
        starts_date: "",
        ends_date: "",
        notes: "",
        r_rule: "",
        all_day: false,
    })

    const {enqueueSnackbar} = useSnackbar();
    const [appointments, setAppointments] = React.useState<IReservation[]>(() => {
        return props.reservations.map(reservation => ({
            ...reservation,
            startDate: dayjs(reservation.startDate).toDate(),
            endDate: dayjs(reservation.endDate).toDate(),
        }))
    })
    const [currentViewName, setCurrentViewName] = React.useState("Week");
    const [editingAppointment, setEditingAppointment] = React.useState(undefined);
    const [addedAppointment, setAddedAppointment] = React.useState<IReservation>({} as IReservation);
    const [appointmentChanges, setAppointmentChanges] = React.useState<Partial<IReservation>>({});

    function changeAddedAppointment(addedAppointment) {
        console.log("hahah", addedAppointment)
        setData({
            "title": addedAppointment.title,
            "user_id": addedAppointment.userId,
            "number_of_people": addedAppointment.numberOfPeople,
            "start_date": addedAppointment.startDate,
            "end_date": addedAppointment.endDate,
            "notes": addedAppointment.notes,
            "r_rule": addedAppointment.rRule,
            "all_day": addedAppointment.allDay,
            "department": addedAppointment.department,
            "reservation_room_id": addedAppointment.roomId,
        } as any)
        setAddedAppointment(addedAppointment);
    }

    function changeAppointmentChanges(appointmentChanges) {
        const updatedAppointMent = {
            ...editingAppointment,
            ...appointmentChanges
        }

        setData({
            "title": updatedAppointMent.title,
            "user_id": updatedAppointMent.userId,
            "number_of_people": updatedAppointMent.numberOfPeople,
            "start_date": updatedAppointMent.startDate,
            "end_date": updatedAppointMent.endDate,
            "notes": updatedAppointMent.notes,
            "r_rule": updatedAppointMent.rRule,
            "all_day": updatedAppointMent.allDay,
            "department": updatedAppointMent.department,
            "reservation_room_id": updatedAppointMent.roomId,
        } as any)

        console.log("hoho", appointmentChanges)
        setAppointmentChanges(appointmentChanges);
    }

    function changeEditingAppointment(editingAppointment) {
        console.log("hihi", editingAppointment)
        setEditingAppointment(editingAppointment);
    }

    function commitChanges({added, changed, deleted}: ChangeSet) {
        if (added) {
            post(window.route("reservations.store"), {
                onSuccess: (params) => {
                    window.location.reload()
                }
            } as any);
        }

        if (changed) {
            console.log("changed", changed, editingAppointment)
            put(window.route("reservations.update", editingAppointment.id), {
                onSuccess: () => {
                    setAppointments((state) => {
                        let data = state;

                        data = data.map(appointment => (
                            changed[appointment.id] ? {...appointment, ...changed[appointment.id]} : appointment));

                        return data;
                    });
                }
            } as any)
        }

        if (deleted !== undefined) {
            deleteReservation(window.route("reservations.destroy", deleted), {
                onSuccess: (params) => {
                    setAppointments((state) => {
                        let data = state;

                        data = data.filter(appointment => appointment.id !== deleted);

                        return data;
                    });
                }
            } as any);
        }
    }

    React.useEffect(() => {
        transform((data) => ({
            ...data,
            start_date: dayjs(data.start_date).format("YYYY-MM-DD HH:mm:ss"),
            end_date: dayjs(data.end_date).format("YYYY-MM-DD HH:mm:ss")
        }))
        console.log("dataaaaaaaaaaa", data)
    }, [data])

    React.useEffect(() => {
        if (Object.keys(errors).length) {
            Object.values(errors).forEach(message => {
                enqueueSnackbar(message, {variant: "error"});
            })
        }
    }, [errors])

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Meeting Calendar</h2>}
        >
            <Box>
                <Paper>
                    <Scheduler
                        height={"100vh"}
                        data={appointments}
                    >
                        <EditingState
                            onCommitChanges={commitChanges}
                            addedAppointment={addedAppointment}
                            onAddedAppointmentChange={changeAddedAppointment}
                            appointmentChanges={appointmentChanges}
                            onAppointmentChangesChange={changeAppointmentChanges}
                            editingAppointment={editingAppointment}
                            onEditingAppointmentChange={changeEditingAppointment}
                        />

                        <ViewState
                            currentViewName={currentViewName}
                            onCurrentViewNameChange={setCurrentViewName}
                        />

                        <DayView
                            // startDayHour={9}
                            // endDayHour={18}
                        />
                        <WeekView
                            // endDayHour={19}
                            // startDayHour={10}
                        />
                        <IntegratedEditing/>

                        <MonthView/>

                        <Toolbar/>
                        <DateNavigator/>
                        <TodayButton/>
                        <ViewSwitcher/>
                        <Appointments
                            appointmentComponent={Appointment}
                        />
                        <Resources
                            data={rooms}
                            mainResourceName="roomId"
                        />
                        <AppointmentTooltip
                            showOpenButton
                            showDeleteButton
                        />
                        <AppointmentForm
                            basicLayoutComponent={BasicLayout}
                        />
                        <ConfirmationDialog
                            ignoreCancel
                        />
                    </Scheduler>
                </Paper>
            </Box>
        </Authenticated>
    );
};

export default MeetingCalendar;
