/**
 * 字符串大数相加（支持小数）
 * @param {*} params
 */
export function addHuge(num1, num2, digit) {
  // 1. 将整数部分和小数部分分离
  const figure1 = getFigure(num1, digit);
  const figure2 = getFigure(num2, digit);
  // 2. 字符串相加
  const [integer1, decimal1] = figure1.split(".");
  const [integer2, decimal2] = figure2.split(".");
  let integer = String(BigInt(integer1) + BigInt(integer2));
  let decimal = String(BigInt(decimal1) + BigInt(decimal2));
  if (decimal1.length === Math.max(decimal1.length, decimal2.length) + 1) {
    // 小数部分存在进位
    decimal = String(BigInt(decimal)).slice(1);
    integer = BigInt(integer) + BigInt("1n");
  }
  return `${integer}.${decimal}`;
}

function getFigure(value, digit = 2) {
  const figure = value.match(
    new RegExp(`^\\d+(?:\\.\\d{0,${parseInt(digit)}})?`)
  );
  if (!figure) {
    return "";
  }
  const splitRes = figure[0].split(".");
  const integer = BigInt(splitRes[0]); // 去除前面的 0
  return `${integer}${splitRes.length === 1 ? "" : `.${splitRes[1]}`}`;
}
