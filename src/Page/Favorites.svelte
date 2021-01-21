<script lang="ts">
    import { onMount } from "svelte";

    import { listFavs } from "../lib/fav";
    import { setTitle } from "../lib/title";

    let favs = listFavs();

    function date(epoch: Date): string {
        return epoch.toLocaleDateString();
    }

    onMount(() => {
        setTitle("Favorites");
    });
</script>

<main>
    <h1>Favorites</h1>

    <ol>
        {#each favs as fav}
            <li><a href={fav.url}> <i>{date(fav.date)}</i> : {fav.name}</a></li>
        {/each}
    </ol>
</main>

<style>
</style>
