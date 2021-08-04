import {Router} from 'express'

const router = Router() 

import { getUsers, getUser } from '../controllers/user.controllers'

router.get('/', getUsers)
router.get('/:idUser', getUser)

export default router