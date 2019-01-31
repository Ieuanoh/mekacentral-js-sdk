import AccountsAPI from "./endpoints/Accounts";
import PlayersAPI from "./endpoints/Players";
import FirmwareAPI from "./endpoints/Firmware";
import HttpClient from "./HttpClient";

// Prereq
process.env.BASEURL = "https://test.mekacentral.mekamon.com:8230";

export default {
  /**
   * The send method invokes an asynchronous function "request()", and uses the setIsLoading function to true while the request is being executed and back to false once it finishes the request.
   * Example:
   * MC.send(() => MC.login("admin", "#Security"), setIsLoading).
   * This will result in the loading flag to be set to true while the login request takes place and set back to false once it has finished.
   * You can bundle multiple requests into the request function.
   * @param {async function} request - Asynchronous function to be invoked.
   * @param {function(boolean)} setIsLoading - Function that sets a boolean flag indicating to the client whether a request is in progress i.e. is loading.
   * @param {function(boolean)} setError - Function that returns the error message to the client if specified in the send request.
   */
  send: async (request, setIsLoading, setError) => {
    if (setIsLoading) {
      setIsLoading(true);
    }
    try {
      return await request();
    } catch (err) {
      console.log(err);
      if (setError) setError(err.errorMessage);
    } finally {
      if (setIsLoading) {
        setIsLoading(false);
      }
    }
  },
  adminLogin: async (username, password) => {
    await AccountsAPI.login(username, password);
    const accountJson = await AccountsAPI.getAccount();
    const isAdmin = AccountsAPI.accountIsAdmin(accountJson);
    if (!isAdmin) {
      await AccountsAPI.logout();
      throw {
        errorMessage: "Admin privileges required: User is not an admin."
      };
    }
    return isAdmin;
  },
  ...AccountsAPI,
  ...PlayersAPI,
  ...FirmwareAPI,
  setBaseUrl: HttpClient.setBaseUrl,
  getCurrentSession: HttpClient.getCurrentSession
};
