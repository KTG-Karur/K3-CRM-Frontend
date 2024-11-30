

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
        create: "masterIns",
        update: "masterUpd",
        delete: "masterDel",
        view: "masterView",
    },
    {
        title: "Staff",
        create: "staffIns",
        update: "staffUpd",
        delete: "staffDel",
        view: "staffView",
    },
    {
        title: "Visit Entry",
        create: "visitEntryIns",
        update: "visitEntryUpd",
        delete: "visitEntryDel",
        view: "visitEntryView",
    },
    {
        title: "Petrol Allowance",
        create: "petrolAllowanceIns",
        update: "petrolAllowanceUpd",
        delete: "petrolAllowanceDel",
        view: "petrolAllowanceView",
    },
    {
        title: "Salary",
        create: "salaryIns",
        update: "salaryUpd",
        delete: "salaryDel",
        view: "salaryView",
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