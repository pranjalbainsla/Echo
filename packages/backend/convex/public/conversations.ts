import { ConvexError, v } from "convex/values";
import { query, mutation } from "../_generated/server";

export const create = mutation({
  args: {
    organizationId: v.string(),
    contactSessionId: v.id("contactSessions")
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);
    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired contact session",
      });
    }
    const threadId = "123"; //todo: generate thread id based on session and organization

    const conversationId = await ctx.db.insert("conversations", {
      threadId,
      organizationId: args.organizationId,
      status: "unresolved",
      contactSessionId: args.contactSessionId,
    });

    return conversationId;
  },
});

export const getOne = query({
  args: {
    conversationId: v.id("conversations"),
    contactSessionId: v.id("contactSessions")
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId);
    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid or expired contact session",
      });
    }
    
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      return null;
    }
    //since this is a public api, we should not return sensitive information. Only return what is necessary for the widget to function
    return {
        _id: conversation._id,
        status: conversation.status,
        threadId: conversation.threadId
    };
  },
});