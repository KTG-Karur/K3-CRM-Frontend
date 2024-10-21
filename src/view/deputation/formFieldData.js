const deputationContainer = [
    {
        formFields: [
            
            {
                'label': "Deputation Date",
                'name': "deputationDate",
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
                'label': "From Date",
                'name': "fromDate",
                'inputType': "date",
                'require': true,
                'classStyle' : 'col-6'
            },
            {
                'label': "To Date",
                'name': "toDate",
                'inputType': "date",
                'require': true,
                'classStyle' : 'col-6'
            },          
            {
                'label': "From Place",
                'name': "fromPlace",
                'inputType': "textarea",
                'placeholder': "Enter From Place",
                'require': true,
                'classStyle' : 'col-6'
            },
            {
                'label': "To Place",
                'name': "toPlace",
                'inputType': "textarea",
                'placeholder': "Enter To Place",
                'require': true,
                'classStyle' : 'col-6'
            },
            {
                'label': "Reason",
                'name': "reason",
                'inputType': "textarea",
                'placeholder': "Enter Reason",
                'require': true,
                'classStyle' : 'col-6'
            },
        ]
    },
]

export {
    deputationContainer
}