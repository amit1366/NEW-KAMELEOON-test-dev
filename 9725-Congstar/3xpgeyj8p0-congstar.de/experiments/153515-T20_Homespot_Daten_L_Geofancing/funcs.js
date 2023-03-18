export const getProduct = (storageName) => sessionStorage.getItem(storageName) 
    || localStorage.getItem(storageName) || '30';

export const getPriceIntFromText = (text) => parseInt(text, 10) || 0;
