
export default format = (val) => {
  if (val === null || val === undefined) {
    return '0';
  }
  let valNum = parseInt(val);
  if (valNum >= 1000000) {
    valNum = `${(valNum / 1000000).toFixed(1)}m`;
  } else if (valNum >= 10000) {
    valNum = `${(valNum / 10000).toFixed(1)}w`;
  } else if(valNum >= 1000) {
    valNum = `${(valNum / 1000).toFixed(1)}k`;
  }

  return valNum.toString();
}
