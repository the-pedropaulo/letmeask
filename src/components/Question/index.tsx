import './styles.scss'

type QuestionPropsType = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
}

export function Question({content, author}: QuestionPropsType) {
    return (
        <div className='question'>
            <p>{content}</p>
            <footer>
                <div className='user-info'>
                    <img src={author.avatar} alt={author.name}></img>
                    <span>{author.name}</span>
                </div>
            </footer>
        </div>
    )
}