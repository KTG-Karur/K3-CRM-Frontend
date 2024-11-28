import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';

const UserRights = apiContainer.userRights;

//CREATE USERRIGHTS---->
// export async function createUserRights(request) {
//   try {
//       return api.create(`${UserRights}`, request);
//   } catch (error) {
//       console.error('Fetch error:', error);
//       throw error;
//   }
// }

export async function getUserRightsApi(request) {
    try {
        const response = await apiReturnCallBack("GET", UserRights, request);
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

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createUserRights(request) {
    try {
        const response = await apiReturnCallBack('GET', UserRights, request);
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
// export async function getUserRightsApi(UserRightsId) {
//   try {
//       return api.get(`${UserRights}/${UserRightsId}`,);
//   } catch (error) {
//       console.error('Fetch error:', error);
//       throw error;
//   }
// }
