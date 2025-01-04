Check for circular dependencies with
npx madge --circular --extensions ts .

run server with: npx ts-node server.ts
compile Client and Common ts to js with: tsc from root directory

To config env for server and client.
Go to PORTS -> forward ports, make it public and copy the URL gain from that.
1. In Client side change env.ts to match the URL.
2. In server side server.ts, add the URL in allowedOrigins.