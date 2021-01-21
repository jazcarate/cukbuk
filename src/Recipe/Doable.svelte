<script lang="ts">
    import Scalable from "../Scalable.svelte";
    import Timer from "../Timer.svelte";
    import Item from "../Item.svelte";
    import { parse } from "../lib/parser";

    export let text: string;
    const recipe = parse(text);
    console.log({ recipe });
</script>

<main>
    <h1>{recipe.title}</h1>
    <ol>
        {#each recipe.lines as line}
            {#if line._type == "header"}
                <h2>{line.value}</h2>
            {:else}
                <Item>
                    {#each line.value as component}
                        {#if component._type == "text"}
                            <span>{component.value}</span>
                        {:else if component._type == "scalable"}
                            <Scalable
                                value={component.value}
                                unit={component.unit}
                            />
                        {:else if component._type == "time"}
                            <Timer value={component.value} />
                        {/if}
                        <span />
                    {/each}
                </Item>
            {/if}
        {/each}
    </ol>
</main>

<style>
    h1 {
        line-height: 1.14em;
        font-size: 2.63rem;
        font-weight: 600;
    }
    h2 {
        margin-top: 1rem;
        line-height: 1.17em;
        font-size: 1.5rem;
        font-weight: 600;
    }

    ol {
        list-style-type: none;
        padding: 0;
    }
</style>
