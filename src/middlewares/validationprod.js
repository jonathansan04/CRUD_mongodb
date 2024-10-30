import { z } from 'zod'; // 📦 Importar Zod para la validación de esquemas


// * ------ 📋 Esquema de Registro de Productos 📋 ------ *

export const esquemaProducto = z.object({
    nombre: z.string({ 
        required_error: "Nombre requerido" 
    }),
    //nacimiento: z.date({ 
    // required_error: "Fecha de nacimiento requerida"  
    //}),
    raza: z.string({ 
        required_error: "Raza requerida" 
    }),
    genero: z.string({ 
        required_error: "Genero requerida" 
    }),
    
    descripcion: z.string({ 
        required_error: "Descripcion requerida" 
    }),
    peso: z.string({ 
        required_error: "Peso requerida" 
    }),
    madre: z.string({ 
        required_error: "Madre requerida" 
    }),
    padre: z.string({ 
        required_error: "Padre requerida" 
    }),
    

});

