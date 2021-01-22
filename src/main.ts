import { routes } from 'svelte-hash-router';

import './lang/i18n';

import App from './App.svelte';
import Recipe from './Page/Recipe.svelte';
import Favorites from './Page/Favorites.svelte';
import About from './Page/About.svelte';

routes.set({
	'/r/*': Recipe,
	'/': Favorites,
	'/about': About
})

const app = new App({
	target: document.body
});

export default app;