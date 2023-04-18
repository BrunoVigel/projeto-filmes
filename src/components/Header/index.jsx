import './style.css'
import {Link} from 'react-router-dom'

export function Header() {
    return(
        <header>
            <Link className='logo' to="/">Prime <span>Flix</span></Link>
            <Link className='favoritos' to="/favoritos">Meus filmes</Link>
        </header>
    )
}