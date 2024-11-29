import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';

const StaffRights = apiContainer.staffRights;

//CREATE USERRIGHTS---->
// export async function createStaffRights(request) {
//   try {
//       return api.create(`${StaffRights}`, request);
//   } catch (error) {
//       console.error('Fetch error:', error);
//       throw error;
//   }
// }

export async function getStaffRights(request) {
    try {
        const response = await apiReturnCallBack("GET", StaffRights, request);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || JSON.stringify(data));
        }
        // const response = {
        //     data: {
        //         data: [
        //             {
        //                 title: 'Master',
        //                 master: {
        //                     create: true,
        //                     update: true,
        //                     delete: false,
        //                     view: false
        //                 },
        //             },
        //             {
        //                 title: 'Staff',
        //                 staff: {
        //                     create: true,
        //                     update: true,
        //                     delete: false,
        //                     view: false
        //                 },
        //             },
        //             {
        //                 title: 'Visit Entry',
        //                 visitEntry: {
        //                     create: true,
        //                     update: false,
        //                     delete: false,
        //                     view: true,
        //                 },
        //             },
        //             {
        //                 title: 'Petrol Allowance',
        //                 petrolAllowance: {
        //                     create: true,
        //                     update: false,
        //                     delete: false,
        //                     view: true,
        //                 },
        //             },
        //             {
        //                 title: 'Salary',
        //                 salary: {
        //                     create: true,
        //                     update: true,
        //                     delete: true,
        //                     view: false,
        //                 },
        //             },
        //         ],
        //     },
        //     error: false,
        //     message: 'Sucessfull',
        //     code: 200,
        // };
        // const data = JSON.stringify(response.data.data);
        // response.data = data;

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createStaffRights(request) {
    try {
        const response = await apiReturnCallBack('POST', StaffRights, request);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || JSON.stringify(data));
        }
        console.log("createStaffRights")
        console.log(data)
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//UPDATE---->
export async function updateStaffRights(request, staffRightsId) {
    try {
        const response = await apiReturnCallBack("PUT", StaffRights + `/${staffRightsId}`, request);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || JSON.stringify(data));
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// export async function updateStaffRights(StaffRightsId) {
//   try {
//       return api.get(`${StaffRights}/${StaffRightsId}`,);
//   } catch (error) {
//       console.error('Fetch error:', error);
//       throw error;
//   }
// }
