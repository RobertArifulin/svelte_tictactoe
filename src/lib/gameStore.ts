import { readable, writable} from "svelte/store";
import type { Readable } from "svelte/store";
import type { UserData } from "./loginStore";
import { url } from "$lib/url";

export type Cell = "X" | "O";

export interface GameData {
    size: number,
    criteria: number,
    draw: boolean,
    field: Array<Array<Cell>>,
    currentPlayer: Cell,
    winner: Cell,
}

export interface GameStore extends Readable<GameData> {
    turn: (x: number, y: number) => void;
    reset: (size: number, criteria: number) => void;
}

export const wasAlerted = writable(false);

export function makeGameStore(gameId: string | undefined = undefined, user: UserData | undefined) : GameStore {
    let isMain = (gameId === undefined);
    let url1 = isMain ? url : url + `games/${gameId}/`;
    let authHeader = user === undefined ? '' : 'Bearer ' + user.token;

    let {subscribe} = writable<GameData>(undefined, (set) => {
        const interval = setInterval(async () => {
            let res = await fetch(url1);
            set(await res.json());
        }, 1000);
        set
        return () => clearInterval(interval);
    });

    async function reset(size: number, criteria: number){
        wasAlerted.set(false);
        let res = await fetch(url1 + "reset",
            {
                method: "POST",
                body: JSON.stringify({ size, criteria }),
                headers: {
                    "Content-type": "application/json",
                    Authorization: authHeader,
                }
            });
        return
    } 

    async function turn(x: number, y: number){
        let res = await fetch(url1 + "turn",
            {
                method: "POST",
                body: JSON.stringify({ x: x, y: y }),
                headers: {
                    "Content-type": "application/json",
                    Authorization: authHeader,
                }
            });        
        return
    } 


    return {
        subscribe,
        turn,
        reset,

    }
}
