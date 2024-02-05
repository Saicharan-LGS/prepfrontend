import CryptoJS from "crypto-js";
 
const secretKey = "yourSecretKey"; // Replace with your secret key
 
export function encrypt(dataToEncrypt) {
  const encryptedData = CryptoJS.AES.encrypt(
    dataToEncrypt,
    secretKey
  ).toString();
  return encryptedData;
}