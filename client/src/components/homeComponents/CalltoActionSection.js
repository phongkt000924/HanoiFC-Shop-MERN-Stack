import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Bạn cần thêm thông tin?</h2>

              <p>Hãy gửi email cho chúng tôi?</p>

              <form className="form-section">
                <input placeholder="Nhập email..." name="email" type="email" />
                
                <input value="Vâng. Tôi đồng ý!" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
