import React, { useContext } from 'react'
import { stateContext } from '../../Contexts/stateContext'

import TileField from '../../Components/Layout/TileField'

const UserSettings = () => {
  const userContext = useContext(stateContext)
  const { currentUser } = userContext.userSession

  const fieldState = [
    {
      label: 'Module',
      type: 'text',
      key: 'name'
    },
    {
      label: 'headers',
      type: 'ref',
      key: 'headers',
      ref: {
        key: 'id',
        type: 'local-array',
        fields: ['key', 'label', 'visible']
      }
    },
    {
      label: 'Fields',
      type: 'ref',
      key: 'fields',
      ref: {
        key: 'id',
        type: 'local-array',
        fields: [
          {
            label: 'Key',
            type: 'text',
            key: 'key'
          }, 
          {
            label: 'Label',
            type: 'text',
            key: 'label'
          }, 
          {
            label: 'Type',
            type: 'text',
            key: 'type'
          },
          {
            label: 'Ref',
            type: 'local-array',
            key: 'ref'
            }
          ]
      }
    }

  ]


  return(
    <>
      
    </>
  )
}
export default UserSettings