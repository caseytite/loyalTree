<!-- User Stories -->
update db 
#

- [ ] As a user i can "login"
      - [ ] Create login view
      - [ ] Set up login form 
      - [ ] get data from form
      - [ ] send data to back end
      - [ ] query db for user 
      - [ ] set session cookie
       
- [ ] As a user I can browse featured stores because I want to buy a gift card from them
    - [ ] create a detailed view for a store (including how to buy)
    - [ ] create view for stores 
    - [ ] create view for all stores 
- [ ] As a user I can look at my collection of gift cards because I want to see their balance/points balance
    - [ ] create a detailed view for a gift card (including how to buy)
        - [ ] get qr codes to render (based off of card id)
    - [ ] create view for gift card 
    - [ ] create view for all gift cards
- [ ] As a user I can buy or add a balance to my giftcard
    - [ ] get credit card transactions to work 
    - [ ] physically update balance on gift card
    - [ ] show proof of transaction to bit owner and user
- [ ] As a user I can transfer a purchased gift card to someone else as a gift on purchase
    - [ ] create a transfer view
    - [ ] make the transfer occur
- [ ] As a user I can search/filter for gift cards by category or name

- [ ] As a user I can review my transactions(on the gift card view)
    - [ ] Create a transactions view
    - [ ] Create a route to the backend 
    - [ ] Create a query for a specific store
    - [ ] Send data back to front end
- [ ] As a user I can register
    - [ ] do the things
#

Business owners

- [ ] As an owner, I want to be able to redeem gift cards at transaction time, and see details (process transactions)
      - [ ] Create a transactions view in dashboard
      - [X] Get qr scanning working
      - [ ] Make the transaction occur
      - [ ] Display transactions
- [ ] As an owner, I want to be able to review transactions
      - [ ] display transactions
- [ ] As an owner I want to reach more people with gift card promotions -->
- [ ] As an owner I want to be able to register a new store


Use this to generate a smalldatetime between 01 Jan 1900 and 06 Jun 2079 (not checked, SQL not installed)

DATEADD(day, (ABS(CHECKSUM(NEWID())) % 65530), 0)