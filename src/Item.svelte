<script lang="ts">
    let checked = false;
</script>

<li>
    <input type="checkbox" bind:checked />
    <span class:checked><slot /></span>
</li>

<style>
    .checked {
        text-decoration: line-through;
    }
</style>
