import fp from "fastify-plugin";
import { fastifyMongodb } from "@fastify/mongodb";
import type { FastifyInstance } from "fastify";

export default fp(async (fastify: FastifyInstance) => {
    try {
        await fastify.register(fastifyMongodb, {
            url: fastify.config.MONGODB_URI,
            forceClose: true,
        });

        fastify.log.info("MongoDB connected successfully");
    } catch (error) {
        fastify.log.error(error, "MongoDB connection failed");

        throw error;
    }
});