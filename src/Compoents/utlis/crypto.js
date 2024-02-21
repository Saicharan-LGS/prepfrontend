// crypto.js

import CryptoJS from "crypto-js";

// Encryption key (for demonstration purposes, you may want to use a more secure approach to manage keys)
const encryptionKey = "yourEncryptionKey123";

// Encryption function
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, encryptionKey).toString();
};

// Decryption function
export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
