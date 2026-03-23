import { mutation, query } from './_generated/server'

export const getUsers = query({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();

        return users;
    }
})

export const add = mutation({
    args: {},
    handler: async (ctx) => {
        const Identity = await ctx.auth.getUserIdentity();
        console.log("FULL IDENTITY:", JSON.stringify(Identity));
        if (!Identity) {
            throw new Error("Unauthorized");
        };

        const orgId = (Identity as any).o?.id as string;
        console.log("orgId", orgId);
        if (!orgId) {
            throw new Error("Missing organization");
        };
        const userId = await ctx.db.insert("users", {
            name: "antonio"
        });
        return userId;
    }
})