// PUT /characters/:id ==> Update a character by ID
// DELETE /characters/:id ==> Delete a character by ID

const express = require('express');
const { json } = require('express/lib/response');
const { error } = require('node:console');
const app = express();
const fs = require('node:fs/promises')


// GET /characters ==> Get all characters
app.get('/characters', async (req,res) => {
    try{
        const data = await fs.readFile('characters.json','utf-8')
        const characters = JSON.parse(data)
        res.json(characters.characters)
    }
    catch(error){
        res.status(500).json({error : "Erreur lors de la lecture des characters"})
    }
}) 

// GET /characters/:id ==> Get a character by ID
app.get('/characters/:id', async (req,res) => {
    try{
        const data = await fs.readFile('characters.json' , 'utf-8')
        const characters = JSON.parse(data)
        const characterId = parseInt(req.params.id)
        const character = characters.characters.find(char => char.id == characterId)

        if(!character){
            return res.status(404).json({error : "cannot find the character"})
        }
        res.json(character)
    }
    catch(err){
        res.status(500).json({err : "Erreur lors de la lecture du peronnage"})
    }
})

// POST /characters ==> Create a new character
app.post('/charcters', async (req,res) => {
    try{
        const data = await fs.readFile('characters.json','utf-8')
        const characters = JSON.parse(data)

        const {name,realName,Universe} = req.body

        if(!name || !realName || ! Universe){
            return res.status(400).json({error : "can't be empty"})
        }

        const newId = Math.max(...characters.characters.map(char => char.id)) + 1

        const newCharacter = {
            id: newId,
            name,
            realName,
            Universe
        }

        characters.characters.push(newCharacter)
        await fs.writeFile('characters.json', JSON.stringify(characters,null,2))

        res.status(200).json(newCharacter)
    }
    catch(error){
        res.status(500).json({error : "cannot create the character"})
    }
})
 
app.listen(8080)