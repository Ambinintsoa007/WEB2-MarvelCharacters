import {useEffect, useState} from 'react'
import './App.css'

function App() {

    const mainStyle = {backgroundColor: '#2a3441', minHeight: '100vh', padding: '1.3rem',fontFamily: 'Arial'};
    const tableStyle = {backgroundColor: '#3c4a59',borderRadius: '8px',borderCollapse: 'separate',borderSpacing: '0',width: '100%',maxWidth: '800px',overflow: 'hidden'};
    const theadTrStyle = {backgroundColor: '#4a5864'}
    const theadThStyle = {color: '#a0b0c0',padding: '12px 16px',textAlign: 'left',fontSize: '14px',fontWeight: 'normal'}
    const tbodyTdStyle = {color: '#e0e6ed',padding: '12px 16px',fontSize: '14px'}
    const buttonStyle = {padding: '6px 12px',margin: '0 4px',border: 'none',borderRadius: '4px',fontSize: '12px',cursor: 'pointer'}
    const editButtonStyle = {...buttonStyle,backgroundColor: '#7fb069',color: 'white'}
    const deleteButtonStyle = {...buttonStyle,backgroundColor: '#e74c3c',color: 'white'}
    const formStyle = {backgroundColor: '#3c4a59',padding: '20px',borderRadius: '8px',marginBottom: '20px',maxWidth: '1000px'}
    const inputStyle = {padding: '8px 12px',margin: '0 8px 8px 0',border: '1px solid #555',borderRadius: '4px',backgroundColor: '#2a3441',color: '#e0e6ed',fontSize: '14px'}
    const submitButtonStyle = {padding: '8px 16px',margin: '0 8px',border: 'none',borderRadius: '4px',backgroundColor: '#7fb069',color: 'white',cursor: 'pointer',fontSize: '14px'}
    const cancelButtonStyle = {...submitButtonStyle,backgroundColor: '#6c757d'}

//---------------------------STYLE------------------------------------------
    const [characters, setCharacters] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        realName: '',
        universe: ''
    })
//--------------------------------------------------------------------------
   /** useEffect(() => {
        const loadCharacters = async () => {
            try{
                const response = await fetch('characters.json');
                const jsonData = await response.json();
                setCharacters(jsonData.characters)
            }
            catch(err) {
                console.error(""Error: ",err);
            }
        }
        loadCharacters();
    }, [])**/
   const loadCharacters = async () => {
       try {
           const response = await fetch('http://localhost:7777/characters')
           const data = await response.json()
           setCharacters(data)
       } catch (err) {
           console.error("Erreur:", err)
       }
   }

    useEffect(() => {
        loadCharacters()
    }, [])


    const createCharacter = async () => {
        try {
            const response = await fetch('http://localhost:7777/characters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
//JSON.stringify() = objet en js => textJSON
//JSON.parse()  = textJSON => objet en js
            if (response.ok) {
                loadCharacters()
                setFormData({ name: '', realName: '', universe: '' })
            }
        } catch (err) {
            console.error("Erreur:", err)
        }
    }

    const updateCharacter = async () => {
        try {
            const response = await fetch(`http://localhost:7777/characters/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
//JSON.stringify() = objet en js => textJSON
//JSON.parse()  = textJSON => objet en js
            if (response.ok) {
                loadCharacters()
                setEditingId(null)
                setFormData({ name: '', realName: '', universe: '' })
            }
        } catch (err) {
            console.error("Erreur:", err)
        }
    }

    const deleteCharacter = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce personnage ?')) {
            try {
                const response = await fetch(`http://localhost:7777/characters/${id}`, {
                    method: 'DELETE'
                })

                if (response.ok) {
                    loadCharacters()
                }
            } catch (err) {
                console.error("Erreur:", err)
            }
        }
    }

    const startEdit = (character) => {
        setEditingId(character.id)
        setFormData({
            name: character.name,
            realName: character.realName,
            universe: character.universe
        })
    }

    const cancelEdit = () => {
        setEditingId(null)
        setFormData({ name: '', realName: '', universe: '' })
    }

    const handleSubmit = () => {
        if (editingId) {
            updateCharacter()
        } else {
            createCharacter()
        }
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <main style={mainStyle}>
            <section>
                <h2 style={{ color: '#7fb069', marginBottom: '20px' }}>
                    Gestion des Personnages Marvel
                </h2>

                <div style={formStyle}>
                    <h3 style={{ color: '#a0b0c0', marginBottom: '16px' }}>
                        {editingId ? 'Modifier le personnage' : 'Ajouter un personnage'}
                    </h3>

                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nom du personnage"
                            value={formData.name}
                            onChange={handleInputChange}
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            name="realName"
                            placeholder="Vrai nom"
                            value={formData.realName}
                            onChange={handleInputChange}
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            name="universe"
                            placeholder="Univers"
                            value={formData.universe}
                            onChange={handleInputChange}
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ marginTop: '12px' }}>
                        <button onClick={handleSubmit} style={submitButtonStyle}>
                            {editingId ? 'Modifier' : 'Ajouter'}
                        </button>
                        {editingId && (
                            <button onClick={cancelEdit} style={cancelButtonStyle}>
                                Annuler
                            </button>
                        )}
                    </div>
                </div>

                <table style={tableStyle}>
                    <thead>
                    <tr style={theadTrStyle}>
                        <th style={theadThStyle}>Id</th>
                        <th style={theadThStyle}>Name</th>
                        <th style={theadThStyle}>RealName</th>
                        <th style={theadThStyle}>Universe</th>
                        <th style={theadThStyle}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                     {characters.map((character,index) => (
                        <tr key={character.id} style={{
                            backgroundColor: index % 2 === 0 ? '#3c4a59' : '#424f5e'
                        }}>
                            <td style={tbodyTdStyle}>{character.id}</td>
                            <td style={{color: '#7fb069'
                                ,padding: '12px 16px'
                                ,fontSize: '14px'
                                ,fontWeight: '500'
                            }}>{character.name}</td>
                            <td style={tbodyTdStyle}>{character.realName}</td>
                            <td style={tbodyTdStyle}>{character.universe}</td>
                            <td style={tbodyTdStyle}>
                                <button
                                    onClick={() => startEdit(character)}
                                    style={editButtonStyle}
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => deleteCharacter(character.id)}
                                    style={deleteButtonStyle}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </section>

        </main>
    )
}

export default App