// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Toaster } from "sonner";
import { Route, Switch } from "wouter";
import { InterviewPage } from "./InterviewPage";
import { AnalysisPage } from "./AnalysisPage";

export default function App() {
  return (
    <MantineProvider>
      <Toaster />
      <Switch>
        <Route path="/analysis/:conversationId" component={AnalysisPage} />
        <Route component={InterviewPage} />
      </Switch>
    </MantineProvider>
  );
}
