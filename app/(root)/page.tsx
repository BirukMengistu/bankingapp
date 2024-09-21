import { HeaderBox } from "@/components/Header";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import Image from "next/image";

export default function Home() {
  const LoggedIn ={
    firstName:'Birdev',
    lastName:'Tech',
    email:'birdev_tech@myemail.com'
  }
  return (
   <section className="home">
    <div className="home-content">
    <header className="home-header">
          <HeaderBox
          type='greeting'
          title='Welcome'
          user ={LoggedIn?.firstName||'Guest'}
          subtext='Acces and manage your account and transction'
          />
          <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1200}
          />
      
    </header>
    </div>
    <RightSideBar
    user={LoggedIn}
    transaction={[]}
    banks={[{currentBalance:123.45 },{ currentBalance:2346.46 }]}
    />
   </section>
  );
}
