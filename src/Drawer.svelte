<script lang="ts">
    import { routes } from "svelte-hash-router";
    import { _ } from "svelte-i18n";
    export let opened: boolean;

    import { units } from "./lib/units";
    import { volumeUnit, weightUnit, temperatureUnit } from "./myRecipeStore";

    function changeWeight(ev: any) {
        weightUnit.set(ev.currentTarget.value);
    }

    function changeVolume(ev: any) {
        volumeUnit.set(ev.currentTarget.value);
    }

    function changeTemperature(ev: any) {
        temperatureUnit.set(ev.currentTarget.value);
    }
</script>

<main style={`width: ${opened ? 250 : 0}px`}>
    <div class="wrap">
        <h1>Navigation</h1>
        <ul>
            <li>
                <a
                    on:click={() => (opened = false)}
                    href={$routes["/"].$$stringify()}>{$_("nav.favorites")}</a
                >
            </li>
            <li>
                <a
                    on:click={() => (opened = false)}
                    href={$routes["/about"].$$stringify()}>{$_("nav.about")}</a
                >
            </li>
            <li>
                <a
                    on:click={() => (opened = false)}
                    href={$routes["/r/*"].$$stringify({ _: "" })}
                    >{$_("nav.new")}</a
                >
            </li>
        </ul>

        <h1>{$_("nav.preferences")}</h1>
        <div class="option">
            {$_("recipe.weight")}<br />
            <select on:change={changeWeight}>
                {#each Object.keys(units.weight.values) as unit}
                    <option value={unit} selected={$weightUnit == unit}
                        >{$_("units." + unit, { default: unit })}</option
                    >
                {/each}
            </select>
        </div>

        <div class="option">
            {$_("recipe.volume")}<br />
            <select on:change={changeVolume}>
                {#each Object.keys(units.volume.values) as unit}
                    <option value={unit} selected={$volumeUnit == unit}
                        >{$_("units." + unit, { default: unit })}</option
                    >
                {/each}
            </select>
        </div>
        <div class="option">
            {$_("recipe.temperature")}<br />
            <select on:change={changeTemperature}>
                {#each Object.keys(units.temperature.values) as unit}
                    <option value={unit} selected={$temperatureUnit == unit}
                        >{$_("units." + unit, { default: unit })}</option
                    >
                {/each}
            </select>
        </div>
    </div>
</main>

<style>
    .wrap {
        margin: 0 1em;
    }
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

    main {
        height: 100%;
        width: 0;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: var(--color-background-sidebar);
        color: var(--color-sidebar);
        overflow-x: hidden;
        transition: width 0.5s;
        box-shadow: 4px 0 4px rgba(0, 0, 0, 0.25);
    }

    .option {
        white-space: pre;
        padding: 8px;
    }
</style>
