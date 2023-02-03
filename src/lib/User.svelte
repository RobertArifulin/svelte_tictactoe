<script lang="ts">
	import { loginStore } from './loginStore';
	import { wasAlerted } from './gameStore'
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

<!-- <label for="login" /> -->
<label class="text" for="username1">Логин:</label>
<input class="inpt" id="username1" type="text" bind:value={username} />
<label class="text" for="password1">Пароль:</label>
<input class="inpt" id="password1" type="password" bind:value={password} />
<button class="btn" on:click={register}>Регистрация</button>
{#if $loginStore.token == "-1"}
<button class="btn" on:click={login}>Вход</button>
{:else}
<br>
Вы вошли под ником: {$loginStore.username}
<button on:click={logout}>Выйти</button>
{/if}
<!-- <button
	on:click={() => {
		console.log($loginStore);
	}}>check</button
> -->
<style>
	.text {
		font-size: 20px;
		font-family: sans-serif;
		color: #000000;
	}


	.inpt {
		/* border: none; */
		border-radius: 10px;
		border-color: #6b6b6b;
		font-size: large;
		padding-top: 4px;
		padding-bottom: 4px;
		padding-left: 10px;
		padding-right: 10px;
		text-decoration: none;
		/* background: #0B63F6; */
		/* box-shadow: 0 5px 0 #6b6b6b; */
	}

	.inpt:focus {
		outline-color: #0B63F6;
	}

	.btn {
		border: none;
		border-radius: 10px;
		font-size: large;
		padding-top: 5px;
		padding-bottom: 5px;
		padding-left: 10px;
		padding-right: 10px;
		color: white;
		background: #0B63F6;
    	box-shadow: 0 5px 0 #003CC5;
	}

	.btn:hover {
		background: #003CC5;
		box-shadow: none;
		position: relative;
		top: 5px;
	}
</style>