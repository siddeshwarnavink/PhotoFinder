<script>
	import FancyButton from "../components/Greetings/FancyButton.svelte";
	import FancyInput from "../components/Greetings/FancyInput.svelte";
	import FancyPopup from "../components/Greetings/FancyPopup.svelte";

	let inputName = "";
	let showPopup = false;

	function enterNameHandler(enteredNameEvent) {
		inputName = enteredNameEvent.detail.value;
	}

	function formSubmitHandler(event) {
		event.preventDefault();
		showPopup = true;
	}

	function togglePopupHandler() {
		if (showPopup) {
			// Clear form input after popup dismiss
			inputName = "";
		}

		showPopup = !showPopup;
	}
</script>

<FancyPopup show={showPopup} on:toggle={togglePopupHandler}>
	<p>Hi, {inputName}</p>
</FancyPopup>

<div class="wrapper">
	<div class="page-card">
		<h2>Greetings!</h2>

		<form on:submit={formSubmitHandler}>
			<FancyInput
				label="Your name"
				value={inputName}
				on:enterInput={enterNameHandler}
			/>

			<FancyButton>Submit</FancyButton>
		</form>
	</div>
</div>

<style>
	.wrapper {
		max-width: 450px;
		margin: auto;
		margin-top: 2em;
	}

	.wrapper .page-card {
		background-color: #fff;
		padding: 20px 24px;
		border-radius: 12px;
		/* box-shadow: 0 2px #999; */
	}
</style>
