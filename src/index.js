import './database'
import { keyENV as config } from './config/config'
import app from './app'

app.listen(config.port)
console.log('Server running in port: ',config.port)