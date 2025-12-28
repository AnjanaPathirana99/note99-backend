# Postman cURL Commands for Note99 Backend API

Base URL: `http://localhost:5000`

> **Quick Import:** You can import all endpoints directly into Postman using the `Note99_Backend.postman_collection.json` file. In Postman, go to **Import** → **Upload Files** → Select the JSON file.

## 1. Health Check
**GET** - Check if the server is running

```bash
curl --location 'http://localhost:5000/api/health'
```

---

## 2. Get All Notes
**GET** - Retrieve all notes

```bash
curl --location 'http://localhost:5000/api/notes'
```

---

## 3. Get Single Note
**GET** - Retrieve a specific note by ID

```bash
curl --location 'http://localhost:5000/api/notes/1'
```

*Replace `1` with the actual note ID*

---

## 4. Create New Note
**POST** - Create a new note

```bash
curl --location 'http://localhost:5000/api/notes' \
--header 'Content-Type: application/json' \
--data '{
    "title": "My First Note",
    "content": "This is the content of my first note."
}'
```

---

## 5. Update Note
**PUT** - Update an existing note

```bash
curl --location --request PUT 'http://localhost:5000/api/notes/1' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Updated Note Title",
    "content": "This is the updated content of the note."
}'
```

*Replace `1` with the actual note ID*

---

## 6. Delete Note
**DELETE** - Delete a note

```bash
curl --location --request DELETE 'http://localhost:5000/api/notes/1'
```

*Replace `1` with the actual note ID*

---

## Example Workflow

1. **Check server health:**
   ```bash
   curl --location 'http://localhost:5000/api/health'
   ```

2. **Create a new note:**
   ```bash
   curl --location 'http://localhost:5000/api/notes' \
   --header 'Content-Type: application/json' \
   --data '{
       "title": "Shopping List",
       "content": "Milk, Bread, Eggs"
   }'
   ```

3. **Get all notes:**
   ```bash
   curl --location 'http://localhost:5000/api/notes'
   ```

4. **Get a specific note (using ID from step 2):**
   ```bash
   curl --location 'http://localhost:5000/api/notes/1'
   ```

5. **Update the note:**
   ```bash
   curl --location --request PUT 'http://localhost:5000/api/notes/1' \
   --header 'Content-Type: application/json' \
   --data '{
       "title": "Updated Shopping List",
       "content": "Milk, Bread, Eggs, Butter"
   }'
   ```

6. **Delete the note:**
   ```bash
   curl --location --request DELETE 'http://localhost:5000/api/notes/1'
   ```

---

## Notes
- Make sure your server is running on port 5000 (or update the port in the URLs)
- Replace `localhost:5000` with your actual server URL if deployed
- Replace note IDs (`1`, `2`, etc.) with actual IDs returned from your database
- All POST and PUT requests require `Content-Type: application/json` header

