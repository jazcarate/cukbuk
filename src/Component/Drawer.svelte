<script lang="ts">
    import { routes } from "svelte-hash-router";
    import { _ } from "svelte-i18n";
    export let opened: boolean;

    import Preferences from "./Preferences/Preferences.svelte";
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
        <Preferences />
    </div>
</main>

<style>
    .wrap {
        margin: 0 1em;
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
</style>
