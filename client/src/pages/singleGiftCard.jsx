import '../components/GiftCardListItem.css';
import { useLocation } from 'react-router-dom';
import CodeView from '../components/CodeView';
import Button from '../components/Button';

const SingleGiftCard = () => {
  const { state } = useLocation();
  const {
    name,
    photo_url,
    point_balance,
    redeem_at,
    balance,
    address,
    city,
    gift_card_id,
  } = state;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <>
      <div>
        <p className="store-name">{name}</p>
        <article
          className="gift-card"
          style={{
            backgroundImage: `url(${photo_url})`,
          }}
        >
          <header>
            {redeem_at > 0 && (
              <>
                <div className="points">
                  <p>{point_balance}</p>
                  <div className="points-total">
                    {/* <p>/</p> */}
                    <p>/ {redeem_at}</p>
                  </div>
                </div>
              </>
            )}
            {balance > 0 && (
              <div className="card-balance">
                <p>{formatter.format(balance / 100)}</p>
              </div>
            )}
          </header>

          <footer>
            <p>{address}</p>
            <p>{city}</p>
          </footer>
        </article>
        <CodeView cardID={gift_card_id.toString()} />
      </div>
      <Button onClick={() => console.log('add to')}>Add to your Account</Button>
      <Button onClick={() => console.log('transfer')}>
        Transfer to a friend
      </Button>
    </>
  );
};

export default SingleGiftCard;
