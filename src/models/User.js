import { Schema,model } from 'mongoose'

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

export default model('User', userSchema)