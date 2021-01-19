<script lang="ts">
    import { parse, end } from "iso8601-duration";
    import type { Duration } from "iso8601-duration";
    import { notify, request } from "./lib/notifications";
    import { debug } from "svelte/internal";

    // ISO 8601 duration format: https://en.wikipedia.org/wiki/ISO_8601#Durations
    export let value: string;

    let endDate: Date | null;
    let remaining: Duration;
    let interval: number;

    const parsed = parse(value);

    function round(x: number): string {
        return x.toFixed(0).padStart(2, "0");
    }

    function start() {
        request();
        endDate = end(parsed);
        remaining = parsed;
        interval = setInterval(() => {
            let diff = (endDate.getTime() - Date.now()) / 1000; // Seconds

            if (diff <= 0) {
                notifyy();
                stop();
            } else {
                const hours = Math.floor(diff / 3600) % 24;
                diff -= hours * 3600;
                const minutes = Math.floor(diff / 60) % 60;
                diff -= minutes * 60;
                const seconds = diff;

                remaining = { hours, minutes, seconds };
            }
        }, 1000);
    }

    function notifyy(): void {
        const [unit, value] = Object.entries(parsed).find(
            ([_, v]) => v !== 0
        );
        notify("Cukbuk :: Timer up", `Your ${value} ${unit} timer is up!`);
    }

    function stop() {
        endDate = null;
        clearInterval(interval);
    }
</script>

{#if endDate}
    <span on:click={stop}>
        ⏹ {round(remaining.hours)}:{round(remaining.minutes)}:{round(
            remaining.seconds
        )}
    </span>
{:else}
    <span on:click={start}>
        ▶ {round(parsed.hours)}:{round(parsed.minutes)}:{round(parsed.seconds)}
    </span>
{/if}

<style>
    span {
        cursor: pointer;
    }
</style>
