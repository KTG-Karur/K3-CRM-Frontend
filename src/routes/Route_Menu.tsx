import React from 'react';
// auth
export const Login = React.lazy(() => import('../pages/auth/Login'));
export const Register = React.lazy(() => import('../pages/auth/Register'));
export const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
export const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
export const LockScreen = React.lazy(() => import('../pages/auth/LockScreen'));
export const Logout = React.lazy(() => import('../pages/auth/Logout'));

// dashboards
export const DashBoard1 = React.lazy(() => import('../pages/dashboards/DashBoard1/'));
export const PetrolAllowance = React.lazy(() => import('../view/petrol-allowance'));
export const VisitEntry = React.lazy(() => import('../view/visit-entry'));
export const Activity = React.lazy(() => import('../view/activity'));
export const ClaimType = React.lazy(() => import('../view/claim-type'));
export const Claim = React.lazy(() => import('../view/claim'));
export const Branch = React.lazy(() => import('../view/branch'));
// export const ClaimTemplate = React.lazy(() => import('../view/claim/approvedTemplate'));
export const ProofType = React.lazy(() => import('../view/proof-type'));
export const Holiday = React.lazy(() => import('../view/holiday'));
export const StaffLeave = React.lazy(() => import('../view/staff-leave'));
export const StaffOnDuty = React.lazy(() => import('../view/staff-onduty'));
export const Attendance = React.lazy(() => import('../view/attendance'));
export const Salary = React.lazy(() => import('../view/staff-salary'));
export const TrainingType = React.lazy(() => import('../view/training-type'));
export const StaffTraining = React.lazy(() => import('../view/staff-training'));

// master
export const Department = React.lazy(() => import('../view/department'));
export const Permission = React.lazy(() => import('../view/permission'));
export const Setting = React.lazy(() => import('../view/setting'));
export const SettingWorkingDay = React.lazy(() => import('../view/setting-working-day'));
export const Designation = React.lazy(() => import('../view/designation'));
export const BankAccount = React.lazy(() => import('../view/bank-account'));
export const Role = React.lazy(() => import('../view/role'));
export const LoanReportDashboard = React.lazy(() => import('../view/dashboard'));
export const Staff = React.lazy(() => import('../view/staff'));
export const TransferStaff = React.lazy(() => import('../view/transfer-staff'));
export const SettingLeaveDeduction = React.lazy(() => import('../view/setting-leave-deduction'));
export const SettingBenefit = React.lazy(() => import('../view/setting-benefit'));
export const AttendanceIncharge = React.lazy(() => import('../view/attendance-incharge'));
export const StaffAdvance = React.lazy(() => import('../view/staff-advance'));
export const Deputation = React.lazy(() => import('../view/deputation'));

// user rights
export const UserRights = React.lazy(() => import('../view/staff-rights'));

//document
export const DeputationReport = React.lazy(() => import('../view/documents/deputaion-report'));
export const TransferReport = React.lazy(() => import('../view/documents/transfer-report'));
export const PermissionLeaveOdReport = React.lazy(() => import('../view/documents/permission-leave-od-report'));
export const PetrolAllowanceReportDoc = React.lazy(() => import('../view/documents/petrol-allowance-report'));
export const BirthDayClaimReport = React.lazy(() => import('../view/documents/birthday-claim-report'));
export const LedgerReport = React.lazy(() => import('../view/documents/ledger-report'));

//report
export const StaffAttendanceReport = React.lazy(() => import('../view/report/staff-attendance-report'));
export const ClaimReport = React.lazy(() => import('../view/report/claim-report'));
export const PetrolAllowanceReport = React.lazy(() => import('../view/report/petrol-allowance-report'));

// apps
export const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
export const ChatApp = React.lazy(() => import('../pages/apps/Chat'));
export const Inbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
export const Kanban = React.lazy(() => import('../pages/apps/Tasks/Board'));
export const TaskDetail = React.lazy(() => import('../pages/apps/Tasks/Detail'));
export const Projects = React.lazy(() => import('../pages/apps/Projects'));
export const List = React.lazy(() => import('../pages/apps/Contacts/List'));
export const Profile = React.lazy(() => import('../pages/apps/Contacts/Profile'));

// extra pages
export const Starter = React.lazy(() => import('../pages/other/Starter'));
export const Pricing = React.lazy(() => import('../pages/other/Pricing'));
export const Timeline = React.lazy(() => import('../pages/other/Timeline'));
export const Invoice = React.lazy(() => import('../pages/other/Invoice'));
export const FAQ = React.lazy(() => import('../pages/other/FAQ'));
export const Gallery = React.lazy(() => import('../pages/other/Gallery'));
export const Error404 = React.lazy(() => import('../pages/other/Error404'));
export const Error500 = React.lazy(() => import('../pages/other/Error500'));
export const Maintenance = React.lazy(() => import('../pages/other/Maintenance'));
export const ComingSoon = React.lazy(() => import('../pages/other/ComingSoon'));

// base ui
export const Buttons = React.lazy(() => import('../pages/uikit/Buttons'));
export const Cards = React.lazy(() => import('../pages/uikit/Cards'));
export const Avatars = React.lazy(() => import('../pages/uikit/Avatars'));
export const TabsAccordions = React.lazy(() => import('../pages/uikit/TabsAccordions'));
export const Notifications = React.lazy(() => import('../pages/uikit/Notifications'));
export const Modals = React.lazy(() => import('../pages/uikit/Modals'));
export const Progress = React.lazy(() => import('../pages/uikit/Progress'));
export const Offcanvases = React.lazy(() => import('../pages/uikit/Offcanvases'));
export const Placeholders = React.lazy(() => import('../pages/uikit/Placeholders'));
export const Spinners = React.lazy(() => import('../pages/uikit/Spinners'));
export const Images = React.lazy(() => import('../pages/uikit/Images'));
export const Carousel = React.lazy(() => import('../pages/uikit/Carousel'));
export const EmbedVedio = React.lazy(() => import('../pages/uikit/EmbedVideo'));
export const Dropdowns = React.lazy(() => import('../pages/uikit/Dropdowns'));
export const PopoversAndTooltips = React.lazy(() => import('../pages/uikit/PopoversAndTooltips'));
export const GeneralUI = React.lazy(() => import('../pages/uikit/GeneralUI'));
export const Typography = React.lazy(() => import('../pages/uikit/Typography'));
export const Grid = React.lazy(() => import('../pages/uikit/Grid'));

// widgets
export const Widgets = React.lazy(() => import('../pages/uikit/Widgets'));

// extended ui
export const RangeSliders = React.lazy(() => import('../pages/uikit/RangeSlider'));
export const NestableList = React.lazy(() => import('../pages/uikit/NestableList'));
export const SweetAlerts = React.lazy(() => import('../pages/uikit/SweetAlerts'));
export const Tourpage = React.lazy(() => import('../pages/uikit/TourPage'));
export const TreeViewExample = React.lazy(() => import('../pages/uikit/TreeView'));

// icons
export const FeatherIcons = React.lazy(() => import('../pages/icons/FeatherIcons'));
export const MDIIcons = React.lazy(() => import('../pages/icons/MDIIcons'));
export const Dripicons = React.lazy(() => import('../pages/icons/DripiIcons'));
export const FontAwesomeIcons = React.lazy(() => import('../pages/icons/FontAwesomeIcons'));
export const ThemifyIcons = React.lazy(() => import('../pages/icons/ThemifyIcons'));

// forms
export const GeneralElements = React.lazy(() => import('../pages/forms/Basic'));
export const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
export const Validation = React.lazy(() => import('../pages/forms/Validation'));
export const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
export const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
export const Editors = React.lazy(() => import('../pages/forms/Editors'));

// tables
export const BasicTable = React.lazy(() => import('../pages/tables/BasicTable'));
export const AdvancedTable = React.lazy(() => import('../pages/tables/AdvancedTable'));

// charts
export const ApexChart = React.lazy(() => import('../pages/chart/ApexChart'));
export const ChartJs = React.lazy(() => import('../pages/chart/ChartJs'));

// maps
export const GoogleMaps = React.lazy(() => import('../pages/maps/GoogleMaps'));
export const VectorMaps = React.lazy(() => import('../pages/maps/VectorMaps'));

// lamding
export const Landing = React.lazy(() => import('../pages/Landing'));
