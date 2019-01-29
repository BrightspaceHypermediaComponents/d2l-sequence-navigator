/*
	@polymerMixin
	@memberOf D2L.Polymer.Mixins;
*/
export function ASVFocusWithinMixin(superClass) {
	return class extends superClass {
		static get properties() {
			return {
				focusWithin: {
					type: Boolean,
					notify: true
				}
			};
		}
		ready() {
			super.ready();
			this.addEventListener('focus', this._focusWithinOnFocus);
			this.addEventListener('blur', this._focusWithinOnBlur);
		}
		_focusWithinOnFocus() {
			this.focusWithin = true;
		}
		_focusWithinOnBlur() {
			this.focusWithin = false;
		}
	};
}
