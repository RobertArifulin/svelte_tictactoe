<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import {wasAlerted} from "./gameStore"
	import type { GameData } from './gameStore';

	export let scrSize: number;
	export let gameData: GameData;
	let width = scrSize;
	let height = scrSize;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let dispatch = createEventDispatcher<{
		turn: {x:number, y:number}
	}>();
	
	let clickHandler = (e: MouseEvent) => {
		let rect = canvas.getBoundingClientRect();
		let x = Math.floor((e.clientX - rect.left) / cellSize);
		let y = Math.floor((e.clientY - rect.top) / cellSize);
		dispatch('turn', { x: x, y: y });
	};

	onMount(() => {
		ctx = canvas.getContext('2d')!;
	});
	$: cellSize = scrSize / gameData.size;
	$: {
		if (ctx) {
			ctx.clearRect(0, 0, width, height);
			ctx.lineWidth = 2;
			for (let i = 0; i < gameData.size; i++) {
				for (let j = 0; j < gameData.size; j++) {
					switch (gameData.field[i][j]) {
						case 'X':
							ctx.strokeStyle = '#f00';
							ctx.beginPath();
							ctx.moveTo(i * cellSize, j * cellSize);
							ctx.lineTo((i + 1) * cellSize, (j + 1) * cellSize);
							ctx.stroke();
							ctx.beginPath();
							ctx.moveTo(i * cellSize, (j + 1) * cellSize);
							ctx.lineTo((i + 1) * cellSize, j * cellSize);
							ctx.stroke();
							break;
						case 'O':
							ctx.strokeStyle = '#00f';
							ctx.beginPath();
							ctx.arc((i + 0.5) * cellSize, (j + 0.5) * cellSize, cellSize / 2 - 3, 0, 6.3);
							ctx.closePath();
							ctx.stroke();
							break;
					}
				}
			}
			ctx.lineWidth = 1;
			ctx.strokeStyle = '#000';
			for (let i = 0; i <= gameData.size; i++) {
				ctx.beginPath();
				ctx.moveTo(0, i * cellSize);
				ctx.lineTo(width, i * cellSize);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(i * cellSize, 0);
				ctx.lineTo(i * cellSize, height);
				ctx.stroke();
			}
		}
	}
</script>

<canvas bind:this={canvas} {width} {height} on:click={clickHandler} />
