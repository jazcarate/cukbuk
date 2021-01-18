// global: LZMA

export function decode(recipeKey) {
    return new Promise((resolve, error) => {
        fetch("data:application/octet-stream;base64," + recipeKey)
            .then((r) => r.blob())
            .then(function (blob) {
                var reader = new FileReader();
                reader.onload = () => {
                    var compressed_data = Array.from(new Uint8Array(reader.result));
                    LZMA.decompress(compressed_data, (decoded, err) => {
                        if (err) {
                            error(err);
                        } else {
                            resolve(decoded);
                        }
                    });
                };
                reader.readAsArrayBuffer(blob);
            });
    });
}

export function encode(recipe) {
    return new Promise((resolve, error) => {
        LZMA.compress(recipe, 1, (compressed, err) => {
            if (err) {
                error(err);
            } else {
                var reader = new FileReader();
                reader.onload = () => {
                    var base64 = reader.result.substr(reader.result.indexOf(",") + 1);
                    resolve(base64);
                };
                reader.readAsDataURL(new Blob([new Uint8Array(compressed)]));
            }
        });
    });

}