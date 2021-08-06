import { ROLES } from '../models/Role'

export const checkRolesExists = (req,res,next)=>{
    const arrayRoles = req.body.roles

    if (req.body.roles) {
        for (let i = 0; i < arrayRoles.length; i++) {
            if (!ROLES.includes(arrayRoles[i])) {
                return res.status(401).json({
                    msg: `Role ${arrayRoles[i]} does not exixts!`
                })
            }            
        }
    }

    next()
}