<script lang="ts">
    import type { Line as TLine } from "./lib/parser";
    import Line from "./Line.svelte";

    export let value: TLine[][];
    let current = 0;

    function cycle() {
        current = (current + 1) % value.length;
    }
</script>

<div>
    <span on:click={cycle}>🔄</span>
    {current}:
    {#each value[current] as line}
        <Line {line} />
    {/each}
</div>

<style>
    div {
        margin-left: 1em;
        border-left: 1px solid blueviolet;
    }
</style>
