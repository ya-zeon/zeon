<script>
	let { data, children } = $props();
</script>

<div class="layout">
	<main>
		{@render children()}
	</main>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.layout {
		max-width: 1280px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;
		background: #ffffff;
		position: relative;
	}

	/* Основная рамка вокруг всего контента */
	.layout::before {
		content: '';
		position: fixed;
		top: 1.5rem;
		left: 1.5rem;
		right: 1.5rem;
		bottom: 1.5rem;
		border: 1px solid #eaeaea;
		pointer-events: none;
		z-index: 0;
	}

	main {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		line-height: 1.6;
		color: #1a1a1a;
		position: relative;
		z-index: 1;
	}

	/* Тонкие разделители для секций */
	main :global(article) {
		position: relative;
		padding: 2rem 0;
	}

	main :global(article::after) {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background: linear-gradient(90deg, 
			transparent 0%, 
			#e0e0e0 20%, 
			#e0e0e0 80%, 
			transparent 100%
		);
	}

	main :global(article:last-child::after) {
		display: none;
	}

	/* Типографика */
	main :global(h1) {
		font-size: 2.5rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		margin-bottom: 1.5rem;
		color: #000000;
		position: relative;
		display: inline-block;
	}

	/* Маленькая линия под заголовками */
	main :global(h1::after) {
		content: '';
		position: absolute;
		bottom: -0.5rem;
		left: 0;
		width: 3rem;
		height: 2px;
		background: #000000;
	}

	main :global(h2) {
		font-size: 1.8rem;
		font-weight: 400;
		letter-spacing: -0.01em;
		margin: 2rem 0 1rem;
		color: #111111;
		position: relative;
		padding-left: 1rem;
		border-left: 2px solid #e0e0e0;
	}

	main :global(p) {
		margin-bottom: 1.2rem;
		font-size: 1.1rem;
		color: #2c2c2c;
	}

	main :global(a) {
		color: #000000;
		text-decoration: none;
		border-bottom: 1px solid #d4d4d4;
		transition: border-color 0.2s ease;
	}

	main :global(a:hover) {
		border-bottom-color: #000000;
	}

	/* Рамка для цитат */
	main :global(blockquote) {
		margin: 2rem 0;
		padding: 1.5rem;
		border: 1px solid #f0f0f0;
		background: #fafafa;
		font-style: italic;
		color: #4a4a4a;
		position: relative;
	}

	/* Тонкая линия сверху для blockquote */
	main :global(blockquote::before) {
		content: '';
		position: absolute;
		top: -1px;
		left: 20%;
		width: 60%;
		height: 1px;
		background: #d4d4d4;
	}

	/* Сетка для десктопов */
	@media (min-width: 640px) {
		.layout {
			padding: 3rem;
		}

		.layout::before {
			top: 2rem;
			left: 2rem;
			right: 2rem;
			bottom: 2rem;
		}
	}

	@media (min-width: 1024px) {
		.layout {
			display: grid;
			gap: 4rem;
			grid-template-columns: 1fr 280px;
			padding: 4rem;
		}

		.layout::before {
			top: 2.5rem;
			left: 2.5rem;
			right: 2.5rem;
			bottom: 2.5rem;
			border-color: #e0e0e0;
		}

		main {
			max-width: 720px;
		}

		/* Боковая колонка с деликатной рамкой */
		.layout::after {
			content: '';
			display: block;
			height: fit-content;
			padding: 1.5rem;
			font-family: monospace;
			font-size: 0.9rem;
			color: #888888;
			border: 1px solid #f0f0f0;
			background: #fcfcfc;
			position: sticky;
			top: 2rem;
		}
	}

	/* Адаптивность */
	@media (max-width: 639px) {
		.layout {
			padding: 1.5rem;
		}

		.layout::before {
			top: 0.75rem;
			left: 0.75rem;
			right: 0.75rem;
			bottom: 0.75rem;
			border-color: #f0f0f0;
		}

		main :global(h1) {
			font-size: 2rem;
		}

		main :global(h1::after) {
			width: 2.5rem;
		}
	}
</style>