import { date } from "zod";
import Bovinos from "../models/bovinos.model.js";
import * as fs from 'fs'


export const createBovinos = async (req,res) =>{
    try {

     /*   const nacimientoDate = new Date(req.body.nacimiento);

        // Verificar si la fecha es válida
        if (isNaN(nacimientoDate.getTime())) {
            console.log("Murio aqui)")
            return res.status(400).json({ message: 'Fecha de nacimiento no válida.' });
        }*/
    const newBovino = new Bovinos({
        nombre: req.body.nombre,
        nacimiento: req.body.nacimiento,
        raza: req.body.raza,
        genero: req.body.genero,
        descripcion: req.body.descripcion,
        peso: req.body.peso,
        madre: req.body.madre,
        padre: req.body.padre,
        imagen: req.file.filename,
    })
    console.log(req.body);
    
    const savedBovino = await newBovino.save();
    res.json(savedBovino)
} catch (err) {

    console.log("Aca esta fallando",err)
    res.status(500).json({ message: err.message });
    console.log(res.status(500).json({ message: err.message }))
}
};


// Obtener imágenes
export const getBovino = async (req, res) => {
    const {genero} = req.query;
    try {
      /*  const query = {};
        if (genero) {
          query.genero = genero; // Filtrar por género si se especifica
          const bovinos = await Bovinos.find(query); // Buscar en la base de datos con el filtro
          res.json(bovinos);
        }else{
            const {id} = req.params
        const rows = (id === undefined) ? await Bovinos.find() : await Bovinos.findById(id)
        return res.status(200).json({ data: rows})
        } */
       // const images = await Image.find();
        //res.json(images);
        const { id } = req.params;
        if (id) {
            const bovino = await Bovinos.findById(id);
            if (!bovino) {
                return res.status(404).json({ status: false, message: 'Bovino no encontrado' });
            }
            return res.status(200).json({ data: bovino });
        }
        // Filtrar por género si se especifica
        const query = {};
        if (genero) {
            query.genero = genero; // Agregar el filtro de género
        }
        // Buscar en la base de datos con el filtro
        const bovinos = await Bovinos.find(query);
        return res.status(200).json(bovinos);
        

    } catch (err) {
        return res.status(500).json({status:false, errors:[ err.message] });
    }
};

export const updateBovinos = async (req,res) =>{
    const {id} = req.params
    const updatedData =({
        nombre: req.body.nombre,
        nacimiento: req.body.nacimiento ? new Date(req.body.nacimiento) : undefined,
        raza: req.body.raza,
        genero: req.body.genero,
        descripcion: req.body.descripcion,
        peso: req.body.peso,
        madre: req.body.madre,
        padre: req.body.padre,
        imagen: req.file ? req.file.filename : undefined
    })
    try{
        
        const updatedProduct = await Bovinos.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Bovino no encontrado' });
        }
        res.json(updatedProduct);
    
    }
    catch(error){
        console.error('Error al actualizar el bovino:', error);
        return res.status(500).json({status:false, errors:[ error.message] });
    }
    
};

export const deleteBovinos = async (req,res) =>{
    try{
        const {id} = req.params
       await eliminarimagen(id)
        await  Bovinos.findByIdAndDelete(req.params.id)
        return res.status(200).json({message : "Bovino eliminado"})
  //  return res.sendStatus(204);
    } catch(error) {
        return res.status(500).json({status:false, errors:[ error.message] });

    }
    
};

const eliminarimagen = async(id) =>{
const bovino = await Bovinos.findById(id)
const img = bovino.imagen
fs.unlinkSync('./uploads/'+img)
}