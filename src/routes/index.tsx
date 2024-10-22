import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
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
import { useRedux } from '../hooks';

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
} from './Route_Menu';


const loading = () => <div className=""></div>;

type LoadComponentProps = {
    component: React.LazyExoticComponent<() => JSX.Element>;
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
    <Suspense fallback={loading()}>
        <Component />
    </Suspense>
);

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
            // public routes
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
                {
                    path: 'error-404',
                    element: <LoadComponent component={Error404} />,
                },
                {
                    path: 'error-500',
                    element: <LoadComponent component={Error500} />,
                },
                {
                    path: 'maintenance',
                    element: <LoadComponent component={Maintenance} />,
                },
                {
                    path: 'coming-soon',
                    element: <LoadComponent component={ComingSoon} />,
                },
                {
                    path: 'landing',
                    element: <LoadComponent component={Landing} />,
                },
            ],
        },
        {
            // auth protected routes
            path: '/',
            element: <PrivateRoute roles={'Admin'} component={Layout} />,
            children: [
                {
                    path: 'dashboard',
                    element: <LoadComponent component={DashBoard1} />,
                },
                {
                    path: 'loan-report',
                    element: <LoadComponent component={LoanReportDashboard} />,
                },
                {
                    path: 'claim',
                    element: <LoadComponent component={Claim} />,
                },
                {
                    path: 'claim-approved',
                    element: <LoadComponent component={ClaimTemplate} />,
                },
                {
                    path: 'view',
                    children: [
                        {
                            path: 'activity',
                            element: <LoadComponent component={Activity} />,
                        },
                        {
                            path: 'branch',
                            element: <LoadComponent component={Branch} />,
                        },
                        {
                            path: 'department',
                            element: <LoadComponent component={Department} />,
                        },
                        {
                            path: 'designation',
                            element: <LoadComponent component={Designation} />,
                        },
                        {
                            path: 'staff',
                            element: <LoadComponent component={Staff} />,
                        },
                        {
                            path: 'claim-type',
                            element: <LoadComponent component={ClaimType} />,
                        },
                        {
                            path: 'bank-account',
                            element: <LoadComponent component={BankAccount} />,
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
                            element: <LoadComponent component={VisitEntry} />,
                        },
                        {
                            path: 'petrol-allowance',
                            element: <LoadComponent component={PetrolAllowance} />,
                        },
                    ],
                },
                {
                    path: 'apps',
                    children: [                        
                        {
                            path: 'calendar',
                            element: <LoadComponent component={CalendarApp} />,
                        },
                        {
                            path: 'chat',
                            element: <LoadComponent component={ChatApp} />,
                        },
                        {
                            path: 'email/inbox',
                            element: <LoadComponent component={Inbox} />,
                        },
                        {
                            path: 'tasks/kanban',
                            element: <LoadComponent component={Kanban} />,
                        },
                        {
                            path: 'tasks/details',
                            element: <LoadComponent component={TaskDetail} />,
                        },
                        {
                            path: 'projects',
                            element: <LoadComponent component={Projects} />,
                        },
                        {
                            path: 'contacts/list',
                            element: <LoadComponent component={List} />,
                        },
                        {
                            path: 'contacts/profile',
                            element: <LoadComponent component={Profile} />,
                        },
                    ],
                },
                {
                    path: 'pages',
                    children: [
                        {
                            path: 'starter',
                            element: <LoadComponent component={Starter} />,
                        },
                        {
                            path: 'pricing',
                            element: <LoadComponent component={Pricing} />,
                        },
                        {
                            path: 'timeline',
                            element: <LoadComponent component={Timeline} />,
                        },
                        {
                            path: 'invoice',
                            element: <LoadComponent component={Invoice} />,
                        },
                        {
                            path: 'faq',
                            element: <LoadComponent component={FAQ} />,
                        },
                        {
                            path: 'gallery',
                            element: <LoadComponent component={Gallery} />,
                        },
                    ],
                },
                {
                    path: 'base-ui',
                    children: [
                        {
                            path: 'buttons',
                            element: <LoadComponent component={Buttons} />,
                        },
                        {
                            path: 'cards',
                            element: <LoadComponent component={Cards} />,
                        },
                        {
                            path: 'avatars',
                            element: <LoadComponent component={Avatars} />,
                        },
                        {
                            path: 'tabs-accordions',
                            element: <LoadComponent component={TabsAccordions} />,
                        },
                        {
                            path: 'notifications',
                            element: <LoadComponent component={Notifications} />,
                        },
                        {
                            path: 'modals',
                            element: <LoadComponent component={Modals} />,
                        },
                        {
                            path: 'progress',
                            element: <LoadComponent component={Progress} />,
                        },
                        {
                            path: 'offcanvas',
                            element: <LoadComponent component={Offcanvases} />,
                        },
                        {
                            path: 'placeholders',
                            element: <LoadComponent component={Placeholders} />,
                        },
                        {
                            path: 'spinners',
                            element: <LoadComponent component={Spinners} />,
                        },
                        {
                            path: 'images',
                            element: <LoadComponent component={Images} />,
                        },
                        {
                            path: 'carousel',
                            element: <LoadComponent component={Carousel} />,
                        },
                        {
                            path: 'embedvideo',
                            element: <LoadComponent component={EmbedVedio} />,
                        },
                        {
                            path: 'dropdowns',
                            element: <LoadComponent component={Dropdowns} />,
                        },
                        {
                            path: 'popovers-tooltips',
                            element: <LoadComponent component={PopoversAndTooltips} />,
                        },
                        {
                            path: 'general',
                            element: <LoadComponent component={GeneralUI} />,
                        },
                        {
                            path: 'typography',
                            element: <LoadComponent component={Typography} />,
                        },
                        {
                            path: 'grid',
                            element: <LoadComponent component={Grid} />,
                        },
                    ],
                },
                {
                    path: 'widgets',
                    element: <LoadComponent component={Widgets} />,
                },
                {
                    path: 'extended-ui',
                    children: [
                        {
                            path: 'nestable',
                            element: <LoadComponent component={NestableList} />,
                        },
                        {
                            path: 'rangesliders',
                            element: <LoadComponent component={RangeSliders} />,
                        },
                        {
                            path: 'sweet-alert',
                            element: <LoadComponent component={SweetAlerts} />,
                        },
                        {
                            path: 'tour',
                            element: <LoadComponent component={Tourpage} />,
                        },
                        {
                            path: 'treeview',
                            element: <LoadComponent component={TreeViewExample} />,
                        },
                    ],
                },
                {
                    path: 'icons',
                    children: [
                        {
                            path: 'feather',
                            element: <LoadComponent component={FeatherIcons} />,
                        },
                        {
                            path: 'mdi',
                            element: <LoadComponent component={MDIIcons} />,
                        },
                        {
                            path: 'dripicons',
                            element: <LoadComponent component={Dripicons} />,
                        },
                        {
                            path: 'font-awesome',
                            element: <LoadComponent component={FontAwesomeIcons} />,
                        },
                        {
                            path: 'themify',
                            element: <LoadComponent component={ThemifyIcons} />,
                        },
                    ],
                },
                {
                    path: 'forms',
                    children: [
                        {
                            path: 'basic',
                            element: <LoadComponent component={GeneralElements} />,
                        },
                        {
                            path: 'advanced',
                            element: <LoadComponent component={FormAdvanced} />,
                        },
                        {
                            path: 'validation',
                            element: <LoadComponent component={Validation} />,
                        },
                        {
                            path: 'wizard',
                            element: <LoadComponent component={FormWizard} />,
                        },
                        {
                            path: 'upload',
                            element: <LoadComponent component={FileUpload} />,
                        },
                        {
                            path: 'editors',
                            element: <LoadComponent component={Editors} />,
                        },
                    ],
                },
                {
                    path: 'tables',
                    children: [
                        {
                            path: 'basic',
                            element: <LoadComponent component={BasicTable} />,
                        },
                        {
                            path: 'advanced',
                            element: <LoadComponent component={AdvancedTable} />,
                        },
                    ],
                },
                {
                    path: 'charts',
                    children: [
                        {
                            path: 'apex',
                            element: <LoadComponent component={ApexChart} />,
                        },
                        {
                            path: 'chartjs',
                            element: <LoadComponent component={ChartJs} />,
                        },
                    ],
                },
                {
                    path: 'maps',
                    children: [
                        {
                            path: 'google',
                            element: <LoadComponent component={GoogleMaps} />,
                        },
                        {
                            path: 'vector',
                            element: <LoadComponent component={VectorMaps} />,
                        },
                    ],
                },
            ],
        },
    ]);
};

export { AllRoutes };
