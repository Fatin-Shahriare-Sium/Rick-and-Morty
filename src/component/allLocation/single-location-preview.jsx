import React from 'react'
import { Link } from 'react-router-dom'

const SingleLocationPreview = ({ location }) => {

    function textTrucate(text) {
        if (text.length > 15) {
            return text.substr(0, 11) + '...'
        } else {
            return text
        }
    }

    return (
        <div className='single-location-previewer'>
            <Link to={`/locations/${location.id}`}>
                <div>
                    <p style={{ fontWeight: '700', color: 'var(--head-color)', fontSize: '2.3rem' }}>{textTrucate(location.name)}</p>
                    <p>Dimenssion - {location.dimension}</p>
                    <p>Type - {location.type}</p>
                    <p>Resident count - {location.residents.length}</p>
                </div>
            </Link>
        </div>
    )
}

export default SingleLocationPreview;
