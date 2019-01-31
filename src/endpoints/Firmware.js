import HttpClient from "../HttpClient";
import HttpMethod from "../HttpMethod";

const endpoints = {
    /**
     * Creates a new firmware version in Mekacentral. Requires Admin.
     * @param {int} majorVersion 
     * @param {int} minorVersion 
     * @param {String} description 
     * @param {Base64String} content - base64 encoded representation of firmware .bin file.
     */
    createFirmware: (majorVersion, minorVersion, description, content) => {
        const options = {
            body: {
                majorVersion,
                minorVersion, 
                description,
                content
            }
        }
        return HttpClient.send(`/firmware`, HttpMethod.POST, options);
    },
    getFirmware: (majorVersion, minorVersion) => {
        const options = {
            queryParams: {
                majorVersion,
                minorVersion
            }
        }
        return HttpClient.send(`/firmware/download`, HttpMethod.GET, options);
    },
    /**
     * Deletes the firmware related to the given firmware uuid.
     * @param {String} firmwareUuid
     */
    deleteFirmware: (firmwareUuid) => {
        return HttpClient.send(`/firmware/${firmwareUuid}`);
    },
    /**
     * 
     * @param {String} firmwareUuid
    getAllFirmwares: () => {
        console.log(HttpClient.getCurrentSession())
        return HttpClient.send(`/firmware/all`);
    },
     */
};

export default endpoints;