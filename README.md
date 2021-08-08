# Travel Agency

### Setup
`npm install`

### Lint
`npm run lint`

### Run
`npm start`

Visit http://localhost:8080/

## The Project

A travel agency desires to advertise fares in several markets, but every market has different ways to display a fare format depending on the `currency/market` combination:

##### For example:
1. In the United States when showing USD, fares should display the currency symbol, with cents.
2. In Argentina when showing USD, fares should display only currency code and no cents.
3. In Spain when showing EUR, fares should display the currency symbol after the price, no cents and the thousand delimiters should be a comma.
4. In Germany when showing EUR, fares should display the currency symbol before the price, no cents and the thousand delimiters should be a dot.

### Exercise
Create a currency manager module in AngularJS, where the travel agency can set up currency formats depending on the market needs. As stated in the previous paragraph, some of the customizable options are:
- Show currency code or symbol
- Currency shown after or before the price
- Show cents or no cents
- Display format such as `#,###.##` or `#.###,##`

For example, a currency format such as `$1,234.56` could have the format changed with the options above. Changing the currency symbol to the code, and moving the currency to after the price, and showing no cents would transform that format to: `1,234USD`

### Requirements for the project:
- CRUD to set currency formats.
- Table to visualize all the objects, sort by `country` and by `currency`.
- Ability to download all the settings as an `excel/csv` file.
- The interface should take into account usability, implementing a front-end framework such as bootstrap or UI Kit.
- The project should be available to look at in a GitHub repo.
- Must use AngularJS as base framework.