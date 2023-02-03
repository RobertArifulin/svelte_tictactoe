<script lang="ts">
	import { gamesListStore } from './gamesListStore';
	import { loginStore } from './loginStore';
	import { goto } from "$app/navigation";
	import { url } from "./url";

	let size: number = 3;
	let criteria: number = 3;

	function new_game() {
		if ($loginStore == undefined || $loginStore.token == "-1") return;
		fetch(`${url}games/`, {
			method: 'POST',
			body: JSON.stringify({ size: size, criteria: criteria }),
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + $loginStore.token
			}
		});
	};
	

	function register(player: string, id: string) {
		if ($loginStore == undefined || $loginStore.token == "-1") return;
		fetch(`${url}games/${id}/register`, {
			method: 'POST',
			body: JSON.stringify({ as: player }),
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + $loginStore.token
			}
		});
	};

	async function del (id: string) {
		if ($loginStore == undefined) return;
		let res = await fetch(`${url}/games/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + $loginStore.token
			}
		})
		let json = await res.json();
	}


</script>

{#if $gamesListStore}
	{#if $loginStore}
		<div class="indiv">
			<div class="setdiv">
				<p1 class="text">Размер</p1>
				<input class="inpt" type="number" id="size" bind:value={size} />
			</div>
			<div class="setdiv">
				<p1 class="text">Критерий</p1>
				<input class="inpt" type="number" id="criteria" bind:value={criteria} />
			</div>
			<button class="btn createbtn" id="new-game" on:click={new_game}>Создать</button>
			<br/>
		</div>
	{/if}
	<ul style="display: flex;">
		{#each Object.keys($gamesListStore) as a}
			<li>
				<p1 class="text gametitle">Игра {a}</p1> <br/>
				<div style="display: flex;">
					{#if $gamesListStore[a].x_player == null}
						<button class="btn"
							on:click={() => {
								register('X', a);
							}}>войти как X</button
						>
					{:else}
						<p1 class="text">{$gamesListStore[a].x_player}</p1>
					{/if}
					<p1 class="text" style="padding: 0px 10px;">vs</p1>
					{#if $gamesListStore[a].o_player == null}
						<button class="btn"
							on:click={() => {
								register('O', a);
							}}>войти как O</button
						>
					{:else}
						<p1 class="text">{$gamesListStore[a].o_player}</p1>
					{/if}
				</div>
				<!-- <a href={'/games/' + a}>Войти</a> -->
				<button class="enterbtn btn"
							on:click={() => {
								goto("/games/" + a);
							}}>Войти
				</button>
				<button class="delbtn btn"
							on:click={() => {
								del(a);
							}}>Удалить
				</button>
				<br />
			</li>
		{/each}
	</ul>
	{:else}
	<div class="loader"></div>
	<label class="text" for="username1">Загрузка...</label>
{/if}

<style>
	ul {
		display: flex;
		flex-direction: column;
		padding-left: 0px;
	}
	li {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	a {
		/* float: left; */
		color: #003CC5;
		font-family: sans-serif;

		text-align: center;
		padding: 21px 32px;
		text-decoration: none;
		font-size: 18px;
	}
	.btn {
		border: none;
		border-radius: 10px;
        position: relative;
        bottom: 2px;
		font-size: 14px;
        margin-top: 10px;
		padding: 5px 10px;
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

	.enterbtn {
		font-size: 20px;
		padding: 6px 20px;
	}
	
	.delbtn {
		font-size: 20px;
		padding: 6px 20px;
		background-color: #f31c1c;
		box-shadow: 0 5px 0 #a81616;
	}

	.createbtn {
		font-size: 20px;
		padding: 8px 25px;
	}

	.text {
		display: block;
		font-size: 20px;
		font-family: sans-serif;
		color: #000000;
	}

	.gametitle {
		font-size: 25px;
		padding-top: 40px;
	}

	.loader {
		animation:spin 1s infinite linear;
		border:solid 2vmin transparent;
		border-radius:50%;
		border-right-color:#09f;
		border-top-color:#09f;
		box-sizing:border-box;
		height:20vmin;
		left:calc(50% - 10vmin);
		position:fixed;
		top:calc(50% - 10vmin);
		width:20vmin;
		z-index:1;
	}
	.loader:before {
		animation:spin 2s infinite linear;
		border:solid 2vmin transparent;
		border-radius:50%;
		border-right-color:#3cf;
		border-top-color:#3cf;
		box-sizing:border-box;
		content:"";
		height:16vmin;
		left:0;
		position:absolute;
		top:0;
		width:16vmin;
	}
	.loader:after {
		animation:spin 3s infinite linear;
		border:solid 2vmin transparent;
		border-radius:50%;
		border-right-color:#6ff;
		border-top-color:#6ff;
		box-sizing:border-box;
		content:"";
		height:12vmin;
		left:2vmin;
		position:absolute;
		top:2vmin;
		width:12vmin;
	}
	.inpt {
		position: relative;
		border-radius: 10px;
		border-color: #6b6b6b;
		font-size: large;
		padding-top: 4px;
		padding-bottom: 4px;
		padding-left: 10px;
		padding-right: 10px;
		text-decoration: none;
        margin-top: 5px;
		/* margin-left: 10px; */
	}
	.indiv {
		/* position: relative; */
        display: flex;
		flex-direction: column;
        /* flex-wrap: wrap; */
        align-content: center;
        align-items: center;
        /* padding: 10px; */
        margin: 10px;
		margin-bottom: 50px;
    }
	.setdiv {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;
	}

@keyframes spin {
  100% {
    transform:rotate(360deg);
  }
}
</style>