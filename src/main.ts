import { routes } from 'svelte-hash-router';
import App from './App.svelte';
import Recipe from './Page/Recipe.svelte';
import Favorites from './Page/Favorites.svelte';

routes.set({
	'/r/*': Recipe,
	'/': Favorites
})

const app = new App({
	target: document.body
});

export default app;