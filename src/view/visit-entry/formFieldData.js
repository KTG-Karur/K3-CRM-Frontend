const petrolAllowanceContainer = [
    {
        formFields: [
            {
                'label': "Visit Date",
                'name': "allowanceDate",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-12'
            },
            {
                label: 'Branch',
                name: 'branchId',
                inputType: 'select',
                optionList: 'branchList',
                displayKey: 'branchName',
                'onChange': 'onBranchChange',
                uniqueKey: 'branchId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                label: 'Staff',
                name: 'staffId',
                inputType: 'select',
                optionList: 'staffList',
                displayKey: 'staffName',
                uniqueKey: 'staffId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                'label': "Total Km",
                'name': "totalKm",
                'inputType': "text",
                'placeholder': "Enter Total Km",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                label: 'Activity',
                name: 'activityIds',
                inputType: 'multiSelect',
                optionList: 'activityList',
                displayKey: 'activityName',
                uniqueKey: 'activityId',
                require: true,
                isMultiple: true,
                'classStyle': 'col-6'
            },
            {
                'label': "From Place",
                'name': "fromPlace",
                'inputType': "textarea",
                'placeholder': "Enter From Place",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                'label': "To Place",
                'name': "toPlace",
                'inputType': "textarea",
                'placeholder': "Enter To Place",
                'require': true,
                'classStyle': 'col-6'
            },
        ]
    },
]

export {
    petrolAllowanceContainer
}