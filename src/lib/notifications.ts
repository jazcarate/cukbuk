let permission = typeof Notification !== "undefined" ? Notification.permission : 'denied';

export function notify(title: string, body: string) {
    const icon =
        "https://homepages.cae.wisc.edu/~ece533/images/airplane.png";
    new Notification(title, {
        body,
        icon,
        actions: [{ action: "cool", title: "cool" }]
    });
}

export async function request(): Promise<void> {
    if (permission == 'default') {
        permission = await Notification.requestPermission();
    }
}