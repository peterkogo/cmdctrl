<script lang="ts">
	import { CmdController, pressedKeys } from '@cmdctrl/svelte';

	const keyMap = {
		COPY: {
			keys: ['ControlLeft', 'KeyS']
		},
		TEST: {
			keys: ['ControlLeft', 'KeyF']
		}
	};

	const handlers = {
		TEST: {
			fn: () => {
				console.log('copied something');
			},
			stopPropagation: true,
			preventBubbling: true
		}
	};
</script>

<CmdController {keyMap} {handlers}>
	<!-- Example for handling events by hand -->
	<div
		class="full"
		tabindex="-1"
		on:cmdctrl={(event) => {
			if (event.detail.action === 'COPY') {
				event.stopPropagation();
				console.log(`Manual: ${event.detail.action} handled`);
			}
		}}
	>
		<div />
		{#each $pressedKeys as pressedKey, i}
			<div>
				{i}
				{pressedKey}
			</div>
		{/each}
	</div>
</CmdController>

<style>
	.full {
		width: 100vw;
		height: 100vh;
	}
</style>
