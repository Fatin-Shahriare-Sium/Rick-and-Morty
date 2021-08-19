import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import Loading from '../loading';
import './allCharacter.css'
import ShowSingleCharacter from './show-single-character';
import SingleCharacterPreview from './single-character-preview';
let FETCH_ALL_CHARACTER = gql`

query($page:Int,$filter:FilterCharacter){
    characters(page:$page,filter:$filter){
        info {
            pages
            count
            next
            prev
        }
        results{
                id
                image
                name
                status
                gender
        }
    }
}

`

const AllCharacter = () => {

    let { data, loading, fetchMore } = useQuery(FETCH_ALL_CHARACTER, { variables: { page: 1, filter: {} } })
    let [characters, setCharacters] = useState()

    let [nextPage, setNextPage] = useState('')

    function handleNextPage() {

        let prepage = nextPage - 1
        console.log(typeof nextPage);
        fetchMore({
            variables: { page: nextPage, filter: {} }, updateQuery: (preResult, { fetchMoreResult }) => {

                return fetchMoreResult
            }
        })


    }

    function handlePrePage() {

        fetchMore({
            variables: { page: data.characters.info.prev, filter: {} }, updateQuery: (preResult, { fetchMoreResult }) => {

                return fetchMoreResult
            }
        })
    }

    function handleSearch(text) {

        let searchedCharacters = data.characters.results.filter(sig => sig.name.toLowerCase().includes(text.toLowerCase()))
        console.log(searchedCharacters);
        setCharacters([...searchedCharacters])
    }

    useEffect(() => {

        console.log('data', data);
        if (data) {
            setNextPage(data.characters.info.next)
            return setCharacters(data.characters.results)
        }
    }, [data])

    return (
        <div className='all-character mt-3'>
            <div className='all-character__inputBox'>
                <input placeholder='search' onChange={(event) => handleSearch(event.target.value)} type="text" />
            </div>
            <div className='all-character__container mt-1'>
                {!characters ? <Loading /> : characters.map((sig, index) => <SingleCharacterPreview key={index} character={sig} />)}

            </div>
            <div className='all-character__bottom'>
                <button disabled={nextPage > 2 ? false : true} onClick={handlePrePage} className='btn btn-outline-dark'>Previous</button>
                <button onClick={handleNextPage} className='btn btn-outline-dark ms-3'> Next</button>
            </div>
        </div>
    )
}

export default AllCharacter;
