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
                label: 'From Place',
                name: 'transferFrom',
                inputType: 'select',
                optionList: 'branchList',
                displayKey: 'branchName',
                uniqueKey: 'branchId',
                require: true,
                'classStyle' : 'col-6'
            },  
            
            {
                label: 'To Place',
                name: 'transferTo',
                inputType: 'select',
                optionList: 'branchList',
                displayKey: 'branchName',
                uniqueKey: 'branchId',
                require: true,
                'classStyle' : 'col-6'
            },  

        ]
    },
]

export {
    transferStaffContainer
}