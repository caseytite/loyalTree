import "./landing.css";

const Landing = (props) => {
  return (
    <>
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
    </>
  );
};

export default Landing;
