import TopBar from "@/components/TopBar";
import StopAndGo from "@/components/StopAndGo";
import ResumeReading from "@/components/ResumeReading";
import LegacyLinks from "@/components/LegacyLinks";
import { RouteBar } from "@/components/ShortRoute";
import Prologue from "@/components/chapters/Prologue";
import Ch01Before from "@/components/chapters/Ch01Before";
import Ch02Stick from "@/components/chapters/Ch02Stick";
import Ch03Ancient from "@/components/chapters/Ch03Ancient";
import Ch04Data from "@/components/chapters/Ch04Data";
import Ch05Languages from "@/components/chapters/Ch05Languages";
import Ch06Translate from "@/components/chapters/Ch06Translate";
import Ch07Oddities from "@/components/chapters/Ch07Oddities";
import Ch08Objects from "@/components/chapters/Ch08Objects";
import Ch09Bug from "@/components/chapters/Ch09Bug";
import Ch10Design from "@/components/chapters/Ch10Design";
import Ch11OnTime from "@/components/chapters/Ch11OnTime";
import Ch12Clock from "@/components/chapters/Ch12Clock";
import Ch13Quadball from "@/components/chapters/Ch13Quadball";
import Ch14Behind from "@/components/chapters/Ch14Behind";
import Coda from "@/components/chapters/Coda";
import Sources from "@/components/chapters/Sources";

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#before-scores">
        Skip the opening
      </a>
      <TopBar />
      <StopAndGo />
      <ResumeReading />
      <LegacyLinks />
      <RouteBar />
      <main id="main">
        <Prologue />
        {/* Part I · Memory */}
        <Ch01Before />
        <Ch02Stick />
        <Ch03Ancient />
        <Ch04Data />
        {/* Part II · Language */}
        <Ch05Languages />
        <Ch06Translate />
        <Ch07Oddities />
        {/* Part III · Display */}
        <Ch08Objects />
        <Ch09Bug />
        {/* Part IV · Redesign */}
        <Ch10Design />
        <Ch11OnTime />
        <Ch12Clock />
        <Ch13Quadball />
        {/* Part V · Scoring the score */}
        <Ch14Behind />
        <Coda />
        <Sources />
      </main>
    </>
  );
}
