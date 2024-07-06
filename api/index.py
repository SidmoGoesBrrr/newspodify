import json
import os
from cryptography.fernet import Fernet
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from fastapi.security import APIKeyHeader
from supabase import create_client, Client
import resend
import time
import requests
app = FastAPI()


# Encryption and decryption setup
def load_key():
    return open("secret.key", "rb").read()


def write_key():
    key = Fernet.generate_key()
    with open("secret.key", "wb") as key_file:
        key_file.write(key)


def encrypt_message(message: str, key: bytes) -> str:
    f = Fernet(key)
    encrypted_message = f.encrypt(message.encode())
    return encrypted_message.decode()


def decrypt_message(encrypted_message: str, key: bytes) -> str:
    f = Fernet(key)
    decrypted_message = f.decrypt(encrypted_message.encode())
    return decrypted_message.decode()


def save_encrypted_data(data: dict, filename: str):
    with open(filename, "w") as file:
        json.dump(data, file)


def load_encrypted_data(filename: str) -> dict:
    with open(filename, "r") as file:
        return json.load(file)


if not os.path.exists("secret.key"):
    write_key()

key = load_key()
# Load encrypted data
encrypted_data = load_encrypted_data("encrypted_data.json")
decrypted_api_key = decrypt_message(encrypted_data["api_key"], key)
decrypted_supabase_url = decrypt_message(encrypted_data["supabase_url"], key)
decrypted_supabase_key = decrypt_message(encrypted_data["supabase_key"], key)
decrypted_resend_key = decrypt_message(encrypted_data["resend_key"], key)
supabase: Client = create_client(decrypted_supabase_url, decrypted_supabase_key)
print("Supabase client created successfully")
resend.api_key = decrypted_resend_key


def save_to_supabase(email: str):
    try:
        response = supabase.table("users").insert({"email": email}).execute()
        return "Data inserted successfully:", response.data
    except Exception as e:
        print(e)


def send_email(email: str):

        params: resend.Emails.SendParams = {
            "from": "Siddhant Mohile <siddhant@zodevelopers.com>",
            "to": [email],
            "subject": "Welcome to Newspodify!",
            "html": """

            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <header style="text-align: center; padding: 20px 0;">
                    <h1 style="color: #4CAF50;">Newspodify</h1>
                </header>
                <main style="padding: 20px;">
                    <p>Hey,</p>
                    <p>I'm Siddhant, one of the creators of Newspodify. Thank you so much for expressing your interest in our app—it means a lot to have your support at this stage.</p>
                    <p>You'll be among the first to receive access to Newspodify when we launch. We're still ironing out a few bugs and adding some exciting features, and your feedback could be invaluable to us. I'd love to hear your thoughts and use your insights to make Newspodify even better.</p>
                    <p>Could you take a moment to fill out this <a href="[Google Form URL]" style="color: #4CAF50; text-decoration: none;">Google Form</a>? Alternatively, you can reply to this email with your answers to these questions:</p>
                    <ul>
                        <li>What features of Newspodify are you most excited about?</li>
                        <li>Which newsletters would you like us to add?</li>
                        <li>How much would you be willing to pay to use this product?</li>
                    </ul>
                    <p>Please let me know if there's anything else you'd like us to consider. You don’t have to answer all these questions, but even a quick response would help us improve your experience.</p>
                    <p>And hey, reply to this email with your name so I can get to know you better!</p>
                    <p>Thanks again for your support. It means the world to us.</p>
                    <p>Best,<br>Siddhant</p>
                </main>
                <footer style="text-align: center; padding: 20px 0; font-size: 0.8em; color: #777;">
                    <p>&copy; 2024 Newspodify. All rights reserved.</p>
                </footer>
            </body>

            """,
        }
        while True:
            try:
                response: resend.Email = resend.Emails.send(params)
                return response.json()
            
            except Exception as e:
                print(f"An error occurred: {e}")
                raise HTTPException(status_code=500, detail="Failed to send email")


# Generate key if it doesn't exist

api_key_header = APIKeyHeader(name="X-API-KEY")
API_KEYS = [decrypted_api_key]


def get_api_key(api_key: str = Depends(api_key_header)):
    if api_key not in API_KEYS:
        raise HTTPException(status_code=403, detail="Could not validate API key")


@app.get("/api/get")
async def read_root(api_key: str = Depends(api_key_header)):
    if api_key not in API_KEYS or not api_key:
        raise HTTPException(status_code=403, detail="Could not validate API key")
    return {"message": "hi"}


class EmailModel(BaseModel):
    email: EmailStr


@app.post("/api/addemail")
async def add_email(email: EmailModel,api_key: str = Depends(api_key_header)):
    if api_key not in API_KEYS or not api_key:
        raise HTTPException(status_code=403, detail="Could not validate API key")
    supabase_email = email.email
    save_to_supabase(supabase_email)
    send_email(supabase_email)
    return {"message": "Email received. It has been saved to Supabase. A confirmation email has been sent.", "email": email.email}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
