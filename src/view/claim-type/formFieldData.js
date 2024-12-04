const employeeFormContainer = [
    {
        formFields: [
            {
                'label': "Claim Type Name",
                'name': "claimTypeName",
                'inputType': "text",
                'placeholder': "Enter Claim Type Name",
                'require': true,
                'classStyle': 'col-6',
            },
            {
                'label': "Claim Eligible Amount",
                'name': "eligibleAmount",
                'inputType': "number",
                'placeholder': "Enter Claim Eligible Amount",
                'require': true,
                'classStyle': 'col-6',
            },
        ]
    },
]

export {
    employeeFormContainer
}