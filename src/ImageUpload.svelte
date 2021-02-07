<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { upload } from "./lib/imgur";

    const dispatch = createEventDispatcher();

    type FileEvent = {
        target: HTMLInputElement;
    };

    async function onFileSelected({ target }: FileEvent) {
        const link = await upload(target.files);
        dispatch("input", link);
    }
</script>

<main>
    <input type="file" on:change={onFileSelected} accept="image/*" />
</main>

<style>
</style>
