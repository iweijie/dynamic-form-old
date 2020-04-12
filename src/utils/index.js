export const getRandom = prefix => {
  const str =
    Math.random()
      .toString(16)
      .slice(2) + Date.now().toString(16);
  return prefix ? `${prefix}_${str}` : str;
};

export const className = (...classNames) => {
  const classNameList = [];
  classNames.forEach(className => {
    if (typeof className === 'string') {
      classNameList.push(className);
    } else if (typeof className === 'object') {
      Object.keys(className).forEach(key => {
        if (className[key]) {
          classNameList.push(key);
        }
      });
    }
  });
  return classNameList.join(' ');
};
