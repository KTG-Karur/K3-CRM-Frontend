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
                require: true,
                'classStyle': 'col-6'
            },
            {
                'label': "Permission Date",
                'name': "permissionDate",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-6'
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
                label: 'Permission Staff',
                name: 'staffId',
                inputType: 'select',
                optionList: 'staffList',
                displayKey: 'staffName',
                'onChange': 'onStaffChange',
                uniqueKey: 'staffId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                label: 'Spoken Staff',
                name: 'spokenStaffId',
                inputType: 'select',
                optionList: 'spokenStaffList',
                displayKey: 'staffName',
                uniqueKey: 'staffId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                label: 'Spoken Time',
                name: 'spokenTime',
                inputType: 'time',
                displayKey: 'staffName',
                uniqueKey: 'spokenTime',
                require: true,
                'classStyle': 'col-6'
            },
            {
                'label': "Spoken Date",
                'name': "spokenDate",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                'label': "Reason",
                'name': "reason",
                'inputType': "textarea",
                'placeholder': "Enter Reason",
                'require': true,
                'classStyle': 'col-6'
            },

        ]
    },
]

export {
    permissionContainer
}