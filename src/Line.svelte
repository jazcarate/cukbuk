<script lang="ts">
    import Step from "./Step.svelte";
    import type { Line } from "./lib/parser";
    import LineContent from "./LineContent.svelte";

    export let line: Line;
</script>

{#if line._type == "header"}
    <h2>{line.value}</h2>
{:else if line._type == "step"}
    <Step>
        <LineContent items={line.value} />
    </Step>
{:else if line._type == "paragraph"}
    <p>
        <LineContent items={line.value} />
    </p>
{/if}

<style>
</style>
