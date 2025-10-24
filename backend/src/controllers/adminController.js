import { supabase } from '../config/db.js';

export const getAdmins = async (req, res) => {
    try {
        const { data, error } = await supabase.from('admin').select('*');

        if (error) {
            throw error;
        }

        res.status(200).json(data);
    }catch (err) {
        console.error('Error al obtener administradores:', err.message);
        res.status(500).json({error: 'Error al obtener datos de administradores'});
    }
}