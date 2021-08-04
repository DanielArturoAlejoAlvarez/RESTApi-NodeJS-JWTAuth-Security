import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'

const app = express()

app.set('pkg',pkg)

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(morgan("dev"))

app.get('/', (req,res)=>{
    return res.json({
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        author: app.get('pkg').author,
        version: app.get('pkg').version,
        github: app.get('pkg').repository.url,
        msg: 'WELCOME TO MY REST API'
    })
})

export default app