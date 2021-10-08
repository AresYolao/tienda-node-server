const {Router} = require('express');
const { check } = require('express-validator');
const { getUsuario, putUsuario, postUsuario, deleteUsuario } = require('../controllers/usuario');
const { esRoleValido, existeCorreo, existeUsuarioById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.get('/', getUsuario);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('role').custom(esRoleValido),
    validarCampos
] ,putUsuario);

router.post('/',[
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('password').not().isEmpty().withMessage( 'El password es obligatorio').isLength({min:6}).withMessage('La contraseña debe contener mínimo 6 caracteres'),
check('correo','El correo no es válido').isEmail(),
check('correo').custom(existeCorreo),
// check('role','No es un role permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
check('role').custom(esRoleValido),
validarCampos]
,postUsuario);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
],deleteUsuario);



module.exports = router