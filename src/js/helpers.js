import { TIMEOUT_SEC } from './config.js';
const timeout = function (s) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const data = await Promise.race([timeout(5), fetch(url)]);
    const dataJson = await data.json();
    return dataJson;
  } catch (err) {
    throw err;
  }
};
