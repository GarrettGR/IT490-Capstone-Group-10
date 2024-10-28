<<<<<<< HEAD
RESPONSE=$(curl -s -v -X POST http://143.198.177.105:3000/api/form-submit -H "Content-Type: application/json" -d '{"body": { "query": "SELECT * FROM users WHERE email = \"johndoe@example.com\"}}')
echo "{Response: $RESPONSE}"
=======
RESPONSE=$(curl -s -v -X POST http://143.198.177.105:3000/api/form-submit -H "Content-Type: application/json" -d '{"query": "SELECT * FROM users WHERE email = \"johndoe@example.com\""}')
echo "{Response: $RESPONSE}"
>>>>>>> 2f8467f69702bfef0a3cf7adca1b6d7d6e05a4c1
