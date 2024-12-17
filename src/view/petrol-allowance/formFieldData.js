const petrolAllowanceContainer = [
    {
        formFields: [
            {
                'label': "Bill No.",
                'name': "billNo",
                'inputType': "text",
                'placeholder': "Enter Bill Number",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                'label': "Date of purchase",
                'name': "dateOfPurchase",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                'label': "Name of the Dealer",
                'name': "nameOfDealer",
                'inputType': "text",
                'placeholder': "Enter Dealer",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                'label': "Price per litre",
                'name': "pricePerLitre",
                'inputType': "text",
                'placeholder': "Enter Price per litre",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                'label': "Quantity per litre",
                'name': "qtyPerLitre",
                'inputType': "text",
                'placeholder': "Enter Qty per litre",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                'label': "Total Amount",
                'name': "totalAmount",
                'inputType': "number",
                'placeholder': "Enter Total Amount",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                label: 'Upload Recepit',
                name: 'billImageName',
                inputType: 'file',
                'classStyle': 'col-6'
            },
            // {
            //     'label': "Total Km",
            //     'name': "totalKm",
            //     'inputType': "text",
            //     'placeholder': "Enter Total Km",
            //     'require': true,
            //     'classStyle': 'col-6'
            // },
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
                'type': 'month',
                'onChange': 'onDateFilter'
            },
        ]
    },
    {
        formFields: [
            {
                'label': 'Branch',
                'name': 'branchId',
                'inputType': 'select',
                'optionList': 'branchList',
                'displayKey': 'branchName',
                'uniqueKey': 'branchId',
                onChange: 'handleBranch',
            },
        ]
    },
    {
        formFields: [
            {
                'label': 'Department',
                'name': 'departmentId',
                'inputType': 'select',
                'optionList': 'departmentList',
                'displayKey': 'departmentName',
                'uniqueKey': 'departmentId',
                onChange: 'handleDepartment',
            },
        ]
    },
    // {
    //     formFields: [
    //         {
    //             label: 'Choose Staff',
    //             name: 'staffId',
    //             inputType: 'select',
    //             optionList: 'staffList',
    //             displayKey: 'staffName',
    //             uniqueKey: 'staffId',
    //         },
    //     ]
    // },
    // {
    //     formFields: [
    //         {
    //             'label': "search",
    //             'inputType': "button",
    //             'onClick': 'searchFilter'
    //         },
    //     ]
    // },
]

export {
    petrolAllowanceContainer,
    filterFormContainer
}