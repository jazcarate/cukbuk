<script lang="ts">
    import { routes } from "svelte-hash-router";

    import { encode } from "../lib/lzma";
    import { pushToast } from "../toastStore";

    import Doable from "./Doable.svelte";
    import Edit from "./Edit.svelte";

    export let text: string;
    let edditingP = Promise.resolve(false);
    let recipeRoute = $routes["/r/*"];

    function switchMode(mode: boolean): void {
        edditingP = encode(text)
            .then((newKey) =>
                history.pushState(
                    null,
                    null,
                    recipeRoute.$$stringify({ _: newKey })
                )
            )
            .then(() => mode);
    }

    async function copy() {
        await navigator.clipboard.writeText(location.toString());
        pushToast("URL copied");
    }

    function share() {
        const shareData = {
            title: "Cukb.uk :: Recipe",
            url: location.toString(),
        };
        navigator.share(shareData);
    }

    let isMobile =
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1;
</script>

<main>
    {#await edditingP}
        <p>Changing...</p>
    {:then edditing}
        {#if edditing}
            <Edit bind:text />
        {:else}
            <Doable bind:text />
        {/if}

        <span on:click={() => switchMode(!edditing)}>
            {#if edditing}✅{:else}✏{/if}
        </span>
        <span on:click={copy}>🔗</span>
        {#if isMobile}
            <span on:click={share}>📨</span>
        {/if}
    {/await}
</main>

<style>
</style>
