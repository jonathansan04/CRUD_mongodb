import mongoose from 'mongoose'

export const connectDB = async() =>{
    try {
        await mongoose.connect('mongodb://localhost/pruebacrud');
        console.log("Base conectada")
    } catch (error){
        console.log(error);
    }
};