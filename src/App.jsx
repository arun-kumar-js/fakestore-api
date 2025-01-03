import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./Cart";
import Nav from "./warpper/nav";
import Home from "./components/Home";

const app = () => {
  const routes = [
    {
      path: "/",
      element: <Nav />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
  ];
  
  ;

  const router = createBrowserRouter(routes, {
      
    future:
    {
        
      v7_normalizeFormMethod: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_skipActionStatusRevalidation: true,
    }
  });

  

  
  
  return <RouterProvider router={router}
    future={
      { v7_startTransition: true, }
  
  }/>
   

}

export default app;