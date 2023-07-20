<script lang="ts">
	import { ComboMaster, pressedKeys } from '@cmdctrl/svelte';

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

<ComboMaster {keyMap} {handlers}>
	<!-- Example for handling events by hand -->
	<div
		class="full"
		tabindex="-1"
		on:combo={(event) => {
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
</ComboMaster>

<style>
	.full {
		width: 100vw;
		height: 100vh;
	}
</style>
