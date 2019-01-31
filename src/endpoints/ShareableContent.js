import HttpClient from "../HttpClient";
import HttpMethod from "../HttpMethod";

const endpoints = {
    
    /**
     * Runs a query on the public animations and returns a specific page of results.
     * @param {int} batchSize - Number of results to return from a search.
     * @param {int} page - The page of the search results required (depends on batch size and the number of results.)
     * @param {String} searchTerm - Text to look for in the title of an animation.
     * @param {SortObject} orderBy - SortObject Format: { field: "NAMEOFFIELD", order: "DESC"/"ASC" }
     */
    searchAnimations: (batchSize, page, searchTerm, orderBy) => {
        const options = {
            body: {
                batchSize,
                page,
                searchTerm,
                orderBy
            }
        }
        return HttpClient.send(`/mekamotion/search`, HttpMethod.POST, options);
    },
    /**
     * Marks the animation related to the given animationUuid as safe.
     * @param {String} animationUuid 
     */
    setAnimationAsSafe: (animationUuid) => {
        return HttpClient.send(`/mekamotion/${animationUuid}/safe`, HttpMethod.PUT);
    },
    /**
     * Marks the animation related to the given animationUuid as unsafe.
     * @param {String} animationUuid 
     */
    setAnimationAsUnsafe: (animationUuid) => {
        return HttpClient.send(`/mekamotion/${animationUuid}/unsafe`, HttpMethod.PUT);
    }
};

export default endpoints;