const employeeFormContainer = [
    {
        formFields: [
            {
                'label': "Request Date",
                'name': "applyDate",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-12'
            },
            {
                label: 'Payment Mode',
                name: 'modeOfPaymentId',
                inputType: 'radio',
                optionList: 'paymentModeList',
                displayKey: 'paymentModeName',
                uniqueKey: 'paymentModeId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                label: 'Upload Recepit',
                name: 'uploadImage',
                inputType: 'file',
                'classStyle': 'col-6'
            },
            {
                label: 'Branch',
                name: 'branchId',
                inputType: 'select',
                optionList: 'branchList',
                displayKey: 'branchName',
                uniqueKey: 'branchId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                label: 'Requested By',
                name: 'requestedBy',
                inputType: 'select',
                optionList: 'staffList',
                displayKey: 'staffName',
                uniqueKey: 'staffId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                label: 'Claim Type',
                name: 'claimTypeId',
                inputType: 'select',
                optionList: 'claimTypeList',
                displayKey: 'claimTypeName',
                uniqueKey: 'claimTypeId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                'label': "Requested Amount",
                'name': "requestedAmount",
                'inputType': "text",
                'placeholder': "Enter Requested Amount",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                'label': "Description",
                'name': "reason",
                'inputType': "textarea",
                'placeholder': "Enter Description About Claim",
                'require': true,
            },
        ]
    },
]

const approvedFormContainer = [
    {
        formFields: [
            {
                'label': "Approved Date",
                'name': "approvedDate",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-12'
            },
            {
                'label': "Claim Amount",
                'name': "claimAmount",
                'inputType': "text",
                'placeholder': "Enter Claim Amount",
                'require': true,
                'classStyle': 'col-12'
            },
        ]
    },
]

export {
    employeeFormContainer,
    approvedFormContainer
}