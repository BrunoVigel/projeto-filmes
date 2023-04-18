import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import api from '../../services/api'
import './style.css'
import { toast} from 'react-toastify'

export function Filme() {
    const {id} = useParams();
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)
    const navigation = useNavigate()


    useEffect(() => {
        async function loadFilme() {
            await api.get(`movie/${id}`, {
                params: {
                    api_key: '7432a56baa941cb9ffa85c1ce7a491e2',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() => {
                navigation('/', {replace: true})
                return;
            })
        }

        loadFilme()

        return () => {
            console.log('componente foi desmontado')
        }
    }, [navigation, id])

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeflix');

        let filmeSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmeSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme) {
            toast.warn('Esse filme já está na sua lista!')
            return;
        }

        filmeSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmeSalvos))
        toast.success('Filme salvo com sucesso!')
    }


    if(loading) {
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>salvar</button>
                <button>
                    <a target='blank'  rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}