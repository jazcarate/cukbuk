<script lang="ts">
    import type { Line } from "./lib/parser";
    
    import Step from "./Step.svelte";
    import LineContent from "./LineContent.svelte";

    export let line: Line;
</script>

{#if line._type == "header"}
    <h3>{line.value}</h3>
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
    h2 {
        margin-top: 1rem;
        line-height: 1.17em;
        font-size: 1.5rem;
        font-weight: 600;
    }
</style>
