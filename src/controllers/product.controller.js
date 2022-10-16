import {pool} from '../db.js';

export const getPS = async(req, res)=>{
    try{
    const [result] = await pool.query('SELECT * FROM category C INNER JOIN product P ON C.id=P.category;');
    res.json(result);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal!'
        })
    }
    
}

export const getP = async(req, res)=>{

    try{
        const [result] = await pool.query('SELECT * FROM product WHERE name LIKE ?;',[`%${req.query.name}%`]);
    
        if(result.length <= 0 ) return res.status(404).json({
            message:'La busqueda no coincide con ningun producto.'
        })
        
        res.json(result);
    } catch (error) {
            return res.status(500).json({
            message: 'Algo salio mal!'
        })
    }

}

export const getPC = async(req, res)=>{

    try{
        const [result] = await pool.query('SELECT * FROM product WHERE category = ?;',[req.query.cat]);
    
        if(result.length <= 0 ) return res.status(404).json({
            message:'La busqueda no coincide con ningun producto.'
        })
        
        res.json(result);
    } catch (error) {
            return res.status(500).json({
            message: 'Algo salio mal!'
        })
    }

}