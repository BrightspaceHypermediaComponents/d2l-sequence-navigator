/**
'd2l-sequence-navigator'

@demo demo/index.html
*/
/*
	FIXME(polymer-modulizer): the above comments were extracted
	from HTML and may be out of place here. Review them and
	then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import './components/d2l-outer-module.js';
import 'd2l-accordion/d2l-accordion.js';
import 'd2l-colors/d2l-colors.js';
import 'siren-entity/siren-entity.js';
import { LocalizeBehavior } from './localize-behavior.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
/*
@memberOf D2L.Polymer.Mixins;
@mixes SirenEntityMixin
*/
class D2LSequenceNavigator extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	LocalizeBehavior
],
PolymerElement
) {
	static get template() {
		return html`
		<style>
		:host {
			display: block;
			height: 100%;
			border-right: var(--d2l-sequence-navigator-border-right, 1px solid var(--d2l-color-mica));
			background-color: white;
		}

		.module-item-list {
			list-style-type: none;
			padding: 0px;
			margin: 0px;
		}

		::slotted(.shadowed) {
			position: relative;
			z-index: 1;
			box-shadow: 0 4px 0 0 rgba(185,194,208,.3);
		}

		.module-content {
			height: calc( 100% - 259px );
		}

		d2l-activity-link:focus {
			outline: none;
		}

		#sidebarContent {
			position: relative;
			overflow-y: auto;
		}

		:host([role="navigation"]) li:last-of-type>d2l-activity-link,
		d2l-activity-link[before-module] {
			border-bottom: 1px solid var(--d2l-color-mica);
		}

		:host([role="navigation"]) li:last-of-type>d2l-activity-link:hover,
		d2l-activity-link[before-module]:hover {
			border-bottom: 1px solid var(--d2l-asv-border-color);
		}

		:host([role="navigation"]) li:last-of-type>d2l-activity-link.d2l-asv-current:not(:hover),
		d2l-activity-link[before-module].d2l-asv-current:not(:hover){
			border-bottom: 1px solid var(--d2l-asv-border-color);
		}

		:host([role="navigation"]) d2l-activity-link {
			border-width: 1px 0 1px 1px;
		}
		
		:host([role="navigation"]) d2l-activity-link:hover,
		:host([role="navigation"]) d2l-activity-link.d2l-asv-current:not(:hover) {
			border-radius: 8px 0 0 8px;
		}
		li:first-of-type d2l-activity-link,
		li:first-of-type d2l-outer-module {
			margin-top: 0px;
		}

		</style>
		<siren-entity href="[[rootHref]]" token="[[token]]" entity="{{_lessonEntity}}"></siren-entity>
		<slot name="lesson-header"></slot>
		<d2l-accordion auto-close="" class="module-content" id="sidebarContent" on-scroll="onSidebarScroll">

			<ol class="module-item-list">
				<template is="dom-repeat" items="[[subEntities]]" as="childLink">
					<li>
						<template is="dom-if" if="[[!_isActivity(childLink)]]">
							<d2l-outer-module href="[[childLink.href]]" token="[[token]]" current-activity="{{href}}" disabled="[[disabled]]" is-sidebar="[[isSidebar()]]" last-module="[[isLast(subEntities, index)]]"></d2l-outer-module>
						</template>						
						<template is="dom-if" if="[[_isActivity(childLink)]]">
							<d2l-activity-link href="[[childLink.href]]" token="[[token]]" current-activity="{{href}}" before-module$="[[isBeforeModule(subEntities, index)]]"></d2l-activity-link>
						</template>
					</li>
				</template>
			</ol>
			<slot name="end-of-lesson"></slot>
		</d2l-accordion>
`;
	}

	static get is() {
		return 'd2l-sequence-navigator';
	}
	static get properties() {
		return {
			href: {
				type: String,
				reflectToAttribute: true,
				notify: true
			},
			rootHref: {
				type: String,
				computed: '_getRootHref(entity)'
			},
			subEntities: {
				type: Array,
				computed: 'getSubEntities(_lessonEntity)'
			},
			_lessonEntity:{
				type: Object
			},
			disabled: {
				type: Boolean
			},
			role: {
				type: String
			}
		};
	}

	ready() {
		super.ready();
		const styles = JSON.parse(document.getElementsByTagName('html')[0].getAttribute('data-asv-css-vars'));
		this.updateStyles(
			styles
		);
	}

	_getRootHref(entity) {
		const rootLink = entity && entity.getLinkByRel('https://sequences.api.brightspace.com/rels/sequence-root');
		return rootLink && rootLink.href || '';
	}

	getSubEntities(entity) {
		return entity && entity.getSubEntities()
			.filter(subEntity =>
				(subEntity.properties && Object.keys(subEntity.properties).length > 0) || subEntity.href)
			.map(this._getHref);
	}

	_isActivity(link) {
		return link && link.hasClass('sequenced-activity');
	}

	_getHref(entity) {
		return entity && entity.getLinkByRel && entity.getLinkByRel('self') || entity || '';
	}

	onSidebarScroll() {
		const sidebarHeader = this.getSideBarHeader();
		if (this.$.sidebarContent.scrollTop === 0) {
			if (sidebarHeader.classList.contains('shadowed')) {
				sidebarHeader.classList.remove('shadowed');
			}
		} else {
			if (!sidebarHeader.classList.contains('shadowed')) {
				sidebarHeader.classList.add('shadowed');
			}
		}
	}

	getSideBarHeader() {
		const sidebarHeaderSlot = this.shadowRoot.querySelector('slot');
		const sidebarHeader = sidebarHeaderSlot.assignedNodes()[0].querySelector('d2l-lesson-header#sidebarHeader');
		return sidebarHeader;
	}

	isBeforeModule(subEntities, index) {
		if (index < subEntities.length - 1) {
			if (!this._isActivity(subEntities[index + 1])) {
				return true;
			}
		}
		return false;
	}

	isLast(entities, index) {
		if (entities.length <= index + 1) {
			return true;
		}
		else {
			return false;
		}
	}
	isSidebar() {
		if (this.role === 'navigation') {
			return true;
		}
		return false;
	}
}

window.customElements.define(D2LSequenceNavigator.is, D2LSequenceNavigator);
