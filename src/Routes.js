import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import RouteConfig from 'views/routes';

const Routes = () => {
  const routes = RouteConfig();

  return (
    <ReactRoutes>
      {routes.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}
    </ReactRoutes>
  );
};

export default Routes;
