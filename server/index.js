import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answer.js'
import subRoutes from './routes/subscribe.js'

const app = express();
dotenv.config()
app.use(express.json({limit:'30mb',extended: true}))
app.use(express.urlencoded({limit:"30mb", extended: true}))


app.use(cors())

app.get('/',(req,res) => {
    res.send("This is a stack overflow clone API")
})

app.use('/user',userRoutes)
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)
app.use('/subscribe',subRoutes)

const PORT =process.env.PORT || 5000 

const CONNECTION_URL = "mongodb+srv://Pradeep:aspd1234@cluster0.10dup2i.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology :true})
.then(()=>app.listen(PORT, () => {console.log(`server running on port on ${PORT}`)}))
.catch((err)=> console.log(err.message));
