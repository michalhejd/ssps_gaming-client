import { goto } from "$app/navigation";
import { verificationEmail } from "../../stores/store";
export const prerender = true;
export const csr = true;
export const ssr = false;

export const load = async () => {
    verificationEmail.subscribe((value: any) => {
        if(!value) return goto('/');
        console.log(value)
        return value
    })
}