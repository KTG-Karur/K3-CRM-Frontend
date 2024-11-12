const attendanceContainer = [
    {
        formFields: [
            {
                'label': "Branch",
                'name': "branchId",
                'inputType': "select",
                optionList: 'branchList',
                displayKey: 'branchName',
                uniqueKey: 'branchId',
                classStyle: 'col-6'
            },
            {
                label: 'Department',
                name: 'departmentId',
                inputType: 'select',
                optionList: 'departmentList',
                displayKey: 'departmentName',
                uniqueKey: 'departmentId',
                classStyle: 'col-6',
            },
        ]
    },
]

const attendancePresentAbsent = [
    {
        formFields: [
            {
                displayKey: 'Present',
                name: 'attendanceStatusId',
                inputType: 'radio',
                classStyle: 'col-4',
            },
            {
                'displayKey': "Absent",
                'name': "attendanceStatusId",
                'inputType': "radio",
                classStyle: 'col-4'
            },
        ]
    },
]

export {
    attendanceContainer,
    attendancePresentAbsent
}