/**
 * User API Routes
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export async function userRoutes(server: FastifyInstance) {
  // Get user statistics
  server.get(
    '/me/stats',
    { onRequest: [server.authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return {
        gamesPlayed: 0,
        gamesCreated: 0,
        achievementsUnlocked: 0,
        friendsCount: 0,
        totalPlaytime: 0,
      };
    }
  );
}

/**
 * Notifications API Routes
 */
export async function notificationRoutes(server: FastifyInstance) {
  // Get notifications
  server.get(
    '/',
    { onRequest: [server.authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return [];
    }
  );
}
