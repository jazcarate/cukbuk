<script lang="ts">
    import Scalable from "./Scalable.svelte";
    import { scale } from "./myRecipeStore";

    export let text: string;
</script>

<main>
    <h1>Cheesecake de zapallo</h1>
    <p>Sale una tarta medianita</p>
    <h2>Parte blanca</h2>
    <p><Scalable value={1} unit="g" /> de chocolate amargo</p>
    <p><Scalable value={2} unit="l" /> de chocolate amargo</p>
    <p><Scalable value={3} /> de chocolate amargo</p>
    <code>scale: {$scale}</code>
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
</style>
