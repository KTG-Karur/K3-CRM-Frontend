const permissionContainer = [
    {
        formFields: [
            
            {
                label: 'Permission Type',
                name: 'permissionTypeId',
                inputType: 'select',
                optionList: 'permissionTypeList',
                displayKey: 'permissionTypeName',
                uniqueKey: 'permissionTypeId',
                require: true
            }, 
            {
                label: 'Staff',
                name: 'staffId',
                inputType: 'select',
                optionList: 'staffList',
                displayKey: 'staffName',
                uniqueKey: 'staffId',
                require: true,
                'classStyle' : 'col-6'
            },  
            
            {
                'label': "Permission Date",
                'name': "permissionDate",
                'inputType': "date",
                'require': true,
                'classStyle' : 'col-6'
            },         
            {
                'label': "Reason",
                'name': "reason",
                'inputType': "textarea",
                'placeholder': "Enter Reason",
                'require': true
            },
            
        ]
    },
]

export {
    permissionContainer
}