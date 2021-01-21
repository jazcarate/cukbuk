<script lang="ts">
    import { encode } from "../lib/lzma";
    import { pushToast } from "../toastStore";

    import Doable from "./Doable.svelte";
    import Edit from "./Edit.svelte";

    export let text: string;
    let edditingP = Promise.resolve(false);

    function switchMode(mode: boolean): void {
        edditingP = encode(text)
            .then((newKey) => history.pushState(null, null, "#" + newKey))
            .then(() => mode);
    }

    async function copy() {
        await navigator.clipboard.writeText(location.toString());
        pushToast("URL copied");
    }
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
    {/await}
</main>

<style>
</style>
