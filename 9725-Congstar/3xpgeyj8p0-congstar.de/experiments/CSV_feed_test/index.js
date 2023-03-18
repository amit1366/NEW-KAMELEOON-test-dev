const loadScript = src => {
  return new Promise( (resolve, reject) => {
      const scriptElem = document.createElement('script');
      scriptElem.src = src;
      scriptElem.onload = resolve;
      scriptElem.onerror = reject;
      document.head.appendChild(scriptElem);
  });
}

const papaParse = () => {
  Papa.parse('https://www.congstar.de/data-feed/affiliate.csv', {
    download: true,
    header: true,
    complete: results => {
      console.log("Parsing complete:", results);
    }
  });
}

loadScript('https://unpkg.com/papaparse@latest/papaparse.min.js')
  .then(() => papaParse())
  .catch(err => console.warn('RejectPromise: ', err));