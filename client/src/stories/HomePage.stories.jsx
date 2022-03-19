import HomePage from '../components/HomePage'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'


export default {
  title: 'Loyaltree/HomePage',
  component: HomePage,
};


export const primary = (props) => {
  return(
    <>
    <Navigation />
      <HomePage className='homepage'/>
      <Footer />
    </>
  )
}