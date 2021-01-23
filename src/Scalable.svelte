<script lang="ts">
    import {
        scale,
        volumeUnit,
        weightUnit,
        temperatureUnit,
    } from "./myRecipeStore";
    import { units } from "./lib/units";
    import NumberInput from "./NumberInput.svelte";

    export let value: number;
    export let unit: string;

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
            const [_, { values: familyUnits }] = x;
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
    <span>{currentUnit}</span>
{/if}
