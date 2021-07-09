import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button/index'
import '../styles/room.scss'
import { RoomCode } from '../components/RoomCode/index'
import { Question } from '../components/Question/index'

import { useParams } from 'react-router-dom'
import { useRoom } from '../hooks/useRoom'

type RoomParamsType = {
    id: string;
}


export function AdminRoom() {
    
    const params = useParams<RoomParamsType>()
    const roomId = params.id;
    const { title, questions} = useRoom(roomId)

    return(
        <div id='page-room'>
            <header>
                <div className='content'>
                    <img src={logoImg} alt='Letmeask'></img>
                    <div>
                        <RoomCode code={roomId}></RoomCode>
                        <Button isOutlined>Encerrar sala</Button>
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
                            <Question key ={question.id} content={question.content} author={question.author}></Question>
                        )
                    })
                }
                </div>       
                
            </main>
        </div>
    )
}