const Express = require("express");
const app = Express();
app.use(Express.static("./pub"));
app.listen(3005, () => {
    console.log("listening");
});