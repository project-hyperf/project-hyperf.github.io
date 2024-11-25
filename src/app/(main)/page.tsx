// import { Footer } from "@/components/Footer/Footer";
import { KeyVisual } from "@/components/Composition/Keyvisual/Keyvisual";
// import { GeneralNavigationBar } from "@/components/Navigator/GeneralNavigationBar/GeneralNavigationBar";
import { About } from "@/components/Composition/About/About";
// import { Events } from "@/components/Section/Events/Events";
// import { Modules } from "@/components/Section/Modules/Modules";
// import { Outcomes } from "@/components/Section/Outcomes/Outcomes";
// import { Section } from "@/components/Section/Section";
// import { Researchers } from "@/components/Section/Teams/Researchers";
// import { Teams } from "@/components/Section/Teams/Teams";
import { Footer } from "@/components/Widget/Footer/Footer";
import { GNB } from "@/components/Widget/GNB/GNB";
import { Main } from "@/components/Widget/Layout/Main";
import { Section } from "@/components/Widget/Layout/Section";

const Components = {
  "key-visual": KeyVisual,
  about: About,
  // teams: Teams,
  // researchers: Researchers,
  // outcomes: Outcomes,
  // modules: Modules,
  // events: Events,
};

export default function Home() {
  return (
    <div className="h-screen">
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
