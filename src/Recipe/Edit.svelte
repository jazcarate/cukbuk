<script lang="ts">
    import { onMount } from "svelte";

    import { _ } from "svelte-i18n";
    import { setTitle } from "../lib/title";

    export let text: string;
    let recipeInput: HTMLElement;

    onMount(() => {
        recipeInput.focus();
        setTitle($_("title.edit"));
    });
</script>

<main>
    <textarea bind:this={recipeInput} bind:value={text} />
</main>

<style>
    textarea {
        width: 100%;
        height: 80vh;
        border: 1px solid var(--color-background-input);
        background: none;
        color: inherit;
        font-family: inherit;
    }
</style>
