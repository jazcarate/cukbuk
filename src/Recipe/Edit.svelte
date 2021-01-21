<script lang="ts">
    import { onMount } from "svelte";
    import { setTitle } from "../lib/title";

    export let text: string;

    onMount(() => {
        setTitle("Editing");
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
