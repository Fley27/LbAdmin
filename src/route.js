import React from 'react';

const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));
const BranchSelector = React.lazy(() => import('./Demo/Authentication/SignIn/BranchSelector'));

const BranchSelect = React.lazy(() => import('./Demo/Dashboard/SignUp1'));
const route = [
    { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/dashboard/branchselect', exact: true, name: 'Branch Select', component: BranchSelect },
    { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: Signin1 },
    { path: '/auth/branchselector', exact: true, name: 'BranchSelector', component: BranchSelector }
];

export default route;