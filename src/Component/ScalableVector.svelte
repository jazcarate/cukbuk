<script lang="ts">
    import { _ } from "svelte-i18n";

    import {
        scale,
        volumeFamily,
        weightFamily,
        temperatureFamily,
    } from "./Preferences/store";
    import NumberInput from "./NumberInput.svelte";

    import { find, transform, units } from "../lib/units";
    import type { UnitDefinition } from "../lib/units";
    import type { Vector } from "../lib/parser";

    export let vector: Vector;
    const { unit, value } = vector;

    let currentFamily: string;
    let currentUnit: string = unit;
    let currentValue: number = value;

    const unitDefinition: UnitDefinition = unit
        ? find(unit)
        : {
              type: "amount",
              pivotable: units.amount.families._[0].pivotable,
              power: 1,
          };

    const familyDef = units[unitDefinition.type];

    $: {
        switch (unitDefinition.type) {
            case "weight":
                currentFamily = $weightFamily;
                break;
            case "volume":
                currentFamily = $volumeFamily;
                break;
            case "temperature":
                currentFamily = $temperatureFamily;
                break;
        }

        const transformed = transform(value, unit || "", currentFamily || "_");
        currentUnit = transformed.unit;
        currentValue = transformed.value * $scale;
    }

    function rescale({ detail: newValue }: any) {
        scale.set(
            transform(newValue, currentUnit || "", currentFamily || "_")
                .pivotValue /
                transform(value, unit || "", currentFamily || "_").pivotValue
        );
    }
</script>

<NumberInput
    on:input={rescale}
    value={currentValue}
    edit={familyDef.scalable == 1}
/>{#if currentUnit}
    <span>{$_("unit." + currentUnit, { default: currentUnit })}</span>
{/if}
