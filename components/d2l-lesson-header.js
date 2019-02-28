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
import 'd2l-progress/d2l-progress.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/*
@memberOf D2L.Polymer.Mixins;
@mixes CompletionStatusMixin
@mixes D2L.Polymer.Mixins.ASVFocusWithinMixin
*/
class D2LLessonHeader extends ASVFocusWithinMixin(CompletionStatusMixin()) {
	static get template() {
		return html`
		<style class$="styles">
		:host {
			--d2l-lesson-header-text-color: var(--d2l-asv-text-color);
			--d2l-lesson-header-background-color: transparent;
			--d2l-lesson-header-border-color: var(--d2l-lesson-header-background-color);
			background-color: var(--d2l-lesson-header-background-color);
			color: var(--d2l-lesson-header-text-color);
			padding: 20px 28px 20px 25px;
			border-style: solid;
			border-width: 1px 0px 1px 1px;
			border-color:	var(--d2l-lesson-header-border-color);
			border-radius: 0px 0px 0px 8px;
			margin-bottom: -1px;
			display: block;
		}

		:host(.d2l-asv-current) {
			--d2l-lesson-header-background-color: var(--d2l-asv-primary-color);
			--d2l-lesson-header-text-color: var(--d2l-asv-selected-text-color);
			--d2l-lesson-header-border-color: var(--d2l-asv-border-color);
		}

		a:focus {
			outline: none;
		}

		:host(.d2l-asv-focus-within),
		:host(:hover) {
			--d2l-lesson-header-background-color: var(--d2l-asv-hover-color);
			--d2l-lesson-header-border-color: var(--d2l-asv-border-color);
			--d2l-lesson-header-text-color: var(--d2l-asv-text-color);
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

		</style>
		<a href="javascript:void(0)" class="d2l-header-lesson-link" on-click="_onHeaderClicked">
			<div>
				<span class="module-title">[[entity.properties.title]]</span>
				<progress id$="[[isLightTheme()]]" class="d2l-progress" value="[[percentCompleted]]" max="100"></progress>
				<div class="module-completion-count" aria-hidden="true">[[localize('completedMofN', 'completed', completionCompleted, 'total', completionTotal)]]</div>
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
}

window.customElements.define(D2LLessonHeader.is, D2LLessonHeader);
