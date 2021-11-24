import React from 'react'

const MappedList = ({
    label,
    data,
    colRef,
    headers,
    handleClick,
    handleArrayMapDrawer,
    handleDelete
}) => {
    
    return(
        <>
            <nav className='panel is-link'>
                <div className='panel-heading '>
                    <nav className='level is-mobile'>
                        <div className='level-left'>
                            <div className='level-item'>
                                {label}
                            </div>
                        </div>
                        <div className='level-right'>
                            <div className='level-item'>
                                <button 
                                    className="button is-small " 
                                    onClick={() => handleArrayMapDrawer(field)}
                                >
                                    add
                                </button>
                            </div>
                        </div>
                    </nav>   
                </div>
                <>
                    {data && data != undefined ? 
                        data.map((item, index) => 
                            <div className='panel-block'>
                                <p className='control list-item'>
                                    <div className='tile is-ancestor'>
                                        {headers && headers.map(h =>
                                            <>
                                                <article className='tile p-3'>{item[h.key] || "--"}</article>
                                            </> 
                                        )}
                                    </div>
                                </p>
                            </div>
                        ) : ''
                    }
                </>
            </nav>
        </>
    )
}
export default MappedList