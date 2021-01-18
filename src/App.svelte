<script>
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

	export let plaintext =
		location.hash.length === 0 ? exampleRecipe : decode();

	function decode() {
		fetch("data:application/octet-stream;base64," + location.hash.substr(1))
			.then((r) => r.blob())
			.then(function (blob) {
				var reader = new FileReader();
				reader.onload = function () {
					var compressed_data = Array.from(
						new Uint8Array(reader.result)
					);
					LZMA.decompress(compressed_data, (decoded, error) => {
						if (error) {
							alert("Failed to decompress data: " + error); // TODO
							return;
						}

						plaintext = decoded;
					});
				};
				reader.readAsArrayBuffer(blob);
			});

		return "decoding";
	}
</script>

<main>
	<textarea cols="40" rows="20" value={plaintext} />
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
