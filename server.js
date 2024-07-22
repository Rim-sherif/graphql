import express from 'express';
import { createHandler } from 'graphql-http';
import { connection } from './db/connection.js';
import { schema } from './schema/schema.js';
import playground from 'graphql-playground-middleware-express'



const expressPlayground = playground.default
const app = express()
const port = 3000

app.use(express.json())
app.get('/playground', expressPlayground({endpoint:"/graphql"}))



connection()

app.use('/graphql', createHandler({schema}));

app.use("*",(req,res,next)=>{
    next(new AppError("url not found",404))
})




app.listen(process.env.PORT || port,()=> console.log(`server is run ${port}`))