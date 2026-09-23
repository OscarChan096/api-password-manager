import { parse } from 'dotenv';
import { pool, querys } from './../database';
import { encrypt, decrypt, toCipherNew } from '../utilities/cifrado';

// get
const getPwds = async (req, res) => {
    try {
        const result = await pool.query(querys.getPwds);
        res.json(result.rows);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getPING = async (req, res) => {
    try {
        const result = await pool.query(querys.getPING);
        res.json(result.rows);
        console.log("PING result:", result.rows);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


const getById = async (req, res) => {
    try {
        console.log("getById > ",req.params);
        const { id } = req.params;
        const result = await pool.query(querys.getById, [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const result = await pool.query(querys.getByTitle, [title + "%"]);
        res.json(result.rows);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getByUser = async (req, res) => {
    try {
        console.log("getByUser > ",req.params);
        const { user } = req.params;
        const result = await pool.query(querys.getByUser, [user + "%"]);
        res.json(result.rows);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getByNameBank = async (req, res) => {
    try {
        const { bank_name } = req.params;
        const result = await pool.query(querys.getByNameBank, [bank_name + "%"]);
        res.json(result.rows);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getCards = async (req, res) => {
    //console.log(req.params);
    try {
        const result = await pool.query(querys.getCards);
        res.json(result.rows);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getCardsById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(querys.getCardsByIdCards, [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getUAPWD = async (req, res) => {
    //console.log("req:",req.params);
    try {
        const { userpwd } = req.params;
        const result = await pool.query(querys.getUserAppPWD, [userpwd]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getEstatusPWD = async (req, res) => {
    try {
        const result = await pool.query(querys.getEstatusPWD);
        res.json(result.rows);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const cipher = (req, res) => {
    try{
        //console.log('req: ',req.query);
        const {data, tipo} = req.query;
        if(tipo === '0'){
            res.json(encrypt(data));
        }

        if(tipo === '1'){
            res.json(decrypt(data));
        }
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

// post
const addPwd = async (req, res) => {
    //console.log("REQ:",req.body);
    const { title, username, userpassword, fechmodif } = req.body;

    if (title == null || userpassword == null) {
        return res.status(400).json({ msg: 'complete los campos obligatorios' });
    }

    try {
        const titleLower = title.toLowerCase();
        let result = await pool.query(querys.addPwd, [titleLower, username, userpassword, fechmodif]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const addCard = async (req, res) => {
    const { account_number, date, cvv, nip, app_user_name, app_password, type, id_bank } = req.body;
    let id_bank_aux = id_bank;
    let type_aux = type;
    //console.log(`# account: ${account_number} | date: ${date} | cvv: ${cvv} | nip: ${nip} | app_user_name: ${app_user_name} | app_password: ${app_password} | type: ${type} | id_bank: ${id_bank}********`);
    if (account_number == null || date == null || cvv == null || nip == null) {
        return res.status(400).json({ msg: 'Bad request.' });
    }

    if (type_aux == "" || type_aux.length == 0) type_aux = 1;

    if (id_bank_aux == "" || id_bank_aux.length == 0) id_bank_aux = 1;

    try {
        let result = await pool.query(querys.addCard, [account_number, date, cvv, nip, app_user_name, app_password, parseInt(type_aux), parseInt(id_bank_aux)]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log("Error in addCard:", error.message);
    }
}

const addEstatusPWD = async (req, res) => {
    console.log("REQ:",req.body);
    const { ID_PWD, NUEVO, ACTUALIZADO, ELIMINADO } = req.body;

    try {
        let result = await pool.query(querys.addEstatusPWD, [ID_PWD, NUEVO, ACTUALIZADO, ELIMINADO]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

// put
const updatePwd = async (req,res) => {
    const {id} = req.params;
    const {title, username, userpassword, fechmodif} = req.body;
    console.log(`req.body: ${JSON.stringify(req.body)}`);
    if (title == null || userpassword == null) {
        return res.status(400).json({ msg: 'Bad request.' });
    }

    try{
        let result = await pool.query(querys.updatePwd, [title, username, userpassword, fechmodif, id]);
        res.json(result.rows[0]);
    }catch (error){
        res.status(500);
        res.send(error.message);
        console.log("Error in updatePwd:", error.message);
    }
}

const updateCard = async (req,res) => {
    const {id} = req.params;
    const { account_number, date, cvv, nip, app_user_name, app_password, type, id_bank } = req.body;
    let id_bank_aux = id_bank;
    let type_aux = type;
    //console.log(`********** account: ${account_number} | date: ${date} | cvv: ${cvv} | nip: ${nip} | app_user_name: ${app_user_name} | app_password: ${app_password} | type: ${type} | id_bank: ${id_bank}********`);
    if (account_number == null || date == null || cvv == null || nip == null) {
        return res.status(400).json({ msg: 'Bad request.' });
    }

    if (type_aux == "" || type_aux.length == 0) type_aux = 1;

    if (id_bank_aux == "" || id_bank_aux.length == 0) id_bank_aux = 1;

    try {
        let result = await pool.query(querys.updateCard, [parseInt(id_bank_aux),account_number, date, cvv, nip, app_user_name, app_password, parseInt(type_aux), parseInt(id)]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log("Error in updateCard:", error.message);
    }
}

// delete
const deletePwd = async (req,res) =>{
    try{
        const { id } = req.params;
        const result = await pool.query(querys.deletePwd, [id]);
        
        if(result.rowCount === 0) return res.sendStatus(400);
        return res.sendStatus(204);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const deleteCard = async (req,res) =>{
    try{
        const { id } = req.params;
        const result = await pool.query(querys.deleteCards, [id]);
        
        if(result.rowCount === 0) return res.sendStatus(400);
        return res.sendStatus(204);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const deleteEstatusPWDByIdPWD = async (req,res) =>{
    try{
        console.log("deleteEstatusPWD > ",req.params);
        const { idpwd } = req.params;
        const result = await pool.query(querys.deleteEstatusPWD, [idpwd]);
        
        if(result.rowCount === 0) return res.sendStatus(400);
        return res.sendStatus(204);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Migra todos los registros de dataPass y dataCards del cifrado antiguo
 * (sustitución de caracteres) al nuevo cifrado AES-256-GCM.
 *
 * Llamar una sola vez via: POST /api/pwd/migrate/encryption
 * Los campos que ya estén en el nuevo formato son omitidos sin tocarse.
 */
const migrateEncryption = async (req, res) => {
    const results = {
        dataPass: { migrated: 0, skipped: 0, errors: [] },
        dataCards: { migrated: 0, skipped: 0, errors: [] },
    };

    try {
        // ── dataPass ─────────────────────────────────────────────────────────
        const passwdRows = await pool.query(querys.getPwds);

        for (const row of passwdRows.rows) {
            try {
                const newUsername     = toCipherNew(row.username);
                const newUserPassword = toCipherNew(row.userpassword);

                // toCipherNew devuelve el mismo valor si ya está migrado
                if (newUsername === row.username && newUserPassword === row.userpassword) {
                    results.dataPass.skipped++;
                    continue;
                }

                await pool.query(querys.updatePwd, [
                    row.title,
                    newUsername,
                    newUserPassword,
                    row.fechmodif,
                    row.id,
                ]);
                results.dataPass.migrated++;
            } catch (err) {
                results.dataPass.errors.push({ id: row.id, error: err.message });
            }
        }

        // ── dataCards ─────────────────────────────────────────────────────────
        const cardRows = await pool.query(querys.getCards);

        for (const row of cardRows.rows) {
            try {
                const newCvv         = toCipherNew(row.cvv);
                const newNip         = toCipherNew(row.nip);
                const newAppPassword = toCipherNew(row.app_password);

                const alreadyMigrated =
                    newCvv         === row.cvv &&
                    newNip         === row.nip &&
                    newAppPassword === row.app_password;

                if (alreadyMigrated) {
                    results.dataCards.skipped++;
                    continue;
                }

                await pool.query(querys.updateCard, [
                    row.id_bank,
                    row.account_number,
                    row.date,
                    newCvv,
                    newNip,
                    row.app_user_name,
                    newAppPassword,
                    row.type,
                    row.id,
                ]);
                results.dataCards.migrated++;
            } catch (err) {
                results.dataCards.errors.push({ id: row.id, error: err.message });
            }
        }

        const hasErrors =
            results.dataPass.errors.length > 0 ||
            results.dataCards.errors.length > 0;

        return res.status(hasErrors ? 207 : 200).json({
            message: hasErrors
                ? 'Migración completada con algunos errores.'
                : 'Migración completada exitosamente.',
            results,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const methods = {
    getPwds,
    getById,
    getByTitle,
    getByUser,
    getByNameBank,
    getCards,
    getCardsById,
    getUAPWD,
    getPING,
    getEstatusPWD,
    addPwd,
    addCard,
    addEstatusPWD,
    updatePwd,
    updateCard,
    deletePwd,
    deleteCard,
    deleteEstatusPWDByIdPWD,
    cipher,
    migrateEncryption,
}