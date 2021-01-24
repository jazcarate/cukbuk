<script lang="ts">
    import type { Item } from "./lib/parser";
    import LineContent from "./LineContent.svelte";

    export let value: Item[][];
    let current = 0;

    function cycle() {
        current = (current + 1) % value.length;
    }
</script>

<div>
    <span on:click={cycle}>🔄</span>
    {current}:
    <LineContent items={value[current]} />
</div>

<style>
    div {
        margin-left: 1em;
        border-left: 1px solid blueviolet;
    }
</style>
