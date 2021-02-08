<script lang="ts">
	import Router, { routes } from "svelte-hash-router";
	import { _ } from "svelte-i18n";

	import Toast from "./Toast.svelte";
	import Drawer from "./Drawer.svelte";
	import Burger from "./Burger.svelte";
	import Footer from "./Footer.svelte";

	let opened: boolean = false;
	let pinned: boolean = false;
	let y: number = 0;
	let lastY = y;

	$: {
		const scrolledPxs = lastY - y;
		pinned = opened || scrolledPxs >= 0;
		lastY = y;
	}
</script>

<svelte:window bind:scrollY={y} />

<div class="fill-height">
	<nav
		class={y == 0 ? "" : "shadow"}
		style={`top: ${pinned ? "0" : "-80px"}`}
	>
		<span class="clickable" on:click={() => (opened = !opened)}>
			<Burger />
		</span>
		<a style="flex: 1" href={$routes["/"].$$stringify()}>Cukb.uk</a>
		<a href={$routes["/new"].$$stringify()}>➕</a>
	</nav>

	<main on:click={() => (opened = false)}>
		<Router />
	</main>

	<Drawer bind:opened />
	<Toast />
</div>

<Footer />

<style>
	.fill-height {
		min-height: calc(100vh - var(--footer-height));
	}
	.clickable {
		cursor: pointer;
	}

	nav {
		height: var(--header-height);
		position: fixed;
		width: 100%;
		background-color: var(--color-background-input);
		transition: all 0.3s linear;
		z-index: 2;
		display: flex;
		align-items: center;

		color: var(--color-secondary);
	}
	nav a {
		text-decoration: none;
	}

	.shadow {
		box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
	}

	main {
		padding-top: var(--header-height);
		transition: left 0.5s;
		position: relative;
		overflow-y: hidden;
	}
</style>
