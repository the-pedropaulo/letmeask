import './styles.scss'
import { ReactNode } from 'react'

type QuestionPropsType = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
}

export function Question({content, author, children}: QuestionPropsType) {
    return (
        <div className='question'>
            <p>{content}</p>
            <footer>
                <div className='user-info'>
                    <img src={author.avatar} alt={author.name}></img>
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}