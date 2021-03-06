import "./Footer.css";

function Footer() {
  return (
    <>
      <footer className="footer_container">
        <div className="footer_box1">
          <span>π¨ Map Design</span>
          <span>Kim heang-jun</span>
        </div>
        <div className="footer_box2">
          <span className="footer_title">
            Yummy <img className="footer_logo" src="/logo.svg" /> Seoul
          </span>
        </div>
        <div className="footer_box3">
          <div>
            <img src="/git_logo.png" className="footer_img" />
            <span className="footer_member">μμΉμ°</span>
          </div>
          <div>
            <img src="/git_logo.png" className="footer_img" />
            <span className="footer_member">μλμ΄</span>
          </div>
          <div>
            <img src="/git_logo.png" className="footer_img" />
            <span className="footer_member">μ΄μν</span>
          </div>
          <div>
            <img src="/git_logo.png" className="footer_img" />
            <span className="footer_member">μ΄μ§μ±</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
