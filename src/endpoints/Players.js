import HttpClient from "../HttpClient";
import HttpMethod from "../HttpMethod";

const endpoints = {
    /**
     * Gets the Player object for a given PlayerUuid.
     * PlayerUuid is returned from getAccount().
     * @param {String} playerUuid 
     */
    getPlayer: (playerUuid) => {
        return HttpClient.send(`/player/${playerUuid}`);
    },
    /**
     * Gets the last N player objects created.
     * @param {int} n - number of players to retrieve  
     */
    getLatestNPlayers: (n) => {
        return HttpClient.send(`/player/latest/${n}`);
    },
    /**
     * Takes a playerUuid and triggers a password reset email.
     * Requires Admin.
     * @param {String} playerUuid 
     */
    resetPlayerAlias: (playerUuid) => {
        return HttpClient.send(`/player/${playerUuid}/resetalias`, HttpMethod.PUT);
    }
};

export default endpoints;