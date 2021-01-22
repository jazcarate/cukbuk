<script lang="ts">
    let checked = false;
</script>

<ol>
    <li>
        <input type="checkbox" bind:checked />
        <span class:checked><slot /></span>
    </li>
</ol>

<style>
    .checked {
        text-decoration: line-through;
    }

    ol {
        list-style-type: none;
        padding: 0;
    }
</style>
