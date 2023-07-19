<script lang="ts">
	import { Resolver, type Keymap, type Handlers } from '@cmdctrl/shortcuts';
	import { detector } from './actions.js';
	import { pressedKeys } from './stores.js';

	export let keyMap: Keymap | null;
	export let handlers: Handlers | null;

	let resolver: Resolver | undefined;

	function update(keys: string[]) {
		pressedKeys._set(keys);
		if (resolver) {
			resolver.resolve(keys);
		}
	}

	function handleMatch(action: string) {
		const event = new CustomEvent('cmdctrl', {
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
	use:detector={update}
	on:cmdctrl={(action) => {
		// console.log('CmdController: ', action);
		if (handlers && handlers[action.detail.action]) {
			console.log(`CmdController: ${action.detail.action} handled`);
		}
	}}
/>
<slot />
