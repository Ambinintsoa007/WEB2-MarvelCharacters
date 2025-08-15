import {useEffect, useState} from 'react'
import './App.css'

function App() {

    const mainStyle = {backgroundColor: '#2a3441', minHeight: '100vh', padding: '1.3rem',fontFamily: 'Arial'};
    const tableStyle = {backgroundColor: '#3c4a59',borderRadius: '8px',borderCollapse: 'separate',borderSpacing: '0',width: '100%',maxWidth: '800px',overflow: 'hidden'};
    const theadTrStyle = {backgroundColor: '#4a5864'}
    const theadThStyle = {color: '#a0b0c0',padding: '12px 16px',textAlign: 'left',fontSize: '14px',fontWeight: 'normal'}
    const tbodytdStyle = {color: '#e0e6ed',padding: '12px 16px',fontSize: '14px'}

//---------------------------STYLE------------------------------------------
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        const loadCharacters = async () => {
            try{
                const response = await fetch('characters.json');
                const jsonData = await response.json();
                setCharacters(jsonData.characters)
            }
            catch(err) {
                console.error("Error: ",err);
            }
        }
        loadCharacters();
    }, [])

    return (
        <main style={mainStyle}>
            <section>
                <table style={tableStyle}>
                    <thead>
                    <tr style={theadTrStyle}>
                        <th style={theadThStyle}>Id</th>
                        <th style={theadThStyle}>Name</th>
                        <th style={theadThStyle}>RealName</th>
                        <th style={theadThStyle}>Universe</th>
                    </tr>
                    </thead>
                    <tbody>
                     {characters.map((character,index) => (
                        <tr key={character.id} style={{
                            backgroundColor: index % 2 === 0 ? '#3c4a59' : '#424f5e'
                        }}>
                            <td style={tbodytdStyle}>{character.id}</td>
                            <td style={{color: '#7fb069'
                                ,padding: '12px 16px'
                                ,fontSize: '14px'
                                ,fontWeight: '500'
                            }}>{character.name}</td>
                            <td style={tbodytdStyle}>{character.realName}</td>
                            <td style={tbodytdStyle}>{character.universe}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </section>

        </main>
    )
}

export default App