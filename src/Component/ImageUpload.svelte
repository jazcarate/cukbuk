<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { _ } from "svelte-i18n";

    import { upload } from "../lib/imgur";

    const dispatch = createEventDispatcher();

    async function onFileSelected({ target }: Event) {
        const input = target as HTMLInputElement;
        for (const file of input.files) {
            const { name } = file;
            const link = await upload(file);
            dispatch("input", { name, link });
        }
        input.value = input.defaultValue;
    }
</script>

<main>
    {$_("recipe.upload")}:
    <input type="file" on:change={onFileSelected} accept="image/*" multiple />
</main>

<style>
</style>
