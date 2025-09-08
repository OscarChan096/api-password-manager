import { getConnection, querys, sql } from './../database';

// get
const getPwds = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.request().query(querys.getPwds);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getPING = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.request().query(querys.getPING);
        res.json(result.recordset);
        console.log("PING result:", result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection
            .request()
            .input('id', id)
            .query(querys.getById);
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const connection = await getConnection();
        const result = await connection
            .request()
            .input('title', title+"%")
            .query(querys.getByTitle);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getByUser = async (req, res) => {
    try {
        console.log("getByUser > ",req.params);
        const { user } = req.params;
        const connection = await getConnection();
        const result = await connection
            .request()
            .input('username', user+"%")
            .query(querys.getByUser);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getByNameBank = async (req, res) => {
    try {
        const { bank_name } = req.params;
        const connection = await getConnection();
        const result = await connection
            .request()
            .input('bank_name', bank_name)
            .query(querys.getByNameBank);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getCards = async (req, res) => {
    //console.log(req.params);
    try {
        const connection = await getConnection();
        const result = await connection
            .request()
            .query(querys.getCards);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getCardsById = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection
            .request()
            .input('id', id)
            .query(querys.getCardsByIdCards);
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getUAPWD = async (req, res) => {
    //console.log("req:",req.params);
    try {
        const { userpwd } = req.params;
        const connection = await getConnection();
        const result = await connection
            .request()
            .input('userpwd', userpwd)
            .query(querys.getUserAppPWD);
        res.json(result.recordset[0]);
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
        const connection = await getConnection();
        await connection
            .request()
            .input('title', sql.VarChar, TITLE)
            .input('username', sql.VarChar, USERNAME)
            .input('userpassword', sql.VarChar, USERPASSWORD)
            .input('fechmodif',sql.VarChar, FECHMODIF)
            .query(querys.addPwd);
        res.json({ TITLE, USERNAME, USERPASSWORD, FECHMODIF });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const addCard = async (req, res) => {
    const { account_number, date, cvv, nip, app_user_name, app_password, type, id_bank } = req.body;
    let id_bank_aux = id_bank;
    let type_aux = type;
    console.log(`# account: ${account_number} | date: ${date} | cvv: ${cvv} | nip: ${nip} | app_user_name: ${app_user_name} | app_password: ${app_password} | type: ${type} | id_bank: ${id_bank}********`);
    //if (bank_name == null || account_number == null || date == null || cvv == null || nip == null) {
    if (account_number == null || date == null || cvv == null || nip == null) {
        return res.status(400).json({ msg: 'Bad request.' });
    }

    if (type_aux == "" || type_aux.length == 0) type_aux = 1;

    if (id_bank_aux == "" || id_bank_aux.length == 0) id_bank_aux = 1;

    try {
        const connection = await getConnection();
        await connection
            .request()
            //.input('bank_name', sql.VarChar, bank_name)
            .input('account_number', sql.VarChar, account_number)
            .input('date', sql.VarChar, date)
            .input('cvv', sql.VarChar, cvv)
            .input('nip', sql.VarChar, nip)
            .input('app_user_name', sql.VarChar, app_user_name)
            .input('app_password', sql.VarChar, app_password)
            .input('type', sql.Int, parseInt(type_aux))
            .input('id_bank', sql.Int, parseInt(id_bank_aux))
            .query(querys.addCard);
        res.json({ account_number, date, cvv, nip, app_user_name, app_password, type, id_bank })
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log("Error in addCard:", error.message);
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
        const connection = await getConnection();
        await connection
        .request()
        .input('id',id)
        .input('title',sql.VarChar,TITLE)
        .input('username',sql.VarChar,USERNAME)
        .input('userpassword',sql.VarChar,USERPASSWORD)
        .input('fechmodif',sql.VarChar,FECHMODIF)
        .query(querys.updatePwd);
        res.json({TITLE,USERNAME,USERPASSWORD,FECHMODIF});
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
    console.log(`********** account: ${account_number} | date: ${date} | cvv: ${cvv} | nip: ${nip} | app_user_name: ${app_user_name} | app_password: ${app_password} | type: ${type} | id_bank: ${id_bank}********`);
    if (account_number == null || date == null || cvv == null || nip == null) {
        return res.status(400).json({ msg: 'Bad request.' });
    }

    if (type_aux == "" || type_aux.length == 0) type_aux = 1;

    if (id_bank_aux == "" || id_bank_aux.length == 0) id_bank_aux = 1;

    try {
        const connection = await getConnection();
        await connection
            .request()
            .input('id',id)
            // .input('bank_name', sql.VarChar, bank_name)
            .input('account_number', sql.VarChar, account_number)
            .input('date', sql.VarChar, date)
            .input('cvv', sql.VarChar, cvv)
            .input('nip', sql.VarChar, nip)
            .input('app_user_name', sql.VarChar, app_user_name)
            .input('app_password', sql.VarChar, app_password)
            .input('type', sql.Int, parseInt(type_aux))
            .input('id_bank', sql.Int, parseInt(id_bank_aux))
            .query(querys.updateCard);
        res.json({ account_number, date, cvv, nip, app_user_name, app_password, type, id_bank})
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
        const connection = await getConnection();
        const result = await connection
        .request()
        .input('id',id)
        .query(querys.deletePwd);
        
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
        const connection = await getConnection();
        const result = await connection
        .request()
        .input('id',id)
        .query(querys.deleteCards);
        
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
    addPwd,
    addCard,
    updatePwd,
    updateCard,
    deletePwd,
    deleteCard
}