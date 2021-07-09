import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button/index'
import '../styles/room.scss'
import { RoomCode } from '../components/RoomCode/index'
import { Question } from '../components/Question/index'

import { useParams } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

type RoomParamsType = {
    id: string;
}

type FirebaseQuestionsType = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

export function Room() {
    
    const params = useParams<RoomParamsType>()
    const roomId = params.id;
    const { user } = useAuth()
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()
        
        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false 
        };

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')
    }

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', (room) => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestionsType = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            });
            setQuestions(parsedQuestions)
            setTitle(databaseRoom.title)
            console.log(databaseRoom.title)
        })
    }, [roomId])

    return(
        <div id='page-room'>
            <header>
                <div className='content'>
                    <img src={logoImg} alt='Letmeask'></img>
                    <RoomCode code={roomId}></RoomCode>
                </div>
            </header>

            <main className='content'>
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea placeholder='O que você quer perguntar?'
                              onChange={(event) => setNewQuestion(event.target.value)}
                              value={newQuestion}                   
                    ></textarea>

                    <div className='form-footer'>
                        { user ? (
                        <div className='user-info'>
                            <img src={user.avatar} alt={user.name}></img>
                            <span>{user.name}</span>
                        </div>) : (
                        <span>Para enviar uma pergunta, <button>faça seu login</button></span>)}
                        <Button type='submit'>Enviar pergunta</Button>
                    </div>
                </form>

                <div className='question-list'>
                {
                    questions.map(question => {
                        return (
                            <Question key ={question.id} content={question.content} author={question.author}></Question>
                        )
                    })
                }
                </div>       
                
            </main>
        </div>
    )
}