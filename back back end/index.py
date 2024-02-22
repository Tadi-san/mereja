from telethon.sync import TelegramClient
from telethon.tl.types import InputMessagesFilterPhotos, InputMessagesFilterDocument
from telethon.errors import SessionPasswordNeededError
from telethon import functions, types
from save_data import events_posts

api_id = '24896926'
api_hash = '19485acfba2804780be733617fdd49cd'
phone_number = '+251936234742'
client = TelegramClient('session_name', api_id, api_hash)

async def main():
    await client.start(phone=phone_number)

    channels = ['@eventinaddis', '@selfmadecoder', "@eventinaddis", "@freelance_ethio", "@josad_software", '@Meda_Sport_Ethiopia', '@Ethio_Sport_Uefa', "@etv_news", "@Etv_zena_ETH"]  # List of channels
    # channels = []
    for channel_name in channels:
        channel = await client.get_entity(channel_name)
        photos = await client.get_messages(channel, None, filter=InputMessagesFilterPhotos)
        message_counter = 0  

        async for message in client.iter_messages(channel):
            if message.text:
                message_counter += 1  
                if message_counter > 15: 
                    break

                message_photo = []
                photos = await client.get_messages(channel, ids=[message.id], filter=InputMessagesFilterPhotos)
                
                for photo in photos:
                    downloaded_photo = await client.download_media(photo)
                    message_photo.append(downloaded_photo)
                # if not message_photo:
                #     message_photo = []
                await events_posts(message.text, channel_name, message_photo)
            
        # documents = await client.get_messages(channel, None, filter=InputMessagesFilterDocument)
        
        async for doc in client.iter_messages(channel, filter=InputMessagesFilterDocument):
            await client.download_media(doc)
            
        if message_counter > 15: 
            continue
        

with client:
    client.loop.run_until_complete(main())