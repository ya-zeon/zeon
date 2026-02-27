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
		<p class="epic-text" class:visible={isVisible}>
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
		background: linear-gradient(135deg, 
			#0a0a0a,
			#1a1a2e,
			#16213e,
			#1a1a2e,
			#0a0a0a
		);
		background-size: 300% 300%;
		animation: gradientMove 12s ease infinite;
	}

	@keyframes gradientMove {
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

	.epic-text {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		font-size: clamp(3rem, 20vw, 15rem);
		font-weight: 800;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: transparent;
		background: linear-gradient(135deg, 
			#ffffff,
			#f0f0f0,
			#e0e0e0,
			#f0f0f0,
			#ffffff
		);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		background-clip: text;
		
		opacity: 0;
		transform: scale(0.7) translateY(30px);
		filter: blur(15px);
		transition: all 1.2s cubic-bezier(0.2, 0.9, 0.3, 1.1);
		
		text-align: center;
		line-height: 1.1;
		max-width: 90vw;
		word-break: break-word;
	}

	.epic-text.visible {
		opacity: 1;
		transform: scale(1) translateY(0);
		filter: blur(0);
		animation: softGlow 3s ease-in-out infinite;
	}

	@keyframes softGlow {
		0%, 100% {
			text-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
		}
		50% {
			text-shadow: 0 0 50px rgba(255, 255, 255, 0.4);
		}
	}
</style>