import { gql, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SingleCharacterPreview from '../allCharacter/single-character-preview'
import Loading from '../loading'
let FETCH_SINGLE_LOCATION = gql`

query($id:ID!) {
	location(id:$id){
   
      id
      name
      dimension
      type
      residents{
          id
          name
          image
          status
            gender

      }
      
    
  }
}



`


const SingleLocationShower = () => {
    let { locationId } = useParams()
    let { data } = useQuery(FETCH_SINGLE_LOCATION, { variables: { id: locationId } })
    useEffect(() => {
        console.log(data);
    }, [data])
    return (

        <>
            {data ? <div className='single-location-shower'>
                <div div className='single-location-shower__name' >
                    <p>{data.location.name}</p>
                </div >
                <p>Dimension - {data.location.dimension}</p>
                <p>Type - {data.location.type}</p>
                <p>All residents -</p>
                <div className='single-location-shower__resident'>
                    {data.location.residents.map((sig, index) => <SingleCharacterPreview character={sig} key={index} />)}
                </div>
            </div > : <Loading />}
        </>
    )
}

export default SingleLocationShower;
