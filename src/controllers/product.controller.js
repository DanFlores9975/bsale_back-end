import {pool} from '../db.js';

export const getPS = async(req, res)=>{
    const [result] = await pool.query('SELECT * FROM category C INNER JOIN product P ON C.id=P.category;');
    res.json(result);
}

export const getP = async(req, res)=>{
    const [result] = await pool.query('SELECT * FROM product WHERE name LIKE ?;',[`%${req.query.name}%`]);
    res.json(result);
}