const petrolAllowanceContainer = [
    {
        formFields: [
            {
                'label': "Total Km",
                'name': "totalKm",
                'inputType': "text",
                'placeholder': "Enter Total Km",
                'require': true
            },
            {
                'label': "Bill No.",
                'name': "billNo",
                'inputType': "text",
                'placeholder': "Enter Bill Number",
                'require': true
            },
            {
                'label': "Amount",
                'name': "amount",
                'inputType': "text",
                'placeholder': "Enter Amount",
                'require': true
            },
        ]
    },
]

const filterFormContainer = [
    {
        formFields: [
            {
                'label': "Choose Date",
                'name': "dateFilter",
                'inputType': "date",
            },
        ]
    },
    {
        formFields: [
            {
                label: 'Choose Staff',
                name: 'staffId',
                inputType: 'select',
                optionList: 'staffList',
                displayKey: 'staffName',
                uniqueKey: 'staffId',
            },
        ]
    },
    {
        formFields: [
            {
                'label': "search",
                'inputType': "button",
                'onClick' : 'searchFilter'
            },
        ]
    },
]

export {
    petrolAllowanceContainer,
    filterFormContainer
}