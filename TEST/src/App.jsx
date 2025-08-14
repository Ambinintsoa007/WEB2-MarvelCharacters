import {useEffect, useState} from 'react'
import './App.css'

function App() {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>RealName</th>
                        <th>Universe</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>characters.id</td>
                    <td>characters.realName</td>
                    <td>characters.actorName</td>
                    <td>characters.terre</td>
                </tr>
                </tbody>
            </table>
        </>
    )
}

export default App