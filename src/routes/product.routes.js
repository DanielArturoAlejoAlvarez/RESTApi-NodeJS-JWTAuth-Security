import {Router} from 'express'

const router = Router()

import { getProduct, getProducts, saveProduct, updateProduct, deleteProduct } from '../controllers/product.controllers'

router.get('/', getProducts)
router.get('/:idProduct', getProduct)
router.post('/', saveProduct)
router.put('/:idProduct', updateProduct)
router.delete('/:idProduct', deleteProduct)

export default router