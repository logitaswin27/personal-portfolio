# Personal Portfolio

A responsive portfolio built with HTML, CSS, Node.js, MongoDB, and Netlify Functions.

## Run locally

1. Install [Node.js](https://nodejs.org/).
2. Run `npm install`.
3. Create a `.env` file with:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB=portfolio
```

4. Run `npx netlify dev` and open the local URL shown by Netlify.

## Deploy to Netlify

Connect this repository in Netlify. The included `netlify.toml` publishes `public` and deploys `netlify/functions`. Add `MONGODB_URI` and `MONGODB_DB` under **Site configuration → Environment variables**.

## Customize

Replace `Your Name`, the bio, project cards, links, email address, and the `YN` logo in `public/index.html`. Update colors and layout in `public/css/style.css`.
