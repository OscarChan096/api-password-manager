import {Router} from 'express';
import {methods as pwdController} from './../controllers/pwd.controller';

const router = Router();

// get data
router.get('/',pwdController.getPwds);
router.get('/:id',pwdController.getById);
router.get('/title/:title',pwdController.getByTitle);
router.get('/user/:user',pwdController.getByUser);
router.get('/bank/card/:name',pwdController.getByNameBank);
router.get('/bank/cards',pwdController.getCards);
router.get('/bank/card/:id',pwdController.getCardsById);
router.get('/uapwd/:userpwd',pwdController.getUAPWD);

// add data
router.post('/',pwdController.addPwd);
router.post('/bank/card',pwdController.addCard);

// update data
router.put('/:id',pwdController.updatePwd);
router.put('/bank/card/:id',pwdController.updateCard);

// delete data
router.delete('/:id',pwdController.deletePwd);
router.delete('/bank/card/:id',pwdController.deleteCard);

export default router;