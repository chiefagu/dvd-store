export function makePostUser({ addUser }) {
  return async function postUser(httpRequest) {
    const headers = { "Content-Type": "application/json" };
    try {
      const user = await addUser(httpRequest.body);

      return {
        headers,
        statusCode: 201,
        body: user,
      };
    } catch (e) {
      return {
        headers,
        statusCode: 400,
        body: e.message,
      };
    }
  };
}
