import { HeaderBox } from "@/components/Header";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import Image from "next/image";

export default function Home() {
  const LoggedIn ={
    firstname:'Birdev'
  }
  return (
   <div className="home">
    <div className="home-content">
    <header className="home-header">
      <HeaderBox
      type='greeting'
      title='Welcome'
      user ={LoggedIn?.firstname||'Guest'}
      subtext='Acces and manage your account and transction'
      />
      <TotalBalanceBox
      accounts={[]}
      totalBanks={1}
      totalCurrentBalance={1200}
      />
      
    </header>
    </div>
    <div>
    <h1>Home</h1>
    </div>
   </div>
  );
}
