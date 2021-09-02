import React from 'react'
import SelectField from '../../Components/Forms/SelectField'
import TextBox from '../../Components/Forms/TextBox'
import TextArea from '../../Components/Forms/TextArea'

const RelatedPageInputFields = ({ 
    relatedFields, 
    handleChange, 
    
    handleUpdated,
    activeData,
    relatedData  
  }) => {
      console.log(relatedFields)
  

  return(
    <>
    
      {relatedFields && relatedFields.map(related => {
        switch (related.inputFieldType) {

          case "related-select":
            return (
              <>
  
                <SelectField
                  type="select"
                  title={related.label}
                  name={related.dataField, <a className="link is-size-7 pl-1" onClick={() => handleAddValue(related)}>(add)</a>}
                  value={activeData && activeData[related.dataField]}
                  handleChange={(e) => handleRelatedSelectChange(e, { name: related.dataField, relatedName: related.relatedDataField })}
                  field={related}
                  handleAddValue={(e) => handleAddRelatedValue(e)}
                  showAddLink={true}
                >
                  
                  <option></option>

                  {related.inputSource && related.inputSource.map(i =>

                    <option id={i[related.inputID]} name={i[related.dataField]} key={i[related.inputID]}>
                      {i[related.inputValue]}
                    </option>

                  )}
                </SelectField>

              </>
            )

          case "text":
            return (
              <>
                <TextBox title={related.label} name={related.dataField} fieldChanged={handleChange} />
              </>
            )

          case "currency":
            return (

              <TextBox title={related.label} addOn="currency" name={related.dataField} fieldChanged={handleChange} />

            )

          case "text-area":
            return (

              <TextArea title={related.label} name={related.dataField} fieldChanged={handleChange} />

            )

          case "datepicker":
            return (
              <TextBox
                id="datetime-local"
                title={related.label}
                type="date"
                name={related.dataField}
                className="input is-rounded is-small"
                value={related && relatedData[related.dataField]}
                fieldChanged={(e)=>handleChange(e)}
              />
            )
        }
      }
      )}
    </>  
  )
}
export default RelatedPageInputFields