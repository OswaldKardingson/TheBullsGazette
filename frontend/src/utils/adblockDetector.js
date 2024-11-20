
export const detectAdBlock = () => {
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    document.body.appendChild(testAd);
    const isBlocked = testAd.offsetHeight === 0;
    document.body.removeChild(testAd);
    return isBlocked;
};
