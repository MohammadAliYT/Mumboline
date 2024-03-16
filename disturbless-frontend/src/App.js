/* Standard App.js file, here you will find the react-router code and app context */

import React, { useState, Suspense, lazy } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import { Progress } from "./Progress";
import { Main } from "./Components/Main/Main";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import Components from "./Components";
import AnimatedRouteMount from "./Components/AnimatedRouteMount/AnimatedRouteMount";
import VoteForFeatures from "./Components/VoteForFeatures/VoteForFeatures";
import { Toaster } from "react-hot-toast";

export const AppContext = React.createContext();

const DashboardRoutes = lazy(() =>
  import("./Components/Dashboard/DashboardRoutes")
);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [messagesData, setMessagesData] = useState([]);
  const [callsData, setCallsData] = useState([]);
  const [appContextData, setContextData] = useState({
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    dashboardHomeData: {},
    dashboardMessagingData: {},
    dashboardCallsData: {},
    dashboardNumbersData: {},
    dashboardBillingData: {},
    dashboardNotificationsData: {},
    dashboardProfileData: {},
    dashboardVerifiedId: {},
    callsData,
    messagesData,
    setCallsData,
    setMessagesData,
  });

  return (
    <AppContext.Provider value={{ appContextData, setContextData }}>
      <Router>
        <Suspense fallback={<CircularProgress />}>
          <Route
            render={({ location }) => (
              <>
                <Progress
                  isAnimating={appContextData.isLoading}
                  key={location.key}
                />
                <Toaster />
                <Route
                  exact
                  path="*"
                  render={({ location }) => <Redirect to={location} />}
                />
                <Switch location={location}>
                  <Route exact path="/">
                    <AnimatedRouteMount>
                      <Main />
                    </AnimatedRouteMount>
                  </Route>
                  <Route exact path="/components">
                    <AnimatedRouteMount>
                      <Components />
                    </AnimatedRouteMount>
                  </Route>
                  <Route exact path="/privacy-policy/">
                    <AnimatedRouteMount>
                      <PrivacyPolicy />
                    </AnimatedRouteMount>
                  </Route>
                  <Route exact path="/vote-for-features/">
                    <AnimatedRouteMount>
                      <VoteForFeatures />
                    </AnimatedRouteMount>
                  </Route>
                  <Route path="/dashboard">
                    <DashboardRoutes />
                  </Route>
                  <Route render={() => <PageNotFound />} />
                </Switch>
              </>
            )}
          />
        </Suspense>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
