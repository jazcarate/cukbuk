<script lang="ts">
    import { scale, volumeUnit, weightUnit } from "./myRecipeStore";
    import { isWeight, migrateVolume, migrateWeight } from "./lib/units";
    import type { Unit } from "./lib/units";

    export let value: number;
    export let unit: Unit = "none";

    let intermediateValue: number;
    $: intermediateValue = value * $scale;

    let intermediateUnit: Unit = unit;
    $: {
        if (intermediateUnit !== "none") {
            if (isWeight(intermediateUnit)) {
                intermediateValue = migrateWeight(
                    intermediateValue,
                    intermediateUnit,
                    $weightUnit
                );
                intermediateUnit = $weightUnit;
            } else {
                intermediateValue = migrateVolume(
                    intermediateValue,
                    intermediateUnit,
                    $volumeUnit
                );
                intermediateUnit = $volumeUnit;
            }
        }
    }

    function handleNewScale() {
        let migratedValue = value;
        if (unit !== "none") {
            if (isWeight(unit)) {
                migratedValue = migrateWeight(value, unit, $weightUnit);
            } else {
                migratedValue = migrateVolume(value, unit, $volumeUnit);
            }
        }

        const newVal = intermediateValue / migratedValue;
        if (!Number.isNaN(newVal)) {
            scale.set(newVal);
        }
    }
</script>

<input
    bind:value={intermediateValue}
    on:input={handleNewScale}
    type="number"
    step="any"
    min="0"
    style="width: {Math.max(3, intermediateValue.toString().length) + 'em'}"
/>

{#if unit !== "none"}
    <span>{intermediateUnit}</span>
{/if}

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
    }
</style>
