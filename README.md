# Songify Mood

***<center>Receive a song suggestion based on your mood!</center>***

*<center>*PLEASE NOTE: This is just a POC web application to showcase the MERN stack! It is not intended to be anything more!*</center>*


## About
- Songify Mood is a full-stack MERN application
- Users are prompted to select 3 GIF images based on their mood
- Once selected, a predefined song is suggested to the user based on those selections
- GIFs and song suggestions are updated daily at 12am AEST
### Technologies
- MongoDB *(for storage/cache of GIF and Songs information)*
- Express & Node.js *(for backend server)*
- React *(for frontend website display)*
### Deployment Platforms
- [MongoDB Cloud](https://cloud.mongodb.com/v2/)
- [Render - Node Server](https://render.com/)
- [cron-job scheduler](https://cron-job.org/)
- [GitHub Pages](https://pages.github.com/)

## Limitations
- The algorithm implemented in this project is simple and naive. This is because it simply takes a tag related to each selected GIF image, and directly searches Spotify with these terms. As a result:
    - The search term provided to Spotify may be non-sensical, and therefore return a questionable suggestion
    - If no song is found based on search terms, a random Spotify song will be fetched instead
    - However, since it is simple and intuitive in nature, in many instances it should succeed in providing a song related to the selected GIFs
- Due to using free services, the Node server on Render will often "sleep", and therefore fail to maintain the scheduled cron job. As a workaroud, an `/update` endpoint was created - and an external scheduler (cron-job.org) is used to wake the server and force the update instead.
- No production API keys are used. Therefore, some services have provided their own limitations. For example, Spotify API has an indeterminate number of requests within a 30 second window until a `429: too many requests` response is received, therefore forcing this program to be designed to artificially limit requests.


## Local Deployment
### Clone Project
```
git clone https://github.com/marcobuontempo/songify-mood.git
```

### MongoDB
Database with collections:
- featured-gifs
- songs
*Note: these should automatically be created by the backend server when required, so no action should be required here. However, if issues are occurring, manually name the collections according to above*

### Environment Variables
#### - Backend `(/backend/.env)`
```
# EXPRESS
UPDATE_DB_KEY = <any key for your /update endpoint>

# MONGODB
MONGO_URI = <URI to your MongoDB. e.g. mongodb+srv://...>

# GIFs
GIF_API_KEY = <Tenor GIFs API Key>

# SPOTIFY
SPOTIFY_CLIENT_ID = <Spotify API Client ID>
SPOTIFY_CLIENT_SECRET = <Spotify API Client Secret>
```

#### - Frontend `(/frontend/.env)`
```
# EXPRESS
REACT_APP_EXPRESS_URL = <URL to your Node server>
```

### Install Dependencies and Run Applications
```
cd backend
npm install
npm start
```
- *Note: to invoke an update of GIFs and Songs in the database, simply make a GET request to `/update`. Alternatively, if your server will remain running, you can start the applciation using `npm start -- --withCron` to automatically invoke daily updates at 12am AEST*
```
cd frontend
npm install
npm start
```

## Attribution
### Third-Party APIs:
- Spotify Web API
- Tenor GIFs API

### Packages, Frameworks and Libraries:
- Refer to `/frontend/package.json` and `/backend/package.json` for complete list


## Implementation
### **Backend**
#### **Updating Database**
*Internally scheduled cron job to update database is run every 24 hours at midnight (12am AEST)*

1. Updating GIFs
    1. Fetches top 15 trending/featured GIFs from Tenor API

    1. Stores each GIF's info, including its associated tags, into MongoDB
        ```json
        {
            _id: ObjectId('xxxx')
            url: "https://media.tenor.com/xxxx"
            tags: ["xxxx", "yyyy", "zzzz"]
            date: xxxx
        }
        ```

1. Updating Songs
    1. Every combination (size=3), of all 15 GIFs, is created
    </br>Total combinations = 455
    </br>*i.e. [A,B,C,D] = ABC, ABD, ACD, BCD, ...*
    1. For each GIF combination, randomly select a tag from each of the 3 GIFs. 
    </br>*i.e. combinationTags = [gif1Tag, gif2Tag, gif3Tag]*

    1. Fetches auth token from Spotify API for the following searches

    1. For each GIF combination, use its combinationTags to directly query/search Spotify API for a matching track
    *i.e. query = gif1Tag + " " + gif2Tag + " " + gif3Tag*

    1. As fallback, if Spotify API search returns no tracks, fetch a random song instead
    *searches a random letter a-z, and then a random result in the top 100 for that letter)*

    1. If search fails (likely `429 error: too many requests`), waits 30 seconds before retrying. It repeats this a total of 5 times to try and receive a `200 OK` response - otherwise, it will eventually cancel the update request. 
    *Spotify API has an undeterminable amount of requests, but records #requests within a 30 second window. This implemented method should almost guarantee that the API request eventually returns a correct response*

    1. Repeat the above Spotify search for all 455 GIF combinations, with an artificially placed 1 second delay between each search. This also helps to limit the Spotify API from returning errors

    1. Each completed GIF combination and song data is stored into MongoDB
        ```json
        {
            _id: ObjectId('xxxx')
            gif_ids: [ObjectId('aaaa'), ObjectId('bbbb'), ObjectId('cccc')]
            song_data: {
                name: "xxxx"
                artist: "xxxx"
                url: "https://open.spotify.com/track/xxxx"
                preview_url: "https://p.scdn.co/mp3-preview/xxxx"
            }
        }
        ```

    1. All old GIFs and song data documents in MongoDB (from the previous update) are then deleted

#### **Endpoints**
`/`
- Test endpoint

`/update` 
- Forces an update of GIFs and Songs in DB

`/gifs`
- Returns all GIF documents from MongoDB

`/gifs/random`
- Returns 6 random GIF documents from MongoDB

`/songs`
- Returns all Song documents from MongoDB

`/songs/find?id1=<gif1_id>&id2=<gif2_id>&id3=<gif3_id>`
- Where each `<gif_id>` represents the selected GIF's MongoDB _id (e.g. "639725f3d04ee06098a2f643")
- Finds the matching combination of GIFs stored in MongoDB, and returns the predefined Song information

### **Frontend**
1. 6 random GIFs are fetched from the backend server (from a pool of 15 GIFs)
2. When the user chooses 3 GIFs and submits, a request is made to the backend with the _ids of each selected GIF
3. The backend finds the matching MongoDB document that contains all 3 _ids, and therefore returns the matching Song information
4. This song is shown in an embedded Spotify player in browser, for the user to listen to and explore further