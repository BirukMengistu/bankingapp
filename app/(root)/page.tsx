import { HeaderBox } from "@/components/Header";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser, getUserInfo } from "@/lib/actions/user.actions";
import { getLocationOrigin } from "next/dist/shared/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
// @ts-ignore
export default async function Home(){
 const LoggedIn= await getLoggedInUser()
 if(!LoggedIn) {
  redirect('/sign-in')
 }
 return (
   <section className="home">
    <div className="home-content">
    <header className="home-header">
          <HeaderBox
          type='greeting'
          title='Welcome'
          user ={LoggedIn?.name||'Guest'}
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
