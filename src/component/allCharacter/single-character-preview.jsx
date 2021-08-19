import React from 'react'
import { Link } from 'react-router-dom'

const SingleCharacterPreview = ({ character }) => {
    return (
        <div className='single-character-preview'>
            <Link to={`/characters/${character.id}`}>
                <div className='single-character-preview__img'>
                    <img src={character.image} alt="" />

                </div>
                <div className='single-character-preview__details'>
                    <p style={{ fontWeight: '700', color: 'var(--head-color)', fontSize: '1.5rem' }}>{character.name}</p>

                    <p style={{ fontWeight: '500', color: 'var(--text-color)', fontSize: '1rem' }}>Status - {character.status}</p>
                    <p style={{ fontWeight: '500', color: 'var(--text-color)', fontSize: '1rem' }}>Gender - {character.gender}</p>

                </div>
            </Link>

        </div>
    )
}

export default SingleCharacterPreview;
