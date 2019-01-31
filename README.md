# mekacentral-js-sdk

Code example of a JS SDK written to abstract API calls to the MekaCentral Java API. The main goal was to provide a simple interface for client side apps to interact with MekaCentral without having to handle everything on a per app basis and provide some consistency when handling auth, loading state and multiple API requests simultaneously.

This was achieved by creating a send method as a http client interface which was used with each endpoint and returned a promise that could be handled accordingly either using standard promises or async/await blocks. Auth was handled by persisting a JSON Web Token in localstorage until it timed out on the server side where all requests would then fail and the user would be forced to log back in. 

Please note that this is not a complete project, I have just provided it as an indication of what I was working on whilst at Reach Robotics. 
