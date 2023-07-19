# CMD-CTRL Turborepo
Goals of the project:
- Reliably detect multiple keypresses (there are many issues connected to `keyup` not being fired in certain instances)
- Performantly match key combinations to actions
- Make it possible to independently mount key maps and handlers in the DOM
- Base it on key-codes instead of keys to prevent i10n problems
- Move complexity into displaying key combinations based on layout instead of functionality of application
- Provide an easy to use interface for redefining key combinations
- Don't require to manage focus like in [react-hotkeys](https://github.com/greena13/react-hotkeys)
- Framework independent


Further goals:
- Create extensible launcher to search, manage and activate key combinations 
- Create visual depictions of key board presses for ease of use and debugging
- Create build plugin to access full list of actions across application
- React version -> good comparison for React vs Svelte

## Idea
- Only register key listeners on window
- Overwriting keymaps based on current view & priority
- Treat focusable shortcuts as edge case
- Cmd-Controller orchestrates everything (through dispatched events on create/destroy)
- Resolved key combinations result in a [Custom Event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) that bubbles and makes manual handling easy

## Repos

### @cmdctrl/shortcuts
- vanilla javascript
- detecting key combinations
- resolving key combinations
- tracking mounted keymaps & handlers

### @cmdctrl/svelte
- prefer vanilla js over svelte where possible
- easy usage over actions & components