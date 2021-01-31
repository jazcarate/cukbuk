import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';

import emoji from './emoji.json';
import en from './en.json';
import es from './es.json';

addMessages('en', en);
addMessages('emoji', emoji);
addMessages('es', es);

init({
    fallbackLocale: 'emoji',
    initialLocale: getLocaleFromNavigator(),
});