export const globalSegmentsRemarketingAndReach = () => {
    if (Kameleoon.API.CurrentVisit.landingPageURL.indexOf('DIS-RM') !== -1) {
        Kameleoon.API.Data.setCustomData('Remarketing Segment', true);
    }

    if (Kameleoon.API.CurrentVisit.landingPageURL.indexOf('DIS-R&') !== -1) {
        Kameleoon.API.Data.setCustomData('Reach Segment', true);
    }
};
