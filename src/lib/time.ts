export interface Duration {
    hours: number,
    minutes: number,
    seconds: number
}

export function end(duration: Duration): Date {
    return new Date(Date.now() + (duration.hours * 3600 + duration.minutes * 60 + duration.seconds) * 1000);
}

export function parse(x: string): Duration {
    const parts = x.split(":").reverse().map(i => parseInt(i));

    return { seconds: parts[0] || 0, minutes: parts[1] || 0, hours: parts[2] || 0 };
}