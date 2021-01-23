<script lang="ts">
	import Router, { routes } from "svelte-hash-router";
	import { _ } from "svelte-i18n";

	import Toast from "./Toast.svelte";
	import Preferences from "./Preferences.svelte";

	let opened: boolean = false;
</script>

<main on:click={() => (opened = false)}>
	<nav>
		<a href={$routes["/"].$$stringify()}> Cukb.uk </a>
		<a href={$routes["/about"].$$stringify()}>
			{$_("nav.about")}
		</a>
		<a href={$routes["/r/*"].$$stringify({ _: "" })}>
			{$_("nav.new")}
		</a>
		<span on:click|stopPropagation={() => (opened = true)}>{$_("nav.preferences")}</span>
	</nav>

	<Router />
</main>

<Preferences bind:opened />
<Toast />
