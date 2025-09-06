import { Route, Switch } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import Explore from "@/pages/explore";
import Stays from "@/pages/stays";
import Activities from "@/pages/activities";
import Community from "@/pages/community";
import Groups from "@/pages/groups";
import Reviews from "@/pages/reviews";
import Hosts from "@/pages/hosts";
import Planner from "@/pages/planner";
import Guides from "@/pages/guides";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/explore" component={Explore} />
          <Route path="/stays" component={Stays} />
          <Route path="/activities" component={Activities} />
          <Route path="/community" component={Community} />
          <Route path="/groups" component={Groups} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/hosts" component={Hosts} />
          <Route path="/planner" component={Planner} />
          <Route path="/guides" component={Guides} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
