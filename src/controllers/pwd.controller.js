import { parse } from 'dotenv';
import { pool, querys } from './../database';

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

// post
const addPwd = async (req, res) => {
    //console.log("REQ:",req);
    const { TITLE, USERNAME, USERPASSWORD, FECHMODIF } = req.body;

    if (TITLE == null || USERPASSWORD == null) {
        return res.status(400).json({ msg: 'Bad request.' });
    }

    try {
        let result = await pool.query(querys.addPwd, [TITLE, USERNAME, USERPASSWORD, FECHMODIF]);
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
        let result = await pool.qyery(querys.addEstatusPWD, [ID_PWD, NUEVO, ACTUALIZADO, ELIMINADO]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

// put
const updatePwd = async (req,res) => {
    const {id} = req.params;
    const {TITLE,USERNAME,USERPASSWORD,FECHMODIF} = req.body;
    if (TITLE == null || USERPASSWORD == null) {
        return res.status(400).json({ msg: 'Bad request.' });
    }

    try{
        let result = await pool.query(querys.updatePwd, [TITLE, USERNAME, USERPASSWORD, FECHMODIF, id]);
        res.json(result.rows[0]);
    }catch (error){
        res.status(500);
        res.send(error.message);
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
        
        if(result.rowsAffected[0] === 0) return res.sendStatus(400);
        return res.sendStatus(204);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const deleteCard = async (req,res) =>{
    try{
        const { id } = req.params;
        const result = await pool.query(querys.deleteCard, [id]);
        
        if(result.rowsAffected[0] === 0) return res.sendStatus(400);
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
        
        if(result.rowsAffected[0] === 0) return res.sendStatus(400);
        return res.sendStatus(204);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

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
    deleteEstatusPWDByIdPWD
}