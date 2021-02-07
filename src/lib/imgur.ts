type URL = string;

export async function upload(file: File): Promise<URL> {
    if (!__cukbuk.isProd) {
        return Promise.resolve('https://cataas.com/cat');
    }

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('https://api.imgur.com/3/image',
        {
            method: 'POST',
            headers: {
                'Authorization': 'Client-ID ' + __cukbuk.env.IMGUR_CLIENT_ID
            },
            redirect: 'follow',
            body: formData
        });
    const { data: { link } } = await response.json();
    return link;
}