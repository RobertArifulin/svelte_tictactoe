import type { PageLoad, PageData } from "./$types"
export function load({ params }) {
    return {
        id: params.id,
    }
}