import {createClient} from "redis";
import config from "../config.js";

const redisClient = createClient({
    url: config.redisUrl,
});

redisClient.connect().catch(console.error);

export default redisClient;
