<script lang="ts">
    import { _ } from "svelte-i18n";

    import { parse } from "../../lib/parser";
    import Parsed from "./Parsed.svelte";

    export let text: string;
    const recipeP = parse(text);
</script>

<main>
    {#await recipeP}
        <p>{$_("loading")}...</p>
    {:then recipe}
        <Parsed {recipe} />
    {:catch error}
        <pre>{error.message}</pre>
    {/await}
</main>

<style>
</style>
