<script lang="ts">
    import { onMount } from "svelte";
    import { _, date } from "svelte-i18n";

    import { listFavs } from "../lib/fav";
    import { setTitle } from "../lib/title";

    let favs = listFavs();

    onMount(() => {
        setTitle($_("title.favorites"));
    });
</script>

<main>
    <h1>{$_("nav.favorites")}</h1>

    <ol>
        {#each favs as fav}
            <li>
                <a href={fav.url}>
                    <i>{$date(fav.date, { format: "medium" })}</i>: {fav.name}</a
                >
            </li>
        {/each}
    </ol>
</main>

<style>
</style>
