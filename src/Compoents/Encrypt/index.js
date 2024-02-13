import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_PYT_SECRET;

export function encrypt(dataToEncrypt) {
  const encryptedData = CryptoJS.AES.encrypt(
    dataToEncrypt,
    secretKey
  ).toString();
  return encryptedData;
}

export function decrypt(encryptedData) {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
}
