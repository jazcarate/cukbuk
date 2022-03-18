<script lang="ts">
    import { parse } from "./Text/parser";
    export let text: string;

    const parsed = parse(text);
</script>

{#each parsed as part}
    {#if part._type == "link"}
        <a href={part.href} rel="noopener noreferrer" title={part.href}
            >{part.value}</a
        >
    {:else if part._type == "embeddedYouTube"}
        <iframe
            src={"https://www.youtube.com/embed/" + part.id}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        />
    {:else if part._type == "text"}
        <span>{part.value}</span>
    {/if}
{/each}
