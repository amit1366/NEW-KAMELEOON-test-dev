import { createdAttr } from './consts';

/* eslint-disable max-len */

export const getConfigurationDescriptionMarkup = (title, subtitle) => `
    <ul class="icon-list icon-list--themed" ${createdAttr}="true">
        <li class="icon--check">
            <span>${title}</span>
            ${subtitle ? '<span class="icon-list__addition">'.concat(subtitle, '</span>') : ''}
        </li>
    </ul>
`;
