import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css'

function App() {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [valores, setValores] = useState([]);
    const [editarBovinos, seteditarBovinos ] = useState(null);
    const [genero, setGenero] = useState('');


    const getBovinos = async () => {
        try {
            const response = await axios.get('http://localhost:4000/crud/bovinos',{
                params: { genero}, 
            });
            console.log("aqui", response.data);
           //setValores(response.data);
           const bovinosConFechasFormateadas = response.data.map(bovino => {
            const fechaNacimientoLocal = new Date(bovino.nacimiento);
            //fechaNacimientoLocal.setHours(0, 0, 0, 0);
            fechaNacimientoLocal.setHours(fechaNacimientoLocal.getHours() + 5);
            return {
                ...bovino,
                fechaNacimiento: fechaNacimientoLocal.toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })
            };
        });

        setValores(bovinosConFechasFormateadas);
        console.log("fecha", bovinosConFechasFormateadas);
        } catch (error) {
            console.error('Error fetching valores:', error);
            setValores([]); // Restablecer a un array vacío en caso de error
        }
    };

    
    const deleteBovinos = async (id) => {
        await axios.delete(`http://localhost:4000/crud/bovinos/${id}`);
        getBovinos();
    };

    const editaBovino = (bovino) => {
        setValue('nombre', bovino.nombre);
        const fechaNacimiento = new Date(bovino.nacimiento).toISOString().split('T')[0];
        setValue('nacimiento', fechaNacimiento);
        setValue('raza', bovino.raza);
        setValue('genero', bovino.genero);
        setValue('descripcion', bovino.descripcion);
        setValue('peso', bovino.peso);
        setValue('madre', bovino.madre);
        setValue('padre', bovino.padre);
        setValue('imagen', bovino.imagen); 
        seteditarBovinos(bovino); 
    };

    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append('nombre', data.nombre);
        const fechaNacimiento = new Date(data.nacimiento);
        console.log('Fecha convertida:', fechaNacimiento );
        formData.append('nacimiento', fechaNacimiento.toISOString());
        formData.append('raza', data.raza);
        formData.append('genero', data.genero);
        formData.append('descripcion', data.descripcion);
        formData.append('peso', data.peso);
        formData.append('madre', data.madre);
        formData.append('padre', data.padre);
        formData.append('imagen', data.imagen[0]);
         
        console.log('Datos enviados:', Array.from(formData.entries())); // Imprime los datos

        try {
            if (editarBovinos ) {
                // Si estamos editando, hacemos una PUT
                const response = await axios.put(`http://localhost:4000/crud/bovinos/${editarBovinos._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Bovino editado:', response.data);
            } else {
            const response = await axios.post('http://localhost:4000/crud/bovinos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Archivo subido:', response.data);
        }
            getBovinos(); // Actualiza la lista después de registrar
            seteditarBovinos(null);
            reset();
        } catch (error) {
            console.error('Error al subir archivo:', error);
        }
    };

    

    const consultarfiltro =() =>{
       // setGenero('Macho');  Establecer el género a "macho"
        getBovinos();
    }


    return (
        <div>

            <div className="container mt-5">
            <div className="card">
            <div className="card-header ">
            <h4>{editarBovinos ? 'Actualizar Bovino' : 'Registrar Bovino'}</h4>
            </div>
            <div className="card-body fondo">
            <form onSubmit={handleSubmit(onSubmit)}  className="row g-3 container">

                
            <div className=" d-flex">
            <div className="input-group me-3 ">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input className="form-control " aria-label="Username" aria-describedby="basic-addon1" type="text" {...register('nombre', { required: true })} placeholder="Nombre" />
            </div>
            
            <div className="input-group ">
            <span className="input-group-text ms-4" id="basic-addon1">Fecha de nacimiento</span>
            <input className="form-control" aria-label="Username" aria-describedby="basic-addon1" type="date" {...register('nacimiento', { required: true })} placeholder="Fecha de nacimiento" />
            </div>
            </div>

           
            <div className=" d-flex">
            <div className="input-group me-3 ">
            <span className="input-group-text" id="basic-addon1">Raza</span>
            <input className="form-control " aria-label="Username" aria-describedby="basic-addon1" type="text" {...register('raza', { required: true })} placeholder="Raza" />
            </div>
            
            <div className="input-group ">
            <span className="input-group-text ms-4" id="basic-addon1">Sexo</span>
            <select className="form-control" aria-label="Username" aria-describedby="basic-addon1" type="text" {...register('genero', { required: true })} placeholder="Sexo"  onChange={(e) => setGenero(e.target.value)}>
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
            </select>
            </div>
            </div>

    
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Descripción</span>
            <input className="form-control" aria-label="Username" aria-describedby="basic-addon1" type="text" {...register('descripcion', { required: true })} placeholder="Descripción" />
            </div>


            <div className="d-flex mb-3 ">
            <div className="input-group me-3">
            <span className="input-group-text" id="basic-addon1">Peso</span>
            <input className="form-control" aria-label="Username" aria-describedby="basic-addon1" type="text" {...register('peso', { required: true })} placeholder="Peso" />
            </div>
            
            <div className="input-group ">
            <span className="input-group-text ms-4" id="basic-addon1">Madre</span>
            <input className="form-control" aria-label="Username" aria-describedby="basic-addon1" type="text" {...register('madre', { required: true })} placeholder="Madre" />
            </div>
            </div>

            <div className=" d-flex">
            <div className="input-group me-3 ">
            <span className="input-group-text" id="basic-addon1">Padre</span>
            <input className="form-control" aria-label="Username" aria-describedby="basic-addon1" type="text" {...register('padre', { required: true })} placeholder="Padre" />
            </div>
            <div className="input-group ">
            <span className="input-group-text ms-4" id="basic-addon1">Foto</span>
            <input className="form-control" aria-label="Username" aria-describedby="basic-addon1" type="file" {...register('imagen', { required: true })} placeholder="Foto del animal" />
            </div>
            </div>

       
     
                <button className="btn btn-success" type="submit">{editarBovinos  ? 'Actualizar' : 'Registrar'}</button>
            </form>
            </div>
            </div>
            </div>

            <div className="container mt-5">
            <div className="card">
            <div className="card-header ">
                <h5>¿Deseas filtrar los bovinos por el sexo?</h5>
                <select className="form-control" aria-label="Username" aria-describedby="basic-addon1" type="text"  placeholder="Sexo"  onChange={(e) => setGenero(e.target.value)}>
                  <option value="">Todos</option>
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>
                <button className="btn btn-dark"  onClick={consultarfiltro}> Consultar</button>
                </div> 
            </div>
            </div>
            
            <div className="container mt-5">
            <div className="row">
            {Array.isArray(valores) && valores.map((val, key) => (
            <div key={val._id} className="card col-md-4 mb-6 custom ">
            <img  src={`http://localhost:4000/uploads/${val.imagen}`} alt={val.nombre} className="card-img-top" />    
            <div className="card-body estilocard align-center">
            <h5 className="card-title"><b>Nombre:</b> {val.nombre}</h5>
            <p className="card-text"><b>Fecha de Nacimiento:</b> {val.fechaNacimiento}</p>
            <p className="card-text"> <b>Raza:</b> {val.raza}</p>
            <div className="d-flex justify-content-between">
            <p className="card-text"> <b>Sexo:</b> {val.genero}</p>
            <p className="card-text"> <b>Peso:</b> {val.peso}</p>
            </div>
            <div className="d-flex justify-content-between">
            <p className="card-text"> <b>Madre:</b> {val.madre}</p>
            <p className="card-text"> <b>Padre:</b> {val.padre}</p>
            </div>
            <div className="d-flex justify-content-between ">
            <button className="btn btn-warning" type="button" onClick={() => {editaBovino(val)}}>Editar</button>
            <button className="btn btn-danger" type="button" onClick={() => deleteBovinos(val._id)}>Eliminar</button> 
            </div>            
            </div>
            </div>
             ))}
               </div>
               </div>
            
        
        </div>
    );
}

export default App;
