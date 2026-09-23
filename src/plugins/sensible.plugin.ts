import fp from "fastify-plugin";
import sensible from "@fastify/sensible";
import type { FastifyInstance } from "fastify";

export default fp(async (fastify: FastifyInstance) => {
    await fastify.register(sensible);
});