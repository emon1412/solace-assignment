## Technology Choices

### Backend

- `NestJS`: Since I would be extending the API under time pressure if I moved forward with the assignment, I wanted to have home field advantage with a framework I am familiar with. NestJS gives me more structure and out-of-the-box features compared to NextJS, which would help me move faster.
- `Prisma`: I decided to use Prisma for its strong type safety, migration/seeding capabilities, and flexibility. This enabled me to quickly implement text search/filtering and pagination with minimal boilerplate code.

### Frontend
- `Material-UI`: I chose Material-UI for its rich set of pre-built components and ease of customization. This allowed me to quickly build a visually appealing UI without spending too much time on styling.


## Work Done
### Improvements/Features
- **Pagination**: I implemented basic pagination with page number and limit so hundreds of thousands of advocates can be handled efficiently.
- **Text Search**: I implemented basic text search on `firstName`, `lastName`, `city`, `degree`, `phoneNumber` by leveraging Postgres search capability via calling the API instead of performing filtering on the client
- **Filtering**: I implemented basic filtering for `specialty` that can be combined with text search.
- **Visual Enhancements**: I made various UI enhancements using `Material-UI` components to improve user experience.
- **Prettier**: I added Prettier as auto-formatter to keep code convention consistent

### Fixes
- Change `Advocate.phoneNumber` from `BigInt` to `String` as `BigInt` type is not the best fit for phone numbers
- Change `Advocate.specialty` from `JSON` to `String[]` to simplify filtering.
- Fix `<th> cannot be a child of <thead>` issue
- Remove un-used code


## Would do if I had more time
- Sort functionality on various fields.
- Add ability to create/update new/existing Advocates.
- Improve error handling and input validation.
- Add tests for both frontend and backend.