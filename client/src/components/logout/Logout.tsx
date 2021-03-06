import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Logout.css";
import axios from "axios";

interface Iprops {
  logoutNone: string;
  handleLogout: (e: string) => void;
}

function Logout(props: Iprops) {
  const history = useHistory();
  const handleNone = () => {
    props.handleLogout("logout_hidden");
  };

  const handleLogout = async () => {
    const logoutData = await axios
      .post(
        "https://yummyseoulserver.tk/user/signout",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .catch((err) => {
        console.log("π« Not Found π«", err);
      });

    if (logoutData) {
      if (window.location.href === "https://yummyseoul.com/mypage") {
        history.push("https://yummyseoul.com/main");
      } else {
        window.location.replace(window.location.href);
      }
    }
  };

  return (
    <>
      <div className={`logout_modal ${props.logoutNone}`}>
        <div className="logout_overlay"></div>
        <div className="logout_content">
          <section className="logout_writing">
            <h1 className="logout_title">λ‘κ·Έμμ νμκ² μ΅λκΉ?</h1>
            <div className="logout_btn-box">
              <button className="logout_btn" onClick={handleLogout}>
                λ€
              </button>
              <button className="logout_btn" onClick={handleNone}>
                μλμ€
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Logout;
