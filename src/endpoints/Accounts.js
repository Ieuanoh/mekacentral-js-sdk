import HttpClient from "../HttpClient";
import HttpMethod from "../HttpMethod";

const endpoints = {
  /**
   * Takes a username and password to login and acquire mekatoken.
   * Note: mekatoken and accountUuid are automatically stored in localstorage.
   * @param {String} username
   * @param {String} password
   */
  login: (username, password) => {
    if (!username || !password) {
      throw new Error("Username or password is empty.");
    }
    const options = {
      body: {
        username,
        password,
        consumerType: "WebApp"
      }
    };
    return HttpClient.send("/login", HttpMethod.POST, options, false);
  },
  /**
   * Uses the current set mekatoken and performs a logout to invalidate the mekatoken.
   */
  logout: () => {
    let response = HttpClient.send("/logout", HttpMethod.POST);
    // Session must be cleaned up after request is made.
    HttpClient.deleteCurrentSession();
    return response;
  },
  /**
   * Takes a user email address and forces all login records on account to be removed/invalidated.
   * Used when user has lost the active mekatoken and is unable to log back in.
   * Requires Admin.
   * @param {String} email
   */
  forceLogout: email => {
    return HttpClient.send(`/force/logout/${email}`);
  },
  /**
   * Gets the Account object for a given accountUuid.
   * If no accountUuid is passed into the function it will attempt to use the accountUuid in localstorage.
   * @param {String} accountUuid
   */
  getAccount: accountUuid => {
    if (!accountUuid) {
      accountUuid = HttpClient.getCurrentSession().accountUuid;
    }
    if (!accountUuid) {
      throw new Error(
        "No accountUuid parameter provided, and no localstorage accountUuid present."
      );
    }
    return HttpClient.send(`/account/${accountUuid}`);
  },
  /**
   * Returns true is the given account is a member of the group 'admin'.
   * @param {String} accountJson (result of getAccount())
   */
  accountIsAdmin: accountJson => {
    return Object.values(accountJson.model)[0].groups.some(group => {
      return group.groupName == "admin";
    });
  },
  /**
   * Requests a password reset email for the given email address.
   * @param {String} email
   */
  requestPasswordResetEmail: email => {
    const options = {
      body: {
        email
      }
    };
    return HttpClient.send(
      "/account/requestrecoverpassword",
      HttpMethod.PUT,
      options,
      false
    );
  },
  /**
   * Uses password reset token to set new password for a user.
   * @param {String} email - Email address of the user.
   * @param {String} passwordResetToken - Password reset token.
   * @param {String} newPassword - Password to be set on the account.
   */
  resetPassword: (email, passwordResetToken, newPassword) => {
    const options = {
      body: {
        email,
        passwordResetToken,
        newPassword
      }
    };
    return HttpClient.send(
      "/account/resetpassword",
      HttpMethod.PUT,
      options,
      false
    );
  },
};

export default endpoints;
