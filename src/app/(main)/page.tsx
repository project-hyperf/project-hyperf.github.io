// import { Footer } from "@/components/Footer/Footer";
import { KeyVisual } from "@/components/Composition/Keyvisual/Keyvisual";
// import { GeneralNavigationBar } from "@/components/Navigator/GeneralNavigationBar/GeneralNavigationBar";
import { About } from "@/components/Composition/About/About";
import { Teams } from "@/components/Composition/Teams/Teams";
import { Footer } from "@/components/Widget/Footer/Footer";
import { GNB } from "@/components/Widget/GNB/GNB";
import { Main } from "@/components/Widget/Layout/Main";
import { Section } from "@/components/Widget/Layout/Section";
import { Framework } from "@/components/Composition/Framework/Framework";
import { Outcomes } from "@/components/Composition/Outcomes/Outcomes";
import { Events } from "@/components/Composition/Events/Events";

const Components = {
  "key-visual": KeyVisual,
  about: About,
  teams: Teams,
  framework: Framework,
  outcomes: Outcomes,
  // modules: Modules,
  news: Events,
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="w-full fixed top-0 z-50">
        <GNB />
      </div>
      <Main>
        {Object.entries(Components).map(([key, Component]) => (
          <Section key={key} id={key}>
            <Component />
          </Section>
        ))}
      </Main>

      <Footer />
    </div>
  );
}
