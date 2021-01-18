export type RecipeKey = string;

export function decode(recipeKey: RecipeKey): Promise<string> {
    return new Promise((resolve, error) => {
        fetch("data:application/octet-stream;base64," + recipeKey)
            .then((r) => r.blob())
            .then(function (blob) {
                var reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result;
                    if (typeof result == 'string') {
                        error("Was expecting an ArrayBuffer result");
                    } else {
                        var compressed_data = Array.from(new Uint8Array(result));
                        LZMA.decompress(compressed_data, (decoded, err) => {
                            if (err) {
                                error(err);
                            } else {
                                resolve(decoded);
                            }
                        });
                    }
                };
                reader.readAsArrayBuffer(blob);
            });
    });
}

export function encode(recipe: string): Promise<RecipeKey> {
    return new Promise((resolve, error) => {
        LZMA.compress(recipe, 1, (compressed, err) => {
            if (err) {
                error(err);
            } else {
                var reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result;
                    if (typeof result == 'string') {
                        var base64 = result.substr(result.indexOf(",") + 1);
                        resolve(base64 as RecipeKey);
                    } else {
                        error("Was expecting a string as read result");
                    }
                };
                reader.readAsDataURL(new Blob([new Uint8Array(compressed)]));
            }
        });
    });

}