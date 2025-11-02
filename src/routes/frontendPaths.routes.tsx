
import LoginPage from '../login/LoginPage';
import HomePage from '../pages/HomePage';
import SignUpPage from '../signup/SignUpPage';

export const frontendPaths = [
  {
    path: "/",
    element: <HomePage />,
  },
  
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  
  // {
  //   path: "/products",
  //   element: (
  //     <ProtectedRoute>
  //       <Productpage />
  //     </ProtectedRoute>
  //   ),
  // },
];
