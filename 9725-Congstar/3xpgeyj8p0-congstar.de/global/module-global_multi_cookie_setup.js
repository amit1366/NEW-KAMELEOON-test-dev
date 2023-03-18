export const globalMultiCookieSetup = () => {
    const getCookie = (name) => {
        const regex = new RegExp(`${name}=([^;]+)`);
        const value = document.cookie.match(regex);
        return value ? value[1] : false;
    };
    const multiTestCookie = 'kamCookieMultiTest';
    const currentExclusiveTestID = parseInt(getCookie(multiTestCookie), 10);
    if (currentExclusiveTestID) {
        window.kameleoonQueue = window.kameleoonQueue || [];
        window.kameleoonQueue.push(() => {
            if (!Kameleoon.API.Experiments.getById(currentExclusiveTestID)) {
                document.cookie = 'kamCookieMultiTest=; path=/;max-age=0';
            }
        });
    }
};
