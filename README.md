## login and registers

(auth)
-> login/page.tsx
->register/page.tsx

## db and helpers

lib/ db.ts => mongoDB connection
lib/ auth.ts => JWT helpers

- to install jsonwebtoken:

```
npm install --save-dev @types/jsonwebtoken
```

## backend

api/auth/
=>login/route.ts
=>register/route.ts

## middleware(Route protection)

=> app/middleware.ts

```
(auth) → login/register pages
(admin) → admin-only pages
(user) → user-only pages
api → backend logic
middleware.ts → route protection
```

TWO SCREEN =>
User -> Where all user access and get all the blogs
admin dashboard -> here all the blogs will be handled by admin where i can manage -:

- perform CRUD operation
- check total users graph
- manage the email while updating new blog by emailjs
