export const caesarEncrypt = (text: string, key: number): string => {
  const chars = text.split('');

  const encryptedChars = chars.map((char) => {
    const charCode = char.charCodeAt(0);
    const shiftedCharCode = charCode + key;
    return String.fromCharCode(shiftedCharCode);
  });

  return encryptedChars.join('');
};

export const caesarDecrypt = (encryptedText: string, key: number): string => {
  return caesarEncrypt(encryptedText, -key);
};
