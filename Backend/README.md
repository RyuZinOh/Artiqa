
### Setting Up the Virtual Environment
```sh
python -m venv venv
venv\Scripts\activate
```

###  Installing Dependencies  
```
pip install -r requirements.txt
```

### Running the FastAPI Application  
```sh
uvicorn app:app --reload
```
### Testing the Backend Using Postman 
- **URL:** `http://127.0.0.1:8000/` with the valid methods




### Remotely access xampp MySQL Database
- ``cloudflared access tcp --hostname artiqa.safallama.com.np --url localhost:3306``