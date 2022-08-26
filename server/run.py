import asyncio
import websockets

import parse

async def on_message(websocket):
    async for message in websocket:
        # print(message)
        function, json_dict = parse.parse(message)
        await function(websocket, **json_dict)
    
async def main():
    async with websockets.serve(on_message, 'localhost', 14159):
        await asyncio.Future()

asyncio.run(main())