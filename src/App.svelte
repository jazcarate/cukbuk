<script lang="ts">
	import Router, { routes } from "svelte-hash-router";
	import Toast from "./Toast.svelte";
</script>

<main>
	<nav>
		<a href={$routes["/"].$$stringify()}>Cukb.uk</a>
		<a href={$routes["/about"].$$stringify()}>About</a>
	</nav>

	<Router />

	<Toast />
</main>
