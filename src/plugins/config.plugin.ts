import fp from "fastify-plugin";
import { env } from "../config/env.js";
import type { FastifyInstance } from "fastify";

export default fp(async (fastify: FastifyInstance) => {
    fastify.decorate("config", env);
});