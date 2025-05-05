import * as CryptoJS from 'crypto-js';

export class EncryptionService {
  private key = CryptoJS.enc.Utf8.parse('1234567890123456');
  private iv = CryptoJS.enc.Utf8.parse('1234567890123456');

  encrypt(data: any): string {
    const jsonData = JSON.stringify(data); // Convert object to string
    const encrypted = CryptoJS.AES.encrypt(jsonData, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  decrypt(cipherText: string): any {
    const decrypted = CryptoJS.AES.decrypt(cipherText, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData); // Parse back to object
  }
}
