<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { _ } from "svelte-i18n";

    import { upload } from "./lib/imgur";

    const dispatch = createEventDispatcher();

    type FileEvent = {
        target: HTMLInputElement;
    };

    async function onFileSelected({ target }: FileEvent) {
        for (const file of target.files) {
            const { name } = file;
            const link = await upload(file);
            dispatch("input", { name, link });
        }
        target.value = target.defaultValue;
    }
</script>

<main>
    {$_("recipe.upload")}:
    <input type="file" on:change={onFileSelected} accept="image/*" multiple />
</main>

<style>
</style>
