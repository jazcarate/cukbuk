<script lang="ts">
    import { _ } from "svelte-i18n";

    import { units } from "../../lib/units";
    import {
        volumeFamily,
        weightFamily,
        temperatureFamily,
        lengthFamily,
    } from "./store";

    function changeWeight(ev: any) {
        weightFamily.set(ev.currentTarget.value);
    }

    function changeVolume(ev: any) {
        volumeFamily.set(ev.currentTarget.value);
    }

    function changeTemperature(ev: any) {
        temperatureFamily.set(ev.currentTarget.value);
    }

    function changeLength(ev: any) {
        lengthFamily.set(ev.currentTarget.value);
    }
</script>

<main>
    <div class="option">
        {$_("recipe.weight")}<br />
        <select on:change={changeWeight}>
            {#each Object.keys(units.weight.families) as family}
                <option value={family} selected={$weightFamily == family}
                    >{units.weight.families[family]
                        .map(({ name }) =>
                            $_("units." + name, { default: name })
                        )
                        .join(", ")}</option
                >
            {/each}
        </select>
    </div>

    <div class="option">
        {$_("recipe.volume")}<br />
        <select on:change={changeVolume}>
            {#each Object.keys(units.volume.families) as family}
                <option value={family} selected={$volumeFamily == family}
                    >{units.volume.families[family]
                        .map(({ name }) =>
                            $_("units." + name, { default: name })
                        )
                        .join(", ")}</option
                >
            {/each}
        </select>
    </div>
    <div class="option">
        {$_("recipe.temperature")}<br />
        <select on:change={changeTemperature}>
            {#each Object.keys(units.temperature.families) as family}
                <option value={family} selected={$temperatureFamily == family}
                    >{units.temperature.families[family]
                        .map(({ name }) =>
                            $_("units." + name, { default: name })
                        )
                        .join(", ")}</option
                >
            {/each}
        </select>
    </div>
    <div class="option">
        {$_("recipe.length")}<br />
        <select on:change={changeLength}>
            {#each Object.keys(units.length.families) as family}
                <option value={family} selected={$lengthFamily == family}
                    >{units.length.families[family]
                        .map(({ name }) =>
                            $_("units." + name, { default: name })
                        )
                        .join(", ")}</option
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
        background-color: var(--color-background-input-sidebar);
        border-bottom: 2px solid var(--color-primary);
        color: var(--color-primary);
    }

    .option {
        white-space: pre;
        padding: 8px;
    }
</style>
