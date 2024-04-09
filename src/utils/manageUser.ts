import { token } from "../stores/store";
import { goto } from "$app/navigation";

export function logout() {
    localStorage.removeItem('token');
    token.set(null);
    return goto('/')
}

export function onBeforeUnload() {
    let val: any = null;
    token.subscribe((v: any) => (val = v));
    localStorage.removeItem('token');
    if (val === null) return goto('/')
    localStorage.setItem('token', val);
    return
}

export function onLoad(){
    if (localStorage.getItem('token') !== null) {
        console.log(localStorage.getItem('token'))
        token.set(localStorage.getItem('token'));
        let val: any = null;
        token.subscribe((v: any) => (val = v));
        localStorage.removeItem('token');
        if (val === null) return goto('/')
        localStorage.setItem('token', val);
    }
    return
}
