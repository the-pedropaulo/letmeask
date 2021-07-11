import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import answerImg from '../assets/images/answer.svg'
import checkImg from '../assets/images/check.svg'

import { Button } from '../components/Button/index'
import '../styles/room.scss'
import { RoomCode } from '../components/RoomCode/index'
import { Question } from '../components/Question/index'

import { useHistory, useParams } from 'react-router-dom'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'

type RoomParamsType = {
    id: string;
}


export function AdminRoom() {
    
    const history = useHistory()
    const params = useParams<RoomParamsType>()
    const roomId = params.id;
    const { title, questions } = useRoom(roomId)

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            closedAt: new Date(),
        })

        history.push('/')
    }

    async function handleRemoveQuestion(questionId: string) {
       if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
           await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
       }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighlighQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
    })
    }

    return(
        <div id='page-room'>
            <header>
                <div className='content'>
                    <img src={logoImg} alt='Letmeask'></img>
                    <div>
                        <RoomCode code={roomId}></RoomCode>
                        <Button isOutlined onClick={() => handleEndRoom()}>Encerrar sala</Button>
                    </div>        
                </div>
            </header>

            <main className='content'>
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>

                <div className='question-list'>
                {
                    questions.map(question => {
                        return (
                            <Question key={question.id} content={question.content} author={question.author} isHighlighted={question.isHighlighted} isAnswered={question.isAnswered}>
                            
                            { !question.isAnswered && (
                            <>
                                <button type='button' onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                                    <img src={checkImg} alt='Marcar pergunta como respondida'></img>
                                </button>

                                <button type='button' onClick={() => handleHighlighQuestion(question.id)}>
                                    <img src={answerImg} alt='Dar destaque à pergunta'></img>
                                </button>
                                
                                <button type='button' onClick={() => handleRemoveQuestion(question.id)}>
                                    <img src={deleteImg} alt='Remover pergunta'></img>
                                </button>
                            </> 
                            )}
                            
                            </Question>
                        )
                    })
                }
                </div>       
                
            </main>
        </div>
    )
}