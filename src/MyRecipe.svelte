<script lang="ts">
    import { getRecipeFromURL } from "./lib/recipe";
    import Recipe from "./Recipe.svelte";
    import Options from "./Options.svelte";

    let promise = getRecipeFromURL(location);
</script>

<main>
    {#await promise}
        <p>Interpreting...</p>
    {:then plaintext}
        <Recipe text={plaintext} />
    {/await}

    <Options />
</main>

<style>
    main {
        margin: 0 auto;
        padding: 1em;
        min-height: 100vh;
        position: relative;
    }

    @media (min-width: 640px) {
        main {
            max-width: 640px;
        }
    }
</style>
