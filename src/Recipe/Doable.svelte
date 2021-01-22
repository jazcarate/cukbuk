<script lang="ts">
    import Scalable from "../Scalable.svelte";
    import Timer from "../Timer.svelte";
    import Item from "../Step.svelte";
    import { parse } from "../lib/parser";
    import { checkFav, toggleFav } from "../lib/fav";
    import { onMount } from "svelte";
    import { setTitle } from "../lib/title";
    import Line from "../Line.svelte";

    export let text: string;
    const recipe = parse(text);
    console.log({ recipe });
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
</main>

<style>
    h1 {
        line-height: 1.14em;
        font-size: 2.63rem;
        font-weight: 600;
    }
    h2 {
        margin-top: 1rem;
        line-height: 1.17em;
        font-size: 1.5rem;
        font-weight: 600;
    }

    ol {
        list-style-type: none;
        padding: 0;
    }

    .clickable {
        cursor: pointer;
    }
</style>
