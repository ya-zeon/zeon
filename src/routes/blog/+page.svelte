<script>
	let { data } = $props();
</script>

<header class="blog-header">
	<h1 class="blog-title">Blog</h1>
</header>

<nav class="blog-nav">
	<ul class="post-list">
		{#each data.summaries as { slug, title }}
			<li class="post-item">
				<a href="/blog/{slug}" class="post-link">
					<span class="post-title">{title}</span>
					<span class="post-arrow">→</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.blog-header {
		max-width: 680px;
		margin: 0 auto 4rem auto;
		padding: 0 1rem;
	}

	.blog-title {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		font-size: 3rem;
		font-weight: 350;
		letter-spacing: -0.03em;
		color: #000000;
		margin-bottom: 0.5rem;
	}

	.blog-description {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		font-size: 1.1rem;
		line-height: 1.5;
		color: #666666;
		max-width: 480px;
	}

	.blog-nav {
		max-width: 680px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.post-list {
		list-style: none;
	}

	.post-item {
		margin-bottom: 0.125rem;
		border-bottom: 1px solid #f0f0f0;
	}

	.post-item:last-child {
		border-bottom: none;
	}

	.post-link {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.25rem 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		text-decoration: none;
		color: #1a1a1a;
		transition: padding 0.2s ease;
	}

	.post-link:hover {
		padding-left: 0.5rem;
	}

	.post-title {
		font-size: 1.2rem;
		font-weight: 400;
		letter-spacing: -0.01em;
	}

	.post-arrow {
		font-size: 1.2rem;
		color: #999999;
		transition: transform 0.2s ease, color 0.2s ease;
	}

	.post-link:hover .post-arrow {
		transform: translateX(4px);
		color: #000000;
	}

	/* Адаптивность */
	@media (max-width: 640px) {
		.blog-header {
			margin-bottom: 3rem;
		}

		.blog-title {
			font-size: 2.5rem;
		}

		.blog-description {
			font-size: 1rem;
		}

		.post-title {
			font-size: 1.1rem;
		}

		.post-link {
			padding: 1rem 0;
		}
	}

	@media (max-width: 480px) {
		.blog-title {
			font-size: 2rem;
		}

		.post-title {
			font-size: 1rem;
		}
	}
</style>