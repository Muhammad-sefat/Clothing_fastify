import type { FastifyInstance } from "fastify";

import {
    create,
    getAll,
    getOne,
    update,
    remove,
} from "./product.controller.js";

export default async function productRoutes(
    fastify: FastifyInstance,
) {
    fastify.post("/", create);

    fastify.get("/", getAll);

    fastify.get("/:id", getOne);

    fastify.patch("/:id", update);

    fastify.delete("/:id", remove);
}