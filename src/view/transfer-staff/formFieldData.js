const transferStaffContainer = [
    {
        formFields: [
            
            {
                'label': "Transfer Date",
                'name': "transferDate",
                'inputType': "date",
                'require': true,
                'classStyle' : 'col-6'
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
                'label': "From Place",
                'name': "transferFrom",
                'inputType': "textarea",
                'placeholder': "Enter From Place",
                'require': true,
                'classStyle' : 'col-6'
            },
            {
                'label': "To Place",
                'name': "transferTo",
                'inputType': "textarea",
                'placeholder': "Enter To Place",
                'require': true,
                'classStyle' : 'col-6'
            },
        ]
    },
]

export {
    transferStaffContainer
}