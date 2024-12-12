const staffFilterFormContainer = [
    {
        formFields: [
            {
                'label': 'Salary Month',
                'name': 'filterSalaryMonth',
                'inputType': 'date',
                'classStyle': 'col-3',
                'type': "month",
                'maximumDate': 'maximumDate',
                'minmumDate': 'minmumDate'
            },
            {
                'label': 'Branch',
                'name': 'branchId',
                'inputType': 'select',
                'optionList': 'branchList',
                'displayKey': 'branchName',
                'uniqueKey': 'branchId',
                'classStyle': 'col-3',
                onChange: 'handleBranch',
            },
            {
                'label': 'Department',
                'name': 'departmentId',
                'inputType': 'select',
                'optionList': 'departmentList',
                'displayKey': 'departmentName',
                'uniqueKey': 'departmentId',
                'classStyle': 'col-3',
                onChange: 'handleDepartment',
            },
        ]
    },
]

const staffSalaryDetailsFormContainer = [
    {
        formFields: [
            {
                'label': 'Insentive Amount',
                'name': 'incentiveAmount',
                'inputType': 'number',
                'classStyle': 'col-6',
                'placeholder': "0",
                'maxlength': 4,
                'onChange': 'onIncentiveorBonusAmount'
            },
            {
                'label': 'Bounus Amount',
                'name': 'bonusAmount',
                'inputType': 'number',
                'classStyle': 'col-6',
                'maxlength': 4,
                'placeholder': "0",
                'onChange': 'onIncentiveorBonusAmount'
            },
            {
                'label': 'Deduction Amount',
                'name': 'deductionAmount',
                'inputType': 'number',
                'classStyle': 'col-6',
                'placeholder': "0",
                'isDisabled': true
            },
            {
                'label': 'Total Salary (Incentive + Bonus)',
                'name': 'totalSalaryAmount',
                'inputType': 'number',
                'classStyle': 'col-6',
                'placeholder': "0",
                'isDisabled': true
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
    staffSalaryBtn,
    staffSalaryDetailsFormContainer
}