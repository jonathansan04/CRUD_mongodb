import mongoose  from "mongoose";

const bovinosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    nacimiento:{
        type: Date,
        required:true, },
    raza:{
        type: String,
        required:true,
    },
    genero:{
        type: String,
        required:true,
    },
    descripcion:{
        type: String,
        required:true,
    },
    peso:{
        type: String,
        required:true,
    },
    madre:{
        type: String,
        required:true,

    },
    padre:{
        type: String,
        required:true,
    
    },
    imagen: {
        type: String,
        required: [true, "La imagen es requerida"], 
       // validate: {
       // validator: function(v) {
                // 🌐 Validar que la imagen sea una URL válida
        //        return /^(ftp|http|https):\/\/[^ "]+$/.test(v); 
        //    },
        //    message: props => `${props.value} no es una URL válida!` 
       // },
    }
},{
    timestamps: true
})

export default mongoose.model( "Bovinos", bovinosSchema);