import { client } from "./config";

(async () => {
    const block = await client.fetchBlockIdByTime("2021-03-04T00:00:00", "eq");
    console.log(block);

    // {
    //     block: {
    //       id: '0a3638e148d17e5d8385b24b3de3b8c132b8089c5cda5b12efc20e6c662e2d7d',
    //       num: 171325665,
    //       time: '2021-03-04T00:00:00Z'
    //     }
    // }
})();