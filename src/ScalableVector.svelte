<script lang="ts">
    import { _ } from "svelte-i18n";

    import {
        scale,
        volumeUnit,
        weightUnit,
        temperatureUnit,
    } from "./myRecipeStore";
    import { units } from "./lib/units";
    import NumberInput from "./NumberInput.svelte";
    import type { Vector } from "./lib/parser";

    export let vector: Vector;
    const { unit, value } = vector;

    let currentUnit: string = unit;
    let currentValue: number = value;

    const x = Object.entries(units).find(([_, x]) => x.values[unit]);
    const unitFamily = x ? x[0] : "none";
    const pow = x ? x[1].pow : 1;

    $: {
        switch (unitFamily) {
            case "weight":
                currentUnit = $weightUnit;
                break;
            case "volume":
                currentUnit = $volumeUnit;
                break;
            case "temperature":
                currentUnit = $temperatureUnit;
                break;
        }

        currentValue = normalize(value, unit) * $scale ** pow;
    }

    function normalize(n: number, u: string): number {
        if (x) {
            const [, { values: familyUnits }] = x;
            return familyUnits[currentUnit].toPivot(
                familyUnits[u].fromPivot(n)
            );
        } else {
            return n;
        }
    }

    function rescale({ detail: newValue }: any) {
        scale.set(normalize(newValue, currentUnit) / normalize(value, unit));
    }
</script>

<NumberInput
    on:input={rescale}
    value={currentValue}
    edit={pow != 0}
/>{#if currentUnit}
    <span>{$_("units." + currentUnit, { default: currentUnit })}</span>
{/if}
