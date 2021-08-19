import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ShowSingleCharacter from '../allCharacter/show-single-character';
import SingleCharacterPreview from '../allCharacter/single-character-preview';
import Loading from '../loading';

let FETCH_SINGLE_EPDISODE = gql`
 query($id:ID!){
     episode(id:$id){
        id
        name
        air_date
        episode
        characters{
            id
            name
            image
            status
            gender
        }
        created
     }
 }


`

const ShowSingleEpisode = () => {
    let { episodeId } = useParams()
    let { data } = useQuery(FETCH_SINGLE_EPDISODE, { variables: { id: episodeId } })
    useEffect(() => {
        console.log(data);
    }, [data])
    return (
        <>
            {data ? <div className='show-single-episode'>
                <p style={{ fontWeight: '700', color: 'var(--head-color)', fontSize: '2.3rem' }}>{data.episode.name}</p>
                <p>Episode Code - {data.episode.episode}</p>
                <p> Published -{data.episode.air_date}</p>
                <p>CreatedAt -{moment(data.episode.created).fromNow()}</p>
                <p>Acted is this episode-</p>
                <div className='show-single-episode__container'>
                    {data.episode.characters.map((sig, index) => <SingleCharacterPreview key={index} character={sig} />)}
                </div>
            </div> : <Loading />}
        </>
    )
}

export default ShowSingleEpisode;
