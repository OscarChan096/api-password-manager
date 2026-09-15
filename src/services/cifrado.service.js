/**
 * Servicio de cifrado/descifrado
 * Algoritmo: AES-256-GCM (autenticado, resistente a manipulación)
 * Módulo: crypto (built-in de Node.js, sin dependencias externas)
 *
 * Requiere la variable de entorno ENCRYPTION_KEY con exactamente 64 caracteres
 * hexadecimales (= 32 bytes). Ejemplo de generación:
 *   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 */

import crypto from 'crypto';

const ALGORITHM   = 'aes-256-gcm';
const IV_LENGTH   = 12;   // 96 bits — recomendado para GCM
const TAG_LENGTH  = 16;   // 128 bits de auth tag
const ENCODING    = 'hex';

/**
 * Devuelve la clave de cifrado desde la variable de entorno.
 * Lanza un error claro si no está configurada o tiene longitud incorrecta.
 */
const getKey = () => {
    const raw = process.env.ENCRYPTION_KEY;

    if (!raw) {
        throw new Error(
            'ENCRYPTION_KEY no está definida en las variables de entorno.'
        );
    }
    if (raw.length !== 64) {
        throw new Error(
            `ENCRYPTION_KEY debe tener 64 caracteres hexadecimales (32 bytes). Longitud actual: ${raw.length}`
        );
    }

    return Buffer.from(raw, ENCODING);
};

/**
 * Cifra un texto plano.
 * @param {string} plainText - Texto a cifrar.
 * @returns {string} Cadena con formato "iv:tag:ciphertext" (todo en hex).
 */
export const encrypt = (plainText) => {
    if (typeof plainText !== 'string' || plainText.length === 0) {
        throw new Error('El texto a cifrar debe ser una cadena no vacía.');
    }

    const key = getKey();
    const iv  = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv, {
        authTagLength: TAG_LENGTH,
    });

    const encrypted = Buffer.concat([
        cipher.update(plainText, 'utf8'),
        cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    // Formato: iv:authTag:ciphertext
    return [
        iv.toString(ENCODING),
        tag.toString(ENCODING),
        encrypted.toString(ENCODING),
    ].join(':');
};

/**
 * Descifra un texto cifrado previamente con `encrypt`.
 * @param {string} encryptedText - Cadena con formato "iv:tag:ciphertext".
 * @returns {string} Texto plano original.
 */
export const decrypt = (encryptedText) => {
    if (typeof encryptedText !== 'string' || !encryptedText.includes(':')) {
        throw new Error('Formato de texto cifrado inválido. Se espera "iv:tag:ciphertext".');
    }

    const parts = encryptedText.split(':');
    if (parts.length !== 3) {
        throw new Error('Formato de texto cifrado inválido. Se esperan 3 partes separadas por ":".');
    }

    const [ivHex, tagHex, cipherHex] = parts;
    const key        = getKey();
    const iv         = Buffer.from(ivHex,    ENCODING);
    const tag        = Buffer.from(tagHex,   ENCODING);
    const cipherText = Buffer.from(cipherHex, ENCODING);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, {
        authTagLength: TAG_LENGTH,
    });

    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([
        decipher.update(cipherText),
        decipher.final(),
    ]);

    return decrypted.toString('utf8');
};

/**
 * Descifra un texto cifrado con el algoritmo antiguo de sustitución de caracteres.
 * @param {string} password - Texto cifrado con el método antiguo.
 * @returns {string} Texto plano original.
 */
export const deCipherOld = (password) => {
    if (password == null) return password;

    return String(password)
        .replace(/6E43/g, 'a')
        .replace(/778B/g, 'e')
        .replace(/8133/g, 'i')
        .replace(/9063/g, 'o')
        .replace(/A06B/g, 'u')
        .replace(/1C23/g, '1')
        .replace(/1D4C/g, '2')
        .replace(/1E7B/g, '3')
        .replace(/1FB0/g, '4')
        .replace(/20EB/g, '5')
        .replace(/222C/g, '6')
        .replace(/2373/g, '7')
        .replace(/24C0/g, '8')
        .replace(/2613/g, '9')
        .replace(/BA0C/g, '~')
        .replace(/17BB/g, '-')
        .replace(/15AB/g, '+')
        .replace(/276C/g, ':')
        .replace(/69C3/g, '_')
        .replace(/E5B/g,  '#')
        .replace(/3000/g, '@')
        .replace(/18CC/g, '.')
        .replace(/6E02/g, 'A')
        .replace(/7746/g, 'E')
        .replace(/80EA/g, 'I')
        .replace(/9014/g, 'O')
        .replace(/A016/g, 'U');
};

/**
 * Detecta si un texto ya está cifrado con el nuevo formato AES-256-GCM.
 * El formato nuevo es: "iv:tag:ciphertext" (tres partes separadas por ":")
 * donde cada parte es una cadena hexadecimal.
 * @param {string} text
 * @returns {boolean}
 */
const isNewCipher = (text) => {
    if (typeof text !== 'string') return false;
    const parts = text.split(':');
    return parts.length === 3 && parts.every(p => /^[0-9a-fA-F]+$/.test(p));
};

/**
 * Convierte un campo cifrado con el algoritmo antiguo al nuevo cifrado AES-256-GCM.
 * Si el campo ya está en el nuevo formato, lo devuelve sin cambios.
 * @param {string} data - Texto cifrado con el método antiguo (o ya migrado).
 * @returns {string} Texto cifrado con AES-256-GCM.
 */
export const toCipherNew = (data) => {
    if (data == null || data === '') return data;

    // Si ya tiene el formato nuevo, no hace falta migrar
    if (isNewCipher(data)) return data;

    const plainText    = deCipherOld(data);
    const newEncrypted = encrypt(plainText);
    return newEncrypted;
};

export default { encrypt, decrypt, deCipherOld, toCipherNew };
