import "./landing.css";

const Landing = (props) => {
  return (
    <>
      <header>
        <img src="loyaltree-large.svg" alt="loyaltree logo" />
      </header>

      <div className="landing-container">
        <div className="image-group">
          <img src="./images/orange-bag.jpg" alt="" />
          <article className="article-color-1">
            <h2>Gifting made easy</h2>
            <p>
              Send love to friends and family while supporting local business.
            </p>
          </article>
          <img src="./images/checkout-guy.jpg" alt="man using loyaltree" />
          <img
            src="./images/nice-lady-shopping.jpg"
            alt="man using loyaltree"
          />
        </div>

        <div className="image-group">
          <article className="article-color-3">
            <h2>Always within reach</h2>
            <p>All your cards and purchase info, right in your pocket.</p>
          </article>
          <img src="./images/ladies-shopping-2.jpg" alt="" />
          <img src="./images/tablet-guy.jpg" alt="" />
          <img src="./images/girl-shopping-flowers.jpg" alt="girl shopping" />
        </div>

        <div className="image-group">
          <img src="./images/girl-shopping-tiles.jpg" alt="girl shopping" />
          <img src="./images/open-storefront.jpg" alt="" />
          <article className="article-color-2">
            <h2>Loyalty done right</h2>
            <p>Connect with customers and build lasting relationships.</p>
          </article>
          <img src="./images/lady-shopping.jpg" alt="" />
        </div>
      </div>
      <footer>
        <div className="footer-links">
          <div className="footer-column">
            <h2>Social</h2>
            <p>Twitter</p>
            <p>Facebook</p>
            <p>Instagram</p>
          </div>
          <div className="footer-column">
            <h2>About Us</h2>
            <p>Who we are</p>
            <p>Program Info</p>
          </div>
          <div className="footer-column">
            <h2>Creators</h2>
            <p>Casey Tite</p>
            <p>Chris Bell</p>
            <p>Logan Woolf</p>
          </div>
        </div>
        <p className="thank-you">
          A very special thank you to our families who supported us all the way
          through and helped with ideas and graphics for this project.
        </p>
        <p className="thank-you">
          Another special thanks to all of the instructors, mentors, and staff
          at Lighthouse Labs! You are amazing and have changed our lives!
        </p>
      </footer>
    </>
  );
};

export default Landing;
