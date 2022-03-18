<script lang="ts">
    import { _, json } from "svelte-i18n";

    import Modal from "./Modal.svelte";

    const items: {example: string, description: string}[] = Object.values($json("help.list"));
</script>

<Modal>
    <span slot="trigger">{$_("recipe.help")}</span>
    <div slot="header">{$_("recipe.help")}</div>
    <div slot="content">
        <p>
            {$_("help.preface")}
        </p>
        <ul>
            {#each items as item}
                <li>
                    <code>{item.example}</code>
                    <span>{item.description}</span>
                </li>
            {/each}
        </ul>
    </div>
</Modal>

<style>
</style>
