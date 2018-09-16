const redis = require("redis")
const client = redis.createClient();
client.on("error", function(err) {
    console.log("Error " + err);
});
const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

class SessionStore {
    static persist(key, value) {
        client.set(key, value)
    }
    static async fetch(key) {
        const res = await getAsync(key);
        console.log(res);
        return res
    }
}
module.exports = SessionStore