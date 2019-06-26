import '@polymer/polymer/polymer-legacy.js';
import 'd2l-localize-behavior/d2l-localize-behavior.js';
/* eslint-disable */
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.SequenceNavigator = window.D2L.PolymerBehaviors.SequenceNavigator || {};

/**
* THIS FILE IS GENERATED. RUN `npm run locales` TO REGENERATE.
* Localizes the d2l-sequence-navigator component.
* @polymerBehavior LocalizeBehavior
*/
const LocalizeBehaviorImpl = {
properties: {
/**
* Localization resources.
*/
resources: {
value: function () {
return {"ar-AE":{"completed":"تم الإكمال","completedMofN":"تم الإكمال {completed}/{total}","countStatus":"{completed}/{total}","exempt":"إعفاء","optional":"اختياري","requirementsCompleted":"اكتمال {completed} من أصل {total} من المتطلبات"},"ar":{"completed":"مُكتمَل(ة)","completedMofN":"تم الإكمال {completed}/{total}","countStatus":"{completed}/{total}","exempt":"إعفاء","missedItems":"يتبقّى {numberOfMissedActivities, plural, one {# عنصر} other {# من العناصر}} في هذه الوحدة النمطية.","optional":"اختياري","requirementsCompleted":"اكتمال {completed} من أصل {total, plural, one {# متطلب} other {# من المتطلبات}}"},"da-DK":{"completed":"fuldført","completedMofN":"Fuldført {completed}/{total}","countStatus":"{completed}/{total}","exempt":"Foretag undtagelse","missedItems":"Du har {numberOfMissedActivities, plural, one {# element} other {# elementer}} tilbage i dette modul.","optional":"Valgfri","requirementsCompleted":"{completed} af {total, plural, one {# krav} other {# krav}} fuldført"},"da":{"completed":"fuldført","completedMofN":"Fuldført {completed}/{total}","countStatus":"{completed}/{total}","exempt":"Foretag undtagelse","optional":"Valgfri","requirementsCompleted":"{completed} af {total} krav fuldført"},"de-DE":{"completed":"Abgeschlossen","completedMofN":"{completed}/{total} abgeschlossen","countStatus":"{completed}/{total}","exempt":"Ausgenommen","optional":"Optional","requirementsCompleted":"{completed} von {total} Anforderungen abgeschlossen"},"de":{"completed":"Abgeschlossen","completedMofN":"{completed}/{total} abgeschlossen","countStatus":"{completed}/{total}","exempt":"Ausgenommen","missedItems":"You have {numberOfMissedActivities, plural, one {# item} other {# items}} left in this module.","optional":"Optional","requirementsCompleted":"{completed} of {total, plural, one {# requirement} other {# requirements}} completed"},"en":{"countStatus":"{completed}/{total}","completedMofN":"Completed {completed}/{total}","requirementsCompleted":"{completed} of {total, plural, one {# requirement} other {# requirements}} completed","optional":"Optional","exempt":"Exempt","completed":"completed","missedItems":"You have {numberOfMissedActivities, plural, one {# item} other {# items}} left in this module."},"es-ES":{"completed":"completado","completedMofN":"Completados {completed}/{total}","countStatus":"{completed}/{total}","exempt":"Eximir","optional":"Opcional","requirementsCompleted":"{completed} de {total} requisitos completados"},"es":{"completed":"completado","completedMofN":"Completados {completed}/{total}","countStatus":"{completed}/{total}","exempt":"Eximir","missedItems":"Le queda(n) {numberOfMissedActivities, plural, one {# elemento} other {# elementos}} en este módulo.","optional":"Opcional","requirementsCompleted":"{completed} de {total, plural, one {# requisito} other {# requisitos}} completado(s)"},"fr-FR":{"completed":"terminé","completedMofN":"{completed}/{total} terminés","countStatus":"{completed}/{total}","exempt":"Dispenser","missedItems":"Il vous reste {numberOfMissedActivities, plural, one {# élément} other {# éléments}} activités dans ce module.","optional":"Facultatif","requirementsCompleted":"{completed} activité(s) terminée(s) sur {total, plural, one {# exigence} other {# exigences}}"},"fr":{"completed":"terminé","completedMofN":"{completed}/{total} terminés","countStatus":"{completed}/{total}","exempt":"Dispenser","missedItems":"Vous avez {numberOfMissedActivities, plural, one {# item} other {# items}} restantes dans ce module.","optional":"Facultatif","requirementsCompleted":"{completed} de {total, plural, one {# requirement} other {# requirements}} terminées"},"ja-JP":{"completed":"完了","completedMofN":"{completed}/{total} 完了","countStatus":"{completed}/{total}","exempt":"免除","optional":"オプション","requirementsCompleted":"{total} 件の要件のうち、{completed} 件が完了"},"ja":{"completed":"項目完了","completedMofN":"{completed}/{total} 完了","countStatus":"{completed}/{total}","exempt":"免除","missedItems":"このモジュールに {numberOfMissedActivities, plural, one {# 項目} other {# 項目}} 残っています。","optional":"オプション","requirementsCompleted":"{total, plural, one {必須 # 項目} other {必須 # 項目}}のうち {completed} 項目完了"},"ko-KR":{"completed":"완료됨","completedMofN":"{completed}/{total} 완료됨","countStatus":"{completed}/{total}","exempt":"면제","optional":"선택사항","requirementsCompleted":"{completed} / {total} 요구사항 완료됨"},"ko":{"completed":"완료됨","completedMofN":"{completed}/{total} 완료됨","countStatus":"{completed}/{total}","exempt":"면제","missedItems":"이 모듈에 {numberOfMissedActivities, plural, one {# item} other {# items}}개가 남아 있습니다.","optional":"선택사항","requirementsCompleted":"{completed}/{total, plural, one {# requirement} other {# requirements}}개 완료됨"},"nb":{},"nl-NL":{"completed":"voltooid","completedMofN":"{completed}/{total} voltooid","countStatus":"{completed}/{total}","exempt":"Vrijstellen","optional":"Optioneel","requirementsCompleted":"{completed} van {total} vereisten voltooid"},"nl":{"completed":"voltooid","completedMofN":"{completed}/{total} voltooid","countStatus":"{completed}/{total}","exempt":"Vrijstellen","missedItems":"Je hebt nog {numberOfMissedActivities, plural, one {# item} other {# items}} in deze module.","optional":"Optioneel","requirementsCompleted":"{completed} van {total, plural, one {# vereiste} other {# vereisten}} voltooid"},"pt-PT":{"completed":"concluído","completedMofN":"Concluído {completed}/{total}","countStatus":"{completed}/{total}","exempt":"Isento","optional":"Opcional","requirementsCompleted":"{completed} de {total} requisitos concluídos"},"pt":{"completed":"concluído(s)","completedMofN":"Concluído {completed}/{total}","countStatus":"{completed}/{total}","exempt":"Isento","missedItems":"Você tem outros {numberOfMissedActivities, plural, one {# item} {# itens}} restantes neste módulo.","optional":"Opcional","requirementsCompleted":"{completed} de {total, plural, one {# requisito} other {# requisitos}} concluído(s)"},"sv-SE":{"completed":"slutförda","completedMofN":"Slutförda {completed}/{total}","countStatus":"{completed}/{total}","exempt":"Undantagen","optional":"Valfri","requirementsCompleted":"{completed} av {total} krav slutförda"},"sv":{"completed":"slutförda","completedMofN":"Slutförda {completed}/{total}","countStatus":"{completed}/{total}","exempt":"Undantagen","missedItems":"Du har {numberOfMissedActivities, plural, one {# objekt} other {# objekt}} kvar i den här modulen.","optional":"Valfri","requirementsCompleted":"{completed} av {total, plural, one {# krav} other {# krav}} slutförda"},"tr-TR":{"completed":"tamamlandı","completedMofN":"{completed}/{total} tamamlandı","countStatus":"{completed}/{total}","exempt":"Muaf Tut","optional":"İsteğe Bağlı","requirementsCompleted":"{completed}/{total} gereklilik tamamlandı"},"tr":{"completed":"tamamlandı","completedMofN":"{completed}/{total} tamamlandı","countStatus":"{completed}/{total}","exempt":"Muaf Tut","missedItems":"Bu modülde {numberOfMissedActivities, plural, one {# öğeniz} other {# öğeniz}} kaldı.","optional":"İsteğe Bağlı","requirementsCompleted":"{completed} / {total, plural, one {# gereklilik} other {# gereklilik}} tamamlandı"},"zh-CN":{"completed":"已完成","completedMofN":"Completed {completed}/{total}","countStatus":"{completed}/{total}","exempt":"免除","optional":"可选","requirementsCompleted":"{completed} of {total} requirements completed"},"zh-TW":{"completed":"項已完成","completedMofN":"已完成 {completed}/{total}","countStatus":"{completed}/{total}","exempt":"免除","missedItems":"您在此單元還有 {numberOfMissedActivities, plural, one {# 個項目} other {# 個項目}}。","optional":"選擇性","requirementsCompleted":"已完成 {completed}/{total, plural, one {# 個要求} other {# 個要求}}"},"zh":{"completed":"已完成","completedMofN":"Completed {completed}/{total}","countStatus":"{completed}/{total}","exempt":"免除","missedItems":"此模块中剩余 {numberOfMissedActivities, plural, one {# 个项目} other {# 个项目}}。","optional":"可选","requirementsCompleted":"已完成 {completed} 个要求（共 {total, plural, one {# 个} other {# 个}}"}};
}
}
}
};

/** @polymerBehavior LocalizeBehavior */
export const LocalizeBehavior = [
D2L.PolymerBehaviors.LocalizeBehavior,
LocalizeBehaviorImpl
];
