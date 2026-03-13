<script>
	import { onMount } from 'svelte';
	
	let isVisible = false;
	
	onMount(() => {
		setTimeout(() => {
			isVisible = true;
		}, 100);
	});
</script>

<div class="page">
	<div class="gradient-bg"></div>
	
	<div class="center">
		<p class="text" class:visible={isVisible}>
			Home
		</p>
	</div>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.page {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.gradient-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(145deg, #0a0f1c, #0f1a2b, #1a2a3f, #0f1a2b, #0a0f1c);
		background-size: 300% 300%;
		animation: gradientShift 15s ease infinite;
	}

	@keyframes gradientShift {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}

	.center {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding: 2rem;
	}

	.text {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		font-size: clamp(3rem, 20vw, 15rem);
		font-weight: 700;
		color: #e0e7ff;
		text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(100, 150, 255, 0.3);
		
		opacity: 0;
		transform: scale(0.9) translateY(10px);
		transition: all 0.7s cubic-bezier(0.2, 0.9, 0.3, 1.1);
		
		text-align: center;
		line-height: 1.1;
		max-width: 90vw;
		word-break: break-word;
	}

	.text.visible {
		opacity: 1;
		transform: scale(1) translateY(0);
	}
</style>