// The dashboard routes and mapping with their respective component, also where we render the
// sidebar menu

import React, { useState, createContext } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import DashboardHome from "./Home/Home.jsx";
import DashboardMessaging from "./Messaging/Messaging.jsx";
import DashboardNumbers from "./Numbers/Numbers.jsx";
// import DashboardCalls from "./Calls/Calls.jsx";
import DashboardBilling from "./Billing/Billing.jsx";
import DashboardNotifications from "./Notifications/Notifications.jsx";
import DashboardProfile from "./Profile/Profile.jsx";
import DashboardLogout from "./Signout/Signout.jsx";
import DashboardVerifiedId from "./VerifiedId/VerifiedId.jsx";
import Sidebar from "./Sidebar/Sidebar";
import AnimatedRouteMount from "../AnimatedRouteMount/AnimatedRouteMount";

export let DashboardContext = createContext({
  navIsOpen: false,
  setNavIsOpen: () => {},
});

export default function DashboardRoutes() {
  let [navIsOpen, setNavIsOpen] = useState(false);

  return (
    <DashboardContext.Provider value={{ navIsOpen, setNavIsOpen }}>
      <div className="flex h-screen">
        <Sidebar />
        <Route
          exact
          path="/dashboard"
          render={() => <Redirect to="/dashboard/" />}
        />
        <Route
          exact
          path="/dashboard/inbox"
          render={() => <Redirect to="/dashboard/inbox/" />}
        />
        {/* <Route
          exact
          path="/dashboard/calls"
          render={() => <Redirect to="/dashboard/calls/" />}
        /> */}
        <Route
          exact
          path="/dashboard/numbers"
          render={() => <Redirect to="/dashboard/numbers/" />}
        />
        <Route
          exact
          path="/dashboard/verifiedId"
          render={() => <Redirect to="/dashboard/verifiedId/" />}
        />
        <Route
          exact
          path="/dashboard/billing"
          render={() => <Redirect to="/dashboard/billing/" />}
        />
        <Route
          exact
          path="/dashboard/notifications"
          render={() => <Redirect to="/dashboard/notifications/" />}
        />
        <Route
          exact
          path="/dashboard/profile"
          render={() => <Redirect to="/dashboard/profile/" />}
        />
        <Switch>
          <Route exact path="/dashboard">
            <AnimatedRouteMount
              className="overflow-y-scroll"
              routeMountRequestInfo={{
                requestPath: "/api/home/",
                dataObjName: "dashboardHomeData",
              }}
            >
              <DashboardHome />
            </AnimatedRouteMount>
          </Route>
          <Route exact path="/dashboard/inbox/">
            <AnimatedRouteMount
              className="overflow-y-scroll"
              routeMountRequestInfo={{
                requestPath: "/api/messaging/",
                dataObjName: "dashboardMessagingData",
              }}
            >
              <DashboardMessaging />
            </AnimatedRouteMount>
          </Route>
          {/* <Route exact path="/dashboard/calls/">
            <AnimatedRouteMount
              className="overflow-y-scroll"
              routeMountRequestInfo={{
                requestPath: "/api/calls/",
                dataObjName: "dashboardCallsData",
              }}
            >
              <DashboardCalls />
            </AnimatedRouteMount>
          </Route> */}
          <Route exact path="/dashboard/numbers/">
            <AnimatedRouteMount
              className="overflow-y-scroll"
              routeMountRequestInfo={{
                requestPath: "/api/numbers/",
                dataObjName: "dashboardNumbersData",
              }}
            >
              <DashboardNumbers />
            </AnimatedRouteMount>
          </Route>
          <Route exact path="/dashboard/verifiedId">
            <AnimatedRouteMount
              className="overflow-y-scroll"
              routeMountRequestInfo={{
                requestPath: "/api/verifyids/",
                dataObjName: "dashboardVerifiedId",
              }}
            >
              <DashboardVerifiedId />
            </AnimatedRouteMount>
          </Route>
          <Route exact path="/dashboard/billing/">
            <AnimatedRouteMount
              className="overflow-y-scroll"
              routeMountRequestInfo={{
                requestPath: "/api/billing/",
                dataObjName: "dashboardBillingData",
              }}
            >
              <DashboardBilling />
            </AnimatedRouteMount>
          </Route>
          <Route exact path="/dashboard/notifications/">
            <AnimatedRouteMount
              className="overflow-y-scroll"
              routeMountRequestInfo={{
                requestPath: "/api/notifications/",
                dataObjName: "dashboardNotificationsData",
              }}
            >
              <DashboardNotifications />
            </AnimatedRouteMount>
          </Route>
          <Route exact path="/dashboard/profile/">
            <AnimatedRouteMount
              className="overflow-y-scroll"
              routeMountRequestInfo={{
                requestPath: "/api/user/",
                dataObjName: "dashboardProfileData",
              }}
            >
              <DashboardProfile />
            </AnimatedRouteMount>
          </Route>
          <Route exact path="/dashboard/logout/">
            <DashboardLogout />
          </Route>
          <Route render={() => <div>404</div>} />
        </Switch>
      </div>
    </DashboardContext.Provider>
  );
}
