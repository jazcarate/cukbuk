import { decode } from "./lzma";

const exampleRecipe = `Chocolate Chip Cookies
# Dry prep
- Whisk together: [280g all-purpose flour], [1teaspoon baking soda], [1.5teaspoons cornstarch] and [1/2teaspoon of salt]
Set aside.
# Wet prep
- Mix in a medium bowl [0.75cup melted unsalted butter], [150g packed light or dark brown sugar], [100g granulated sugar]
- Fold in [225g semi-sweet chocolate chips or chocolate chunks] until no brown sugar lumps remain.
- Whisk in [1 egg], then [1 additional egg yolk].
- Add in [2teaspoons pure vanilla extract].
Pour the wet ingredients into the dry ingredients and mix together with a large spoon or rubber spatula.
Cover the dough and chill in the refrigerator minimum [02:00:00]
Take the dough out of the refrigerator and allow to slightly soften at room temperature for [10:00]
Preheat oven to [325f]
Line two large baking sheets with parchment paper or silicone baking mats.
Roll the dough into balls
- Bake the cookies for [12:00]`

export async function getRecipeFromHash(hash: string): Promise<string> {
    if (hash) {
        return decode(hash);
    } else {
        return exampleRecipe;
    }
}