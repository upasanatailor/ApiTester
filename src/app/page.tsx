import { Header } from "@/component/header";
import SideBar from "@/component/sideBar";

import Collection from "@/component/collection";
import ApiTester from "@/component/collection/apiTester";

export default function Home() {
  return (
    <div>
      <SideBar />
      <Collection />

      <ApiTester />
    </div>
  );
}
