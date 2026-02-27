<script>
	let { data } = $props();
</script>

<article class="post">
	<header class="post-header">
		<h1 class="post-title">{data.post.title}</h1>
	</header>
	
	<div class="post-content">
		{@html data.post.content}
	</div>
</article>

<style>
	.post {
		max-width: 720px;
		margin: 0 auto;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		line-height: 1.6;
		color: #1a1a1a;
	}

	.post-header {
		margin-bottom: 3rem;
	}

	.post-title {
		font-size: 2.5rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: #000000;
		margin: 0;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #f0f0f0;
	}

	/* Типографика для контента */
	.post-content {
		font-size: 1.1rem;
	}

	.post-content :global(p) {
		margin-bottom: 1.5rem;
	}

	.post-content :global(h2) {
		font-size: 1.8rem;
		font-weight: 400;
		letter-spacing: -0.01em;
		margin: 2.5rem 0 1rem;
		color: #111111;
	}

	.post-content :global(h3) {
		font-size: 1.4rem;
		font-weight: 400;
		margin: 2rem 0 1rem;
		color: #222222;
	}

	.post-content :global(a) {
		color: #000000;
		text-decoration: none;
		border-bottom: 1px solid #d4d4d4;
		transition: border-color 0.2s ease;
	}

	.post-content :global(a:hover) {
		border-bottom-color: #000000;
	}

	.post-content :global(blockquote) {
		margin: 2rem 0;
		padding: 0 0 0 1.5rem;
		border-left: 3px solid #e0e0e0;
		font-style: normal;
		color: #4a4a4a;
	}

	.post-content :global(ul), 
	.post-content :global(ol) {
		margin: 1rem 0 2rem;
		padding-left: 1.5rem;
	}

	.post-content :global(li) {
		margin-bottom: 0.5rem;
	}

	.post-content :global(img) {
		max-width: 100%;
		height: auto;
		margin: 2rem 0;
	}

	.post-content :global(pre) {
		margin: 2rem 0;
		padding: 1rem;
		background: #f8f8f8;
		border: 1px solid #eeeeee;
		overflow-x: auto;
		font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.post-content :global(code) {
		font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;
		font-size: 0.9em;
		background: #f5f5f5;
		padding: 0.2em 0.4em;
		border-radius: 3px;
	}

	/* Адаптивность */
	@media (max-width: 768px) {
		.post {
			padding: 0 1rem;
		}

		.post-title {
			font-size: 2rem;
		}

		.post-content {
			font-size: 1rem;
		}
	}

	@media (max-width: 480px) {
		.post-title {
			font-size: 1.8rem;
		}

		.post-header {
			margin-bottom: 2rem;
		}
	}
</style>