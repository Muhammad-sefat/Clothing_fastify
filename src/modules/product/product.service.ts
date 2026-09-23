import type { FastifyInstance } from "fastify";
import { CreateProductInput, UpdateProductInput } from "./product.schema.js";
import { Product } from "./product.model.js";

export const createProduct = async (fastify: FastifyInstance, data: CreateProductInput): Promise<Product> => {
    const collection = fastify.mongo.db!.collection<Product>("products");
    const result = await collection.insertOne(data);
    return { _id: result.insertedId.toString(), ...data };
};

export const getProducts = async (fastify: FastifyInstance): Promise<Product[]> => {
    const collection = fastify.mongo.db!.collection<Product>("products");
    return collection.find().sort({ createdAt: -1 }).toArray() as Promise<Product[]>;
};

export const getProductById = async (fastify: FastifyInstance, id: string): Promise<Product | null> => {
    const collection = fastify.mongo.db!.collection<Product>("products");
    return collection.findOne({ _id: new (fastify.mongo.ObjectId)(id) } as any) as Promise<Product | null>;
};

export const updateProduct = async (
    fastify: FastifyInstance,
    id: string,
    data: UpdateProductInput,
): Promise<Product | null> => {
    const collection = fastify.mongo.db!.collection<Product>("products");
    const result = await collection.findOneAndUpdate(
        { _id: new (fastify.mongo.ObjectId)(id) } as any,
        { $set: data },
        { returnDocument: "after" },
    );
    return (result as unknown as { value: Product | null }).value;
};

export const deleteProduct = async (fastify: FastifyInstance, id: string): Promise<Product | null> => {
    const collection = fastify.mongo.db!.collection<Product>("products");
    const result = await collection.findOneAndDelete({ _id: new (fastify.mongo.ObjectId)(id) } as any);
    return (result as unknown as { value: Product | null }).value;
};
