import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "./product.service.js";

import {
    createProductSchema,
    productIdSchema,
    updateProductSchema,
} from "./product.schema.js";

export const create = async function (this: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
    const data = createProductSchema.parse(request.body);

    const product = await createProduct(this, data);

    return reply.code(201).send({
        success: true,
        message: "Product created successfully",
        data: product,
    });
};

export const getAll = async function (this: FastifyInstance, _request: FastifyRequest, reply: FastifyReply) {
    const products = await getProducts(this);

    return reply.send({
        success: true,
        data: products,
    });
};

export const getOne = async function (this: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
    const { id } = productIdSchema.parse(request.params);

    const product = await getProductById(this, id);

    if (!product) {
        return reply.code(404).send({
            success: false,
            message: "Product not found",
        });
    }

    return reply.send({
        success: true,
        data: product,
    });
};

export const update = async function (this: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
    const { id } = productIdSchema.parse(request.params);

    const data = updateProductSchema.parse(request.body);

    const product = await updateProduct(this, id, data);

    if (!product) {
        return reply.code(404).send({
            success: false,
            message: "Product not found",
        });
    }

    return reply.send({
        success: true,
        message: "Product updated successfully",
        data: product,
    });
};

export const remove = async function (this: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
    const { id } = productIdSchema.parse(request.params);

    const product = await deleteProduct(this, id);

    if (!product) {
        return reply.code(404).send({
            success: false,
            message: "Product not found",
        });
    }

    return reply.send({
        success: true,
        message: "Product deleted successfully",
        data: product,
    });
};
