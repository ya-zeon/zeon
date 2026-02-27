<script>
	let { children } = $props();
</script>

<nav class="nav">
	<a href="/" class="nav-link">Home</a>
	<a href="/blog" class="nav-link">Blog</a>
	<a href="/groups" class="nav-link">Groups</a>
	<a href="/todos" class="nav-link">ToDos</a>
</nav>

<main class="content">
	{@render children()}
</main>

<style>
	/* Сброс отступов и базовые настройки */
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	/* Основные стили для body */
	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		background-color: #fafafa;
		color: #2c3e50;
		line-height: 1.6;
		min-height: 100vh;
	}

	/* Навигация */
	.nav {
		display: flex;
		justify-content: center;
		gap: 2rem;
		padding: 1.5rem;
		background-color: white;
		border-bottom: 1px solid #eaeaea;
		position: sticky;
		top: 0;
		z-index: 10;
		backdrop-filter: blur(5px);
		background-color: rgba(255, 255, 255, 0.9);
	}

	.nav-link {
		text-decoration: none;
		color: #5a6b7a;
		font-size: 0.95rem;
		font-weight: 500;
		letter-spacing: 0.3px;
		text-transform: uppercase;
		padding: 0.5rem 0;
		position: relative;
		transition: color 0.2s ease;
	}

	.nav-link:hover {
		color: #000;
	}

	/* Эффект подчеркивания при наведении */
	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background-color: #000;
		transform: scaleX(0);
		transition: transform 0.2s ease;
	}

	.nav-link:hover::after {
		transform: scaleX(1);
	}

	/* Контентная область */
	.content {
		max-width: 800px;
		margin: 3rem auto;
		padding: 0 1.5rem;
	}

	/* Стили для заголовков внутри контента */
	:global(h1) {
		font-size: 2rem;
		font-weight: 400;
		margin-bottom: 1.5rem;
		color: #1a2634;
		letter-spacing: -0.5px;
	}

	:global(h2) {
		font-size: 1.5rem;
		font-weight: 400;
		margin: 2rem 0 1rem;
		color: #2c3e50;
	}

	:global(p) {
		margin-bottom: 1.5rem;
		color: #4a5a6a;
	}
</style>