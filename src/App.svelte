<script>
	import { encode, decode } from "./lzma";
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

	export let plaintext = "Loading...";

	if (location.hash.length === 0) {
		plaintext = exampleRecipe;
	} else {
		decode(location.hash.substr(1)).then((r) => (plaintext = r));
	}

	function handleEncode() {
		encode(plaintext).then((f) => {
			console.log("encoded", f);
		});
	}
</script>

<main>
	<textarea cols="40" rows="20" bind:value={plaintext} />
	<button on:click={handleEncode}>encode</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
