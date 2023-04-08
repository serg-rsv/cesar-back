export const xor = (message: string, key: string): string => {
  const messageChars = Array.from(message);
  const keyChars = Array.from(key);
  const encryptedChars = messageChars.map((char, index) => {
    const keyChar = keyChars[index % keyChars.length];
    const charCode = char.charCodeAt(0) ^ keyChar.charCodeAt(0);
    return String.fromCharCode(charCode);
  });
  return encryptedChars.join('');
};
