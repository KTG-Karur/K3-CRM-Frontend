export type NavigateTypes = {
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: NavigateTypes[];
};

const Navigate: NavigateTypes[] = [
    { label: 'Dashboard', isTitle: true },
    {
        label: 'Dashboard',
        isTitle: false,
        icon: 'mdi mdi-chart-bar',
        children: [
            {
                label: 'Loan Report',
                url: '/loan-report',
                parentKey: 'Dashboard',
            },
            {
                label: 'Analaysis',
                url: '/dashboard',
                parentKey: 'Dashboard',
            },
        ]
    },
    { label: 'Invesment', isTitle: true },
    {
        label: 'Customer',
        isTitle: false,
        icon: 'mdi mdi-account-check',
        url: '/view/applicant',
    },
    {
        label: 'Collection Report',
        isTitle: false,
        icon: 'mdi mdi-account-cash',
        url: '/view/monthly-reciept',
    },
    {
        label: 'Master',
        isTitle: false,
        icon: 'mdi mdi-chart-donut-variant',
        children: [
            {
                label: 'Bank Account',
                url: '/view/bank-account',
                parentKey: 'Master',
            },
            {
                label: 'Department',
                url: '/view/department',
                parentKey: 'Master',
            },
            {
                label: 'Designation',
                url: '/view/designation',
                parentKey: 'Master',
            },
            {
                label: 'Staff',
                url: '/view/staff',
                parentKey: 'Master',
            },
        ],
    },

    { label: 'Apps', isTitle: true },
    {
        label: 'Calendar',
        isTitle: false,
        icon: 'mdi mdi-calendar-blank-outline',
        url: '/apps/calendar',
    },
    {
        label: 'Chat',
        isTitle: false,
        icon: 'mdi mdi-forum-outline',
        url: '/apps/chat',
    },
    {
        label: 'Email',
        isTitle: false,
        icon: 'mdi mdi-email-outline',
        children: [
            {
                label: 'Inbox',
                url: '/apps/email/inbox',
                parentKey: 'Email',
            },
        ],
    },
    {
        label: 'Tasks',
        isTitle: false,
        icon: 'mdi mdi-clipboard-outline',
        children: [
            {
                label: 'Kanban Board',
                url: '/apps/tasks/kanban',
                parentKey: 'Tasks',
            },
            {
                label: 'Details',
                url: '/apps/tasks/details',
                parentKey: 'Tasks',
            },
        ],
    },
    {
        label: 'Projects',
        isTitle: false,
        icon: 'mdi mdi-briefcase-variant-outline',
        url: '/apps/projects',
    },
    {
        label: 'Contacts',
        isTitle: false,
        icon: 'mdi mdi-book-open-page-variant-outline',
        children: [
            {
                label: 'Members List',
                url: '/apps/contacts/list',
                parentKey: 'Contacts',
            },
            {
                label: 'Profile',
                url: '/apps/contacts/profile',
                parentKey: 'Contacts',
            },
        ],
    },
    { label: 'Custom', isTitle: true },
    {
        label: 'Extra Pages',
        isTitle: false,
        icon: 'mdi mdi-file-multiple-outline',
        children: [
            {
                label: 'Starter',
                url: '/pages/starter',
                parentKey: 'Extra Pages',
            },
            {
                label: 'Pricing',
                url: '/pages/pricing',
                parentKey: 'Extra Pages',
            },
            {
                label: 'Timeline',
                url: '/pages/timeline',
                parentKey: 'Extra Pages',
            },
            {
                label: 'Invoice',
                url: '/pages/invoice',
                parentKey: 'Extra Pages',
            },
            {
                label: 'FAQs',
                url: '/pages/faq',
                parentKey: 'Extra Pages',
            },
            {
                label: 'Gallery',
                url: '/pages/gallery',
                parentKey: 'Extra Pages',
            },

            {
                label: 'Error - 404',
                url: '/error-404',
                parentKey: 'Extra Pages',
            },
            {
                label: 'Error - 500',
                url: '/error-500',
                parentKey: 'Extra Pages',
            },
            {
                label: 'Maintenance',
                url: '/maintenance',
                parentKey: 'Extra Pages',
            },
            {
                label: 'Coming Soon',
                url: '/coming-soon',
                parentKey: 'Extra Pages',
            },
        ],
    },
    { label: 'Components', isTitle: true },
    {
        label: 'Base UI',
        isTitle: false,
        icon: 'mdi mdi-briefcase-outline',
        children: [
            {
                label: 'Buttons',
                url: '/base-ui/buttons',
                parentKey: 'Base UI',
            },
            {
                label: 'Cards',
                url: '/base-ui/cards',
                parentKey: 'Base UI',
            },
            {
                label: 'Avatars',
                url: '/base-ui/avatars',
                parentKey: 'Base UI',
            },
            {
                label: 'Tabs & Accordions',
                url: '/base-ui/tabs-accordions',
                parentKey: 'Base UI',
            },
            {
                label: 'Modals',
                url: '/base-ui/modals',
                parentKey: 'Base UI',
            },
            {
                label: 'Progress',
                url: '/base-ui/progress',
                parentKey: 'Base UI',
            },
            {
                label: 'Notifications',
                url: '/base-ui/notifications',
                parentKey: 'Base UI',
            },
            {
                label: 'Offcanvas',
                url: '/base-ui/offcanvas',
                parentKey: 'Base UI',
            },
            {
                label: 'Placeholders',
                url: '/base-ui/placeholders',
                parentKey: 'Base UI',
            },
            {
                label: 'Spinners',
                url: '/base-ui/spinners',
                parentKey: 'Base UI',
            },
            {
                label: 'Images',
                url: '/base-ui/images',
                parentKey: 'Base UI',
            },
            {
                label: 'Carousel',
                url: '/base-ui/carousel',
                parentKey: 'Base UI',
            },
            {
                label: 'Embed Video',
                url: '/base-ui/embedvideo',
                parentKey: 'Base UI',
            },
            {
                label: 'Dropdowns',
                url: '/base-ui/dropdowns',
                parentKey: 'Base UI',
            },
            {
                label: 'Tooltips & Popovers',
                url: '/base-ui/popovers-tooltips',
                parentKey: 'Base UI',
            },
            {
                label: 'General UI',
                url: '/base-ui/general',
                parentKey: 'Base UI',
            },
            {
                label: 'Typography',
                url: '/base-ui/typography',
                parentKey: 'Base UI',
            },
            {
                label: 'Grid',
                url: '/base-ui/grid',
                parentKey: 'Base UI',
            },
        ],
    },
    // {
    //     label: 'Widgets',
    //     isTitle: false,
    //     icon: 'mdi mdi-gift-outline',
    //     url: '/widgets',
    // },
    // {
    //     label: 'Extended UI',
    //     isTitle: false,
    //     icon: 'mdi mdi-layers-outline',
    //     children: [
    //         {
    //             label: 'Nestable List',
    //             url: '/extended-ui/nestable',
    //             parentKey: 'Extended UI',
    //         },
    //         {
    //             label: 'Range Sliders',
    //             url: '/extended-ui/rangesliders',
    //             parentKey: 'Extended UI',
    //         },
    //         {
    //             label: 'Sweet Alert',
    //             url: '/extended-ui/sweet-alert',
    //             parentKey: 'Extended UI',
    //         },
    //         {
    //             label: 'Tour Page',
    //             url: '/extended-ui/tour',
    //             parentKey: 'Extended UI',
    //         },
    //         {
    //             label: 'Tree View',
    //             url: '/extended-ui/treeview',
    //             parentKey: 'Extended UI',
    //         },
    //     ],
    // },
    // {
    //     label: 'Icons',
    //     isTitle: false,
    //     icon: 'mdi mdi-shield-outline',
    //     children: [
    //         {
    //             label: 'Feather Icons',
    //             url: '/icons/feather',
    //             parentKey: 'Icons',
    //         },
    //         {
    //             label: 'Material Design Icons',
    //             url: '/icons/mdi',
    //             parentKey: 'Icons',
    //         },
    //         {
    //             label: 'DripIcons',
    //             url: '/icons/dripIcons',
    //             parentKey: 'Icons',
    //         },
    //         {
    //             label: 'Font Awesome 5',
    //             url: '/icons/font-awesome',
    //             parentKey: 'Icons',
    //         },
    //         {
    //             label: 'Themify',
    //             url: '/icons/themify',
    //             parentKey: 'Icons',
    //         },
    //     ],
    // },
    // {
    //     label: 'Forms',
    //     isTitle: false,
    //     icon: 'mdi mdi-texture',
    //     children: [
    //         {
    //             label: 'General Elements',
    //             url: '/forms/basic',
    //             parentKey: 'Forms',
    //         },
    //         {
    //             label: 'Form Advanced',
    //             url: '/forms/advanced',
    //             parentKey: 'Forms',
    //         },
    //         {
    //             label: 'Validation',
    //             url: '/forms/validation',
    //             parentKey: 'Forms',
    //         },
    //         {
    //             label: 'Wizard',
    //             url: '/forms/wizard',
    //             parentKey: 'Forms',
    //         },
    //         {
    //             label: 'File Uploads',
    //             url: '/forms/upload',
    //             parentKey: 'Forms',
    //         },
    //         {
    //             label: 'Editors',
    //             url: '/forms/editors',
    //             parentKey: 'forms',
    //         },
    //     ],
    // },
    // {
    //     label: 'Tables',
    //     isTitle: false,
    //     icon: 'mdi mdi-table',
    //     children: [
    //         {
    //             label: 'Basic Tables',
    //             url: '/tables/basic',
    //             parentKey: 'Basic Tables',
    //         },
    //         {
    //             label: 'Advanced Tables',
    //             url: '/tables/advanced',
    //             parentKey: 'Basic Tables',
    //         },
    //     ],
    // },
    // {
    //     label: 'Charts',
    //     isTitle: false,
    //     icon: 'mdi mdi-chart-donut-variant',
    //     children: [
    //         {
    //             label: 'Apex Charts',
    //             url: '/charts/apex',
    //             parentKey: 'Charts',
    //         },
    //         {
    //             label: 'Chartjs',
    //             url: '/charts/chartjs',
    //             parentKey: 'Charts',
    //         },
    //     ],
    // },
    // {
    //     label: 'Maps',
    //     isTitle: false,
    //     icon: 'mdi mdi-map-outline',
    //     children: [
    //         {
    //             label: 'Google Maps',
    //             url: '/maps/google',
    //             parentKey: 'Maps',
    //         },
    //         {
    //             label: 'Vector Maps',
    //             url: '/maps/vector',
    //             parentKey: 'Maps',
    //         },
    //     ],
    // },
    // {
    //     key: 'menu-levels',
    //     label: 'Menu Levels',
    //     isTitle: false,
    //     icon: 'mdi mdi-share-variant',
    //     children: [
    //         {
    //             key: 'menu-levels-1-1',
    //             label: 'Level 1.1',
    //             url: '/',
    //             parentKey: 'menu-levels',
    //             children: [
    //                 {
    //                     key: 'menu-levels-2-1',
    //                     label: 'Level 2.1',
    //                     url: '/',
    //                     parentKey: 'menu-levels-1-1',
    //                     children: [
    //                         {
    //                             key: 'menu-levels-3-1',
    //                             label: 'Level 3.1',
    //                             url: '/',
    //                             parentKey: 'menu-levels-2-1',
    //                         },
    //                         {
    //                             key: 'menu-levels-3-2',
    //                             label: 'Level 3.2',
    //                             url: '/',
    //                             parentKey: 'menu-levels-2-1',
    //                         },
    //                     ],
    //                 },
    //                 {
    //                     key: 'menu-levels-2-2',
    //                     label: 'Level 2.2',
    //                     url: '/',
    //                     parentKey: 'menu-levels-1-1',
    //                 },
    //             ],
    //         },
    //         {
    //             key: 'menu-levels-1-2',
    //             label: 'Level 1.2',
    //             url: '/',
    //             parentKey: 'menu-levels',
    //         },
    //     ],
    // },
];

// const Navigate: MenuItemTypes[] = [
//     { key: 'navigation', label: 'Navigation', isTitle: true },
//     {
//         key: 'dashboard',
//         label: 'Dashboard',
//         isTitle: false,
//         icon: 'mdi mdi-view-dashboard-outline',
//         badge: { variant: 'success', text: '9+' },
//         url: '/dashboard',
//     },

//     { key: 'master', label: 'Master', isTitle: true },
//     {
//         key: 'view-employee',
//         label: 'Employee',
//         isTitle: false,
//         icon: 'mdi mdi-calendar-blank-outline',
//         url: '/view/employee',
//     },
//     { key: 'apps', label: 'Apps', isTitle: true },
//     {
//         key: 'apps-calendar',
//         label: 'Calendar',
//         isTitle: false,
//         icon: 'mdi mdi-calendar-blank-outline',
//         url: '/apps/calendar',
//     },
//     {
//         key: 'apps-chat',
//         label: 'Chat',
//         isTitle: false,
//         icon: 'mdi mdi-forum-outline',
//         url: '/apps/chat',
//     },
//     {
//         key: 'apps-email',
//         label: 'Email',
//         isTitle: false,
//         icon: 'mdi mdi-email-outline',
//         children: [
//             {
//                 key: 'email-inbox',
//                 label: 'Inbox',
//                 url: '/apps/email/inbox',
//                 parentKey: 'apps-email',
//             },
//         ],
//     },
//     {
//         key: 'apps-tasks',
//         label: 'Tasks',
//         isTitle: false,
//         icon: 'mdi mdi-clipboard-outline',
//         children: [
//             {
//                 key: 'task-kanban',
//                 label: 'Kanban Board',
//                 url: '/apps/tasks/kanban',
//                 parentKey: 'apps-tasks',
//             },
//             {
//                 key: 'task-details',
//                 label: 'Details',
//                 url: '/apps/tasks/details',
//                 parentKey: 'apps-tasks',
//             },
//         ],
//     },
//     {
//         key: 'apps-projects',
//         label: 'Projects',
//         isTitle: false,
//         icon: 'mdi mdi-briefcase-variant-outline',
//         url: '/apps/projects',
//     },
//     {
//         key: 'apps-contacts',
//         label: 'Contacts',
//         isTitle: false,
//         icon: 'mdi mdi-book-open-page-variant-outline',
//         children: [
//             {
//                 key: 'contacts-list',
//                 label: 'Members List',
//                 url: '/apps/contacts/list',
//                 parentKey: 'apps-contacts',
//             },
//             {
//                 key: 'contacts-profile',
//                 label: 'Profile',
//                 url: '/apps/contacts/profile',
//                 parentKey: 'apps-contacts',
//             },
//         ],
//     },
//     { key: 'custom', label: 'Custom', isTitle: true },
//     {
//         key: 'extra-pages',
//         label: 'Extra Pages',
//         isTitle: false,
//         icon: 'mdi mdi-file-multiple-outline',
//         children: [
//             {
//                 key: 'page-starter',
//                 label: 'Starter',
//                 url: '/pages/starter',
//                 parentKey: 'extra-pages',
//             },
//             {
//                 key: 'page-pricing',
//                 label: 'Pricing',
//                 url: '/pages/pricing',
//                 parentKey: 'extra-pages',
//             },
//             {
//                 key: 'page-timeline',
//                 label: 'Timeline',
//                 url: '/pages/timeline',
//                 parentKey: 'extra-pages',
//             },
//             {
//                 key: 'page-invoice',
//                 label: 'Invoice',
//                 url: '/pages/invoice',
//                 parentKey: 'extra-pages',
//             },
//             {
//                 key: 'page-faq',
//                 label: 'FAQs',
//                 url: '/pages/faq',
//                 parentKey: 'extra-pages',
//             },
//             {
//                 key: 'page-gallery',
//                 label: 'Gallery',
//                 url: '/pages/gallery',
//                 parentKey: 'extra-pages',
//             },

//             {
//                 key: 'page-error-404',
//                 label: 'Error - 404',
//                 url: '/error-404',
//                 parentKey: 'extra-pages',
//             },
//             {
//                 key: 'page-error-500',
//                 label: 'Error - 500',
//                 url: '/error-500',
//                 parentKey: 'extra-pages',
//             },
//             {
//                 key: 'page-maintenance',
//                 label: 'Maintenance',
//                 url: '/maintenance',
//                 parentKey: 'extra-pages',
//             },
//             {
//                 key: 'page-coming-soon',
//                 label: 'Coming Soon',
//                 url: '/coming-soon',
//                 parentKey: 'extra-pages',
//             },
//         ],
//     },
//     { key: 'components', label: 'Components', isTitle: true },
//     {
//         key: 'base-ui',
//         label: 'Base UI',
//         isTitle: false,
//         icon: 'mdi mdi-briefcase-outline',
//         children: [
//             {
//                 key: 'base-ui-buttons',
//                 label: 'Buttons',
//                 url: '/base-ui/buttons',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-cards',
//                 label: 'Cards',
//                 url: '/base-ui/cards',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-avatars',
//                 label: 'Avatars',
//                 url: '/base-ui/avatars',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-tabs-accordions',
//                 label: 'Tabs & Accordions',
//                 url: '/base-ui/tabs-accordions',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-modals',
//                 label: 'Modals',
//                 url: '/base-ui/modals',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-progress',
//                 label: 'Progress',
//                 url: '/base-ui/progress',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-notifications',
//                 label: 'Notifications',
//                 url: '/base-ui/notifications',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-offcanvas',
//                 label: 'Offcanvas',
//                 url: '/base-ui/offcanvas',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-placeholders',
//                 label: 'Placeholders',
//                 url: '/base-ui/placeholders',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-spinners',
//                 label: 'Spinners',
//                 url: '/base-ui/spinners',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-images',
//                 label: 'Images',
//                 url: '/base-ui/images',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-carousel',
//                 label: 'Carousel',
//                 url: '/base-ui/carousel',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-embedvideo',
//                 label: 'Embed Video',
//                 url: '/base-ui/embedvideo',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-dropdown',
//                 label: 'Dropdowns',
//                 url: '/base-ui/dropdowns',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-popovers-tooltips',
//                 label: 'Tooltips & Popovers',
//                 url: '/base-ui/popovers-tooltips',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-general',
//                 label: 'General UI',
//                 url: '/base-ui/general',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-typography',
//                 label: 'Typography',
//                 url: '/base-ui/typography',
//                 parentKey: 'base-ui',
//             },
//             {
//                 key: 'base-ui-grid',
//                 label: 'Grid',
//                 url: '/base-ui/grid',
//                 parentKey: 'base-ui',
//             },
//         ],
//     },
//     {
//         key: 'widgets',
//         label: 'Widgets',
//         isTitle: false,
//         icon: 'mdi mdi-gift-outline',
//         url: '/widgets',
//     },
//     {
//         key: 'extended-ui',
//         label: 'Extended UI',
//         isTitle: false,
//         icon: 'mdi mdi-layers-outline',
//         badge: { variant: 'info', text: 'Hot' },
//         children: [
//             {
//                 key: 'extended-ui-nestable',
//                 label: 'Nestable List',
//                 url: '/extended-ui/nestable',
//                 parentKey: 'extended-ui',
//             },
//             {
//                 key: 'extended-ui-rangesliders',
//                 label: 'Range Sliders',
//                 url: '/extended-ui/rangesliders',
//                 parentKey: 'extended-ui',
//             },
//             {
//                 key: 'extended-ui-sweet-alert',
//                 label: 'Sweet Alert',
//                 url: '/extended-ui/sweet-alert',
//                 parentKey: 'extended-ui',
//             },
//             {
//                 key: 'extended-ui-tour',
//                 label: 'Tour Page',
//                 url: '/extended-ui/tour',
//                 parentKey: 'extended-ui',
//             },
//             {
//                 key: 'extended-ui-treeview',
//                 label: 'Tree View',
//                 url: '/extended-ui/treeview',
//                 parentKey: 'extended-ui',
//             },
//         ],
//     },
//     {
//         key: 'icons',
//         label: 'Icons',
//         isTitle: false,
//         icon: 'mdi mdi-shield-outline',
//         children: [
//             {
//                 key: 'icon-feather',
//                 label: 'Feather Icons',
//                 url: '/icons/feather',
//                 parentKey: 'icons',
//             },
//             {
//                 key: 'icon-mdiicons',
//                 label: 'Material Design Icons',
//                 url: '/icons/mdi',
//                 parentKey: 'icons',
//             },
//             {
//                 key: 'icon-dripicons',
//                 label: 'Dripicons',
//                 url: '/icons/dripicons',
//                 parentKey: 'icons',
//             },
//             {
//                 key: 'icon-font-awesome',
//                 label: 'Font Awesome 5',
//                 url: '/icons/font-awesome',
//                 parentKey: 'icons',
//             },
//             {
//                 key: 'icon-themify',
//                 label: 'Themify',
//                 url: '/icons/themify',
//                 parentKey: 'icons',
//             },
//         ],
//     },
//     {
//         key: 'forms',
//         label: 'Forms',
//         isTitle: false,
//         icon: 'mdi mdi-texture',
//         children: [
//             {
//                 key: 'form-basic',
//                 label: 'General Elements',
//                 url: '/forms/basic',
//                 parentKey: 'forms',
//             },
//             {
//                 key: 'form-advanced',
//                 label: 'Form Advanced',
//                 url: '/forms/advanced',
//                 parentKey: 'forms',
//             },
//             {
//                 key: 'form-validation',
//                 label: 'Validation',
//                 url: '/forms/validation',
//                 parentKey: 'forms',
//             },
//             {
//                 key: 'form-wizard',
//                 label: 'Wizard',
//                 url: '/forms/wizard',
//                 parentKey: 'forms',
//             },
//             {
//                 key: 'form-upload',
//                 label: 'File Uploads',
//                 url: '/forms/upload',
//                 parentKey: 'forms',
//             },
//             {
//                 key: 'form-editors',
//                 label: 'Editors',
//                 url: '/forms/editors',
//                 parentKey: 'forms',
//             },
//         ],
//     },
//     {
//         key: 'tables',
//         label: 'Tables',
//         isTitle: false,
//         icon: 'mdi mdi-table',
//         children: [
//             {
//                 key: 'table-basic',
//                 label: 'Basic Tables',
//                 url: '/tables/basic',
//                 parentKey: 'tables',
//             },
//             {
//                 key: 'table-advanced',
//                 label: 'Advanced Tables',
//                 url: '/tables/advanced',
//                 parentKey: 'tables',
//             },
//         ],
//     },
//     {
//         key: 'charts',
//         label: 'Charts',
//         isTitle: false,
//         icon: 'mdi mdi-chart-donut-variant',
//         children: [
//             {
//                 key: 'chart-apex',
//                 label: 'Apex Charts',
//                 url: '/charts/apex',
//                 parentKey: 'charts',
//             },
//             {
//                 key: 'chart-chartjs',
//                 label: 'Chartjs',
//                 url: '/charts/chartjs',
//                 parentKey: 'charts',
//             },
//         ],
//     },
//     {
//         key: 'maps',
//         label: 'Maps',
//         isTitle: false,
//         icon: 'mdi mdi-map-outline',
//         children: [
//             {
//                 key: 'maps-googlemaps',
//                 label: 'Google Maps',
//                 url: '/maps/google',
//                 parentKey: 'maps',
//             },
//             {
//                 key: 'maps-vectormaps',
//                 label: 'Vector Maps',
//                 url: '/maps/vector',
//                 parentKey: 'maps',
//             },
//         ],
//     },
//     {
//         key: 'menu-levels',
//         label: 'Menu Levels',
//         isTitle: false,
//         icon: 'mdi mdi-share-variant',
//         children: [
//             {
//                 key: 'menu-levels-1-1',
//                 label: 'Level 1.1',
//                 url: '/',
//                 parentKey: 'menu-levels',
//                 children: [
//                     {
//                         key: 'menu-levels-2-1',
//                         label: 'Level 2.1',
//                         url: '/',
//                         parentKey: 'menu-levels-1-1',
//                         children: [
//                             {
//                                 key: 'menu-levels-3-1',
//                                 label: 'Level 3.1',
//                                 url: '/',
//                                 parentKey: 'menu-levels-2-1',
//                             },
//                             {
//                                 key: 'menu-levels-3-2',
//                                 label: 'Level 3.2',
//                                 url: '/',
//                                 parentKey: 'menu-levels-2-1',
//                             },
//                         ],
//                     },
//                     {
//                         key: 'menu-levels-2-2',
//                         label: 'Level 2.2',
//                         url: '/',
//                         parentKey: 'menu-levels-1-1',
//                     },
//                 ],
//             },
//             {
//                 key: 'menu-levels-1-2',
//                 label: 'Level 1.2',
//                 url: '/',
//                 parentKey: 'menu-levels',
//             },
//         ],
//     },
// ];

export { Navigate };
