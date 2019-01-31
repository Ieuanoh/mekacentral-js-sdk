import HttpClient from "../HttpClient";
import HttpMethod from "../HttpMethod";

const endpoints = {
    /**
     * Returns a list containing all of the currently blocked profanity.
     */
    getCurrentProfanityList: () => {
        return HttpClient.send(`/profanity`);
    },
    /**
     * Adds a given array of words to the profanity filter.
     * @param {String[]} wordsToAdd 
     */
    addWords: (wordsToAdd) => {
        const options = {
            body: {
                words: wordsToAdd
            }
        }
        return HttpClient.send(`/profanity/add`, HttpMethod.POST, options);
    },
    /**
     * Removes the given array of words from the profanity filter.
     * @param {String[]} wordsToRemove
     */
    removeWords: (wordsToRemove) => {
        const options = {
            body: {
                words: wordsToRemove
            }
        }
        return HttpClient.send(`/profanity/remove`, HttpMethod.POST, options);
    },
    /**
     * Checks the given text for profanity by applying the current filter.
     * @param {String} text
     */
    checkTestForProfanity: (text) => {
        const options = {
            body: {
                texts
            }
        }
        return HttpClient.send(`/profanity/check`, HttpMethod.POST, options);
    }
};

export default endpoints;