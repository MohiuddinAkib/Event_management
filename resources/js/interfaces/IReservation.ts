import {AppointmentModel} from "@devexpress/dx-react-scheduler";

export interface IReservation extends AppointmentModel {
    notes: string;
    userId: number;
    numberOfPeople: number
}
