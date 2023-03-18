Kameleoon.API.Core.runWhenElementPresent('label.checkbox-label', (elements) => {
    elements.forEach((element) => {
        if (/TIDAL/.test(element.innerText)) {
            const container = element.closest('plan-configurator-option-group');

            if (container.querySelectorAll('plan-configurator-option').length > 1) {
                element.closest('plan-configurator-option').style.display = 'none';
            } else if (container.querySelectorAll('plan-configurator-option').length === 1) {
                element.closest('plan-configurator-option-group').style.display = 'none';
            }
        }
    });
});
