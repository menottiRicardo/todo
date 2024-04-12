import { auth } from "@/lib/auth";
import { getTimeOfDay } from "@/utils/time";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth()

  // user will never reach due to authorized but still 
  // Reference: lib/auth.js#authorized
  if (!session) return redirect('api/auth/signin');

  const user = session.user
  const timeOfDay = getTimeOfDay();
  const today = dayjs().format("ddd D MMMM YYYY")
  
  return (
    <div>
      <h1 className="font-medium text-xl">Good {timeOfDay}, {user?.name}!</h1>
      <h3 className="font-light text-secondary py-2">Today, {today}</h3>
    </div>
  );
}
