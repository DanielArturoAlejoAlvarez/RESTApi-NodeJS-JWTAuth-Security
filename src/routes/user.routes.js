import {Router} from 'express'

const router = Router() 

import { getUsers, getUser, saveUser, updateUser, deleteUser } from '../controllers/user.controllers'

router.get('/', getUsers)
router.get('/:idUser', getUser)
router.post('/', saveUser)
router.put('/:idUser', updateUser)
router.delete('/:idUser', deleteUser)

export default router