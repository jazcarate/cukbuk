<script lang="ts">
    import { params } from "svelte-hash-router";
    import Recipe from "../Component/Recipe/Recipe.svelte";
    import { getRecipeFromHash } from "../lib/recipe";

    let promise = getRecipeFromHash($params._);
</script>

<main>
    {#await promise}
        <p>...</p>
    {:then text}
        <Recipe {text} />
    {/await}
</main>

<style>
    main {
        margin: 0 auto;
        padding: 1em;
        position: relative;
    }

    @media (min-width: 640px) {
        main {
            max-width: 640px;
        }
    }
</style>
