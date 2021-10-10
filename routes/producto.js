const {Router} = require('express');
const { check } = require('express-validator');
const { getProductos, getProducto, postProducto, putProducto, deleteProducto } = require('../controllers/producto');
const {  existeCategoriaById,existeProductoById, existeCodigoBarras } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');


const router = Router ();


router.get('/', getProductos)


router.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
], getProducto)

router.post('/', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID valido').isMongoId(),
    check('categoria').custom(existeCategoriaById),
    check('codigoBarras').custom(existeCodigoBarras),
    validarCampos
],postProducto)

router.put('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoById),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID valido').isMongoId(),
    check('categoria').custom(existeCategoriaById),
    validarCampos
], putProducto)

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos],
   deleteProducto
)



module.exports = router;