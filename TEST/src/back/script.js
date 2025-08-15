const express = require('express');
const app = express();
const fs = require('node:fs/promises')

app.use(express.json())


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
        const character = characters.characters.find(char => char.id === characterId)

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
app.post('/characters', async (req,res) => {
    try{
        const data = await fs.readFile('characters.json','utf-8')
        const characters = JSON.parse(data)

        const {name,realName,universe} = req.body

        if(!name || !realName || ! universe){
            return res.status(400).json({error : "can't be empty"})
        }

        const newId = Math.max(...characters.characters.map(char => char.id)) + 1

        const newCharacter = {
            id: newId,
            name,
            realName,
            universe
        }

        characters.characters.push(newCharacter)
        await fs.writeFile('characters.json', JSON.stringify(characters,null,2))

        res.status(201).json(newCharacter)
    }
    catch(error){
        res.status(500).json({error : "cannot create the character"})
    }
})


// PUT /characters/:id ==> Update a character by ID
app.put('/characters/:id',async (req,res) => {
    try{
        const data = await fs.readFile('characters.json','utf8')
        const characters = JSON.parse(data)
        const characterId = parseInt(req.params.id)
        const characterIndex = characters.characters.findIndex(char => char.id === characterId)

        if(characterIndex === -1){
            return res.status(404).json({error: "Character not found"})
        }

        const {name, realName, universe} = req.body

        if(!name || !realName || !universe){
            return res.status(400).json({error: "all fields are requiered"})
        }

        characters.characters[characterIndex] = {
            id: characterId,
            name,
            realName,
            universe
        }
        
        await fs.writeFile('characters.json',JSON.stringify(characters, null, 2))
        res.json(characters.characters[characterIndex])
    }
    catch(err){
        res.status(500).json({err: "cannot update character"})
    }

})


// DELETE /characters/:id ==> Delete a character by ID
app.delete('/characters/:id', async (req,res) => {
    try{
        const data = await fs.readFile('characters.json','utf8')
        const characters = JSON.parse(data)
        const characterId = parseInt(req.params.id)
        const characterIndex = characters.characters.findIndex(char => char.id === characterId)

        if (characterIndex === -1) {
           return res.status(404).json({error: "Character not found"})
       }

       const deletedCharacter = characters.characters.splice(characterIndex, 1)[0]

       await fs.writeFile('characters.json', JSON.stringify(characters, null, 2))
       res.json({message: "Character deleted", character: deletedCharacter})
    }
    catch(error){
        res.status(500).json({error: "cannot delete character"})
    }
})

 
app.listen(8080, () => {
    console.log("Server running on 8080");
    
})