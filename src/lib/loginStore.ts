import { readable, writable} from "svelte/store";
import type { Readable } from "svelte/store";
import { url } from "$lib/url";
// const url = "195.133.48.29:8000"

export interface UserData {
    username: string,
    token: string
}

export interface UserStore extends Readable<UserData> {
    register: (username: string, password: string) => void,
    login: (username: string, password: string) => any,
    logout: () => void,
}

function makeGameStore() : UserStore {
    let {set, subscribe} = writable<UserData>({username: "-1", token: "-1"});

    async function register(username: string, password: string) {
        let res = await fetch(url + "user/register",
        {method: "POST",
        body: JSON.stringify({username, password}),
        headers: {"Content-type": "application/json"}});
    }

    async function login(username: string, password: string) {
        let res = await fetch(url + "user/login",
        {method: "POST",
        body: JSON.stringify({username, password}),
        headers: {"Content-type": "application/json"}});
        let token = await res.json();
        if (token != null) {
            set({username: username, token: token});
        }
        return token;
    }

    async function logout() {
        set({username: "-1", token: "-1"});
    }


    return {
        subscribe,
        register,
        login,
        logout
    }
}


export let loginStore = makeGameStore();