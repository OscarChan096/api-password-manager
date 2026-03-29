export const querys = {
    // metodos get
    getPwds: 'SELECT * FROM dataPass',
    getById: 'SELECT * FROM dataPass WHERE id = $1',
    getByTitle: 'SELECT * FROM dataPass WHERE title LIKE $1',
    getByUser: 'SELECT * FROM dataPass WHERE username LIKE $1',
    getByNameBank: 'SELECT * FROM dataCards WHERE NAMEBANK LIKE $1',
    getCards: 'SELECT * FROM dataCards',
    getCardsByIdCards: 'SELECT * FROM dataCards WHERE id = $1',
    getUserAppPWD: 'SELECT * FROM credenciales WHERE userpwd LIKE $1',
    getPING: 'SELECT * FROM ping_test',
    getEstatusPWD: 'SELECT * FROM estatusPWD',

    // metodos post
    addPwd:
        'INSERT INTO dataPass (title,username,userpassword,fechmodif) VALUES ($1,$2,$3,$4)',
    addCard:
        'INSERT INTO dataCards (account_number,date,cvv,nip,app_user_name,app_password,type,id_bank) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
    addUserAppPWD: 'INSERT INTO credenciales (userpwd,passpwd) VALUES($1,$2)',
    addEstatusPWD: 'INSERT INTO estatusPWD (id_pwd,nuevo,actualizado,eliminado) VALUES($1,$2,$3,$4)',

    // metodos put
    updatePwd:
        'UPDATE dataPass SET title = $1, username = $2, userpassword = $3, fechmodif = $4 WHERE id = $5',
    updateCard:
        'UPDATE dataCards SET id_bank = $1, account_number = $2, date = $3, cvv = $4, nip = $5, app_user_name = $6, app_password = $7, type = $8 WHERE id = $9',
    updateUserAppPWD: 'UPDATE credenciales SET userpwd = $1, passpwd = $2 WHERE id = $3',
    updateEstatusPWDn: 'UPDATE estatusPWD SET nuevo = $1 WHERE id_pwd = $2',
    updateEstatusPWDa: 'UPDATE estatusPWD SET actualizado = $1 WHERE id_pwd = $2',
    updateEstatusPWDe: 'UPDATE estatusPWD SET eliminado = $1 WHERE id_pwd = $2',
    
    deletePwd: 'DELETE FROM dataPass WHERE id = $1',
    deleteCards: 'DELETE FROM dataCards WHERE id = $1',
    delUserAppPWD: 'DELETE FROM credenciales WHERE id = $1',
    deleteEstatusPWD: 'DELETE FROM estatusPWD WHERE ID_PWD = $1'
}