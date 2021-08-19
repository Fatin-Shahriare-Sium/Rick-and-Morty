import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Loading from '../loading'
import './allLocation.css'
import SingleLocationPreview from './single-location-preview'
let FETCH_ALL_LOCATION = gql`

query($page:Int,$filter:FilterLocation) {
	locations(page:$page,filter:$filter){
    info{
      next
      prev
    }
    results{
      id
      name
      dimension
      type
      residents{
          id
      }
      
    }
  }
}



`

const AllLocation = () => {
    let { data, loading, fetchMore } = useQuery(FETCH_ALL_LOCATION, { variables: { page: 1, filter: {} } })
    let [allLocation, setAllLocation] = useState()
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
            variables: { page: data.locations.info.prev, filter: {} }, updateQuery: (preResult, { fetchMoreResult }) => {

                return fetchMoreResult
            }
        })
    }

    function handleFilter(text) {
        let filteredLocations = data.locations.results.filter(sig => sig.name.toLowerCase().includes(text.toLowerCase()))
        setAllLocation([...filteredLocations])
    }

    useEffect(() => {
        if (data) {
            setNextPage(data.locations.info.next)
            setAllLocation(data.locations.results)
        }
        console.log(data);

    }, [data])


    return (
        <div className='all-location mt-3'>
            <input placeholder='search location' onChange={(event) => handleFilter(event.target.value)} type="text" />
            <div className='all-location__container'>
                {allLocation ? allLocation.map((sig, index) => <SingleLocationPreview key={index} location={sig} />) : <Loading />}
            </div>
            <div style={{ margin: 'auto', maxWidth: "max-content", padding: '7px' }} className='all-location__bottom'>
                <button disabled={nextPage > 2 ? false : true} onClick={handlePrePage} className='btn btn-outline-dark'>Previous</button>
                <button onClick={handleNextPage} className='btn btn-outline-dark ms-3'> Next</button>
            </div>
        </div >
    )
}

export default AllLocation;
