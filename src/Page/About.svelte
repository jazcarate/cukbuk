<script lang="ts">
    import { onMount } from "svelte";
    import { _ } from "svelte-i18n";

    import { setTitle } from "../lib/title";

    onMount(() => {
        setTitle($_("title.about"));
    });
</script>

<main>
    <h1>{$_("nav.about")}</h1>

    <p>Foo bar</p>
</main>

<style>
</style>
