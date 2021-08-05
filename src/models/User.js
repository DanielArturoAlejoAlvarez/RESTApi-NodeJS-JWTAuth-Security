import { Schema,model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    displayName: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        maxLength: 512
    },
    roles: [
        {
            ref: 'Role',
            type: Schema.Types.ObjectId
        }
    ],
    status: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async (password)=>{
    const salt = bcrypt.getSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password,receivePassword)=>{
    return await bcrypt.compare(password,receivePassword)
}

export default model('User', userSchema)