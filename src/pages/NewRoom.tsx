import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import '../styles/button.scss'

import { Button } from '../components/Button'

import { FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'


import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'


export function NewRoom() {
    
    const { user } = useAuth()
    const [newRoom, setNewRoom] = useState('')
    const history = useHistory()

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()
        
        if(newRoom.trim() === '') {
            return
        }

        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }


    return(
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt='Ilustração perguntas e respostas'></img>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas de sua audiência em tempo real</p>
            </aside>

            <main>
                
                <div className='main-content'>
                    <img src={logoImg} alt='Letmeask'></img>
                    <h1>Olá, {user?.name}</h1>
                    <h2>Criar uma nova sala</h2>
                    
                    <form onSubmit={handleCreateRoom}>
                        <input type='text'
                               placeholder='Nome da sala'
                               value={newRoom}
                               onChange={(event) => setNewRoom(event.target.value)}>
                        </input>
                        
                        <Button type='submit'>
                            Criar sala
                        </Button>
                    </form>
                    
                    <p>
                        Quer entrar em uma sala existente? <Link to='/'>clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}