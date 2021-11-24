    export const fieldsCompanies = [
            {
                'label': 'Name',
                'type': 'text',
                'key': 'Name',
                'value': '',
                'params': {
                        'header': true,
                        'visible': true,
                        'tab': 'Essentials'
                    }
            },
            {
                'label': 'Phone',
                'type': 'telephone',
                'key': 'Phone',
                'value': '',
            },
            {
                'label': 'Users',
                'type': 'ref',
                'key': 'Users',
                'ref': {
                    'collection': 'Users',
                    'key': 'Companies',
                    'value': 'id',
                    'type': 'query',
                    'fields': [
                        'Email', 
                        'FirstName', 
                        'LastName'
                    ]
                },
                'params': {
                    'header': false,
                    'visible': true,
                    'tab': 'Users'
                }
            },
            {
                'label': 'Locations',
                'type': 'ref',
                'key': 'Locations',
                'ref': {
                    'collection': 'Locations',
                    'key': 'CompanyID',
                    'value': '',
                    'type': 'query',
                    'fields': [
                        'Name',
                        'Address1'
                    ]
                },
                'params': {
                    'header': false,
                    'visible': true,
                    'tab': 'Locations'
                }
            }
        ]

    export const fieldsServices = [
        {
            label: 'Service Location',
            type: 'ref',
            key: 'LocationName',
            ref: {
                collection: 'Locations',
                type: 'link',
                fields: [
                    'Name',
                    'Address1'
                ]
            },
            params: {
                header: false,
                visible: true,
                groupable: true,
                tab: 'Details'
            }
        },
        {
            label: 'Vendor',
            type: 'ref',
            key: 'Vendor',
            ref: {
                collection: 'Core',
                key: 'vendorList',
                type: 'select',
            },
            params: {
                header: false,
                visible: true,
                groupable: true,
                tab: 'Essentials'
            }
        },
        {
            label: 'Type',
            type: 'ref',
            key: 'Type',
            ref: {
                collection: 'Core',
                key: 'typeList',
                type: 'select',
            },
            params: {
                header: false,
                visible: true,
                groupable: true,
                tab: 'Essentials'
            }
        },
        {
            label: 'Service Name',
            type: 'text',
            key: 'VendorServiceName',
            params: {
                    header: true,
                    visible: true,
                    tab: 'Essentials'
                }
        },
        {
            label: 'Access Type',
            type: 'ref',
            key: 'AccessType',
            ref: {
                collection: 'Core',
                key: 'accessList',
                type: 'select',
            },
            params: {
                header: false,
                visible: true,
                tab: 'Essentials'
            }
        },
        {
            label: 'Asset ID',
            type: 'text',
            key: 'AssetID',
            params: {
                    header: true,
                    visible: true,
                    tab: 'Essentials'
                }
        },
        {
            label: 'Bandwidth',
            type: 'text',
            key: 'Bandwidth',
            params: {
                header: false,
                visible: true,
                tab: 'Essentials'
            }
        },
        {
            label: 'MRC',
            type: 'currency',
            key: 'MRC',
            params: {
                header: false,
                visible: true,
                tab: 'Essentials'
            }
        },
        {
            label: 'Status',
            type: 'ref',
            key: 'Status',
            ref: {
                key: 'id',
                type: 'local-select',
                options: [
                    'Active',
                    'Disconnected',
                    'Pending'
                ]
            },
            params: {
                header: false,
                visible: true,
                tab: 'Essentials'
            }
        },
        {
            label: 'Location',
            type: 'ref',
            key: 'Location',
            ref: {
                collection: 'Locations',
                key: 'ServiceID',
                type: 'query',
                fields: [
                    'Name',
                    'Address1'
                ]
            },
            params: {
                header: false,
                visible: true,
                tab: 'Details'
            }
        },
        {
            label: 'Start Date',
            type: 'datepicker',
            key: 'StartDate',
            params: {
                header: false,
                visible: true,
                tab: 'Details'
            }
        },
        {
            label: 'Last Mile',
            type: 'ref',
            key: 'LastMile',
            ref: {
                collection: 'Core',
                type: 'select',
                key: 'vendorList',
            },
            params: {
                header: false,
                visible: true,
                tab: 'Details'
            }
        },
        {
            label: 'LEC Circuit ID',
            type: 'text',
            key: 'LECCircuitID',
            params: {
                header: false,
                visible: true,
                tab: 'Details'
            }
        },
        {
            label: 'Demarc Info',
            type: 'textarea',
            key: 'DemarcInfo',
            params: {
                header: false,
                visible: true,
                tab: 'Details'
            }
        },
        {
            label: 'IP Details',
            type: 'ref',
            key: 'IPDetails',
            ref: {
                key: 'id',
                type: 'local-array',
            },
            params: {
                header: false,
                visible: true,
                tab: 'Essentials'
            }
        },
        {
            label: 'Account',
            type: 'ref',
            key: 'Account',
            ref: {
                collection: 'Accounts',
                key: 'ServiceID',
                type: 'query',
                fields: [
                    'AccountNum',
                    'Vendor'
                ]
            },
            params: {
                header: false,
                visible: true,
                tab: 'Billing'
            }
        },
        {
            label: 'Sub Account',
            type: 'text',
            key: 'SubAccountNum',
            params: {
                header: false,
                visible: true,
                tab: 'Billing'
            }
        },
        {
            label: 'Group Number',
            type: 'text',
            key: 'GroupNum',
            params: {
                header: false,
                visible: true,
                tab: 'Billing'
            }
        },
        {
            label: 'Tickets',
            type: 'ref',
            key: 'Tickets',
            ref: {
                collection: 'Tickets',
                key: 'ServiceID',
                type: 'query',
                fields: [
                    'TicketNum',
                    'Status'
                ]
            },
            params: {
                header: false,
                visible: true,
                tab: 'Related'
            }
        },
        {
            label: 'Notes',
            type: 'ref',
            key: 'Notes',
            ref: {
                collection: 'Notes',
                key: 'ServiceID',
                type: 'query',
                fields: [
                    'Date',
                    'Note'
                ]
            },
            params: {
                header: false,
                visible: true,
                tab: 'Related'
            }
        },
        {
            label: 'Attachments',
            type: 'ref',
            key: 'Attachments',
            ref: {
                collection: 'Attachments',
                key: 'ServiceID',
                type: 'query',
                fields: [
                    'Date',
                    'Name'
                ]
            },
            params: {
                header: false,
                visible: true,
                tab: 'Related'
            }
        },
        {
            label: 'Events',
            type: 'ref',
            key: 'Events',
            ref: {
                collection: 'Events',
                key: 'ServiceID',
                type: 'query',
                fields: [
                    'Date',
                    'EventName'
                ]
            },
            params: {
                header: false,
                visible: true,
                tab: 'Related'
            }
        },
        {
            label: 'Tags',
            type: 'ref',
            key: 'Tags',
            ref: {
                key: 'id',
                type: 'local-array',
            },
            params: {
                header: false,
                visible: true,
                tab: 'Essentials'
            }
        }
    ]
    export const fieldsUsers = [
        {
            _sys: {
                _tags: [
                    'Active',
                    'Suspended',
                    'Pending',
                    'Incorrect'
                ],
                _modules: [
                        {
                            key: 'Orders',
                            headers: [
                                {
                                    key: 'OrderNum',
                                    label: 'OrderNum',
                                    visible: true,
                                    _index: 1
                                },
                                {
                                    key: 'Vendor',
                                    label: 'Vendor',
                                    visible: true,
                                    _index: 2
                                }
                            ],
                        },
                        {
                            key: 'Services',
                            headers: [
                                {
                                    key: 'AssetID',
                                    label: 'Asset ID',
                                    visible: true,
                                    _index: 1
                                },
                                {
                                    key: 'VendorServiceName',
                                    label: 'Service',
                                    visible: true,
                                    _index: 2
                                },
                                {
                                    key: 'Vendor',
                                    label: 'Vendor',
                                    visible: true,
                                    _index: 3
                                },
                                {
                                    key: 'Type',
                                    label: 'Type',
                                    visible: false,
                                    _index: 4
                                },
                                {
                                    key: 'LocationName',
                                    label: 'Location',
                                    visible: false,
                                    _index: 5
                                }
                            ]
                        },
                        {
                            key: 'Locations',
                            headers: [
                                {
                                    key: 'Name',
                                    label: 'Name',
                                    visible: true,
                                    _index: 1
                                },
                                {
                                    key: 'Address1',
                                    label: 'Address1',
                                    visible: true,
                                    _index: 2
                                },
                                {
                                    key: 'Address2',
                                    label: 'Address2',
                                    visible: true,
                                    _index: 3
                                },
                                {
                                    key: 'City',
                                    label: 'City',
                                    visible: true,
                                    _index: 4
                                },
                                {
                                    key: 'State',
                                    label: 'State',
                                    visible: true,
                                    _index: 5
                                },
                                {
                                    key: 'Zip',
                                    label: 'Zip',
                                    visible: true,
                                    _index: 6
                                }
                            ]
                        },
                        {
                            key: 'Tickets',
                            headers: [
                                {
                                    key: 'TicketNum',
                                    label: 'Ticket',
                                    visible: true,
                                    _index: 1
                                },
                                {
                                    key: 'Vendor',
                                    label: 'Vendor',
                                    visible: true,
                                    _index: 2
                                },
                                {
                                    key: 'Status',
                                    label: 'Status',
                                    visible: true,
                                    _index: 3
                                }
                            ],
                        },
                        {
                            key: 'Users',
                            headers: [
                                {
                                    key: 'Email',
                                    label: 'Email',
                                    visible: true,
                                    _index: 1
                                },
                                {
                                    key: 'FirstName',
                                    label: 'First Name',
                                    visible: true,
                                    _index: 2
                                },
                                {
                                    key: 'LastName',
                                    label: 'Last Name',
                                    visible: true,
                                    _index: 3
                                }
                            ],
                        },
                        {
                            key: 'Contacts',
                            headers: [
                                {
                                    key: 'OrderNum',
                                    label: 'OrderNum',
                                    visible: true,
                                    _index: 1
                                },
                                {
                                    key: 'Vendor',
                                    label: 'Vendor',
                                    visible: true,
                                    _index: 2
                                }
                            ],
                        }
                    ],   
                },
            }
        ]