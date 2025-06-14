mongoimport \
  --uri "mongodb+srv://<user>:<pass>@cluster0.mongodb.net/hackathon?retryWrites=true&w=majority" \
  --collection=logs_raw \
  --type=csv \
  --headerline \
  --file=web-server-access-logs.csv