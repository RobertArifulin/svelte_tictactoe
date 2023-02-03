<script lang="ts">
	import { loginStore } from './loginStore';
	import {wasAlerted} from './gameStore'
	let username: string, password: string;
	let logout = () => {
		wasAlerted.set(false);
		loginStore.logout();
	};
	let login = () => {
		wasAlerted.set(false);
		loginStore.login(username, password);
	};
	let register = () => {
		wasAlerted.set(false);
		loginStore.register(username, password);
	};
</script>

<div class="main">
    <div class="indiv">
        <label class="text" for="username1">Логин</label>
        <input class="inpt" id="username1" type="text" bind:value={username} />
    </div>           
    <div class="indiv">
        <label class="text" for="password1">Пароль</label>
        <input class="inpt" id="password1" type="password" bind:value={password} />
    </div>
    <button class="btn" on:click={register}>Зарегистрироваться</button>
</div>
<style>
    .indiv {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
        /* padding: 10px; */
        margin: 10px;
    }
    .main {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
        /* padding: 10px; */
        margin: 10px;
    }

	.text {
		font-size: 25px;
		font-family: sans-serif;
		color: #000000;
	}


	.inpt {
		border-radius: 10px;
		border-color: #6b6b6b;
		font-size: large;
		padding-top: 4px;
		padding-bottom: 4px;
		padding-left: 10px;
		padding-right: 10px;
		text-decoration: none;
        margin-top: 5px;
	}

	.inpt:focus {
		outline-color: #0B63F6;
	}

	.btn {
		border: none;
		border-radius: 10px;
        position: relative;
        bottom: 2px;
		font-size: 20px;
        margin-top: 15px;
		padding: 10px 10px;
		color: white;
		background: #0B63F6;
    	box-shadow: 0 5px 0 #003CC5;
	}

	.btn:active {
		background: #003CC5;
		box-shadow: none;
		position: relative;
		top: 5px;
	}
</style>