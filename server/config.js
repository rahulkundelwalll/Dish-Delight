let CLIENT_URI;
const env = process.env.NODE_ENV;

if (env === "development") {
  CLIENT_URI = "http://localhost:3000";
} else {
  CLIENT_URI = "https://dish-delight-r4g9.vercel.app";
}

export default CLIENT_URI;
