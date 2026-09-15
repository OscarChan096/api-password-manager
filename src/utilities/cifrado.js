/**
 * Utilidad de cifrado — re-exporta el servicio para uso directo.
 * Importa desde aquí para no acoplar los módulos al path del servicio.
 *
 * Uso:
 *   import { encrypt, decrypt } from '../utilities/cifrado';
 *
 *   const cifrado   = encrypt('mi contraseña');
 *   const original  = decrypt(cifrado);
 */

export { encrypt, decrypt, deCipherOld, toCipherNew, default as cifrado } from '../services/cifrado.service';
