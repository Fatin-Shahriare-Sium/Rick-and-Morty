import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

let FETCH_SINGLE_CHARACTER = gql`

query($id:ID!){
    character(id:$id){
        id
        name
        status
        species
        type
        gender
        origin{
            id
            name
            dimension
        }
        location{
            id
            name
            dimension
        }

        episode{
            id
        }
   
        image
        created
    }
}


`

const ShowSingleCharacter = () => {
    let { characterId } = useParams()
    let { data, loading } = useQuery(FETCH_SINGLE_CHARACTER, { variables: { id: characterId } })
    useEffect(() => {
        console.log(data);
    }, [data])
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {data ? <div className='show-single-character'>
                <div className='show-single-character__img'>
                    <img src={data.character.image} alt="" />
                </div>
                <div className='show-single-character__details'>
                    <div className='show-single-character__details--wrapper'>
                        <p style={{ fontWeight: '700', color: 'var(--head-color)', fontSize: '2.3rem' }}>{data.character.name}</p>
                        <p>Status - {data.character.status}</p>
                        <p>Gender -{data.character.gender}</p>
                        <p>Species- {data.character.species}</p>
                        <p>Origin -

                            {data.character.origin.name == 'unknown' ? data.character.origin.name :
                                <Link to={`/locations/${data.character.origin.id}`}>{data.character.origin.name}</Link>
                            }


                        </p>
                        <p>Last seen location -

                            {data.character.location.name == 'unknown' ? data.character.location.name :
                                <Link to={`/locations/${data.character.location.id}`}>{data.character.location.name}</Link>
                            }
                        </p>
                        <p>Total episodes - <Link to={`/characters/episode/${data.character.id}`}>
                            {data.character.episode.length}
                        </Link></p>
                    </div>
                </div>

            </div> :
                <p>Loading....</p>
            }
        </div>
    )
}

export default ShowSingleCharacter;
