import { records as data } from "../pages/tables/AdvancedTable/data";



const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    },
    {
        text: '50',
        value: 50,
    },
    {
        text: 'All',
        value: data.length,
    },
];

export { sizePerPageList };