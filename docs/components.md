Components

Navbar
- Login/out Button
- Register
- logo

Home page componenet
- Image
- Paragraph
-  Search by category ? maybe dropdown? 

Footer
- Logo
- Button/link

Search Compentent
- Drop down component
- List items 
- searchButton

Button component
-button with click or whatever handlers

Gift-Card-Listcompent
- Gift card components

Giftcard-component
- Logo
- Image
- Description
- Balance?
- Store name
- Value
- Button to purchase/add

Form component
- Fake sign in
- Button
- A few inputs

User-cards-list-list
- Search field/filter
- giftcard components
- Button /click card

UserCard component??

Ownerdashboardcomponent
- Image/banner

Transaction-List
- Transaction list items

Transaction-list-item
- Purchase time
- Amount

Transaction-page-component
- Qr scanner component
- Button to confirm

RegistrationComponent
- Signupform
- Button

Store-Registration-component
- Input fields
- button

Store List component
- search/filter
- storeitemcomponents

Store item component
- store data
- button to details
- button to purchase

Cart Component
- Orderdetails component
- checkout/pay button


Homepage

```jsx
<>
 <Nav/>
  <Homepage/>
 <Footer/>
</>

```

Sign in page

```jsx

<>
 <Nav/>
  <SignIn/>
 <Footer/>
</>

```
Users cards (Signed in Page)
```jsx

<>
 <Nav/>
  <GiftCardList cards={cards}/>
 <Footer/>
</>

```
Browse Page
```jsx

<>
 <Nav/>
  <Search />
  <StoreList/>
 <Footer/>
</>

```

Buisness owner dashboard()

```jsx

<>
 <Nav/>
  <Logo/>
  <StoreListItem/>
 <Footer/>
</>
```

Transaction Page

```jsx

<>
 <Nav/>
  <QrcodeScanner />
  <Confirmation />
  <Details/>
 <Footer/>
</>
```