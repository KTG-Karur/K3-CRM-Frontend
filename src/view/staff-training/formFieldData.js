const staffTrainingContainer = [
    {
        formFields: [

            {
                'label': "Staff Training Date",
                'name': "staffTrainingDate",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-12'
            },
            {
                'label': "From Date",
                'name': "fromDate",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-6',
                'minmumDate': 'minmumFrom',

            },
            {
                'label': "To Date",
                'name': "toDate",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-6',
                'minmumDate': 'minmumTo',
            },
            {
                'label': "No Of Debutation Days",
                'name': "dayCount",
                'inputType': "number",
                'placeholder': "0",
                'isDisabled': true,
                'classStyle': 'col-6',
            },
            {
                label: 'From Place',
                name: 'fromPlace',
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
                'classStyle': 'col-6',
            },
            {
                label: 'To Place',
                name: 'toPlace',
                inputType: 'select',
                optionList: 'branchListTo',
                displayKey: 'branchName',
                uniqueKey: 'branchId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                'label': "Reason",
                'name': "reason",
                'inputType': "textarea",
                'placeholder': "Enter Reason",
                'require': true,
                'classStyle': 'col-12'
            },
        ]
    },
]

export {
    staffTrainingContainer
}