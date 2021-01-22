<script lang="ts">
    import Scalable from "./Scalable.svelte";
    import Timer from "./Timer.svelte";
    import Alternative from "./Alternative.svelte";
    import type { Item } from "./lib/parser";

    export let items: Item[];
</script>

<span>
    &ZeroWidthSpace;
    {#each items as component}
        {#if component._type == "text"}
            <span>{component.value}</span>
        {:else if component._type == "scalable"}
            <Scalable value={component.value} unit={component.unit} />
        {:else if component._type == "time"}
            <Timer value={component.value} />
        {:else if component._type == "alternative"}
            <Alternative value={component.value} />
        {/if}
        <span />
    {/each}
</span>

<style>
</style>
