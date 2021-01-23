<script lang="ts">
    import { _ } from "svelte-i18n";
    import { onMount } from "svelte";

    import { parse } from "../lib/parser";
    import { checkFav, toggleFav } from "../lib/fav";
    import { setTitle } from "../lib/title";

    import Line from "../Line.svelte";
    import Scalable from "../Scalable.svelte";
    import { scale } from "../myRecipeStore";

    export let text: string;
    const recipe = parse(text);

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
        {#each recipe.lines as line}
            <Line {line} />
        {/each}
    </section>

    <div>
        <span on:click={() => scale.set(1)}>{$_("recipe.scale")}</span>
        <Scalable value={1} />
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
