const staffAdvanceContainer = [
    {
        formFields: [
            
            {
                'label': "Apply Date",
                'name': "applyDate",
                'inputType': "date",
                'require': true,
            },
            {
                label: 'Staff',
                name: 'staffId',
                inputType: 'select',
                optionList: 'staffList',
                displayKey: 'staffName',
                uniqueKey: 'staffId',
                require: true,
            }, 
            {
                'label': "Amount",
                'name': "amount",
                'inputType': "text",
                'placeholder': "Enter Amount",
                'require': true,
            },           
            {
                'label': "Reason",
                'name': "reason",
                'inputType': "textarea",
                'placeholder': "Enter Reason",
                'require': true,
            },
           
        ]
    },
]


const staffAdvancePayContainer = [
    {
        formFields: [
            
            {
                'label': "Payment Date",
                'name': "paidDate",
                'inputType': "date",
                'require': true,
                'classStyle' : 'col-6'
            }, 
            {
                'label': "Amount",
                'name': "paidAmount",
                'inputType': "text",
                'placeholder': "Enter Amount",
                'require': true,
                'classStyle' : 'col-6'
            },
           
        ]
    },
]

export {
    staffAdvanceContainer,staffAdvancePayContainer
}