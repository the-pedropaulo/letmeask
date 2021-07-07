import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import '../styles/button.scss'

import { Button } from '../components/Button'

import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'


export function Home() {
    
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom() {
         if(!user) {
            await signInWithGoogle()
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if (roomCode.trim() == '') {
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists')
        } else {
            //history.push(`/rooms/${roomCode}`)
            console.log(roomRef)
        }

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
                    <button className='create-room' onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt='Logo do Google'></img>
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input type='text'
                               placeholder='Digite o código da sala'
                               value={roomCode}
                               onChange={(event) => setRoomCode(event.target.value)}                  
                        ></input>
                        <Button type='submit'>
                            Entrar na sala
                        </Button>

                    </form>

                </div>
            </main>
        </div>
    )
}