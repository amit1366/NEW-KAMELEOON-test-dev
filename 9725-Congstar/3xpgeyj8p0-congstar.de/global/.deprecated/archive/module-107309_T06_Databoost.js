export const T06Databoost = () => {
    const goals = {
        '[GG] VVL  in CSC': 212465,
    };
    
    if (location.href.includes(`https://www.congstar.de/meincongstar/vertragsverlaengerung/bestaetigung`)) {
        Kameleoon.API.Goals.processConversion(goals['[GG] VVL  in CSC']);
    }
};
