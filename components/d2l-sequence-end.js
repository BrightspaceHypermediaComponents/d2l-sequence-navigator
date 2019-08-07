import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { ASVFocusWithinMixin } from '../utility/asv-focus-within-mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class D2LSequenceEnd extends ASVFocusWithinMixin(PolymerElement) {
	static get template() {
		return html`
			<style>
				#d2l-sequence-end-container {
					--d2l-sequence-end-text-color: var(--d2l-asv-text-color);
					--d2l-sequence-end-background-color: transparent;
					--d2l-sequence-end-border-color: var(--d2l-sequence-end-background-color);
					--d2l-sequence-end-opacity: 1;
					background-color: transparent;
					color: var(--d2l-sequence-end-text-color);
					border-style: solid;
					border-width: 1px;
					border-color: transparent;
					border-radius: 8px 0px 0px 8px;
					padding: 20px 40px 20px 20px;
					position: relative;
					z-index: 0;
					margin-top: -1px;
				}

				#d2l-sequence-end-container.d2l-asv-current {
					--d2l-sequence-end-background-color: var(--d2l-asv-primary-color);
					--d2l-sequence-end-text-color: var(--d2l-asv-selected-text-color);
					--d2l-sequence-end-border-color: rgba(0, 0, 0, 0.6);
				}

				#d2l-sequence-end-container.d2l-asv-focus-within,
				#d2l-sequence-end-container:focus:not(.d2l-asv-current),
				#d2l-sequence-end-container:hover {
					--d2l-sequence-end-background-color: var(--d2l-asv-primary-color);
					--d2l-sequence-end-border-color: rgba(0, 0, 0, 0.42);
					--d2l-sequence-end-text-color: var(--d2l-asv-text-color);
					--d2l-sequence-end-opacity: 0.26;
					cursor: pointer;
				}

				div.bkgd, div.border {
					position: absolute;
					top: -1px;
					left: -1px;
					border-radius: 8px;
				}

				div.bkgd {
					opacity: var(--d2l-sequence-end-opacity);
					background-color: var(--d2l-sequence-end-background-color);
					z-index: -2;
					position: absolute;
					height: calc(100% + 2px);
					width: calc(100% + 2px);
				}

				div.border {
					border-style: solid;
					border-width: 1px;
					border-color:  var(--d2l-sequence-end-border-color);
					z-index: -1;
					height: 100%;
					width: 100%;
				}

				.d2l-sequence-end-link {
						@apply --d2l-heading-3;
						color: var(--d2l-sequence-end-text-color);
						text-decoration: none;
						outline: none;
				}
			</style>
			<div id="d2l-sequence-end-container" class$="[[_containerClass]]" on-click="showEndOfLesson">
				<div class="bkgd"></div>
				<div class="border"></div>
				<a on-click="showEndOfLesson"
					class="d2l-sequence-end-link"
					href="javascript:void(0)">
					[[text]]
				</a>
			</div>
		`;
	}
	static get is() {
		return 'd2l-sequence-end';
	}
	static get properties() {
		return {
			href: {
				type: String
			},
			_containerClass:{
				type: String,
				computed: '_getContainerClass(currentActivity, href, focusWithin)'
			},
			currentActivity: {
				type: String,
				reflectToAttribute: true,
				notify: true
			},
			text:{
				type: String
			}
		};
	}

	_getContainerClass(currentActivity, href, focusWithin) {
		const isSelected = href === currentActivity;
		return this._getTrueClass(focusWithin, isSelected);
	}

	showEndOfLesson() {
		this.currentActivity = this.href;
	}
}
customElements.define(D2LSequenceEnd.is, D2LSequenceEnd);
