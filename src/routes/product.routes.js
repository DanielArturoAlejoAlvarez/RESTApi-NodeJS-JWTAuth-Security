import {Router} from 'express'
import { verifyToken } from '../middlewares/Authentication'
import { isSuperAdmin, isAdmin } from '../middlewares/PermissionsLevel'

const router = Router()

import { getProduct, getProducts, saveProduct, updateProduct, deleteProduct } from '../controllers/product.controllers'

router.get('/', getProducts)
router.get('/:idProduct', getProduct)
router.post('/',[verifyToken,isAdmin,isSuperAdmin], saveProduct)
router.put('/:idProduct',[verifyToken,isSuperAdmin], updateProduct)
router.delete('/:idProduct',[verifyToken,isSuperAdmin], deleteProduct)

export default router