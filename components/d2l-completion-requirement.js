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
				margin-right: 4px;
			}

		</style>

		<div id="container">
			<template is="dom-if" if="[[isOverDue]]">
				<d2l-status-indicator state="alert" text="overdue"></d2l-status-indicator>
			</template>

			<div id="dueDate">[[dueDate]]</div>

			<template is="dom-if" if="[[shouldShowBullet]]">
				<d2l-icon icon="d2l-tier1:bullet"></d2l-icon>
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
	static get behaviors() {
		D2L.PolymerBehaviors.LocalizeBehavior;
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
			dueDate: {
				type: String,
				computed: 'getFormatedDate(entity)'
			},
			isOverDue:{
				type: Boolean,
				computed: '_setOverDue(entity,isOptional,isExempt)',
			},
			shouldShowBullet: {
				type: Boolean,
				computed: '_showBullet(dueDate,isOptional,isExempt)'
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

	_showBullet(dueDate, optional, exempt) {
		return dueDate && (optional || exempt);
	}

	_setOverDue(entity, optional, exempt) {
		if (entity && entity.properties && entity.properties.overDue) {
			if (optional === false && exempt === false) {
				this.$$('#dueDate').style = 'color: var(--d2l-color-cinnabar)';
			}
			return true;
		}
		return false;
	}

	getFormatedDate(entity) {
		if (!entity || !entity.properties || !entity.properties.dueDate) {
			return '';
		}
		const year = entity.properties.dueDate.Year;
		const day = entity.properties.dueDate.Day;
		const month = entity.properties.dueDate.Month;
		const formatter = new d2lIntl.DateTimeFormat(this.language, {
			format: 'monthDay'
		});
		const longResult = formatter.formatDate(
			new Date(year, month, day),
		);

		// d2lIntl short month format is not working, also it does not have short month and date formate
		const result = longResult.replace(longResult.substring(0, longResult.indexOf(' ')),
			longResult.substring(0, 3));
		return this.localize('due') + ' ' + result;
	}
}
customElements.define(D2LCompletionRequirement.is, D2LCompletionRequirement);
