import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(morgan("dev"))

app.get('/', (req,res)=>{
    return res.json({
        msg: 'WELCOME TO MY REST API'
    })
})

export default app