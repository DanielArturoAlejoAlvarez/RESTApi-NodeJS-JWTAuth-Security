import {Router} from 'express'

const router = Router()

import { getProduct, getProducts } from '../controllers/product.controllers'

router.get('/', getProducts)
router.get('/:idProduct', getProduct)

export default router