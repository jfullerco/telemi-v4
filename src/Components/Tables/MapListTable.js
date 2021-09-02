import React from 'react'

const MapListTable = ({
  data,
  colRef,
  headerFields,
  handleClick
}) => {
  return(
    <>
      <table className="table is-hoverable is-fullwidth">
        <thead className="is-size-6">
          <tr>

            {headerFields && headerFields.map(col =>

              <th style={{ width: "20%" }} key={col.keyProp}>

                {col.label && col.label}

              </th>
            )}
          </tr>

        </thead>
        <tbody className="is-size-7">

          {data && data != undefined ? data.map(item =>
          
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

                    <a onClick={(e) => handleClick({ colRef: colRef, id: item.id })}>
                      {col.inputFieldType === 'currency' ? "$" : ""} {item[col.dataField]}
                    </a>

                  </td>

                </>
              )}
            </tr>
          ) : ""}

        </tbody>
      </table>
    </>
  )
}
export default MapListTable