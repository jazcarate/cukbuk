<script lang="ts">
    import { _ } from "svelte-i18n";
    import { onMount } from "svelte";

    import { isIngredient } from "../../lib/parser";
    import type { Recipe } from "../../lib/parser";
    import { checkFav, toggleFav } from "../../lib/fav";
    import { setTitle } from "../../lib/title";

    import Line from "./Line.svelte";
    import ScalableVector from "../ScalableVector.svelte";
    import Step from "./Step.svelte";

    import { scale } from "../Preferences/store";

    export let recipe: Recipe;
    const ingredients = recipe.lines
        .map(({ value }) => (Array.isArray(value) ? value : []))
        .reduce((acc, val) => acc.concat(val), [])
        .filter(isIngredient);

    let isFav = checkFav(recipe.title);

    function fav() {
        toggleFav(recipe.title, location.toString());
        isFav = !isFav;
    }

    onMount(() => {
        setTitle(recipe.title);
    });
</script>

<main>
    <h1>
        {recipe.title}
        <span on:click={fav} class="clickable">
            {#if isFav}🌟{:else}⭐{/if}
        </span>
    </h1>
    <section>
        <h2>{$_("recipe.ingredients")}</h2>
        {#each ingredients as ingredient}
            <Step>
                {#if ingredient.value}
                    <ScalableVector vector={ingredient.value} />
                {/if}
                {ingredient.name}
            </Step>
        {/each}
    </section>
    <section>
        <h2>{$_("recipe.procedure")}</h2>
        {#each recipe.lines as line}
            <Line {line} />
        {/each}
    </section>

    <div>
        <span on:click={() => scale.set(1)}>{$_("recipe.scale")}</span>
        <ScalableVector vector={{ value: 1, unit: null }} />
    </div>
</main>

<style>
    h1 {
        line-height: 1.14em;
        font-size: 2.63rem;
        font-weight: 600;
    }

    .clickable {
        cursor: pointer;
    }
</style>
