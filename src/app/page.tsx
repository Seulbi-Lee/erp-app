import { redirect } from "next/navigation";
import { createServer } from "./utils/supabase/server";

const Home = async () => {
  const supabase = createServer();
  const auth = await supabase.auth.getSession();
  const session = auth.data.session;

  if (!session) {
    redirect("/auth");
  } else {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="loading">
        <div className="loading-logo">
          <div className="logo">
            <span className="hidden">planify</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
