import { readable, writable} from "svelte/store";
import type { Readable } from "svelte/store";
import type { GameData } from "./gameStore";
import { url } from "$lib/url";
export type Cell = "X" | "O";

// const url = "195.133.48.29:8000"

export interface GamesListData {
    [key: string]: {
        "game": GameData,
        "x_player": String,
        "o_player": String,
    },
}

export interface GamesListStore extends Readable<GamesListData | undefined> {

}


function makeGamesListStore() : GamesListStore {
    let {subscribe} = writable<GamesListData | undefined>(undefined, (set) => {
        const interval = setInterval(async () => {
            let res = await fetch(url + 'games/');
            set(await res.json());
        }, 1000);
        
        return () => clearInterval(interval);
    });

    return {
        subscribe
    }
}

    export const gamesListStore = makeGamesListStore();