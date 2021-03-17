import { Appointment } from "./app/Appointment";

export interface User {
    headers: any;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    appointment: Appointment[];
}