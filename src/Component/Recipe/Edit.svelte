<script lang="ts">
    import { onMount } from "svelte";
    import { _ } from "svelte-i18n";
    
    import { setTitle } from "../../lib/title";
    import ImageUpload from "../ImageUpload.svelte";

    export let text: string;
    let recipeInput: HTMLTextAreaElement;

    function addImage({ detail: { link, name } }) {
        const textToInsert = `[!${name || $_("placeholder.img")}|${link}]`;
        recipeInput.focus();
        const isSuccess = document.execCommand(
            "insertText",
            false,
            textToInsert
        );

        // Firefox (non-standard method)
        if (!isSuccess && typeof recipeInput.setRangeText === "function") {
            const start = recipeInput.selectionStart;
            recipeInput.setRangeText(textToInsert);
            recipeInput.selectionStart = recipeInput.selectionEnd =
                start + textToInsert.length;

            const e = document.createEvent("UIEvent");
            e.initEvent("input", true, false);
            recipeInput.dispatchEvent(e);
        }
    }

    onMount(() => {
        recipeInput.focus();
        setTitle($_("title.edit"));
    });
</script>

<main>
    <textarea bind:this={recipeInput} bind:value={text} />
    <ImageUpload on:input={addImage} />
    
</main>

<style>
    textarea {
        width: calc(100% - 3em);
        height: calc(80vh - 3em);
        border: 1px solid var(--color-background-input);
        background: none;
        color: inherit;
        font-family: inherit;
        padding: 1em;
    }
</style>
