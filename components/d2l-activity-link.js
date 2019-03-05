import { CompletionStatusMixin } from '../utility/completion-status-mixin.js';
import { PolymerASVLaunchMixin } from '../utility/polymer-asv-launch-mixin.js';
import { ASVFocusWithinMixin } from '../utility/asv-focus-within-mixin.js';
import './d2l-completion-status.js';
import './d2l-completion-requirement.js';
import { beforeNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icons.js';
import 'fastdom/fastdom.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/*
@memberOf window.D2L.Polymer.Mixins;
@mixes CompletionStatusMixin
@mixes PolymerASVLaunchMixin
*/
class D2LActivityLink extends ASVFocusWithinMixin(PolymerASVLaunchMixin(CompletionStatusMixin())) {
	static get template() {
		return html`
		<style>
			:host {
				--d2l-activity-link-border-color: var(--d2l-activity-link-background-color);
				--d2l-activity-link-text-color: var(--d2l-asv-text-color);
				display: block;
				cursor: pointer;
				@apply --d2l-body-compact-text;
				background-color: var(--d2l-activity-link-background-color);
				padding: var(--d2l-activity-link-padding, 10px 24px);
				border-collapse: separate;
				box-sizing: border-box;
				border: 1px solid var(--d2l-activity-link-border-color, transparent);
				border-width: 1px 0;
				margin-top: -1px;
			}

			:host(.d2l-asv-current) {
				--d2l-activity-link-background-color: var(--d2l-asv-primary-color);
				--d2l-activity-link-text-color: var(--d2l-asv-selected-text-color);
				--d2l-activity-link-subtext-color: var(--d2l-asv-selected-text-color);
				--d2l-activity-link-border-color: var(--d2l-asv-border-color);
			}

			:host(:focus) {
				outline: none;
			}

			:host(.d2l-asv-focus-within),
			:host(:focus),
			:host(:hover) {
				--d2l-activity-link-background-color: var(--d2l-asv-hover-color);
				--d2l-activity-link-subtext-color: var(--d2l-asv-text-color);
				--d2l-activity-link-border-color: var(--d2l-asv-border-color);
				--d2l-activity-link-text-color: var(--d2l-asv-text-color);
			}

			:host > div {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}

			d2l-icon,
			a,
			d2l-completion-requirement,
			d2l-completion-status {
				vertical-align: top;
			}

			.d2l-activity-link-title {
				padding-left: 15px;
				flex: 1 100%;
			}

			a {
				@apply --d2l-body-compact-text;
				overflow: hidden;
				text-overflow: ellipsis;
				max-height: 3.0rem;
				outline: none;
				text-decoration: none;
				color: var(--d2l-activity-link-text-color);
			}

			d2l-completion-requirement {
				--d2l-activity-link-subtext-color: var(--d2l-color-tungsten);
				color: var(--d2l-activity-link-subtext-color);
			}

			d2l-completion-status {
				width: 6%;
				color: var(--d2l-activity-link-text-color);
				padding-left: 24px;
				text-align: right;
			}

			d2l-icon {
				padding-top: 3px;
				color: var(--d2l-activity-link-text-color);
			}

			:host([inner-last]) {
				border-radius: 0 0 8px 8px;
			}

			:host(.d2l-asv-current) d2l-completion-requirement {
				color: var(--d2l-asv-text-color);
			}

			:host(.d2l-asv-current:not(:hover)) d2l-completion-requirement {
				color: var(--d2l-asv-selected-text-color);
			}

		</style>
		<div on-click="_contentObjectClick">
			<template is="dom-if" if="[[hasIcon]]">
				<d2l-icon icon="[[_getIconSetKey(entity)]]"></d2l-icon>
			</template>
			<div class="d2l-activity-link-title">
				<a on-click="setCurrent"
					class$="[[completionRequirementClass]]"
					href="javascript:void(0)"
					title=[[entity.properties.title]]
					>
					[[entity.properties.title]]
				</a>
				<d2l-completion-requirement href="[[href]]" token="[[token]]">
				</d2l-completion-requirement>
			</div>
			<d2l-completion-status href="[[href]]" token="[[token]]">
			</d2l-completion-status>
		</div>
`;
	}

	static get is() {
		return 'd2l-activity-link';
	}
	static get properties() {
		return {
			currentActivity: {
				type: String,
				value: '',
				notify: true
			},
			completionRequirementClass: {
				type: String,
				computed: '_getCompletionRequirementClass(entity)'
			},
			hasIcon: {
				type: Boolean,
				computed: '_hasIcon(entity)'
			},
			class: {
				type: String,
				computed: '_getIsSelected(currentActivity, entity, focusWithin)',
				reflectToAttribute: true
			},
			visible: {
				type: Boolean,
				observer: '_visibilityChanged'
			}
		};
	}
	static get observers() {
		return [
			'_onCurrentActivityChanged(currentActivity, entity)',
			'_entityChanged(entity)'
		];
	}
	_visibilityChanged(newValue, oldValue){
		if (newValue){
			console.log(this);
			this._entityChanged(this.entity);
		}
	}

	_entityChanged(entity) {
		if (!entity || !entity.properties || !entity.properties.title) return;
		const textNode = this.shadowRoot.querySelector('div.d2l-activity-link-title a');
		this._clampText(entity.properties.title, textNode, 2);
	}

	ready() {
		super.ready();
		this.addEventListener('keypress', this._onKeyPress);
	}

	_clampText(text, textNode, textLineCount) {
		//cribbed from activities... module-ify this eventually.
		if (!text || !textNode) return;
		let height = 0;
		fastdom.measure(() => {
			height = window.getComputedStyle(textNode).getPropertyValue('line-height').match(/\d+/);
		});
		beforeNextRender(this, () => {
			fastdom.mutate(() => {
				const lineHeight = height && height[0];
				textNode.textContent = text;
				if (text.includes('Wikipedia')) {
					//debugger;
				}
				const currentLineNumber = textNode.offsetHeight / lineHeight;
				if (currentLineNumber <= textLineCount) {
					return;
				}
				// The idea is to mathematically find the most probable point to clamp.
				// Take the average per line while distributing the characters from the last line between all the lines.
				// So the average line length is between 1 to (1 + 1/(textLineCount+1)) the actual average.
				// The `+1` in the previous line is because the description has to be more than the textLineCount
				// For example if the description max number of lines is 2 then the average count would be between
				// 1 to 1.33 times the actual average.
				const avgCharPerLine = text.length / ((currentLineNumber - 1));

				// This is where we clamp using the ~average length of a line. We want the clamp to not be exactly at the edge
				// so clamp 75% of the last line. Since the average line could be larger we need to make sure that this cut
				// is still lower then the average line.
				// So we need to prove 1 <= 3/4*(1 + 1/(textLineCount + 1))
				// The above line simplifies to textLineCount >= 2
				// So as long as we clamp down to two lines this will work.
				textNode.textContent = text.substring(0, avgCharPerLine * (textLineCount - 0.25));

				// Okay what about when textLineCount = 1? We will do a loop through this step to solve that case.
				// This loop will make sure the clamping is done on words and will make sure that if our quick cut above
				// wasn't enough to fix that too.
				do {
					textNode.textContent = textNode.textContent.replace(/\W*\s(\S)*$/, '');
				} while (textNode.offsetHeight > textLineCount * lineHeight && textNode.textContent);
				textNode.textContent += '...';
			});
		});
	}

	_onKeyPress(event) {
		if (event.key !== 'Enter') {
			return;
		}
		this.setCurrent();
	}

	setCurrent() {
		this.currentActivity = this.entity && this.entity.getLinkByRel('self').href;
		this.dispatchEvent(new CustomEvent('sequencenavigator-d2l-activity-link-current-activity', {detail: { href: this.href}}));
	}

	_onCurrentActivityChanged(currentActivity, entity) {
		if (currentActivity && entity) {
			this.dispatchEvent(new CustomEvent('activitySelected', { detail:{ activityHref: currentActivity }, composed: true }));
		}
	}

	_hasIcon(entity) {
		const tierClass = 'tier1';
		return entity && entity.getSubEntityByClass(tierClass);
	}

	_getIconSetKey(entity) {
		const tierClass = 'tier1';
		return (entity.getSubEntityByClass(tierClass)).properties.iconSetKey;
	}

	_getCompletionRequirementClass(entity) {
		const completionRequirement = this._getCompletionRequirement(entity);
		switch (completionRequirement) {
			case 'exempt':
			case 'optional':
				return 'd2l-activity-link-one-line';
		}
		return '';
	}
	_getIsSelected(currentActivity, entity, focusWithin) {
		const selected = entity && entity.getLinkByRel('self').href === currentActivity;
		if (selected) {
			this.dispatchEvent(new CustomEvent('sequencenavigator-d2l-activity-link-current-activity', {detail: { href: this.href}}));
		}
		return this._getTrueClass(focusWithin, selected);
	}
}
customElements.define(D2LActivityLink.is, D2LActivityLink);
