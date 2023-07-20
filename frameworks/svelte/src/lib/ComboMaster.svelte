<script lang="ts">
	import { Resolver, type Keymap, type Handlers } from '@cmdctrl/shortcuts';
	import { comboDetector } from './actions.js';
	import { pressedKeys } from './stores.js';
	import type { ComboAttachEvent } from './types.js';

	export let keyMap: Keymap | undefined = undefined;
	export let handlers: Handlers | undefined = undefined;

	let resolver: Resolver | undefined;

	function update(keys: string[]) {
		pressedKeys._set(keys);
		if (resolver) {
			resolver.resolve(keys);
		}
	}

	function handleMatch(action: string) {
		const event = new CustomEvent('combo', {
			detail: {
				action
			},
			bubbles: true
		});

		if (document.activeElement) {
			document.activeElement.dispatchEvent(event);
		} else {
			window.dispatchEvent(event);
		}
	}

	// Update resolver if keymap changes
	$: {
		if (keyMap) {
			resolver = new Resolver(keyMap, handleMatch);
		}
	}
</script>

<svelte:window
	use:comboDetector={update}
	on:comboAttach={(event) => {
		/*TODO*/
	}}
	on:comboDetach={(event) => {
		/*TODO*/
	}}
	on:combo={(event) => {
		if (handlers && handlers[event.detail.action]) {
			console.log(`CmdController: ${event.detail.action} handled`);
		}
	}}
/>
<slot />
