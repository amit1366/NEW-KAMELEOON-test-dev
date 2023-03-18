const allVisits = Kameleoon.API.Visitor.visits;
if (!Kameleoon.API.Visitor.customData['[AI]HoursLastVisit'] && allVisits.length > 1) {
    const thisVisit = allVisits[allVisits.length-1].startDate;
    const lastVisit = allVisits[allVisits.length-2].startDate;
    const diffHours = (thisVisit-lastVisit)/36000000;
    return {"value": diffHours.toFixed(2), "overwrite": false};
} else {
    return {"value": null, "overwrite": false};
}