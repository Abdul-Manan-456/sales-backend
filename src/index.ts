import app from "./app.js";
const normalizePort = (val: string): number | string | boolean => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || "4000");
app.set("port", port);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
