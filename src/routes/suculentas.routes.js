import {Router} from "express";
import pool from '../database.js';

const router = Router();

router.get('/quienessomos', (req, res)=>{
    res.render('suculentas/quienessomos');
})

router.get('/productos', (req, res)=>{
    res.render('suculentas/productos');
})

router.get('/add', (req, res)=>{
    res.render('suculentas/add');
})

router.post('/add', async(req, res)=>{
    try{
        const {name, sciname, costo} = req.body;
        const nuevaSuculenta = {
            name, sciname, costo
        }
        await pool.query('INSERT INTO suculentas SET ?', [nuevaSuculenta]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/list', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT * FROM suculentas');
        res.render('suculentas/list', {suculentas: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});


router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [suculenta] = await pool.query('SELECT * FROM suculentas WHERE id = ?', [id]);
        const suculentaEdit = suculenta[0]
        res.render('suculentas/edit', { suculenta: suculentaEdit })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM suculentas WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/*router.post('/edit/:id',  upload.single('file'), async (req, res) => {
    try {
        const { id } = req.params
        const { name, sciname, costo, observacion } = req.body
        let editSuculenta = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            editSuculenta = { name, sciname, costo, observacion, imagen}
        }else{
            editSuculenta = {name, sciname, costo, observacion}
        }
        await pool.query('UPDATE suculentas SET ? WHERE id = ?', [editSuculenta, id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});*/


export default router;