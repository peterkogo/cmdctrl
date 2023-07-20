<script lang="ts">
	import { combo } from './actions.js';

	import type { Handlers, Keymap } from '@cmdctrl/shortcuts';

	export let keyMap: Keymap | undefined = undefined;
	export let handlers: Handlers | undefined = undefined;
</script>

<div use:combo={{ keyMap, handlers }}>
	<slot />
</div>
