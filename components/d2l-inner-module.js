import './d2l-activity-link.js';
import { CompletionStatusMixin } from '../utility/completion-status-mixin.js';
import { PolymerASVLaunchMixin } from '../utility/polymer-asv-launch-mixin.js';
import { ASVFocusWithinMixin } from '../utility/asv-focus-within-mixin.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-offscreen/d2l-offscreen.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/*
@memberOf window.D2L.Polymer.Mixins;
@mixes D2L.Polymer.Mixins.CompletionStatusMixin
@mixes D2L.Polymer.Mixins.PolymerASVLaunchMixin
@mixes D2L.Polymer.Mixins.ASVFocusWithinMixin
*/

class D2LInnerModule extends ASVFocusWithinMixin(PolymerASVLaunchMixin(CompletionStatusMixin())) {
	static get template() {
		return html`
		<style>
			:host {
				--d2l-inner-module-text-color: var(--d2l-asv-text-color);
				--d2l-activity-link-padding: 10px 14px;
				display: block;
				cursor: pointer;
				@apply --d2l-body-compact-text;
				--d2l-inner-module-background-color: transparent;
				margin: 10px 0;
				color: var(--d2l-inner-module-text-color);
				border-radius: 8px;
				background-color: var(--d2l-color-sylvite);
			}

			#header-container {
				--d2l-inner-module-border-color: var(--d2l-inner-module-background-color);
				display: flex;
				padding: 12px 0 0;
				border-radius: 8px 8px 0 0;
				border-style: solid;
				border-width: var(--d2l-inner-module-border-width, 0);
				border-color: transparent;
				height: 30px;
			}

			#header-container.inner-module-empty {
				padding: 12px 0;
			}

			#module-header {
				--d2l-inner-module-opacity: 1;
				display: flex;
				flex-grow: 1;
				padding: 4px 14px 0 14px;
				z-index: 0;
				position: relative;
				background-color: transparent;
			}

			div.bkgd, div.border {
				position: absolute;
				top: -1px;
				left: -1px;
				border-radius: 8px;
			}

			div.bkgd {
				opacity: var(--d2l-inner-module-opacity);
				background-color: var(--d2l-inner-module-background-color);
				z-index: -2;
				position: absolute;
				height: calc(100% + 2px);
				width: calc(100% + 2px);
			}

			div.border {
				border: 1px solid var(--d2l-inner-module-border-color, transparent);
				border-width: 1px;
				z-index: -1;
				height: 100%;
				width: 100%;
			}

			#module-header > a {
				text-decoration: none;
				color: var(--d2l-inner-module-text-color);
				outline: none;
			}

			#module-header.d2l-asv-current {
				--d2l-inner-module-background-color: var(--d2l-asv-primary-color);
				--d2l-inner-module-text-color: var(--d2l-asv-selected-text-color);
				--d2l-inner-module-border-color: rgba(0, 0, 0, 0.6);
			}

			#module-header.d2l-asv-focus-within,
			#module-header:focus,
			#module-header:hover {
				--d2l-inner-module-background-color: var(--d2l-asv-primary-color);
				--d2l-inner-module-border-color: rgba(0, 0, 0, 0.42);
				--d2l-inner-module-text-color: var(--d2l-asv-text-color);
				--d2l-inner-module-opacity: 0.26;
			}

			.module-title {
				@apply --d2l-body-small-text;
				color: var(--d2l-inner-module-text-color);

				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				float: left;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2; /* number of lines to show */
				max-height: 2.0rem; /* fallback */
			}

			ol {
				list-style-type: none;
				border-collapse: collapse;
				margin: 0px;
				padding: 0px;
			}

			li {
				margin-top: 10px;
				margin-bottom: 10px;
			}

		</style>

		<div id="header-container" class$="[[isEmpty(subEntities)]]">
			<div id="module-header" class$="[[_getIsSelected(currentActivity, focusWithin)]]" on-click="_onHeaderClicked">
				<div class="bkgd"></div>
				<div class="border"></div>
				<a on-click="_onHeaderClicked" href="javascript:void(0)">
					<span class="module-title">[[entity.properties.title]]</span>
				</a>
			</div>
		</div>
		<ol>
			<template is="dom-repeat" items="[[subEntities]]" as="childLink">
				<li>
					<d2l-activity-link inner-last$="[[isLast(subEntities, index)]]" href="[[childLink.href]]" token="[[token]]" current-activity="{{currentActivity}}" on-sequencenavigator-d2l-activity-link-current-activity="childIsActiveEvent"></d2l-activity-link>
				</li>
			</template>
		</ol>
`;
	}

	static get is() {
		return 'd2l-inner-module';
	}
	static get properties() {
		return {
			currentActivity: {
				type: String,
				value: '',
				notify: true
			},
			hasCurrentActivity: {
				type: Boolean,
				value: false
			},
			subEntities: {
				type: Array,
				computed: 'getSubEntities(entity)'
			}
		};
	}
	getSubEntities(entity) {
		return entity && entity.getSubEntities()
			.filter(subEntity => (subEntity.hasClass('sequenced-activity') && subEntity.hasClass('available')) || (subEntity.href && subEntity.hasClass('sequence-description')))
			.map(this._getHref);
	}

	_getHref(entity) {
		return entity && entity.getLinkByRel && entity.getLinkByRel('self') || entity || '';
	}
	_getIsSelected(currentActivity, focusWithin) {
		const selected = this.entity && this.entity.getLinkByRel('self').href === currentActivity;
		if (selected) {
			this.dispatchEvent(new CustomEvent('sequencenavigator-d2l-inner-module-current-activity', {detail: { href: this.href}}));
		}
		return this._getTrueClass(focusWithin, selected);
	}

	_onHeaderClicked() {
		this.currentActivity = this.entity.getLinkByRel('self').href;
		this._contentObjectClick();
	}

	childIsActiveEvent() {
		this.dispatchEvent(new CustomEvent('sequencenavigator-d2l-inner-module-current-activity', {detail: { href: this.href}}));
	}

	isLast(entities, index) {
		if (entities.length <= index + 1) {
			return true;
		}
		else {
			return false;
		}
	}

	isEmpty(subEntities) {
		if (subEntities === null || subEntities.length === 0) {
			return 'inner-module-empty';
		}
		else {
			return '';
		}
	}
}
customElements.define(D2LInnerModule.is, D2LInnerModule);
