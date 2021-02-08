<script lang="ts">
    export let alt: string | null;
    export let src: string;
</script>

<main>
    <img {src} {alt} />
</main>

<style>
    img {
        height: auto;
        max-width: 100%;
    }
</style>
