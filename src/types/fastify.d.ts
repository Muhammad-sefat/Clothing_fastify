import "fastify";
import { env } from "../config/env.ts";

declare module "fastify" {
    interface FastifyInstance {
        config: typeof env;
    }
}