
import "./landing.css";

const Landing = (props) => {
  return (
    <div className="landing-container">
      <div
        id="landing-hero"
        style={{
          backgroundImage:
            "url(images/pexels-kaique-rocha-331990.jpg)",
          // client/public/images/pexels-tim-douglas-6205471.jpg
        }}
      ></div>
      <div id="entry-point">
        <button>Log In</button>
        <button>Register</button>
      </div>
      <div className="landing-item landing-first">
        <div className="landing-image" style={{
          backgroundImage:
            "url(images/pexels-angela-roma-7319111.jpg)",
          // client/public/images/pexels-tim-douglas-6205471.jpg
        }}></div>
        <div className="landing-message">
          <p>Gifting made easy</p>
        </div>
      </div>
      <div className="landing-item landing-second">
        <div className="landing-image" style={{
          backgroundImage:
            "url(images/pexels-cottonbro-3171000.jpg)",
          // client/public/images/pexels-tim-douglas-6205471.jpg
        }}></div>
        <div className="landing-message">
          <p>Always within reach</p>
        </div>
      </div>
      <div className="landing-item landing-third">
        <div className="landing-image" style={{
          backgroundImage:
            "url(images/pexels-amina-filkins-5414046.jpg)",
          // client/public/images/pexels-tim-douglas-6205471.jpg
        }}></div>
        <div className="landing-message">
          <p>Loyalty done right</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
