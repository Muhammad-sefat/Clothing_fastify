import { buildApp } from "./app.js";
import { env } from "./config/env.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const start = async () => {
    const app = buildApp();

    try {
        await app.listen({
            port: env.PORT,
            host: env.HOST,
        });
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();