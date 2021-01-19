<script lang="ts">
    import { scale, volumeUnit, weightUnit } from "./myRecipeStore";
    import { isWeight, migrateVolume, migrateWeight } from "./lib/units";
    import type { Unit } from "./lib/units";
    import NumberInput from "./NumberInput.svelte";

    export let value: number;
    export let unit: Unit = "none";

    let currentUnit: Unit = unit;
    let currentValue: number = value;

    $: {
        if (currentUnit !== "none") {
            if (isWeight(currentUnit)) {
                currentUnit = $weightUnit;
            } else {
                currentUnit = $volumeUnit;
            }
        }
        currentValue = normalize(value, unit) * $scale;
    }

    function normalize(x: number, u: Unit) {
        if (u !== "none") {
            if (isWeight(u)) {
                return migrateWeight(x, u, $weightUnit);
            } else {
                return migrateVolume(x, u, $volumeUnit);
            }
        } else {
            return x;
        }
    }

    function rescale({ detail: newValue }: any) {
        scale.set(normalize(newValue, currentUnit) / normalize(value, unit));
    }
</script>

<NumberInput
    on:input={rescale}
    value={currentValue}
/>

{#if unit !== "none"}
    <span>{currentUnit}</span>
{/if}
