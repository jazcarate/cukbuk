<script lang="ts">
    import { routes } from "svelte-hash-router";
    import { _ } from "svelte-i18n";
    import HelpModal from "../HelpModal.svelte";

    import { encode } from "../lib/lzma";
    import { pushToast } from "../toastStore";

    import Doable from "./Doable.svelte";
    import Edit from "./Edit.svelte";

    export let text: string;
    let edditing = false;
    let recipeRoute = $routes["/r/*"];

    function switchMode(mode: boolean): void {
        edditing = mode;
        encode(text).then((newKey) =>
            history.pushState(
                null,
                null,
                recipeRoute.$$stringify({ _: newKey })
            )
        );
    }

    async function copy() {
        await navigator.clipboard.writeText(location.toString());
        pushToast($_("recipe.copied"));
    }

    function share() {
        const shareData = {
            title: "Cukb.uk",
            url: location.toString(),
        };
        navigator.share(shareData);
    }

    let isMobile =
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1;

    function edit(ev: KeyboardEvent) {
        if (ev.code == "Enter") {
            switchMode(!ev.shiftKey);
        }
    }
</script>

<svelte:window on:keydown={edit} />
<main>
    {#if edditing}
        <Edit bind:text />
    {:else}
        <Doable bind:text />
    {/if}

    <span on:click={() => switchMode(!edditing)}>
        {#if edditing}{$_("recipe.ok")}{:else}{$_("recipe.edit")}{/if}
    </span>
    <span on:click={copy}>{$_("recipe.link")}</span>
    {#if isMobile}
        <span on:click={share}>{$_("recipe.share")}</span>
    {/if}
    {#if edditing}
        <HelpModal />
    {/if}
</main>

<style>
    span {
        cursor: pointer;
    }
</style>
