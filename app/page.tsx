import TopBar from "@/components/TopBar";
import Prologue from "@/components/chapters/Prologue";
import Ch01Before from "@/components/chapters/Ch01Before";
import Ch02Stick from "@/components/chapters/Ch02Stick";
import Ch03Ancient from "@/components/chapters/Ch03Ancient";
import Ch04Data from "@/components/chapters/Ch04Data";
import Ch05Languages from "@/components/chapters/Ch05Languages";
import Ch06Objects from "@/components/chapters/Ch06Objects";
import Ch07Design from "@/components/chapters/Ch07Design";
import Ch08Television from "@/components/chapters/Ch08Television";
import Ch09Clock from "@/components/chapters/Ch09Clock";
import Ch10Translate from "@/components/chapters/Ch10Translate";
import Ch11Oddities from "@/components/chapters/Ch11Oddities";
import Ch12Quadball from "@/components/chapters/Ch12Quadball";
import Ch13Bug from "@/components/chapters/Ch13Bug";
import Ch14Behind from "@/components/chapters/Ch14Behind";
import Coda from "@/components/chapters/Coda";
import Sources from "@/components/chapters/Sources";

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#ch-01">
        Skip the opening
      </a>
      <TopBar />
      <main id="main">
        <Prologue />
        <Ch01Before />
        <Ch02Stick />
        <Ch03Ancient />
        <Ch04Data />
        <Ch05Languages />
        <Ch06Objects />
        <Ch07Design />
        <Ch08Television />
        <Ch09Clock />
        <Ch10Translate />
        <Ch11Oddities />
        <Ch12Quadball />
        <Ch13Bug />
        <Ch14Behind />
        <Coda />
        <Sources />
      </main>
    </>
  );
}
