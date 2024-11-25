// import { Footer } from "@/components/Footer/Footer";
// import { KeyVisual } from "@/components/KeyVisual/KeyVisual";
// import { GeneralNavigationBar } from "@/components/Navigator/GeneralNavigationBar/GeneralNavigationBar";
// import { About } from "@/components/Section/About/About";
// import { Events } from "@/components/Section/Events/Events";
// import { Modules } from "@/components/Section/Modules/Modules";
// import { Outcomes } from "@/components/Section/Outcomes/Outcomes";
// import { Section } from "@/components/Section/Section";
// import { Researchers } from "@/components/Section/Teams/Researchers";
// import { Teams } from "@/components/Section/Teams/Teams";
import { GNB } from "@/components/Widget/GNB/GNB";

const Components = {
  // "key-visual": KeyVisual,
  // about: About,
  // teams: Teams,
  // researchers: Researchers,
  // outcomes: Outcomes,
  // modules: Modules,
  // events: Events,
};

export default function Home() {
  return (
    <main>
      <div className="w-full fixed top-0 z-50">
        <GNB />
      </div>
      {/* {Object.entries(Components).map(([key, Component]) => (
        <Section key={key} id={key} revealAnimation={key !== "key-visual"}>
          <Component />
        </Section>
      ))} */}
      {/* <Footer /> */}
    </main>
  );
}
