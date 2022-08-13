# Project REST-Rant

TBD - SUMMARY

## Tech Usage

**CSS Framework:** Bootstrap

**Stack:** MongoDB, Express, NodeJS

**Server-Side Rendering:** JSX

**Node Modules**: method-override, dotenv, express-react-views

## Routes

| Method | Path                       | Purpose                                         |
| ------ | -------------------------- | ----------------------------------------------- |
| GET    | `/`                        | Home Page                                       |
| GET    | `/places`                  | Places index page                               |
| GET    | `/places/new`              | Form page for creating a new place              |
| POST   | `/places`                  | Create a new place                              |
| GET    | `/places/:id`              | Details about a particular place                |
| GET    | `/places/:id/edit`         | Edit form for a place                           |
| PUT    | `/places/:id`              | Delete a particular place                       |
| DELETE | `/places/:id`              | Updatee a particular place                      |
| POST   | `/places/:id/rant`         | Create a rant(comment) about a particular place |
| DELETE | `/places/:id/rant/:rantId` | Delete a rant(comment) about a particular place |
| GET    | `*`                        | 404 page(matches any route not above)           |
