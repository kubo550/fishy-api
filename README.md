## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:5001/example](http://localhost:5001/example) to view it in the browser.

### `npm start`

For production mode


## Endpoints

### `/example`

Example endpoint

```bash
$ curl "http://localhost:5001/example"
```

### `/extract-phrases`

Extract phrases from a text

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"text":"This is a text"}' "http://localhost:5001/extract-phrases"
```

### `/translate`

Translate phrases

input: 
```json
{
    "phrases": [
        {
            "id": "uuid", 
            "phrase": "This is a text"
        }
    ],
    "target": "es"
}
```

output:
```json
{
    "phrases": [
        {
            "id": "uuid",
            "phrase": "This is a text",
            "meaning": "Este es un texto"
        }
    ]
}
```


```bash
$ curl -X POST -H "Content-Type: application/json" -d '{ "phrases": [ { "id": "uuid", "phrase": "This is a text" } ] }' "http://localhost:5001/translate" 
```
