<script lang="ts">
	import { makeGameStore } from '../lib/gameStore';
	import Game from '../lib/Game.svelte';
	import { loginStore } from '$lib/loginStore';
	const gameStore = makeGameStore(undefined, $loginStore);
	let scrSize: number = 500;
	let gameData = $gameStore;

	let size: number = 3,
		criteria: number = 3;
	let onTurn = (e: CustomEvent<{ x: number; y: number }>) => {
		gameStore.turn(e.detail.x, e.detail.y);
	};
	let onReset = (e: MouseEvent) => {
		gameStore.reset(size, criteria);
	};
</script>
<div class="main">
	{#if $gameStore}
	<div class="indiv">
		<div class="setdiv">
			<p1 class="text">Размер</p1>
			<input class="inpt" type="number" id="size" bind:value={size} />
		</div>
		<div class="setdiv">
			<p1 class="text">Критерий</p1>
			<input class="inpt" type="number" id="criteria" bind:value={criteria} />
		</div>
		<button class="btn" id="reset" on:click={onReset}>Перезапуск</button>
		<br />
	</div>
		<div class="indiv">
			{#if ($gameStore.winner != null || $gameStore.draw)}
				{#if $gameStore.draw}
					<p1 class="text">Результат игры: Ничья</p1>
				{:else}
					<p1 class="text">Результат игры: Победили {$gameStore.winner}</p1>
				{/if}
			{:else}
				<p1 class="text">Ход: {$gameStore.currentPlayer}</p1>
			{/if}
		</div>
		<Game gameData={$gameStore} {scrSize} on:turn={onTurn} />
			
	{:else}
		<div class="loader"></div>
		<p1 class="downloadtext">Загрузка...</p1>
	{/if}
</div>

<style>
	.setdiv {
		display: flex;
		/* display: block; */
		align-items: center;
		padding: 10px;
		justify-content: space-between;
		/* align-self: start; */
	}

	.main {
        /* position: relative; */
		position: relative;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
		align-items: center;
        /* padding: 10px; */
        margin: 10px;
    }
	.indiv {
		position: relative;
        display: flex;
		flex-direction: column;
        /* flex-wrap: wrap; */
        align-content: center;
        /* align-items: center; */
        /* padding: 10px; */
        margin: 10px;
    }


	.text {
		position: relative;
		font-size: 18px;
		font-family: sans-serif;
		color: #000000;
	}

	.downloadtext {
		position: relative;
		font-size: 25px;
		font-family: sans-serif;
		color: #000000;
		left:calc(50% - 6vmin);
		position:fixed;
		top:calc(50% - 20vmin);
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
	.btn {
		border: none;
		border-radius: 10px;
        position: relative;
        bottom: 2px;
		font-size: 18px;
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
		margin-left: 10px;
	}

@keyframes spin {
  100% {
    transform:rotate(360deg);
  }
}
</style>