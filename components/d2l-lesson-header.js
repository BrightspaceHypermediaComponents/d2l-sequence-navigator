/**
'd2l-lesson-header'

@demo demo/index.html
*/
/*
	FIXME(polymer-modulizer): the above comments were extracted
	from HTML and may be out of place here. Review them and
	then delete this comment!
*/
import { CompletionStatusMixin } from '../utility/completion-status-mixin.js';
import { ASVFocusWithinMixin } from '../utility/asv-focus-within-mixin.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-typography/d2l-typography.js';
import '@brightspace-ui/core/components/meter/meter-circle.js';
import 'd2l-progress/d2l-progress.js';
import 'd2l-icons/d2l-icons.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/*
@memberOf D2L.Polymer.Mixins;
@mixes CompletionStatusMixin
@mixes D2L.Polymer.Mixins.ASVFocusWithinMixin
*/
class D2LLessonHeader extends ASVFocusWithinMixin(CompletionStatusMixin()) {
	static get template() {
		return html`
		<style>
		:host {
			--d2l-lesson-header-text-color: var(--d2l-asv-text-color);
			--d2l-lesson-header-background-color: transparent;
			--d2l-lesson-header-border-color: var(--d2l-color-mica);
			--d2l-lesson-header-opacity: 1;
			background-color: transparent;
			color: var(--d2l-lesson-header-text-color);
			padding: 20px 28px 20px 25px;
			margin-bottom: -1px;
			display: block;
			position: relative;
			z-index: 0;

		}

		:host(.d2l-asv-current) {
			--d2l-lesson-header-background-color: var(--d2l-asv-primary-color);
			--d2l-lesson-header-text-color: var(--d2l-asv-selected-text-color);
			--d2l-lesson-header-border-color: rgba(0, 0, 0, 0.6);
		}

		a:focus {
			outline: none;
		}

		:host(.d2l-asv-focus-within),
		:host(:hover) {
			--d2l-lesson-header-background-color: var(--d2l-asv-primary-color);
			--d2l-lesson-header-border-color: rgba(0, 0, 0, 0.42);
			--d2l-lesson-header-text-color: var(--d2l-asv-text-color);
			--d2l-lesson-header-opacity: 0.26;
		}

		div.bkgd, div.border {
			position: absolute;
			top: -1px;
			left: -1px;
		}

		div.bkgd {
			opacity: var(--d2l-lesson-header-opacity);
			background-color: var(--d2l-lesson-header-background-color);
			z-index: -2;
			height: 100%;
			width: calc(100% + 2px);
		}

		div.border {
			border-style: solid;
			border-width: 1px 0;
			border-color: var(--d2l-lesson-header-border-color);
			z-index: -1;
			height: calc(100% - 2px);
			width: 100%;
		}

		.module-title {
			@apply --d2l-heading-3;

			overflow: hidden;
			text-overflow: ellipsis;

			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2; /* number of lines to show */
			max-height: 3rem; /* fallback */

			margin-top: 0px;
			margin-bottom: 0px;
		}

		.module-completion-count {
			@apply --d2l-body-small-text;
			color: var(--d2l-lesson-header-text-color);
			text-align: right;
			padding-top: 10px;
			padding-right: 3px;
		}

		.d2l-header-lesson-link,
		.d2l-header-lesson-link:hover {
			cursor: pointer;
			color: var(--d2l-lesson-header-text-color);
			text-decoration: none;
		}

		progress.d2l-progress {
			@apply --d2l-progress;
			background-color: var(--d2l-color-gypsum);
			height:12px;
		}
		/* this is necessary to avoid white bleed over rounded corners in chrome and safari */
		progress.d2l-progress::-webkit-progress-bar {
			@apply --d2l-progress-webkit-progress-bar;
		}
		/* strangely, comma separating the selectors for these pseudo-elements causes them to break */
		progress.d2l-progress::-webkit-progress-value {
			@apply --d2l-progress-webkit-progress-value;
			background-color: var(--d2l-color-celestine);
			border:none;
		}
		/* note: unable to get firefox to animate the width... seems animation is not implemented for progress in FF */
		progress.d2l-progress::-moz-progress-bar {
			@apply --d2l-progress-moz-progress-bar;
			background-color: var(--d2l-color-celestine);
			border:none;
		}
		progress.d2l-progress::-ms-fill {
			@apply --d2l-progress-ms-fill;
			border: 1px solid transparent;
			border-radius: 10px;
			/*Added default value since --d2l-color-celestine doesn't work on Edge
			https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12837456/*/
			background-color: var(--d2l-color-celestine, #006fbf);
		}

		:host(.d2l-asv-current) progress.d2l-progress {
			background-color: transparent;
			border: 1px solid var(--d2l-asv-selected-text-color);
			box-shadow: none;
		}
		:host(.d2l-asv-current) progress.d2l-progress::-webkit-progress-value {
			background-color: var(--d2l-asv-selected-text-color);
		}
		:host(.d2l-asv-current) progress.d2l-progress::-moz-progress-bar {
			background-color: var(--d2l-asv-selected-text-color);
		}
		:host(.d2l-asv-current) progress.d2l-progress::-ms-fill {
			background-color: var(--d2l-asv-selected-text-color, #fff);
		}
		/* Added light-theme id as a workaround for Edge issue with variables in -ms-fill
		https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12837456/ */
		:host(.d2l-asv-current) progress.d2l-progress#light-theme::-ms-fill {
			background-color: var(--d2l-asv-selected-text-color, #565a5c);
		}

		:host(.d2l-asv-focus-within) progress.d2l-progress,
		:host(:hover) progress.d2l-progress {
			background-color: transparent;
			border: 1px solid var(--d2l-asv-text-color);
			box-shadow: none;
		}
		:host(.d2l-asv-focus-within) progress.d2l-progress::-webkit-progress-value,
		:host(:hover) progress.d2l-progress::-webkit-progress-value {
			background-color: var(--d2l-asv-text-color);
		}
		:host(.d2l-asv-focus-within) progress.d2l-progress::-moz-progress-bar,
		:host(:hover) progress.d2l-progress::-moz-progress-bar {
			background-color: var(--d2l-asv-text-color);
		}
		:host(.d2l-asv-focus-within) progress.d2l-progress::-ms-fill,
		:host(:hover) progress.d2l-progress::-ms-fill {
			background-color: var(--d2l-asv-text-color, #565a5c);
		}

		div.title-container {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
		}
		d2l-meter-circle {
			width: 48px;
			min-width: 48px;
		}

		</style>
		<div class="bkgd"></div>
		<div class="border"></div>
		<a href="javascript:void(0)" class="d2l-header-lesson-link" on-click="_onHeaderClicked">
			<div>
				<div class="title-container">
					<div>
						<template is="dom-if" if="[[_useModuleIndex]]">
							<div>
								<span>[[_moduleTitle]]</span>
								<d2l-icon icon="d2l-tier1:bullet"></d2l-icon>
								<span>[[localize('currentModule', 'current', _moduleIndex, 'total', _siblingModules)]]</span>
							</div>
						</template>
						<span class="module-title">[[entity.properties.title]]</span>
					</div>
					<template is="dom-if" if="[[_useNewProgressBar]]">
						<d2l-meter-circle
							id$="[[isLightTheme()]]"
							class="d2l-progress"
							value="[[completionCount.completed]]"
							max="[[completionCount.total]]">
						</d2l-meter-circle>
					</template>
				</div>
				<template is="dom-if" if="[[!_useNewProgressBar]]">
					<progress id$="[[isLightTheme()]]" class="d2l-progress" value="[[percentCompleted]]" max="100"></progress>
					<div class="module-completion-count" aria-hidden="true">[[localize('completedMofN', 'completed', completionCompleted, 'total', completionTotal)]]</div>
				</template>
				<div><d2l-offscreen>[[localize('requirementsCompleted', 'completed', completionCompleted, 'total', completionTotal)]]</d2l-offscreen></div>
			</div>
		</a>
`;
	}

	static get is() {
		return 'd2l-lesson-header';
	}
	static get properties() {
		return {
			class: {
				type: String,
				reflectToAttribute: true,
				computed:'_getHeaderClass(currentActivity, entity, focusWithin)'
			},
			currentActivity: {
				type: String,
				value: '',
				notify: true
			},
			moduleProperties: Object,
			_useModuleIndex: {
				type: Boolean,
				value: false,
				computed: '_checkModuleIndex(moduleProperties)'
			},
			_moduleIndex: {
				type: Number,
				computed: '_getModuleIndex(moduleProperties)'
			},
			_siblingModules: {
				type: Number,
				computed: '_getSiblingModules(moduleProperties)'
			},
			_moduleTitle: {
				type: String,
				computed: '_getModuleTitle(moduleProperties)'
			},
			_useNewProgressBar: {
				type: Boolean,
				value: false,
				computed: '_getUseNewProgressBar(moduleProperties)'
			}
		};
	}

	_getHeaderClass(currentActivity, entity, focusWithin) {
		const selfLink = entity && entity.getLinkByRel('self').href;
		const selected = currentActivity === selfLink;
		return this._getTrueClass(focusWithin, selected);
	}

	_onHeaderClicked() {
		this.currentActivity = this.entity && this.entity.getLinkByRel('self').href || '';
	}
	isLightTheme() {
		var styles = JSON.parse(document.getElementsByTagName('html')[0].getAttribute('data-asv-css-vars'));
		if (styles && styles['--d2l-asv-selected-text-color'] === 'var(--d2l-color-ferrite)') {
			return 'light-theme';
		}
		return;
	}

	_checkModuleIndex(moduleProperties) {
		return moduleProperties && moduleProperties.moduleIndex && moduleProperties.numberOfSiblingModules;
	}

	_getModuleIndex(moduleProperties) {
		return moduleProperties && moduleProperties.moduleIndex;
	}

	_getModuleTitle(moduleProperties) {
		return moduleProperties && moduleProperties.title;
	}

	_getSiblingModules(moduleProperties) {
		return moduleProperties && moduleProperties.numberOfSiblingModules;
	}

	_getUseNewProgressBar(moduleProperties) {
		return moduleProperties && moduleProperties.useNewProgressBar;
	}
}

window.customElements.define(D2LLessonHeader.is, D2LLessonHeader);
