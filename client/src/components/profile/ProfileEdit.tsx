import { Component, useEffect, useState } from "react";
import "./ProfileEdit.css";
import React from "react";


interface Iclose {
  close: string;
}
interface Iemail {
  email: string;
}
interface Ipassword {
  password: string;
}
interface Inickname {
  nickname: string;
}

function ProfileEdit() {
  const [hidden, setHidden] = useState<Iclose>({
    close: "",
  });
  const [email, setEmail] = useState<Iemail>({
    email: "",
  });
  const [password, setPassword] = useState<Ipassword>({
    password: "",
  });
  const [nickname, setNickname] = useState<Inickname>({
    nickname: "",
  });

  const handleOpenModal = () => {
    setHidden({
      close: "",
    });

    window.location.href = "#demo-modal";
  };
  const handleCloseModal = () => {
    setHidden({
      close: "login_hidden",
    });
    console.log(hidden);
  };

  const [empty, setEmpty] = useState<boolean>(false);
  const [emptyNone, setEmptyNone] = useState<string>("");
  const [profileselect, setProfileSelect] = useState<string>("");
  const [passedit, setPassEdit] = useState<string>("");
  const [nickedit, setNickEdit] = useState<string>("");
  const [profileedit, setProfileEdit] = useState<string>("");
  const handleSelect = () => {
    setEmptyNone("empty_none");
  }
  const handleNick = () => {
    setEmptyNone("empty_none");
  }
  const handleProfile = () => {
    setEmptyNone("empty_none");
  }
  const handlePassword = () => {
    setEmptyNone("empty_none");
  }
  // console.log("이건 이메일이야", email.email);
  // console.log("이건 비밀번호야", password.password);

  return (
    <>
    <button type="button" onClick={handleOpenModal}>
        Open Modal
      </button>
            
      <div id="demo-modal" className={`modal ${hidden.close}`}>
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <button className="closeBtn" onClick={handleCloseModal}>
            ❌
          </button>
          <section className="login_writing">
            <div className="profile_container">
              <h1 className="profile_edit_title">정보 수정</h1>              
              </div>         
          <nav className="edit_menu_container">
            <span className={`edit_text ${passedit}`}
            onClick={handlePassword}>비밀번호 수정</span>
            <span className={`edit_text ${nickedit}`}
            onClick={handleNick}>닉네임 수정</span>
            <span className={`edit_text ${profileedit}`}
            onClick={handleProfile}>프로필 수정</span>
            </nav>
          <img src="images/profile.png" alt="profile" className="profile_img" />
              <nav className="profile_select">
              <span className={`profile_select ${profileselect}`} 
              onClick={handleSelect}> 프로필 선택</span>
              </nav>
              <br />
              <button className="change_btn">변경하기</button>
              </section>
            </div>
      </div>
    </>
  );
}







export default ProfileEdit;
    
