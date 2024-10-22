const staffTabs = [
    {
        label: 'Personal Info',
        name: 'personalInfo',
        icon: 'mdi mdi-account-circle',
        defaultActiveKey: 'personalInfo',
        activeKey: 'personalInfo',
        children: [
            {
                formFields: [
                    {
                        label: 'Surname',
                        name: 'surNameId',
                        inputType: 'select',
                        optionList: 'surNameList',
                        displayKey: 'surName',
                        uniqueKey: 'surNameId',
                        // require: true,
                        classStyle: 'col-2'
                    },
                    {
                        label: 'First Name',
                        name: 'firstName',
                        inputType: 'text',
                        placeholder: 'Enter First Name',
                        // require: true,
                        classStyle: 'col-5'
                    },
                    {
                        label: 'Last Name',
                        name: 'lastName',
                        inputType: 'text',
                        placeholder: 'Enter Last Name',
                        // require: true,
                        classStyle: 'col-5'
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'DOB',
                        name: 'dob',
                        inputType: 'date',
                        'maximumDate' : 'maximumDOB',
                        // require: true,
                        onChange : "handleDateChange",
                        classStyle: 'col-3'
                    },
                    {
                        label: 'Age',
                        name: 'age',
                        inputType: 'text',
                        placeholder: 'Enter Age',
                        // require: true,
                        classStyle: 'col-3'
                    },
                    {
                        label: 'Gender',
                        name: 'genderId',
                        inputType: 'select',
                        optionList: 'genderList',
                        displayKey: 'genderName',
                        uniqueKey: 'genderId',
                        selectedObj: "genderObj",
                        // require: true,
                        classStyle: 'col-3'
                    },
                    {
                        label: 'Martial Status',
                        name: 'martialStatusId',
                        inputType: 'select',
                        optionList: 'martialStatusList',
                        displayKey: 'martialStatusName',
                        uniqueKey: 'martialStatusId',
                        // require: true,
                        classStyle: 'col-3'
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Email Id',
                        name: 'emailId',
                        placeholder: 'Enter Email-Id',
                        inputType: 'text',
                        // require: true,
                        classStyle: 'col-3'
                    },
                    {
                        label: 'Contact No',
                        name: 'contactNo',
                        placeholder: 'Enter Contact No',
                        maxlength: '10',
                        inputType: 'number',
                        // require: true,
                        classStyle: 'col-3'
                    },
                    {
                        label: 'Alternative Contact No',
                        name: 'alternativeContactNo',
                        placeholder: 'Enter Alternative Contact No',
                        maxlength: 10,
                        inputType: 'number',
                        classStyle: 'col-3'
                    },
                    {
                        label: 'Caste',
                        name: 'casteTypeId',
                        inputType: 'select',
                        optionList: 'casteTypeList',
                        displayKey: 'casteTypeName',
                        uniqueKey: 'casteTypeId',
                        // require: true,
                        classStyle: 'col-3'
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Address',
                        name: 'address',
                        inputType: 'textarea',
                        // require: true,
                        placeholder: 'Enter Address',
                    },
                ],
            },

        ],
    },
    {
        label: 'Job Role',
        name: 'jobRoleDetails',
        icon: 'mdi mdi-checkbox-marked-circle-outline',
        children: [
            {
                formFields: [
                    {
                        title: 'Job Details',
                        inputType: 'title',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Date Of Joining',
                        name: 'dateOfJoining',
                        inputType: 'date',
                        // require: true,
                        classStyle: 'col-3'
                    },
                ],
            },
            {
                formFields: [
                    {
                        'label': 'Branch',
                        'name': 'branchId',
                        'inputType': 'select',
                        'optionList': 'branchList',
                        'displayKey': 'branchName',
                        'uniqueKey': 'branchId',
                        'classStyle': 'col-3'
                    },
                    {
                        'label': 'Role',
                        'name': 'roleId',
                        'inputType': 'select',
                        'optionList': 'roleList',
                        'displayKey': 'roleName',
                        'uniqueKey': 'roleId',
                        'classStyle': 'col-3'
                    },
                ],
            },
            {
                formFields: [
                    {
                        'label': 'Department',
                        'name': 'departmentId',
                        'inputType': 'select',
                        'optionList': 'departmentList',
                        'displayKey': 'departmentName',
                        'uniqueKey': 'departmentId',
                        'classStyle': 'col-3'
                    },
                    {
                        'label': 'Designation',
                        'name': 'designationId',
                        'inputType': 'select',
                        'optionList': 'designationList',
                        'displayKey': 'designationName',
                        'uniqueKey': 'designationId',
                        'classStyle': 'col-3'
                    },
                ],
            },
            {
                formFields: [
                    {
                        'label': 'Salary Package',
                        'name': 'annualAmount',
                        'inputType': 'text',
                        'placeholder': "Enter Annual Package",
                        'classStyle': 'col-3'
                    },
                    {
                        'label': 'Montly Salary(in-hand)',
                        'name': 'monthlyAmount',
                        'inputType': 'text',
                        'isDisabled': true,
                        'placeholder': "Enter Monthly Salary",
                        'classStyle': 'col-3'
                    },
                ],
            },
            {
                formFields: [
                    {
                        title: 'Bank Account Details',
                        name: 'relationId',
                        inputType: 'title',
                    },
                ],
            },
            {
                formFields: [
                    {
                        'label': "Bank Name",
                        'name': "bankName",
                        'inputType': "text",
                        'placeholder': "Enter Bank Name",
                        // 'require': true,
                        'classStyle': 'col-3'
                    },
                    {
                        'label': "Branch Name",
                        'name': "branchName",
                        'inputType': "text",
                        'placeholder': "Enter Branch Name",
                        // 'require': true,
                        'classStyle': 'col-3'
                    },
                ],
            },
            {
                formFields: [
                    {
                        'label': "Account Holder Name",
                        'name': "accountHolderName",
                        'inputType': "text",
                        'placeholder': "Enter Account Holder Name",
                        // 'require': true,
                        'classStyle': 'col-3'
                    },
                    {
                        'label': "Account No.",
                        'name': "accountNo",
                        'inputType': "text",
                        'placeholder': "Enter Account Number",
                        // 'require': true,
                        'classStyle': 'col-3'
                    },
                    {
                        'label': "IFSC Code",
                        'name': "ifscCode",
                        'inputType': "text",
                        'placeholder': "Enter IFSC Code",
                        // 'require': true,
                        'classStyle': 'col-3'
                    },
                ],
            },
        ],
    },
    {
        label: 'Id Proof',
        name: 'idProof',
        icon: 'mdi mdi-checkbox-marked-circle-outline',
        children: [
            {
                formFields: [
                    {
                        label: 'Proof Type',
                        name: 'proofTypeId',
                        inputType: 'select',
                        optionList: 'proofTypeList',
                        displayKey: 'proofTypeName',
                        uniqueKey: 'proofTypeId',
                        onChange : "onHandleProofType",
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'Proof Id No.',
                        name: 'proofNo',
                        inputType: 'text',
                        placeholder: 'Enter Proof Id No',
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'Image Proof',
                        name: 'imageProof',
                        inputType: 'file',
                        'classStyle': 'col-3'
                    },
                ],
            },
        ],
    },
    {
        label: 'Experience',
        name: 'workExperience',
        icon: 'mdi mdi-checkbox-marked-circle-outline',
        children: [
            {
                formFields: [
                    {
                        label: 'Organization Name',
                        name: 'organizationName',
                        inputType: 'text',
                        placeholder: 'Enter Organization Name',
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'Position',
                        name: 'position',
                        inputType: 'text',
                        placeholder: 'Enter Position',
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'Years Of Experience',
                        name: 'yearsOfExperience',
                        inputType: 'text',
                        placeholder: 'Enter Years Of Experience',
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'Work Location',
                        name: 'workLocation',
                        inputType: 'text',
                        placeholder: 'Enter Work Location',
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'From Date',
                        name: 'fromDate',
                        inputType: 'date',
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'To Date',
                        name: 'toDate',
                        inputType: 'date',
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'Gross Pay',
                        name: 'grossPay',
                        inputType: 'text',
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'Reason For Leaving',
                        name: 'reasonForLeaving',
                        inputType: 'text',
                        'classStyle': 'col-3'
                    },
                ],
            },
        ],
    },
    {
        label: 'Staff Details',
        name: 'staffDetails',
        icon: 'mdi mdi-home',
        children: [
            {
                formFields: [
                    {
                        label: 'Relation',
                        name: 'relationId',
                        inputType: 'select',
                        optionList: 'relationTypeList',
                        displayKey: 'relationTypeName',
                        uniqueKey: 'relationTypeId',
                        onChange : "onHandleProofType",
                        'classStyle': 'col-3'
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Person Name',
                        name: 'relationName',
                        inputType: 'text',
                        placeholder: 'Enter Your Relation Name',
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'Contact Number',
                        name: 'contactNo',
                        inputType: 'text',
                        placeholder: 'Enter Contact Number',
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'Qualification',
                        name: 'realtionQualificationId',
                        inputType: 'select',
                        optionList: 'qualificationList',
                        displayKey: 'qualificationName',
                        uniqueKey: 'qualificationId',
                        onChange : "onHandleProofType",
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'Occupation',
                        name: 'occupation',
                        inputType: 'text',
                        placeholder: 'Enter Occupation',
                        'classStyle': 'col-3'
                    },
                ],
            },
        ],
    },
    {
        label: 'Qualification',
        name: 'staffQualification',
        icon: 'mdi mdi-home',
        children: [
            {
                formFields: [
                    {
                        label: 'Qualification',
                        name: 'qualificationId',
                        inputType: 'select',
                        optionList: 'qualificationList',
                        displayKey: 'qualificationName',
                        uniqueKey: 'qualificationId',
                        onChange : "onHandleProofType",
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'Stream',
                        name: 'stream',
                        inputType: 'text',
                        placeholder: 'Enter Your Stream',
                        'classStyle': 'col-3'
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Passing Year',
                        name: 'passingYear',
                        inputType: 'text',
                        placeholder: 'Enter Passing Year',
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'University Name',
                        name: 'universityName',
                        inputType: 'text',
                        placeholder: 'Enter University Name',
                        'classStyle': 'col-3'
                    },
                    {
                        label: 'Percentage',
                        name: 'percentage',
                        inputType: 'text',
                        placeholder: 'Enter Percentage',
                        'classStyle': 'col-3'
                    },
                ],
            },
        ],
    },
    {
        label: 'Language',
        name: 'language',
        icon: 'mdi mdi-home',
        children: [
            {
                formFields: [
                    {
                        label: 'Language',
                        name: 'languageId',
                        inputType: 'select',
                        optionList: 'languageList',
                        displayKey: 'languageName',
                        uniqueKey: 'languageId',
                        onChange : "onHandleProofType",
                        'classStyle': 'col-4'
                    },
                    {
                        label: 'Speak',
                        name: 'speak',
                        inputType: 'checkbox',
                        'classStyle': 'col-1'
                    },
                    {
                        label: 'Read',
                        name: 'read',
                        inputType: 'checkbox',
                        'classStyle': 'col-1'
                    },
                    {
                        label: 'Write',
                        name: 'write',
                        inputType: 'checkbox',
                        'classStyle': 'col-1'
                    },
                ],
            },
        ],
    },
];

export { staffTabs };
