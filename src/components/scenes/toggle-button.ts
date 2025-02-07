import { computed, Directive, model } from '@angular/core';

@Directive({
	selector: 'button[toggleButton]',
	host: {
		class: 'border rounded px-2 py-1 cursor-pointer',
		'(click)': 'onClick()',
		'[class]': 'hbClass()',
	},
})
export class ToggleButton {
	value = model.required<boolean>({ alias: 'toggleButton' });

	protected hbClass = computed(() => {
		return this.value() ? ['text-white', 'bg-accent-600', 'border-accent-200'] : ['text-black', 'border-black'];
	});

	protected onClick() {
		this.value.update((prev) => !prev);
	}
}
