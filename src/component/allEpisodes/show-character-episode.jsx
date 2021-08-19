import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../loading'
import SingleEpisodePreview from './single-episode-preview'
let FETCH_SINGLE_CHARACTER_EPISODE = gql`

query($id:ID!){
    character(id:$id){
        id
        name
        episode{
            id
            name
            air_date
            created
        }
    }
}


`
const ShowCharacterEpisode = () => {
    let { characterId } = useParams()
    let { data } = useQuery(FETCH_SINGLE_CHARACTER_EPISODE, { variables: { id: characterId } })
    return (
        <>
            {data ? <div style={{ width: '90%', margin: "auto" }}>
                <p style={{ fontWeight: '700', color: 'var(--head-color)', fontSize: '2.3rem' }}>{`${data.character.name}'s episode :`}</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                    {data.character.episode.map((sig, index) => <SingleEpisodePreview key={index} episode={sig} />)}
                </div>
            </div> : <Loading />}
        </>
    )
}

export default ShowCharacterEpisode;
