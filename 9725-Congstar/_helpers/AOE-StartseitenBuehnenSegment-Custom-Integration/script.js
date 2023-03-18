/* eslint-disable max-len */
// eslint-disable-next-line no-undef
function triggerEvent(segmentName) {
    const segmentLoadingDoneEvent = new CustomEvent('kameleoon_segment_loading_done', {
        detail: { segment: segmentName },
    });
    document.dispatchEvent(segmentLoadingDoneEvent);
}

if (experimentID) {
    Kameleoon.API.Core.runWhenConditionTrue(() => Kameleoon.API.Experiments.getById(experimentID)?.targetSegment?.name, () => {
        const segmentName = Kameleoon.API.Experiments.getById(experimentID).targetSegment.name;
        triggerEvent(segmentName);
    }, 100);
} else if (personalizationID) {
    Kameleoon.API.Core.runWhenConditionTrue(() => Kameleoon.API.Personalizations.getById(personalizationID)?.targetSegment?.name, () => {
        const segmentName = Kameleoon.API.Personalizations.getById(personalizationID).targetSegment.name;
        triggerEvent(segmentName);
    }, 100);
}

/*
// GET segment name
document.addEventListener("kameleoon_segment_loading_done", (event) => {
  console.log(event.detail.segment);
});
*/
