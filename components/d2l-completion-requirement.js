import { CompletionStatusMixin } from '../utility/completion-status-mixin.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-status-indicator/d2l-status-indicator.js';
import d2lIntl from 'd2l-intl';
import 'd2l-colors/d2l-colors.js';
import 'd2l-typography/d2l-typography.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/*
@memberOf window.D2L.Polymer.Mixins;
@mixes CompletionStatusMixin
*/

class D2LCompletionRequirement extends CompletionStatusMixin() {
	static get template() {
		return html`
		<style>
			:host {
				color: inherit;
				display: inline;
				@apply --d2l-body-small-text;
			}

			#container
			{
				 display: flex;
			}
			d2l-status-indicator{
				margin-right: 8px;
			}

		</style>

		<div id="container">
			<template is="dom-if" if="[[isOverDue]]">
				<d2l-status-indicator state="alert" text="overdue"></d2l-status-indicator>
			</template>
			<div id="dueDate">[[localize('due')]] [[date]]</div>
			<template is="dom-if" if="[[shouldShowBullet]]">
				<d2l-icon  icon="d2l-tier1:bullet"></d2l-icon>
			</template>
			<template is="dom-if" if="[[isExempt]]">
				<div class="exempt">
					[[localize('exempt')]]
				</div>
			</template>
			<template is="dom-if" if="[[isOptional]]">
				<div class="optional">
					[[localize('optional')]]
				</div>
			</template>

		</div>


`;
	}

	static get is() {
		return 'd2l-completion-requirement';
	}
	static get properties() {
		return {
			completionRequirement: {
				type: String,
				computed: '_getCompletionRequirement(entity)',
				observer: '_showCompletionRequirementType'
			},
			isExempt: {
				type: Boolean
			},
			isOptional: {
				type: Boolean
			},
			date: {
				type: String,
				computed: 'getFormatedDate(entity)'
			},
			isOverDue:{
				type: Boolean,
				computed: '_setOverDue(entity)',
				default: false
			},
			shouldShowDuedate: {
				type: Boolean,
				computed: '_showDueDate(entity)'
			},
			shouldShowBullet: {
				type: Boolean,
				computed: '_showBullet(shouldShowDuedate)'
			}
		};
	}

	_showCompletionRequirementType(exemption) {
		switch (exemption) {
			case 'exempt':
				this.isExempt = true;
				break;
			case 'optional':
				this.isOptional = true;
				break;
			default:
				this.isExempt = false;
				this.isOptional = false;
		}
	}

	_showBullet(shouldShowDuedate) {
		return shouldShowDuedate && (this.isExempt || this.isOptional);
	}
	_showDueDate(entity) {
		return entity && entity.properties && entity.properties.dueDate;
	}
	_setOverDue(entity) {
		if (entity && entity.properties && entity.properties.overDue) {
			this.$$('#dueDate').style = 'color: var(--d2l-color-cinnabar); ';
			return true;
		}
		return false;
	}

	getFormatedDate(entity) {
		if (!entity || !entity.properties || !entity.properties.date) {
			return '';
		}
		const day = entity.properties.date.day;
		const month = entity.properties.date.Month;
		const formatter = new d2lIntl.DateTimeFormat(this.language, {
			format: 'monthDay'
		});
		const result = formatter.formatDate(
			new Date(null, month, day),
		);
		return result;
	}
}
customElements.define(D2LCompletionRequirement.is, D2LCompletionRequirement);
