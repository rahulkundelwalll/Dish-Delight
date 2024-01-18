let SERVER_URI;
const env = process.env.NODE_ENV;

if (env === "development") {
  SERVER_URI = "http://localhost:8080";
} else {
  SERVER_URI = "https://dish-delight-rho.vercel.app";
}

export default SERVER_URI;
