<script lang="ts">
	import Game from '$lib/Game.svelte';
	import User from '$lib/User.svelte';	
	import { onMount } from 'svelte';
	import { loginStore } from '$lib/loginStore';
	import { wasAlerted } from '$lib/gameStore'

	function clickHandler(id: string) {
		if (document.getElementsByClassName("active")[0] != undefined) {
			document.getElementsByClassName("active")[0].classList.remove('active');
		}
		document.getElementById(id).classList.add('active');
	} 
	function logout() {
		wasAlerted.set(false);
		loginStore.logout();
	};

	// if (document.getElementsByClassName("active")[0] == undefined) {
	// 	document.getElementById("home").classList.add('active');
	// 	console.log(123);
	// } 
	// document.onload = clickHandler("home");
</script>


<div class="topnav">
	<a id="home" class="active" href="/" on:click={() => {clickHandler("home")}}>Главная</a>
	<a id="games" href="/games" on:click={() => {clickHandler("games")}}>Игры</a>
	<a id="reg" href="/reg" on:click={() => {clickHandler("reg")}}>Регистрация</a>
	{#if $loginStore.username == "-1"}
		<a id="log" href="/log" on:click={() => {clickHandler("log")}}>Вход</a>
	{:else}
		<div class="indiv">
			<p1 class="text">Вы вошли под ником: {$loginStore.username}</p1>
			<button class="btn" on:click={logout}>Выйти</button>
		</div>
	{/if}
</div>

<br /><br /><br />
<style>
	.text {
		display: flex;
		font-size: 23px;
		font-family: sans-serif;
		align-items: center;
		color: #fff;
	}
	.indiv {
		display: flex;
		padding: 21px 32px;
	}

	.btn {
		border: none;
		border-radius: 10px;
        position: relative;
        bottom: 2px;
		font-size: 20px;
		flex-wrap: wrap;
        /* margin-top: 20px; */
		margin-left: 10px;
		padding: 7px 15px;
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

	.topnav {
		display: flex;
		align-content: center;
		align-items: center;
		background-color: #7186ff;
		overflow: hidden;
		height: 60px;
	}

	.topnav a {
		display: flex;
		float: left;
		color: #ffffff;
		font-family: sans-serif;
		text-align: center;
		align-items: center;
		align-self:stretch;
		padding: 0px 32px;
		text-decoration: none;
		font-size: 23px;
	}


	.topnav a:hover {
		background-color: #ffffff;
 		color: black;
	}

	.topnav a.active {
		background-color: #0015ff;
		color: white;
	}



</style>
<!-- <User /><br /> -->
<slot />
