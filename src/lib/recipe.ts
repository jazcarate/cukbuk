import { decode } from "./lzma";

const exampleRecipe = `Cheesecake de zapallo
# Parte blanca
- 19g de chocolate amargo
- 45g de azucar de mentira
- 100g de pure de zapagoo
- 3 claras de huevo
- baking powder

# Parte negra
- 4g pure de zapallo
- 5g cream cheese
- 8g azucar de mentira
- 3g yema`

export async function getRecipeFromHash(hash: string): Promise<string> {
    if (hash) {
        return decode(hash);
    } else {
        return exampleRecipe;
    }
}