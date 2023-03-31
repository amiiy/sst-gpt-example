import { StackContext, Api } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
  // Create the HTTP API
  const api = new Api(stack, "Api", {
    routes: {
      "GET /notes": "packages/functions/list.handler",
      "GET /notes/{id}": "packages/functions/get.handler",
      "PUT /notes/{id}": "packages/functions/update.handler",
      "POST /gpt": "packages/functions/gpt.handler",
    },
    defaults: {
      function: {
        environment: {
          OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        },
      },
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
