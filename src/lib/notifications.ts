let permission = typeof Notification !== "undefined" ? Notification.permission : 'denied';

export function notify(title: string, body: string) {
    const icon =
        "/images/icons/favicon-32x32.png";
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