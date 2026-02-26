<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">home</a>
	<a href="/blog">blog</a>
	<a href="/groups">groups</a>
</nav>

{@render children()}
