import Bestandskunde from './Bestandskunde';
import Interessent from './Interessent';
import GooglePaid from './GooglePaid';
import Premium from './Premium';
import Schnappchenjager from './Schnappchenjager';
import Trendsetter from './Trendsetter';
import Unentschieden from './Unentschieden';
import UnentschiedenSmartphone from './Unentschieden_Smartphone';
import goalPdpPhoneBehaviour from './goalPdpBehaviour';
import { localData } from './utils';

export const intiPersoSegmnets = () => {
    const isNewVisit = Kameleoon.API.CurrentVisit.pageViews === 1;
    if (isNewVisit) {
        localStorage.removeItem('Perso Segments Goals');
    }
    let isActiveSegments = false;
    const options = {
        groupOne: {
            group: [new Bestandskunde().check(), new Interessent().check()],
            prefer: 'Bestandskunde Segment',
        },
        groupTwo: {
            group: [new Schnappchenjager().check(), new Premium().check()],
            prefer: '',
        },
        groupThree: {
            group: [new Unentschieden().check(), new UnentschiedenSmartphone().check()],
            prefer: '',
        },
        groupFour: {
            group: [new Trendsetter().check()],
            prefer: '',
        },
        groupFive: {
            group: [new GooglePaid().check(), new GooglePaid().check()],
            prefer: 'Google Paid Segment',
        },
    };

    function preferSegmentBehaviour({ group, prefer }) {
        const activeSegments = group.filter((segment) => segment);
        if (!activeSegments.length) return;
        isActiveSegments = true;
        const isPreferSegment = activeSegments.find((segment) => segment === prefer);
        if (isPreferSegment) {
            Kameleoon.API.Data.setCustomData(prefer, true);
        } else {
            Kameleoon.API.Data.setCustomData(activeSegments[0], true);
        }
    }
    function removeOldSegment(segments, oldSegment, groupName) {
        const data = localData.get('Group Segment Behaviour');
        const choosedSegment = segments.filter((segment) => segment === oldSegment);
        const futureSegment = segments.filter((segment) => segment !== oldSegment);
        localData.set('Group Segment Behaviour', {
            ...data,
            [groupName]: futureSegment[0],
        });
        Kameleoon.API.Data.resetCustomData(choosedSegment[0]);
        localStorage.removeItem(choosedSegment[0]);
        Kameleoon.API.Data.setCustomData(futureSegment[0], true);
    }

    function chooseSegment({ group }, key) {
        const activeSegments = group.filter((segment) => segment);
        if (activeSegments.length) {
            isActiveSegments = true;
            const data = localData.get('Group Segment Behaviour');
            if (data[key] && activeSegments.length > 1) {
                removeOldSegment(activeSegments, data[key], key);
            } else {
                localData.set('Group Segment Behaviour', {
                    ...data,
                    [key]: activeSegments[0],
                });
                Kameleoon.API.Data.setCustomData(activeSegments[0], true);
            }
        }
    }

    for (const groupName in options) {
        if (options[groupName].prefer) {
            preferSegmentBehaviour(options[groupName]);
        } else {
            chooseSegment(options[groupName], groupName);
        }
    }
    if (!isActiveSegments) {
        Kameleoon.API.Data.setCustomData('Unbekannt Segment', true);
    } else {
        Kameleoon.API.Data.resetCustomData('Unbekannt Segment');
    }

    goalPdpPhoneBehaviour();
};
