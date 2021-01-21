<script lang="ts">
    import { onMount } from "svelte";

    import { setTitle } from "../lib/title";

    onMount(() => {
        setTitle("About");
    });
</script>

<main>
    <h1>About</h1>

    <p>Foo bar</p>
</main>

<style>
</style>
