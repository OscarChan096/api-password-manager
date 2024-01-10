export const querys = {
    // metodos get
    getPwds: 'SELECT * FROM dataPass',
    getById: 'SELECT * FROM dataPass WHERE id = @id',
    getByTitle: 'SELECT * FROM dataPass WHERE title LIKE @title',
    getByUser: 'SELECT * FROM dataPass WHERE username LIKE @username',
    getByNameBank: 'SELECT * FROM dataCards WHERE NAMEBANK LIKE @bank_name',
    getCards: 'SELECT * FROM dataCards',
    getCardsByIdCards: 'SELECT * FROM dataCards WHERE id = @id',
    getUserAppPWD: 'SELECT * FROM credenciales WHERE userpwd LIKE @userpwd',

    // metodos post
    addPwd:
        'INSERT INTO dataPass (title,username,userpassword,fechmodif) VALUES (@title,@username,@userpassword,@fechmodif)',
    addCard:
        'INSERT INTO dataCards (bank_name,account_number,date,cvv,nip,app_user_name,app_password,type) VALUES (@bank_name,@account_number,@date,@cvv,@nip,@app_user_name,@app_password,@type)',
    addUserAppPWD: 'INSERT INTO credenciales (userpwd,passpwd) VALUES(@userpwd,@passpwd)',

    // metodos put
    updatePwd:
        'UPDATE dataPass SET title = @title, username = @username, userpassword = @userpassword, fechmodif = @fechmodif WHERE id = @id',
    updateCard:
        'UPDATE dataCards SET bank_name = @bank_name, account_number = @account_number, date = @date, cvv = @cvv, nip = @nip, app_user_name = @app_user_name, app_password = @app_password, type = @type WHERE id = @id',
    updateUserAppPWD: 'UPDATE credenciales SET userpwd = @userpwd, passpwd = @passpwd WHERE id = @id',
    
    deletePwd: 'DELETE FROM dataPass WHERE id = @id',
    deleteCards: 'DELETE FROM dataCards WHERE id = @id',
    delUserAppPWD: 'DELETE FROM credenciales WHERE id = @id'
}