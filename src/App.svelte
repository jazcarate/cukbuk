<script lang="ts">
	import Router, { routes } from "svelte-hash-router";
	import { _ } from "svelte-i18n";

	import Toast from "./Toast.svelte";
</script>

<main>
	<nav>
		<a href={$routes["/"].$$stringify()}> Cukb.uk </a>
		<a href={$routes["/about"].$$stringify()}>
			{$_("nav.about")}
		</a>
		<a href={$routes["/r/*"].$$stringify({ _: "" })}>
			{$_("nav.new")}
		</a>
	</nav>

	<Router />

	<Toast />
</main>
