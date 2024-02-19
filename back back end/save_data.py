import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage
import asyncio
import os

cred = credentials.Certificate('credentials.json')
firebase_admin.initialize_app(cred, {"storageBucket": "one-for-all-v2.appspot.com"})
db = firestore.client()

async def upload_photos(message_photos):
    photos = []
    
    if message_photos == []:
        photos = [""]
        return photos
    
    for photo in message_photos:
      cloud_path = "post/" + photo   
      bucket = storage.bucket()
      blob = bucket.blob(cloud_path)
      blob.upload_from_filename(photo)
      photos.append(cloud_path)
    
    return photos

# async def delete_photos (message_photos):
   
#    for photo in message_photos:
#       if os.path.exists(photo):
#         os.remove(photo)
#       else:
#           continue
    # print(f"File {file_path} does not exist.")
          
    #       print(f"Photo {photo} successfully deleted.")
    #   except FileNotFoundError:
    #       print(f"Photo {photo} not found.")
    #   except PermissionError:
    #       print(f"Unable to delete photo {photo}. Permission denied.")


async def events_posts(text, channel_name, message_photos):
    dictionary = {
        "@eventinaddis": "Events",
        "@selfmadecoder": "Code",
        "@eventinaddis": "Events",
        "@freelance_ethio": "Job",
        "@josad_software": "Job",
    }
    
    data_exists = False
    documents = db.collection("Posts").where("text", "==", text).where("channel", "==", channel_name).get()
    for i in documents:
        data_exists = True
        break

    if not data_exists:
        photos = await upload_photos(message_photos)
        doc_ref = db.collection("Posts").document()
        doc_ref.set({
            "category": dictionary.get(channel_name),
            "text": text,
            "channel": channel_name,
            "photos": photos
        })
    # await delete_photos(message_photos)
