<script lang="ts">
    import { notify, request } from "./lib/notifications";
    import { end } from "./lib/time";
    import type { Duration } from "./lib/time";

    export let value: Duration;

    let done = false;
    let endDate: Date | null;
    let remaining: Duration;
    let interval: number;

    function round(x: number): string {
        return x.toFixed(0).padStart(2, "0");
    }

    function start() {
        request();
        endDate = end(value);
        remaining = value;
        interval = setInterval(() => {
            let diff = (endDate.getTime() - Date.now()) / 1000; // Seconds

            if (diff <= 0) {
                notifyy();
                done = true;
                stop();
            } else {
                const hours = Math.floor(diff / 3600);
                diff -= hours * 3600;
                const minutes = Math.floor(diff / 60) % 60;
                diff -= minutes * 60;
                const seconds = diff;

                remaining = { hours, minutes, seconds };
            }
        }, 1000);
    }

    function notifyy(): void {
        notify("Cukbuk :: Timer up", `Your timer is up!`);
    }

    function stop() {
        endDate = null;
        clearInterval(interval);
    }
</script>

{#if endDate}
    <span on:click|stopPropagation={stop}>
        ⏹ {round(remaining.hours)}:{round(remaining.minutes)}:{round(
            remaining.seconds
        )}
    </span>
{:else}
    <span on:click|stopPropagation={start}>
        {#if done}✅{:else}▶{/if}
        {round(value.hours)}:{round(value.minutes)}:{round(value.seconds)}
    </span>
{/if}

<style>
    span {
        cursor: pointer;
    }
</style>
