import React from 'react'

const RelatedMapTable = ({
  data,
  colRef,
  helperColRef,
  headerFields,
  handleClick,
  handleDelete
}) => {
  return(
    <>
      <table className="table is-hoverable is-fullwidth">
        <thead className="is-size-6">
          <tr>

            {headerFields && headerFields.map(col =>

              <th style={{ width: "30%" }} key={col.keyProp}>

                {col.label && col.label}

              </th>
            )}
          </tr>

        </thead>
        <tbody className="relatedTableMapList">

          {data && data != undefined ? data.map((item, index) =>
          
            <tr key={item.id}>
              
              {headerFields && headerFields.map(col =>
                <>

                  <td
                    className="py-2"
                    style={{ width: "20%" }}
                    key={item[col.label]}
                    name={col.relatedCollection}
                    value={item[col.dataField]}
                  >
                    {item[col.dataField] === undefined ? "--" :
                    <a onClick={(e) => handleClick({ key: index, colRef: colRef, id: item.id })}>
                      {col.inputFieldType === 'currency' ? "$" : ""} {item[col.dataField]}
                    </a>
                    }
                  </td>

                </>
              )}
              {handleDelete != undefined ? <td><button className="delete is-small" onClick={()=>handleDelete(index, data, headerFields)}>x</button></td> :
              ""}
            </tr>
          ) : ""}

        </tbody>
      </table>
    </>
  )
}
export default RelatedMapTable