const pagesList=   [
    {
        id: 1,
        text: 'Claim',
        children: [
            {
                id: 'C_1',
                text: 'Create',
                extraKey : 1,
                parentId : 1
            },
            {
                id: 'U_1',
                text: 'Update',
                extraKey : 2,
                parentId : 1
            },
            {
                id: 'D_1',
                text: 'Delete',
                extraKey : 3,
                parentId : 1
            },
        ],
        expanded: true
    },
    {
        id: 2,
        text: 'Staff',
        children: [
            {
                id: 'C_2',
                text: 'Create',
                extraKey : 1,
                parentId : 2
            },
            {
                id: 'U_2',
                text: 'Update',
                extraKey : 2,
                parentId : 2
            },
            {
                id: 'D_2',
                text: 'Delete',
                extraKey : 3,
                parentId : 2
            },
        ],
        expanded: true
    },
]

export {
    pagesList
}