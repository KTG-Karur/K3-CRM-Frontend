const transferStaffContainer = [
    {
        formFields: [

            {
                'label': "Joining Date",
                'name': "joiningDate",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-6',
                'minmumDate': 'minmum',
            },
            {
                'label': "Relieving Date",
                'name': "relievingDate",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-6',
                'maximumDate': 'maximum',
            },
            {
                label: 'From Place',
                name: 'transferFrom',
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
                label: 'To Place',
                name: 'transferTo',
                inputType: 'select',
                optionList: 'branchListTo',
                displayKey: 'branchName',
                uniqueKey: 'branchId',
                require: true,
                'classStyle': 'col-6'
            },

        ]
    },
]

export {
    transferStaffContainer
}