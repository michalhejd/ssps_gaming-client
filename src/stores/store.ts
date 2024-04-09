import { writable } from "svelte/store";

export const user: any = writable(null);
export const token: any = writable(null);
export const isAuth: any = writable(false);
export const verificationEmail: any = writable(null);
export const usersManageProfile: any = writable(null);