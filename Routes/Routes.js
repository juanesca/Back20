const { Router, json } = require("express");
const router = Router();
const fs = require('fs');

const dbFile = fs.readFileSync('./db.json', 'utf8');
let db = JSON.parse(dbFile);

router.get('/', (req,res) => {
    res.json({http: ['GET','POST','PUT','DELETE']});
});

router.get('/comidas', (req,res) => {
    res.status(200).json(db);
});

router.post('/comidas', (req,res) => {
    const { name, size, portions, topics} = req.body;

    if(!name || !size || !portions || !topics){
        res.status(401).json({error: 'Diligencia de datos por favor.'});
    }

    const i = db.length - 1;
    const id = db[i].id + 1;

    let newComida = {
        id,
        name,
        size,
        portions, 
        topics
    };

    db.push(newComida);
    const json_comidas = JSON.stringify(db);

    fs.writeFileSync('./db.json',json_comidas,'utf-8');

    res.status(200).json(db);
});

router.put('/comidas/:id', (req,res) => {
    const {id} = req.params;
    const {name,size,portions,topics} = req.body;

    if(!id || !name || !size || !portions || !topics){
        res.status(401).json({error: 'Debe completar los datos y especificar el id.'});
    }else{
        db.filter((db) => {
            if (db.id == id){
                db.name = name;
                db.size = size;
                db.portions = portions;
                db.topics = topics;
            }
        });

        const json_comidas = JSON.stringify(db);
        fs.writeFileSync('./db.json',json_comidas,'utf-8');

        res.status(200).json('ok');
    }
});

router.delete('/comidas/:id', (req,res) => {
    const {id} = req.params;

    if(!id){
        res.status(401).json({ error: 'especifique un id.'});
    } else {
        const indexComida = db.findIndex((db) => db.id === id);
        db.splice(indexComida, 1);

        const json_comidas = JSON.stringify(db);
        fs.writeFileSync('./db.json',json_comidas,'utf-8');

        res.status(200).json(db);
    }
});
/*
router.patch('/comidas/:id', (req,res) => {
    const {id} = req.params;
    const {name, size, portions, topics} = req.body;

    if(!id){
        res.status(401).json({ error: 'Especifique el id del objeto a cambiar'});
    } else {
        db.filter((db) => {
            if (db.id == id){
                if(!name && !size && !portions && !topics){
                    res.status(401).json({ error: 'Cambie como minimo 1 campo del objeto'});
                } else if (!name && !size && !portions){

                }
                db.name = name;
                db.size = size;
                db.portions = portions;
                db.topics = topics;
            }
        });
    }
})
*/


module.exports = router;