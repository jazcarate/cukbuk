<script lang="ts">
    import { _ } from "svelte-i18n";

    import { keys, weightUnits, volumeUnits } from "./lib/units";
    import { scale, volumeUnit, weightUnit } from "./myRecipeStore";
    import Scalar from "./Scalable.svelte";

    function restartScale() {
        scale.set(1);
    }

    function changeWeight(ev: any) {
        weightUnit.set(ev.currentTarget.value);
    }

    function changeVolume(ev: any) {
        volumeUnit.set(ev.currentTarget.value);
    }
</script>

<main>
    <div class="option">
        <span on:click={restartScale}>{$_("recipe.scale")}</span>
        <Scalar value={1} />
    </div>

    <div class="option">
        {$_("recipe.weight")}
        <select on:change={changeWeight}>
            {#each keys(weightUnits) as unit}
                <option value={unit} selected={$weightUnit == unit}
                    >{unit}</option
                >
            {/each}
        </select>
    </div>

    <div class="option">
        {$_("recipe.volume")}
        <select on:change={changeVolume}>
            {#each keys(volumeUnits) as unit}
                <option value={unit} selected={$volumeUnit == unit}
                    >{unit}</option
                >
            {/each}
        </select>
    </div>
</main>

<style>
    select {
        cursor: pointer;
        border-radius: 0;
        appearance: none;
        border: none;
        padding: 0 1em 0 0;
        margin: 0;
        border-radius: 5px;
        font-family: inherit;
        font-size: inherit;
        cursor: inherit;
        line-height: inherit;
        background-color: var(--color-background-input);
        border-bottom: 2px solid var(--color-primary);
        color: var(--color-primary);
    }

    main {
        display: flex;
        width: 100%;
    }
    .option {
        flex: 1;
    }
</style>
