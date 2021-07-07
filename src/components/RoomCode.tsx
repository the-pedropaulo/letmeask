import CopyImg from '../assets/images/copy.svg'
import '../styles/room-code.scss'

export function RoomCode() {
    return(
        <button className='room-code'>
            <div>
                <img src={CopyImg} alt='Copy room code'></img>
            </div>

            <span>Sala #jdkfjsfd36ffe3e738e</span>
        </button>
    )
}