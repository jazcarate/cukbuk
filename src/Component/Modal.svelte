<script lang="ts">
    let open = false;

    function keydown(e: KeyboardEvent) {
        e.stopPropagation();
        if (e.key === "Escape") {
            open = false;
        }
    }

    function modalAction(node: HTMLElement) {
        const original = document.body.style.overflow;
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }
        node.addEventListener("keydown", keydown);
        node.focus();

        return {
            destroy() {
                node.removeEventListener("keydown", keydown);
                document.body.style.overflow = original;
            },
        };
    }
</script>

<span class="clickable" on:click={() => (open = true)}>
    <slot name="trigger" />
</span>
{#if open}
    <div class="modal" use:modalAction tabindex="0">
        <div class="backdrop clickable" on:click={() => (open = false)} />

        <div class="content-wrapper">
            <h1><slot name="header" /></h1>

            <div class="content">
                <slot name="content" />
            </div>
        </div>
    </div>
{/if}

<style>
    div.modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
    }
    div.modal:not(:focus-within) {
        transition: opacity 0.1ms;
        opacity: 0.99;
    }
    .clickable {
        cursor: pointer;
    }
    div.backdrop {
        background-color: rgba(0, 0, 0, 0.4);
        position: absolute;
        width: 100%;
        height: 100%;
    }
    div.content-wrapper {
        z-index: 10;
        max-width: 70vw;
        border-radius: 0.3rem;
        background-color: white;
        overflow: hidden;
        padding: 1em;
    }
    div.content {
        max-height: 50vh;
        overflow: auto;
        white-space: pre-wrap;
    }
    h1 {
        opacity: 0.5;
    }
</style>
