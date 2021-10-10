const {Router} = require('express');
const { check } = require('express-validator');
const { postCategoria, getCategorias, getCategoria, putCategoria, deleteCategoria } = require('../controllers/categoria');
const { existeCategoriaById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');


const router = Router ();


router.get('/', getCategorias)


router.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], getCategoria)

router.post('/', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],postCategoria)

router.put('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], putCategoria)

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos],
   deleteCategoria
)



module.exports = router;