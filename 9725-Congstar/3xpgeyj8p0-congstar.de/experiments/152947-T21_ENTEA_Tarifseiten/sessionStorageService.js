export const sessionStorageService = {
    names: {
        plan24: 'kameleoonDev__153079-plan24',
        lte50: 'kameleoonDev__153079-lte50',
        extraDaten: 'kameleoonDev__153079-extraDaten',
        disney: 'kameleoonDev__153079-disney',
        musik: 'kameleoonDev__153079-musik',
    },
    getValue: (name) => sessionStorage.getItem(name),
    setValue: (name, value) => sessionStorage.setItem(name, value),
};
