import React, {useState, useContext} from 'react'
import SideDrawer from '../Components/Drawers/SideDrawer'
import DrawerPage from '../Components/DrawerPage'
import Columns from '../Components/Layout/Columns'
import Column from '../Components/Layout/Column'
import {Panel, PanelHeader, PanelBlock} from '../Components/Panels/Panel'

export function useCore() {
    
    const [editModule, setEditModule ] = useState({
        open: true,
        label: 'New Module',
        })

    const [fields, setFields] = useState([
        {
            label: 'Field',
            module: 'Field',
            type: 'text',
            key: 'Field',
            ref: {
                options: ''
            },
            params: {
                header: true,
                visible: true,
                tab: 'Essentials'
            }
        }
    ])

    
    const handleSubmitNewModule = () => {
        //insert fs addDoc (Core)
    }
    const handleUpdateModule = () => {
        //insert fs updateDoc (Core)
    }
    const handleDeleteModule = () => {
        //insert fs deleteDoc (Core)
    }
    const handleCloseModule = () => {
        //insert splice
    }

    return {editModule, setEditModule, fields, setFields}
}

const RenderModule = (props) => {
    const {
        moduleData,
        fields,
        checked,
        handleToggleHeader,
        handleToggleVisible,
        handleToggleCurrency,
        handleParamsTextChange,
        handleRefTextChange,
        handleRefFieldChange,
        handleAddRefField,
        handleTextChange, 
        handleModuleTextChange,
        handleDeleteField,
        handleSelectChange,
        handleAddField,
        handleSaveModule,
        handleSubmitModule,
        handleToggleDrawer
    } = props
console.log('fields:', fields, 'module', moduleData)
    return (
        <DrawerPage>
            {moduleData && [moduleData]?.map(({open, label}) => 
            <SideDrawer 
                direction="right" 
                checked={checked && checked} 
                handleClose={()=>handleToggleDrawer()}
                title={label && label}
            >
            <div className='adminDrawer'>
            <article className='message is-active'>
            <div className='message-header'>Module Name</div>
                <div className='field'>
                    <p className='control'>
                        <input 
                            className='input' 
                            type='text' 
                            name='label' 
                            placeholder='Label' 
                            onChange={(e) => handleModuleTextChange(e)} defaultValue={label} 
                        />
                    </p>
                </div>
            </article>
                    {fields.map((field, i) => {
                        switch (field.type) {
                            case 'text':
                            return (
                                <article className='message is-info'>
                                <div className='message-header'>
                                    {field?.label}
                                    <button 
                                        className='delete' 
                                        onClick={(index)=>handleDeleteField({index: i})}
                                    ></button>
                                </div>
                                <div className='message-body'>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Label</label>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='label' 
                                                placeholder='Label' 
                                                onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.label}
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Key</label>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='key' 
                                                placeholder='Key' 
                                                onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.key}
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Type</label>
                                            <div className='select'>
                                                <select 
                                                    onChange={(e, prev, index, name) => handleSelectChange(e, {prev: field, index: i, name: 'type'})} 
                                                    defaultValue={field.type}
                                                >
                                                    <option value='text'>Text</option>
                                                    <option value='textarea'>Text-Area</option>
                                                    <option value='select'>Select</option>
                                                    <option value='related-select'>Related-Select</option>
                                                    <option value='datalist'>Datalist</option>
                                                    <option value='related-datalist'>Related Datalist</option>
                                                    <option value='related-doclink'>Related Doclink</option>
                                                    <option value='checkbox'>Checkbox</option>
                                                    <option value='datepicker'>DatePicker</option>
                                                </select>
                                            </div>
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Parameters: Header</label>
                                            <button 
                                                className={field.params.header === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                                onClick={(prev, index)=>handleToggleHeader({prev: field, index: i})}
                                            >
                                                {field.params.header === true ? 'on' : 'off'}
                                            </button>
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <p className='control'>
                                        <label className='label'>Parameters: Visible</label>
                                        <button 
                                            className={field.params.visible === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                            onClick={(prev, index)=>handleToggleVisible({prev: field, index: i})}
                                        >
                                            {field.params.visible === true ? 'on' : 'off'}
                                        </button>
                                    </p>
                                    </div>
                                    <div className='field'>
                                    <p className='control'>
                                        <label className='label'>Parameters: Currency</label>
                                        <button 
                                            className={field.params?.currency === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                            onClick={(prev, index)=>handleToggleCurrency({prev: field, index: i})}
                                        >
                                            {field.params?.currency === true ? 'on' : 'off'}
                                        </button>
                                    </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Parameters: Tab</label>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='tab' 
                                                placeholder='Tab' 
                                                onChange={(e, prev, index) => handleParamsTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.params.tab} 
                                            />
                                        </p>
                                    </div>
                                    </div>
                                </article>
                                
                            )
                            case 'textarea':
                            return (
                                <article className='message is-info'>
                                <div className='message-header'>
                                    {field?.label}
                                    <button 
                                        className='delete' 
                                        onClick={(index)=>handleDeleteField({index: i})}
                                    ></button>
                                </div>
                                <div className='message-body'>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Label</label>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='label' 
                                                placeholder='Label' 
                                                onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.label}
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Key</label>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='key' 
                                                placeholder='Key' 
                                                onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.key}
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Type</label>
                                            <div className='select'>
                                                <select 
                                                    onChange={(e, prev, index, name) => handleSelectChange(e, {prev: field, index: i, name: 'type'})} 
                                                    defaultValue={field.type}
                                                >
                                                    <option value='text'>Text</option>
                                                    <option value='textarea'>Text-Area</option>
                                                    <option value='select'>Select</option>
                                                    <option value='related-select'>Related-Select</option>
                                                    <option value='datalist'>Datalist</option>
                                                    <option value='related-datalist'>Related Datalist</option>
                                                    <option value='related-doclink'>Related Doclink</option>
                                                    <option value='checkbox'>Checkbox</option>
                                                    <option value='datepicker'>DatePicker</option>
                                                </select>
                                            </div>
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Parameters: Header</label>
                                            <button 
                                                className={field.params.header === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                                onClick={(prev, index)=>handleToggleHeader({prev: field, index: i})}
                                            >
                                                {field.params.header === true ? 'on' : 'off'}
                                            </button>
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <p className='control'>
                                        <label className='label'>Parameters: Visible</label>
                                        <button 
                                            className={field.params.visible === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                            onClick={(prev, index)=>handleToggleVisible({prev: field, index: i})}
                                        >
                                            {field.params.visible === true ? 'on' : 'off'}
                                        </button>
                                    </p>
                                    </div>
                                    <div className='field'>
                                    <p className='control'>
                                        <label className='label'>Parameters: Currency</label>
                                        <button 
                                            className={field.params?.currency === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                            onClick={(prev, index)=>handleToggleCurrency({prev: field, index: i})}
                                        >
                                            {field.params?.currency === true ? 'on' : 'off'}
                                        </button>
                                    </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Parameters: Tab</label>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='tab' 
                                                placeholder='Tab' 
                                                onChange={(e, prev, index) => handleParamsTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.params.tab} 
                                            />
                                        </p>
                                    </div>
                                    </div>
                                </article>
                            )
                            case 'select':
                            return (
                                <article className='message is-info'>
                                <div className='message-header'>
                                    {field?.label}
                                    <button 
                                        className='delete' 
                                        onClick={(index)=>handleDeleteField({index: i})}
                                    ></button>
                                </div>
                                <div className='message-body'>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Label</label>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='label' 
                                                placeholder='Label' 
                                                onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.label} 
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Key</label>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='key' 
                                                placeholder='Key' 
                                                onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.key} 
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                        <label className='label'>Type</label>
                                            <div className='select'>
                                                <select 
                                                    onChange={(e, prev, index, name) => handleSelectChange(e, {prev: field, index: i, name: 'type'})} 
                                                    defaultValue={field.type}
                                                >
                                                    <option value='text'>Text</option>
                                                    <option value='textarea'>Text-Area</option>
                                                    <option value='select'>Select</option>
                                                    <option value='related-select'>Related-Select</option>
                                                    <option value='datalist'>Datalist</option>
                                                    <option value='related-datalist'>Related Datalist</option>
                                                    <option value='related-doclink'>Related Doclink</option>
                                                    <option value='checkbox'>Checkbox</option>
                                                    <option value='datepicker'>DatePicker</option>
                                                </select>
                                            </div>
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Ref: Select Field Options</label>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='options' 
                                                placeholder='Field Options' 
                                                onChange={(e, prev, index) => handleRefTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.ref?.fields}
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Parameters: Header</label>
                                            <button 
                                                className={field.params.header === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                                onClick={(prev, index)=>handleToggleHeader({prev: field, index: i})}
                                            >
                                                {field.params.header === true ? 'on' : 'off'}
                                            </button>
                                        </p>    
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Parameters: Visible</label>
                                            <button 
                                                className={field.params.visible === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                                onClick={(prev, index)=>handleToggleVisible({prev: field, index: i})}
                                            >
                                                {field.params.visible === true ? 'on' : 'off'}
                                            </button>
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Parameters: Tab</label>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='tab' 
                                                placeholder='Tab' 
                                                onChange={(e, prev, index) => handleParamsTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.params.tab}
                                            />
                                        </p>
                                    </div>
                                </div>
                                </article>
                                
                            )
                            case 'related-select':
                            return (
                                <article className='message is-info'>
                                <div className='message-header'>
                                    {field?.label}
                                    <button 
                                        className='delete' 
                                        onClick={(index)=>handleDeleteField({index: i})}
                                    ></button>
                                </div>
                                <div className='message-body'>
                                    <div className='field'>
                                    <p className='control'>
                                    <label className='label'>Label</label>
                                    <input 
                                        className='input' 
                                        type='text' 
                                        name='label' 
                                        placeholder='Label' 
                                        onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                        defaultValue={field.label} 
                                    />
                                    </p>
                                    </div>
                                    <div className='field'>
                                    <p className='control'>
                                    <label className='label'>Key</label>
                                    <input 
                                        className='input' 
                                        type='text' 
                                        name='key' 
                                        placeholder='Key' 
                                        onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                        defaultValue={field.key} 
                                    />
                                    </p>
                                    </div>
                                    <div className='field'>
                                    <p className='control'>
                                    <label className='label'>Type</label>
                                    <div className='select'>
                                        <select 
                                            onChange={(e, prev, index, name) => handleSelectChange(e, {prev: field, index: i, name: 'type'})} 
                                            defaultValue={field.type}
                                        >
                                                    <option value='text'>Text</option>
                                                    <option value='textarea'>Text-Area</option>
                                                    <option value='select'>Select</option>
                                                    <option value='related-select'>Related-Select</option>
                                                    <option value='datalist'>Datalist</option>
                                                    <option value='related-datalist'>Related Datalist</option>
                                                    <option value='related-doclink'>Related Doclink</option>
                                                    <option value='checkbox'>Checkbox</option>
                                                    <option value='datepicker'>DatePicker</option>
                                        </select>
                                    </div>
                                    </p>
                                    </div>
                                    <div className='field'>
                                    <p className='control'>
                                    <label className='label'>Ref: Related-Select - Collection to Relate</label>
                                    <div className='select'>
                                        <select 
                                            onChange={(e, prev, index, name) => handleSelectChange(e, {prev: field, index: i, name: 'collection'})} 
                                            defaultValue={field.collection}
                                        >
                                            <option value='Locations'>Locations</option>
                                            <option value='Services'>Services</option>
                                            <option value='Tickets'>Tickets</option>
                                            <option value='Accounts'>Accounts</option>
                                            <option value='Orders'>Orders</option>
                                            <option value='Companies'>Companies</option>
                                            <option value='Contacts'>Contacts</option>
                                            <option value='Events'>Events</option>
                                            <option value='Bills'>Bills</option>
                                            <option value='Users'>Users</option>
                                            <option value='Notes'>Notes</option>
                                            <option value='Vendors'>Vendors</option>
                                            <option value='States'>States</option>
                                        </select>
                                    </div>
                                    </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>
                                        <span>Ref: Fields Array </span>
                                            <a onClick={(prev, index)=> handleAddRefField({prev: field, index: i})}>add</a>
                                    </label>
                                        <p className='control'>
                                            {field.ref?.fields?.map((item, id) => 
                                                <div className='field is-horizontal'>
                                                    <div className='field-body'>
                                                        <div className='field'>
                                                            <p className='control'>
                                                                <input 
                                                                    className='input' 
                                                                    type='text' 
                                                                    name='label' 
                                                                    placeholder='Label' 
                                                                    onChange={(e, prevField, fieldIndex, prevObj, objIndex) => 
                                                                        handleRefFieldChange(e, {
                                                                            prevField: field, 
                                                                            fieldIndex: i, 
                                                                            prevObj: item, 
                                                                            objIndex: id
                                                                        })} 
                                                                    defaultValue={item['label']} 
                                                                />
                                                            </p>
                                                        </div>
                                                        <div className='field'>
                                                            <p className='control'>
                                                                <input 
                                                                    className='input' 
                                                                    type='text' 
                                                                    name='key' 
                                                                    placeholder='Value' 
                                                                    onChange={(e, prevField, fieldIndex, prevObj, objIndex) => 
                                                                        handleRefFieldChange(e, {
                                                                            prevField: field, 
                                                                            fieldIndex: i, 
                                                                            prevObj: item, 
                                                                            objIndex: id
                                                                        })} 
                                                                    defaultValue={item['key']} 
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <p className='control'>
                                        <label className='label'>Parameters: Header</label>
                                        <button 
                                            className={field.params.header === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                            onClick={(prev, index)=>handleToggleHeader({prev: field, index: i})}
                                        >
                                            {field.params.header === true ? 'on' : 'off'}
                                        </button>
                                    </p>
                                    </div>
                                    <div className='field'>
                                    <p className='control'>
                                        <label className='label'>Parameters: Visible</label>
                                        <button 
                                            className={field.params.visible === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                            onClick={(prev, index)=>handleToggleVisible({prev: field, index: i})}
                                        >
                                            {field.params.visible === true ? 'on' : 'off'}
                                        </button>
                                    </p>
                                    </div>
                                    <div className='field'>
                                    <p className='control'>
                                    <label className='label'>Parameters: Tab</label>
                                    <input 
                                        className='input' 
                                        type='text' 
                                        name='tab' 
                                        placeholder='Tab' 
                                        onChange={(e, prev, index) => handleParamsTextChange(e, {prev: field, index: i})} 
                                        defaultValue={field.params.tab} 
                                    />
                                    </p>
                                    </div>
                                    </div>
                                </article>
                                
                            )
                            case 'datalist':
                            return (
                                <article className='message is-info'>
                                    <div className='message-header'>
                                        {field?.label}
                                            <button 
                                                className='delete' 
                                                onClick={(index)=>handleDeleteField({index: i})}
                                            ></button>
                                    </div>
                                    <div className='message-body'>
                                    <div className='field'>
                                    <label className='label'>Label</label>
                                        <p className='control'>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='label' 
                                                placeholder='Label' 
                                                onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.label} 
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Key</label>
                                        <p className='control'>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='key' 
                                                placeholder='Key' 
                                                onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.key} 
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Type</label>
                                        <p className='control'>
                                            <div className='select'>
                                                <select 
                                                    onChange={(e, prev, index, name) => handleSelectChange(e, {prev: field, index: i, name: 'type'})} 
                                                    defaultValue={field.type}
                                                >
                                                    <option value='text'>Text</option>
                                                    <option value='textarea'>Text-Area</option>
                                                    <option value='select'>Select</option>
                                                    <option value='related-select'>Related-Select</option>
                                                    <option value='datalist'>Datalist</option>
                                                    <option value='related-datalist'>Related Datalist</option>
                                                    <option value='related-doclink'>Related Doclink</option>
                                                    <option value='checkbox'>Checkbox</option>
                                                    <option value='datepicker'>DatePicker</option>
                                                </select>
                                            </div>
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Ref: Fields </label>
                                        <p className='control'>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='fields' 
                                                placeholder='Fields to Relate' 
                                                onChange={(e, prev, index) => handleRefTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.ref?.fields} 
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>
                                        <span>Ref: Fields Array </span>
                                            <a onClick={(prev, index)=> handleAddRefField({prev: field, index: i})}>add</a>
                                    </label>
                                        <p className='control'>
                                            {field.ref?.fields?.map((item, id) => 
                                                <div className='field is-horizontal'>
                                                    <div className='field-body'>
                                                        <div className='field'>
                                                            <p className='control'>
                                                                <input 
                                                                    className='input' 
                                                                    type='text' 
                                                                    name='label' 
                                                                    placeholder='Label' 
                                                                    onChange={(e, prevField, fieldIndex, prevObj, objIndex) => 
                                                                        handleRefFieldChange(e, {
                                                                            prevField: field, 
                                                                            fieldIndex: i, 
                                                                            prevObj: item, 
                                                                            objIndex: id
                                                                        })} 
                                                                    defaultValue={item['label']} 
                                                                />
                                                            </p>
                                                        </div>
                                                        <div className='field'>
                                                            <p className='control'>
                                                                <input 
                                                                    className='input' 
                                                                    type='text' 
                                                                    name='key' 
                                                                    placeholder='Value' 
                                                                    onChange={(e, prevField, fieldIndex, prevObj, objIndex) => handleRefFieldChange(e, {prevField: field, fieldIndex: i, prevObj: item, objIndex: id})} 
                                                                    defaultValue={item['key']} 
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Parameters: Header</label>
                                        <p className='control'>
                                            <button 
                                                className={field.params.header === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                                onClick={(prev, index)=>handleToggleHeader({prev: field, index: i})}
                                            >
                                                {field.params.header === true ? 'on' : 'off'}
                                            </button>
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Parameters: Visible</label>
                                            <button 
                                                className={field.params.visible === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                                onClick={(prev, index)=>handleToggleVisible({prev: field, index: i})}
                                            >
                                                {field.params.visible === true ? 'on' : 'off'}
                                            </button>
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Parameters: Tab</label>
                                        <p className='control'>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='tab' 
                                                placeholder='Tab' 
                                                onChange={(e, prev, index) => handleParamsTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.params.tab} 
                                            />
                                        </p>
                                    </div>
                                    </div>
                                </article>
                            )
                            case 'related-datalist':
                            return (
                                <article className='message is-info'>
                                    <div className='message-header'>
                                        {field?.label}
                                            <button 
                                                className='delete' 
                                                onClick={(index)=>handleDeleteField({index: i})}
                                            ></button>
                                    </div>
                                    <div className='message-body'>
                                    <div className='field'>
                                    <label className='label'>Label</label>
                                        <p className='control'>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='label' 
                                                placeholder='Label' 
                                                onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.label} 
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Key</label>
                                        <p className='control'>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='key' 
                                                placeholder='Key' 
                                                onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.key} 
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Type</label>
                                        <p className='control'>
                                            <div className='select'>
                                                <select 
                                                    onChange={(e, prev, index, name) => handleSelectChange(e, {prev: field, index: i, name: 'type'})} 
                                                    defaultValue={field.type}
                                                >
                                                    <option value='text'>Text</option>
                                                    <option value='textarea'>Text-Area</option>
                                                    <option value='select'>Select</option>
                                                    <option value='related-select'>Related-Select</option>
                                                    <option value='datalist'>Datalist</option>
                                                    <option value='related-datalist'>Related Datalist</option>
                                                    <option value='related-doclink'>Related Doclink</option>
                                                    <option value='checkbox'>Checkbox</option>
                                                    <option value='datepicker'>DatePicker</option>
                                                </select>
                                            </div>
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Ref: Related-Datalist Field Collection</label>
                                        <p className='control'>
                                            <div className='select'>
                                                <select 
                                                    onChange={(e, prev, index, name) => handleSelectChange(e, {prev: field, index: i, name: 'collection'})} 
                                                    defaultValue={field.ref?.collection}
                                                >
                                                    <option value='Locations'>Locations</option>
                                                    <option value='Services'>Services</option>
                                                    <option value='Tickets'>Tickets</option>
                                                    <option value='Accounts'>Accounts</option>
                                                    <option value='Orders'>Orders</option>
                                                    <option value='Companies'>Companies</option>
                                                    <option value='Contacts'>Contacts</option>
                                                    <option value='Events'>Events</option>
                                                    <option value='Bills'>Bills</option>
                                                    <option value='Users'>Users</option>
                                                    <option value='Notes'>Notes</option>
                                                </select>
                                            </div>
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Ref: Related-Select - Fields to Relate</label>
                                        <p className='control'>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='fields' 
                                                placeholder='Fields to Relate' 
                                                onChange={(e, prev, index) => handleRefTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.ref?.fields} 
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Parameters: Header</label>
                                        <p className='control'>
                                            <button 
                                                className={field.params.header === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                                onClick={(prev, index)=>handleToggleHeader({prev: field, index: i})}
                                            >
                                                {field.params.header === true ? 'on' : 'off'}
                                            </button>
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Parameters: Visible</label>
                                            <button 
                                                className={field.params.visible === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                                onClick={(prev, index)=>handleToggleVisible({prev: field, index: i})}
                                            >
                                                {field.params.visible === true ? 'on' : 'off'}
                                            </button>
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Parameters: Tab</label>
                                        <p className='control'>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='tab' 
                                                placeholder='Tab' 
                                                onChange={(e, prev, index) => handleParamsTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.params.tab} 
                                            />
                                        </p>
                                    </div>
                                    </div>
                                </article>
                            )
                            case 'datepicker':
                            return (
                                <article className='message is-info'>
                                    <div className='message-header'>
                                        {field?.label}
                                            <button 
                                                className='delete' 
                                                onClick={(index)=>handleDeleteField({index: i})}
                                            ></button>
                                    </div>
                                    <div className='message-body'>
                                    <div className='field'>
                                    <label className='label'>Label</label>
                                        <p className='control'>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='label' 
                                                placeholder='Label' 
                                                onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.label} 
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Key</label>
                                        <p className='control'>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='key' 
                                                placeholder='Key' 
                                                onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.key} 
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Type</label>
                                        <p className='control'>
                                            <div className='select'>
                                                <select 
                                                    onChange={(e, prev, index, name) => handleSelectChange(e, {prev: field, index: i, name: 'type'})} 
                                                    defaultValue={field.type}
                                                >
                                                    <option value='text'>Text</option>
                                                    <option value='textarea'>Text-Area</option>
                                                    <option value='select'>Select</option>
                                                    <option value='related-select'>Related-Select</option>
                                                    <option value='datalist'>Datalist</option>
                                                    <option value='related-datalist'>Related Datalist</option>
                                                    <option value='related-doclink'>Related Doclink</option>
                                                    <option value='checkbox'>Checkbox</option>
                                                    <option value='datepicker'>DatePicker</option>
                                                </select>
                                            </div>
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Parameters: Header</label>
                                        <p className='control'>
                                            <button 
                                                className={field.params.header === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                                onClick={(prev, index)=>handleToggleHeader({prev: field, index: i})}
                                            >
                                                {field.params.header === true ? 'on' : 'off'}
                                            </button>
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Parameters: Visible</label>
                                            <button 
                                                className={field.params.visible === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                                onClick={(prev, index)=>handleToggleVisible({prev: field, index: i})}
                                            >
                                                {field.params.visible === true ? 'on' : 'off'}
                                            </button>
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Parameters: Tab</label>
                                        <p className='control'>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='tab' 
                                                placeholder='Tab' 
                                                onChange={(e, prev, index) => handleParamsTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.params.tab} 
                                            />
                                        </p>
                                    </div>
                                    </div>
                                </article>
                            )
                            case 'related-doclink':
                            return (
                                <article className='message is-info'>
                                    <div className='message-header'>
                                        {field?.label}
                                            <button 
                                                className='delete' 
                                                onClick={(index)=>handleDeleteField({index: i})}
                                            ></button>
                                    </div>
                                    <div className='message-body'>
                                    <div className='field'>
                                    <label className='label'>Label</label>
                                        <p className='control'>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='label' 
                                                placeholder='Label' 
                                                onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.label} 
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Key</label>
                                        <p className='control'>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='key' 
                                                placeholder='Key' 
                                                onChange={(e, prev, index) => handleTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.key} 
                                            />
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Type</label>
                                        <p className='control'>
                                            <div className='select'>
                                                <select 
                                                    onChange={(e, prev, index, name) => handleSelectChange(e, {prev: field, index: i, name: 'type'})} 
                                                    defaultValue={field.type}
                                                >
                                                    <option value='text'>Text</option>
                                                    <option value='textarea'>Text-Area</option>
                                                    <option value='select'>Select</option>
                                                    <option value='related-select'>Related-Select</option>
                                                    <option value='datalist'>Datalist</option>
                                                    <option value='related-datalist'>Related Datalist</option>
                                                    <option value='related-doclink'>Related Doclink</option>
                                                    <option value='checkbox'>Checkbox</option>
                                                    <option value='datepicker'>DatePicker</option>
                                                </select>
                                            </div>
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Field to Reference</label>
                                        <p className='control'>
                                            <div className='select'>
                                                <select 
                                                    onChange={(e, prev, index, name) => handleSelectChange(e, {prev: field, index: i, name: 'ref'})} 
                                                    defaultValue={field?.ref}
                                                >
                                                    <option>Choose a field</option>
                                                    {fields.map(f => 
                                                        <option value={f.key}>{f.key}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Parameters: Header</label>
                                        <p className='control'>
                                            <button 
                                                className={field.params.header === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                                onClick={(prev, index)=>handleToggleHeader({prev: field, index: i})}
                                            >
                                                {field.params.header === true ? 'on' : 'off'}
                                            </button>
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <label className='label'>Parameters: Visible</label>
                                            <button 
                                                className={field.params.visible === true ? 'button is-primary is-small' : 'button is-danger is-small'} 
                                                onClick={(prev, index)=>handleToggleVisible({prev: field, index: i})}
                                            >
                                                {field.params.visible === true ? 'on' : 'off'}
                                            </button>
                                        </p>
                                    </div>
                                    <div className='field'>
                                    <label className='label'>Parameters: Tab</label>
                                        <p className='control'>
                                            <input 
                                                className='input' 
                                                type='text' 
                                                name='tab' 
                                                placeholder='Tab' 
                                                onChange={(e, prev, index) => handleParamsTextChange(e, {prev: field, index: i})} 
                                                defaultValue={field.params.tab} 
                                            />
                                        </p>
                                    </div>
                                    </div>
                                </article>
                            )
                        }
                    })}
                    
                    <div className='field is-grouped'>
                    <div className='control'>
                        <button className='button' onClick={()=>handleAddField()}>Add Field</button>
                    </div>
                    <div className='control'>
                        <button className='button' onClick={()=>handleSaveModule()}>Save Module</button>
                    </div>
                    <div className='control'>
                        <button className='button' onClick={()=>handleSubmitModule()}>Submit Module</button>
                    </div>
                    </div>
            </div>    
            </SideDrawer>
        )}
        </DrawerPage>
            
    )
}
export default RenderModule