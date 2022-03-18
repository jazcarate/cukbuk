<script lang="ts">
    import ScalableVector from "../ScalableVector.svelte";
    import Timer from "./Timer.svelte";
    import Text from "./Text.svelte";
    import Image from "./Image.svelte";
    import type { Item } from "../../lib/parser";

    export let items: Item[];
</script>

<span>
    &ZeroWidthSpace;
    {#each items as component}
        {#if component._type == "text"}
            <Text text={component.value} />
        {:else if component._type == "ingredient"}
            <strong>
                {#if component.value}
                    <ScalableVector vector={component.value} />
                {/if}
                {component.name}
            </strong>
        {:else if component._type == "scalable"}
            <ScalableVector vector={component.value} />
            {#if component.dentisy}
                <span>{component.dentisy.value}</span>
            {/if}
        {:else if component._type == "time"}
            <Timer value={component.value} />
        {:else if component._type == "image"}
            <Image src={component.value} alt={component.name} />
        {/if}
    {/each}
</span>

<style>
</style>
