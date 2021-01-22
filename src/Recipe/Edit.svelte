<script lang="ts">
    import { onMount } from "svelte";

    import { _ } from "svelte-i18n";
    import { setTitle } from "../lib/title";

    export let text: string;

    onMount(() => {
        setTitle($_("title.edit"));
    });
</script>

<main>
    <textarea bind:value={text} />
</main>

<style>
    textarea {
        width: 100%;
        height: 80vh;
    }
</style>
