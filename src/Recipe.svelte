<script lang="ts">
    import Scalable from "./Scalable.svelte";
    import Timer from "./Timer.svelte";
    import Item from "./Item.svelte";

    export let text: string;
</script>

<main>
    <ol>
        <h1>Cheesecake de zapallo</h1>
        <p>Sale una tarta medianita</p>
        <h2>Parte blanca</h2>
        <Item><Scalable value={1} unit="g" /> de chocolate amargo</Item>
        <Item><Scalable value={2} unit="l" /> de chocolate amargo</Item>
        <Item><Scalable value={3} /> de chocolate amargo</Item>
        <Item
            >Cocinar durante <Timer value={"00:00:05"} /> en horno bien caliente
            🔥</Item
        >
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
