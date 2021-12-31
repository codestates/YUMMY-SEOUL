import "./Footer.css";

function Footer() {
  return (
    <>
      <footer className="footer_container">
        <div className="footer_box1">
          <span>🎨 Map Design</span>
          <span>Kim heang-jun</span>
        </div>
        <div className="footer_box2">
          <span className="footer_title">
            Yummy <img className="footer_logo" src="/logo.svg" /> Seoul
          </span>
        </div>
        <div className="footer_box3">
          <div>
            <a href="https://github.com/godyuo" target="_blank">
              <img src="/git_logo.png" className="footer_img" />
              <span className="footer_member">손승우</span>
            </a>
          </div>
          <div>
            <a href="https://github.com/DowoonAhn" target="_blank">
              <img src="/git_logo.png" className="footer_img" />
              <span className="footer_member">안도운</span>
            </a>
          </div>
          <div>
            <a href="https://github.com/sanghyun94" target="_blank">
              <img src="/git_logo.png" className="footer_img" />
              <span className="footer_member">이상현</span>
            </a>
          </div>
          <div>
            <a href="https://github.com/CaliforniaLuv" target="_blank">
              <img src="/git_logo.png" className="footer_img" />
              <span className="footer_member">이진성</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
