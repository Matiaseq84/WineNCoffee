import { supabase } from '../config/db.js';

export const getAdmins = async (req, res) => {
    try {
        const { data, error } = await supabase.from('admin').select('*');

        if (error) {
            throw error;
        }

        res.status(200).json(data);
    } catch (err) {
        console.error('Error al obtener administradores:', err.message);
        res.status(500).json({error: 'Error al obtener datos de administradores'});
    }
};

export const getAdminById = async (req, res) => {
    const {id} = req.params;

    try{
        const { data, error } = await supabase
            .from('admin')
            .select('*')
            .eq('admin_id', id)
            .single(); // trae solo un registro desde supabase.admin
        if (error) throw error; // interrumpe el flujo si hay un error

        if(!data){
            return res.status(404).json({error: 'Administrador no encontrado'});
        }

        res.status(200).json(data);
    
    } catch (err) {
        console.error('Error al obtener el administrador: ', err.message);
    }
};

export const postAdmin = async (req, res) => {
    const { user_name, password} = req.body;

    try{
        const { data, error } = await supabase
            .from('admin')
            .insert([{ user_name, password}]) // el modelo toma las variables y las inserta como insert de sql en la tabla
            .select(); // devuelve la entidad recién creada como respuesta para mostrarla en el front
        
        if(error) throw error;

        res.status(201).json({ message: 'Administrador registrado correctamente', data})

    } catch (err) {
        console.error('Error al registrar al administrador', err.message);
        res.status(500).json({error: 'Error al registrar el administrador'});
    }
};

export const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { user_name, password } = req.body;

    try {
        const { data, error } = await supabase
            .from('admin')
            .update({ user_name, password })
            .eq('admin_id', id)
            .select();

        if(error) throw error;

        if (data.length === 0) {
            return res.status(404).json({ error: 'Administrador no encontrado'});
        }

        res.status(200).json({message: 'Administrador actualizado correctamente', data});
    } catch (err) {
        console.error('Error al actualizar administrador: ', err.message);
        res.status(500).json({ error : 'Error al actualizar en administrador' });
    }
};

export const deleteAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const { error } = await supabase
            .from('admin')
            .delete()
            .eq('admin_id', id);
        
        if (error) throw error;

        res.status(200).json({ message: 'Administrador eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar administrador: ', err.message);
        res.status(500).json({ error: 'Error al eliminar administrador' });
    }
}