import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import './allEpisode.css'
import SingleEpisodePreview from './single-episode-preview';
let FECTCH_ALL_EPISODES = gql`

query($page:Int,$filter:FilterEpisode){
	episodes(page:$page,filter:$filter){
        info{
            next
            prev
        }

        results{
                id
                name
                air_date
                created
        }
    }

}


`

const AllEpisodes = () => {

    let { data, fetchMore } = useQuery(FECTCH_ALL_EPISODES, { variables: { page: 1, filter: {} } })
    let [allEpisodes, setAllEpisodes] = useState()
    let [nextPage, setNextPage] = useState('')


    function handleNextPage() {


        fetchMore({
            variables: { page: nextPage, filter: {} }, updateQuery: (preResult, { fetchMoreResult }) => {

                return fetchMoreResult
            }
        })


    }

    function handlePrePage() {

        fetchMore({
            variables: { page: data.episodes.info.prev, filter: {} }, updateQuery: (preResult, { fetchMoreResult }) => {

                return fetchMoreResult
            }
        })
    }

    function handleSearch(text) {
        let filteredEpisodes = data.episodes.results.filter(sig => sig.name.toLowerCase().includes(text.toLowerCase()))
        setAllEpisodes([...filteredEpisodes])
    }

    useEffect(() => {
        console.log(data);
        if (data) {
            setNextPage(data.episodes.info.next)
            setAllEpisodes(data.episodes.results)
        }
    }, [data])
    return (
        <div className='all-episode mt-3'>
            <input onChange={(event) => handleSearch(event.target.value)} placeholder='search episode' type="text" />
            <div className='all-episode__container'>
                {allEpisodes && allEpisodes.map((sig, index) => <SingleEpisodePreview key={index} episode={sig} />)}
            </div>
            <div style={{ margin: 'auto', maxWidth: "max-content", padding: '7px' }} className='all-episode__bottom'>
                <button disabled={nextPage > 2 ? false : true} onClick={handlePrePage} className='btn btn-outline-dark'>Previous</button>
                <button onClick={handleNextPage} className='btn btn-outline-dark ms-3'> Next</button>
            </div>
        </div>
    )
}

export default AllEpisodes;
