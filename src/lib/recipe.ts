import { decode } from "./lzma";

const exampleRecipe = `# Cheesecake de zapallo
## Parte blanca
- 19g de chocolate amargo
- 45g de azucar de mentira
- 100 gramos de pure de zapagoo
- [24g/3] claras de huevo
- baking powder

## Parte negra
- 4g pure de zapallo
- 5g cream cheese
- 8g azucar de mentira
- 3g yema`;


export async function getRecipeFromURL(location: Location): Promise<string> {
    if (location.hash.length === 0) {
        return exampleRecipe;
    } else {
        return decode(location.hash.substr(1));
    }
}