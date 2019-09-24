"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi = __importStar(require("@hapi/hapi"));
const inert_1 = __importDefault(require("@hapi/inert"));
const vision_1 = __importDefault(require("@hapi/vision"));
const hapi_swagger_1 = __importDefault(require("hapi-swagger"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./routes/index");
const displayColors = true;
mongoose_1.default.set("useCreateIndex", true);
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default.set("useUnifiedTopology", true);
(function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb://localhost:27017/hapidb", { useNewUrlParser: true, autoIndex: false, autoReconnect: true }, (err) => {
            if (err) {
                throw err;
            }
            else {
                console.log("database connected");
            }
        });
    });
})();
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = yield new hapi.Server({
        port: 3000,
        routes: { cors: { origin: ["*"], headers: ["Accept", "Authorization", "Content-Type", "If-None-Match", "access_token"] } },
    });
    try {
        yield server.register([
            inert_1.default,
            vision_1.default,
            hapi_swagger_1.default,
        ]);
        yield server.route(index_1.routes);
        yield server.start();
        console.info(displayColors ? "\x1b[32m%s\x1b[0m" : "%s", `Server running at ${server.info.uri}`);
    }
    catch (error) {
        console.error(error);
    }
});
process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});
init();
//# sourceMappingURL=index.js.map