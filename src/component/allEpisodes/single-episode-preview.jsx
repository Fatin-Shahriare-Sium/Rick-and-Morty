import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'


const SingleEpisodePreview = ({ episode }) => {
    function textTrucate(text) {
        if (text.length > 15) {
            return text.substr(0, 11) + '...'
        } else {
            return text
        }
    }

    return (
        <div className='single-episode-previewer'>
            <Link to={`/episodes/${episode.id}`} >
                <div>
                    <p style={{ fontWeight: '700', color: 'var(--head-color)', fontSize: '2rem' }}>{textTrucate(episode.name)}</p>
                    <p>Published -{episode.air_date}</p>
                    <p>CreatedAt -{moment(episode.created).fromNow()}</p>
                </div>
            </Link>
        </div>
    )
}

export default SingleEpisodePreview
