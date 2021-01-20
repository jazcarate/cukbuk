<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let value: number;

    const dispatch = createEventDispatcher();

    let intermediateValue: string = value.toString();
    $: intermediateValue = round(value).toString();

    function round(x: number): number {
        return Math.round(x * 100) / 100;
    }

    function input() {
        const candidate = parseFloat(intermediateValue);
        if (!isNaN(candidate)) {
            // Very important that the dispatch gets send before the update to the value
            dispatch("input", candidate);
            value = candidate;
        }
    }
</script>

<input
    bind:value={intermediateValue}
    on:input={input}
    type="number"
    step="any"
    min="0"
    style="width: {Math.max(3, (intermediateValue || '').toString().length) +
        'em'}"
/>

<style>
    input {
        -moz-appearance: textfield;
        border-radius: 5px;
        background-color: var(--color-background-input);
        border: none;
        border-bottom: 2px solid var(--color-primary);
        text-align: center;
        transition: width 0.4s ease-out;
        color: var(--color-primary);
        cursor: pointer;
        text-decoration: inherit;
    }
</style>
