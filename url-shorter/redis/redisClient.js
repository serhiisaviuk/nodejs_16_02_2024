import {createClient} from "redis";

const redisUrl = "redis://@127.0.0.1:6380";

const redisClient = createClient({
    url: redisUrl,
});

redisClient.connect().catch(console.error);

export default redisClient;
