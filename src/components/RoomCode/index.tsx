import CopyImg from '../../assets/images/copy.svg'
import './styles.scss'

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
        alert('Successfully copied room code')
    }

    return(
        <button className='room-code'>
            <div onClick={copyRoomCodeToClipboard}>
                <img src={CopyImg} alt='Copy room code'></img>
            </div>

            <span>Sala #{props.code}</span>
        </button>
    )
}