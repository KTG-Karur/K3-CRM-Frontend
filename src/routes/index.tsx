import React, { Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
// layouts
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';
import HorizontalLayout from '../layouts/Horizontal/';

// components
import PrivateRoute from './PrivateRoute';
import Root from './Root';

// constants
import { LayoutTypes } from '../constants';

// hooks
import { useRedux, useUser } from '../hooks';

import {
    Department,
    Login,
    Buttons,
    Register,
    Confirm,
    ForgetPassword,
    LockScreen,
    Logout,
    DashBoard1,
    CalendarApp,
    ChatApp,
    Inbox,
    Kanban,
    TaskDetail,
    Projects,
    List,
    Profile,
    Starter,
    Pricing,
    Timeline,
    Invoice,
    FAQ,
    Gallery,
    Error404,
    Error500,
    Maintenance,
    ComingSoon,
    Cards,
    Avatars,
    TabsAccordions,
    Notifications,
    Modals,
    Progress,
    Offcanvases,
    Placeholders,
    Spinners,
    Images,
    Carousel,
    EmbedVedio,
    Dropdowns,
    PopoversAndTooltips,
    GeneralUI,
    Typography,
    Grid,
    Widgets,
    RangeSliders,
    NestableList,
    SweetAlerts,
    Tourpage,
    TreeViewExample,
    FeatherIcons,
    MDIIcons,
    Dripicons,
    FontAwesomeIcons,
    ThemifyIcons,
    GeneralElements,
    FormAdvanced,
    Validation,
    FormWizard,
    FileUpload,
    Editors,
    BasicTable,
    AdvancedTable,
    ApexChart,
    ChartJs,
    GoogleMaps,
    VectorMaps,
    Landing,
    Holiday,
    Designation,
    BankAccount,
    Role,
    LoanReportDashboard,
    PetrolAllowance,
    VisitEntry,
    Staff,
    Activity,
    ClaimType,
    Claim,
    Branch,
    ClaimTemplate,
    ProofType,
    TransferStaff,
    SettingLeaveDeduction,
    Deputation,
    StaffAdvance,
    AttendanceIncharge,
    Permission,
    Setting,
    SettingWorkingDay,
    SettingBenefit,
    StaffLeave,
    Attendance
} from './Route_Menu';

type LoadComponentProps = {
    component: React.ComponentType<any>; // Use `any` if the component's props are unknown
    permission?: string[]; // Optional permission prop
};

const loading = () => <div className=""></div>;

const LoadComponent: React.FC<LoadComponentProps> = ({ component: Component, permission = [] }) => {
    const [loggedInUser] = useUser(); // Get the logged-in user data
    const userRights = loggedInUser?.userDetails.userRights || '{}'; // Retrieve user rights
    const userRole = loggedInUser?.userDetails?.role_name; // Retrieve user role
    if (userRole === 'Staff' && permission.length > 0) {
        const hasPermission = permission.some((perm) => userRights[perm]);
        if (!hasPermission) {
            return <Navigate to="/access-denied" />;
        }
    }
    return (
        <Suspense fallback={loading()}>
            <Component permission={permission} userRole={userRole} userRights={userRights} />
        </Suspense>
    );
};

const AllRoutes = () => {
    const { appSelector } = useRedux();

    const { layout } = appSelector((state) => ({
        layout: state.Layout,
    }));

    const getLayout = () => {
        let layoutCls: React.ComponentType = VerticalLayout;

        switch (layout.layoutType) {
            case LayoutTypes.LAYOUT_HORIZONTAL:
                layoutCls = HorizontalLayout;
                break;
            default:
                layoutCls = VerticalLayout;
                break;
        }
        return layoutCls;
    };
    let Layout = getLayout();

    return useRoutes([
        { path: '/', element: <Root /> },
        {
            // Public routes
            path: '/',
            element: <DefaultLayout />,
            children: [
                {
                    path: 'auth',
                    children: [
                        { path: 'login', element: <LoadComponent component={Login} /> },
                        { path: 'register', element: <LoadComponent component={Register} /> },
                        { path: 'confirm', element: <LoadComponent component={Confirm} /> },
                        { path: 'forget-password', element: <LoadComponent component={ForgetPassword} /> },
                        { path: 'lock-screen', element: <LoadComponent component={LockScreen} /> },
                        { path: 'logout', element: <LoadComponent component={Logout} /> },
                    ],
                },
                { path: 'error-404', element: <LoadComponent component={Error404} /> },
                { path: 'error-500', element: <LoadComponent component={Error500} /> },
            ],
        },
        {
            // auth protected routes
            path: '/',
            element: <PrivateRoute roles={['Admin', 'Staff']} component={Layout} />,
            children: [
                {
                    path: 'dashboard',
                    element: <LoadComponent component={DashBoard1} />,
                },
                {
                    path: 'claim',
                    element: <LoadComponent component={Claim} permission={['claim_ins', 'claim_upd', 'claim_del']} />,
                },
                {
                    path: 'claim-approved',
                    element: <LoadComponent component={ClaimTemplate} />,
                },
                {
                    path: 'staff-attendance',
                    element: <LoadComponent component={Attendance} permission={['staff_attendance_ins', 'staff_attendance_upd', 'staff_attendance_del']} />,
                },
                {
                    path: 'staff-leave',
                    element: <LoadComponent component={StaffLeave} permission={['staff_leave_ins', 'staff_leave_upd', 'staff_leave_del']} />,
                },
                {
                    path: 'view',
                    children: [
                        {
                            path: 'activity',
                            element: <LoadComponent component={Activity} permission={['master_ins', 'master_upd', 'master_del']} />,
                        },
                        {
                            path: 'holiday',
                            element: <LoadComponent component={Holiday} permission={['holiday_ins', 'holiday_upd', 'holiday_del']} />,
                        },
                        {
                            path: 'branch',
                            element: <LoadComponent component={Branch} permission={['master_ins', 'master_upd', 'master_del']} />,
                        },
                        {
                            path: 'department',
                            element: <LoadComponent component={Department} permission={['master_ins', 'master_upd', 'master_del']} />,
                        },
                        {
                            path: 'designation',
                            element: <LoadComponent component={Designation} permission={['master_ins', 'master_upd', 'master_del']} />,
                        },
                        {
                            path: 'staff',
                            element: <LoadComponent component={Staff} permission={['staff_ins', 'staff_upd', 'staff_del']} />,
                        },
                        {
                            path: 'claim-type',
                            element: <LoadComponent component={ClaimType} permission={['master_ins', 'master_upd', 'master_del']} />,
                        },
                        {
                            path: 'transfer-staff',
                            element: <LoadComponent component={TransferStaff} permission={['master_ins', 'master_upd', 'master_del']} />,
                        },
                        {
                            path: 'setting-leave-deduction',
                            element: <LoadComponent component={SettingLeaveDeduction} permission={['setting_ins', 'setting_upd', 'setting_del']} />,
                        },
                        {
                            path: 'permission',
                            element: <LoadComponent component={Permission} permission={['master_ins', 'master_upd', 'master_del']} />,
                        },
                        {
                            path: 'setting',
                            element: <LoadComponent component={Setting} permission={['setting_ins', 'setting_upd', 'setting_del']} />,
                        },
                        {
                            path: 'setting-working-day',
                            element: <LoadComponent component={SettingWorkingDay} permission={['setting_ins', 'setting_upd', 'setting_del']} />,
                        },
                        {
                            path: 'setting-benefit',
                            element: <LoadComponent component={SettingBenefit} permission={['setting_ins', 'setting_upd', 'setting_del']} />,
                        },
                        {
                            path: 'attendance-incharge',
                            element: <LoadComponent component={AttendanceIncharge} permission={['master_ins', 'master_upd', 'master_del']}/>,
                        },
                        {
                            path: 'staff-advance',
                            element: <LoadComponent component={StaffAdvance} permission={['master_ins', 'master_upd', 'master_del']} />,
                        },
                        {
                            path: 'deputation',
                            element: <LoadComponent component={Deputation} permission={['master_ins', 'master_upd', 'master_del']} />,
                        },
                        {
                            path: 'role',
                            element: <LoadComponent component={Role} />,
                        },
                        {
                            path: 'proof-type',
                            element: <LoadComponent component={ProofType} />,
                        },
                    ],
                },
                {
                    path: 'allowance',
                    children: [
                        {
                            path: 'visit-entry',
                            element: <LoadComponent component={VisitEntry} permission={['visit_entry_ins', 'visit_entry_upd', 'visit_entry_del']} />,
                        },
                        {
                            path: 'petrol-allowance',
                            element: <LoadComponent component={PetrolAllowance} permission={['petrol_allowance_ins', 'petrol_allowance_upd', 'petrol_allowance_del']} />,
                        },
                    ],
                },
                {
                    path: 'access-denied',
                    element: <LoadComponent component={Error500} />,
                },
            ],
        },
    ]);
};

export { AllRoutes };
