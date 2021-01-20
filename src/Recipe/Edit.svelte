<script lang="ts">
    export let text: string;
</script>

<main>
    <textarea bind:value={text} />
</main>

<style>
    textarea {
        width: 100%;
        height: 80vh;
    }
</style>
