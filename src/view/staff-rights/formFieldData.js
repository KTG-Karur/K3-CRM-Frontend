

const formContainer = [
    {
        formFields: [
            {
                label: 'Staff',
                name: 'staffId',
                inputType: 'select',
                displayKey: 'staffName',
                optionList: 'staff_list',
                uniqueKey: 'staffId',
                onChange: 'onChangeStaff',
                require: true,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'Staff Code',
                name: 'staffCode',
                inputType: 'text',
                placeholder: 'Enter Code Name',
                require: false,
                disabled: true,
            },
        ],
    },
    {
        formFields: [
            {
                label: 'User Name',
                name: 'staffName',
                inputType: 'text',
                placeholder: 'Enter Staff Name',
                require: false,
                disabled: true,
            },
        ],
    }
]


const formContainerStaffRights = [
    {
        title: "Master",
        create: "master_ins",
        update: "master_upd",
        delete: "master_del",
        view: "master_view",
    },
    {
        title: "Staff",
        create: "staff_ins",
        update: "staff_upd",
        delete: "staff_del",
        view: "staff_view",
    },
    {
        title: "Visit Entry",
        create: "visitEntry_ins",
        update: "visitEntry_upd",
        delete: "visitEntry_del",
        view: "visitEntry_view",
    },
    {
        title: "Petrol Allowance",
        create: "petrolAllowance_ins",
        update: "petrolAllowance_upd",
        delete: "petrolAllowance_del",
        view: "petrolAllowance_view",
    },
    {
        title: "Salary",
        create: "salary_ins",
        update: "salary_upd",
        delete: "salary_del",
        view: "salary_view",
    },
    // {
    //     title: "Attendance",
    //     create: "collection_ins",
    //     update: "collection_upd",
    //     delete: "collection_del",
    //     view: false,
    // },
    // {
    //     title: "Attendance Incharge",
    //     create: "return_ins",
    //     update: "return_upd",
    //     delete: "return_del",
    //     view: false,
    // },
    // {
    //     title: "Claim",
    //     create: "expenses_ins",
    //     update: "expenses_upd",
    //     delete: "expenses_del",
    //     view: false,
    // },
    // {
    //     title: "Transfer",
    //     update: false,
    //     create: false,
    //     delete: "draft_del",
    //     view: "draft_view",
    // },
    // {
    //     title: "Deputation",
    //     create: false,
    //     update: false,
    //     delete: false,
    //     view: "reports_view",
    // },
    // {
    //     title: "Salary Advance",
    //     create: false,
    //     update: "settings_upd",
    //     delete: false,
    //     view: "settings_view",
    // },
    // {
    //     title: "Advance Repayment",
    //     create: false,
    //     update: "settings_upd",
    //     delete: false,
    //     view: "settings_view",
    // },
    // {
    //     title: "Holidays",
    //     create: false,
    //     update: "settings_upd",
    //     delete: false,
    //     view: "settings_view",
    // },
    // {
    //     title: "Leave Apply",
    //     create: false,
    //     update: "settings_upd",
    //     delete: false,
    //     view: "settings_view",
    // },
    // {
    //     title: "Permission",
    //     create: false,
    //     update: "settings_upd",
    //     delete: false,
    //     view: "settings_view",
    // },
    // {
    //     title: "Expense Entry",
    //     create: false,
    //     update: "settings_upd",
    //     delete: false,
    //     view: "settings_view",
    // },
    // {
    //     title: "Report",
    //     create: false,
    //     update: "settings_upd",
    //     delete: false,
    //     view: "settings_view",
    // },
]

export {
    formContainerStaffRights,
    formContainer
}