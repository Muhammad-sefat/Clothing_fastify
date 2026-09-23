import Fastify from "fastify";

import configPlugin from "./plugins/config.plugin.js";
import corsPlugin from "./plugins/cors.plugin.js";
import sensiblePlugin from "./plugins/sensible.plugin.js";
import databasePlugin from "./plugins/database.plugin.js";

import productRoutes from "./modules/product/product.route.js";

export const buildApp = () => {
    const app = Fastify({
        logger: true,
    });

    // Plugins
    app.register(configPlugin);
    app.register(corsPlugin);
    app.register(sensiblePlugin);

    // Database
    app.register(databasePlugin);

    // Routes
    app.register(productRoutes, {
        prefix: "/api/products",
    });

    // Health check
    app.get("/health", async () => {
        return {
            success: true,
            message: "Server is healthy",
        };
    });

    return app;
};