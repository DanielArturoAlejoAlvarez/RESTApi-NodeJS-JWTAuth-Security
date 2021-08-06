import {Router} from 'express'

const router = Router() 

import { getUsers, getUser, saveUser, updateUser, deleteUser } from '../controllers/user.controllers'
import { verifyToken } from '../middlewares/Authentication'
import { isSuperAdmin, isAdmin } from '../middlewares/PermissionsLevel'
import { checkRolesExists } from '../middlewares/CheckSignUp'

router.get('/', getUsers)
router.get('/:idUser', getUser)
router.post('/', [
    verifyToken,
    isSuperAdmin,
    isAdmin,
    checkRolesExists
], saveUser)
router.put('/:idUser', updateUser)
router.delete('/:idUser', deleteUser)

export default router