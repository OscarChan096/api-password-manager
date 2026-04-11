let schema = process.env.DB_SCHEMA || 'public'

export const querys = {
    // metodos get
    getPwds: 'SELECT * FROM ' + schema + '.dataPass',
    getById: 'SELECT * FROM ' + schema + '.dataPass WHERE id = $1',
    getByTitle: 'SELECT * FROM ' + schema + '.datapass WHERE title LIKE $1',
    getByUser: 'SELECT * FROM ' + schema + '.datapass WHERE username LIKE $1',
    getByNameBank: 'SELECT * FROM ' + schema + '.dataCards WHERE NAMEBANK LIKE $1',
    getCards: 'SELECT * FROM ' + schema + '.dataCards',
    getCardsByIdCards: 'SELECT * FROM ' + schema + '.dataCards WHERE id = $1',
    getUserAppPWD: 'SELECT * FROM ' + schema + '.credenciales WHERE userpwd LIKE $1',
    getPING: 'SELECT * FROM ' + schema + '.ping_test',
    getEstatusPWD: 'SELECT * FROM ' + schema + '.estatusPWD',

    // metodos post
    addPwd:
        'INSERT INTO ' + schema + '.dataPass (title,username,userpassword,fechmodif) VALUES ($1,$2,$3,$4)',
    addCard:
        'INSERT INTO ' + schema + '.dataCards (account_number,date,cvv,nip,app_user_name,app_password,type,id_bank) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
    addUserAppPWD: 'INSERT INTO ' + schema + '.credenciales (userpwd,passpwd) VALUES($1,$2)',
    addEstatusPWD: 'INSERT INTO ' + schema + '.estatusPWD (id_pwd,nuevo,actualizado,eliminado) VALUES($1,$2,$3,$4)',

    // metodos put
    updatePwd:
        'UPDATE ' + schema + '.dataPass SET title = $1, username = $2, userpassword = $3, fechmodif = $4 WHERE id = $5',
    updateCard:
        'UPDATE ' + schema + '.dataCards SET id_bank = $1, account_number = $2, date = $3, cvv = $4, nip = $5, app_user_name = $6, app_password = $7, type = $8 WHERE id = $9',
    updateUserAppPWD: 'UPDATE ' + schema + '.credenciales SET userpwd = $1, passpwd = $2 WHERE id = $3',
    updateEstatusPWDn: 'UPDATE ' + schema + '.estatusPWD SET nuevo = $1 WHERE id_pwd = $2',
    updateEstatusPWDa: 'UPDATE ' + schema + '.estatusPWD SET actualizado = $1 WHERE id_pwd = $2',
    updateEstatusPWDe: 'UPDATE ' + schema + '.estatusPWD SET eliminado = $1 WHERE id_pwd = $2',

    deletePwd: 'DELETE FROM ' + schema + '.dataPass WHERE id = $1',
    deleteCards: 'DELETE FROM ' + schema + '.dataCards WHERE id = $1',
    delUserAppPWD: 'DELETE FROM ' + schema + '.credenciales WHERE id = $1',
    deleteEstatusPWD: 'DELETE FROM ' + schema + '.estatusPWD WHERE ID_PWD = $1'
}