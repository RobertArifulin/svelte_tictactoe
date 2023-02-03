<script lang="ts">
import {loginStore} from "./loginStore";

let username = "";
let password = "";
let register = 0;

function handleRegister() {
    loginStore.register(username, password)
}

function handleLogin() {
    loginStore.login(username, password);
    console.log(1);
}

function onClickLogout() {
    loginStore.logout()
}
</script>

{#if $loginStore.username}
    Вы вошли как: {$loginStore.username}
    <button on:click={onClickLogout}>
        Выйти
    </button>
{:else}
    <input type=string bind:value={username}>
    <input type="password" bind:value={password}>

    <button on:click={handleRegister}>
        Регистрация
    </button>

    <button on:click={handleLogin}>
        Вход
    </button>
{/if}
