const regexComposer = (...regexes) => new RegExp(regexes.map((regex) => regex.source).join('|'));
export default regexComposer;
