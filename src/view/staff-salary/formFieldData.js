const staffFilterFormContainer = [
    {
        formFields: [
            {
                'label': 'Salary Month',
                'name': 'filterSalaryMonth',
                'inputType': 'date',
                'classStyle': 'col-3',
                'type':"month",
                'maximumDate':'maximumDate',
                'minmumDate':'minmumDate'
            },
            {
                'label': 'Branch',
                'name': 'branchId',
                'inputType': 'select',
                'optionList': 'branchList',
                'displayKey': 'branchName',
                'uniqueKey': 'branchId',
                'classStyle': 'col-3',
            },
            {
                'label': 'Department',
                'name': 'departmentId',
                'inputType': 'select',
                'optionList': 'departmentList',
                'displayKey': 'departmentName',
                'uniqueKey': 'departmentId',
                'classStyle': 'col-3',
            },
        ]
    },
]

const staffSalaryBtn = [
    {
        formFields: [
            {
                'label': "Submit",
                'name': "departmentName",
                'inputType': "button",
                'onClick': "onFormSubmit",
                'classStyle': 'col-12',
            },
        ]
    },
]

export {
    staffFilterFormContainer,
    staffSalaryBtn
}