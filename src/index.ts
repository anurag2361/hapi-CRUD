import * as hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";
import mongoose from "mongoose";
import { routes } from "./routes/index";
const displayColors = true;

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);

(async function dbConnect() {
    await mongoose.connect("mongodb://localhost:27017/hapidb", { useNewUrlParser: true, autoIndex: false, autoReconnect: true }, (err: any) => {
        if (err) {
            throw err;
        } else {
            console.log("database connected");
        }
    });
})();

const init = async () => {
    const server = new hapi.Server({
        port: 3000,
        routes: { cors: { origin: ["*"], headers: ["Accept", "Authorization", "Content-Type", "If-None-Match", "access_token"] } },
    });
    try {
        await server.register([
            Inert,
            Vision,
            HapiSwagger,
        ]);
        server.route(routes);
        await server.start();
        console.info(displayColors ? "\x1b[32m%s\x1b[0m" : "%s", `Server running at ${server.info.uri}`);
    } catch (error) {
        console.error(error);
    }
};
process.on("unhandledRejection", (err) => {

    console.log(err);
    process.exit(1);
});

init();
