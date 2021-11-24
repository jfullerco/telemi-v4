import React, {useContext, useEffect} from 'react'
import {stateContext} from '../../Contexts/stateContext'

const RelatedSelectField = (props) => {
    // console.log('related', props)
    return (
        <div className="is-flex"> 
            {props?.data?.map(d => 
                props?.headers?.map(f =>
                    <>{d[f]}</>
                )
            )}
        </div>
    )
}

export default RelatedSelectField