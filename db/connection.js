import  mongoose  from "mongoose";

export function connection(){
  mongoose.connect('mongodb://localhost:27017/grapgql').then(()=>{
    console.log('connectd to db')
  }).catch((err)=>{
    console.log("error")
  })
}