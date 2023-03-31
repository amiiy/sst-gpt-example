import { StackContext, Api } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
  // Create the HTTP API
  const api = new Api(stack, "Api", {
    routes: {
      "POST /gpt": "packages/functions/gpt.handler",
    },
    defaults: {
      function: {
        functionName: "gpt-example",
        environment: {
          OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
        },
      },
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
