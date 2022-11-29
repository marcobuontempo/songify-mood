# spotify-mood

## backend
1. cron job runs every 24 hours at midnight (12am AEST)
2. fetches top 15 trending gifs from tenor
3. stores each gif's info, including it's tags, into MongoDB
4. creates every combination (size=3) of all 15 gifs. total=455 gif combinations
5. for each gif combination, get a random tag from each gif. combinationTags=[gif1Tag, gif2Tag, gif3Tag]
6. gets auth token from spotify for following searches
7. use combinationTags to search for a song on spotify
8. if spotify search returns nothing, gets a random song (searches a random letter a-z, and then a random result in the top 100 for that letter)
9. if search fails due to 401? error (too many requests), waits 30 seconds before retrying. it does this a total of 5 times, until cancelling any further attempts. Spotify API has an undeterminable amount of requests, but records in a 30 second window. This should guarantee that the API request eventually returns a correct response
10. this spotify search is repeated for all 455 combinations, with an artificially placed 1sec delay between each. This also helps to limit the Spotify API from returning errors
11. Each combination and song data is stored into MongoDB
12. All old GIFs and song data documents in MongoDB (from the previous cron sample) are then deleted


## frontend
1. 6 random gifs are fetched from the backend
2. when user selects 3 gifs and submits, a request is made to the backend with the _ids of each selected gif
3. the backend finds the matching MongoDB document that contains all 3 _ids, and therefore returns the matching song data
4. song is shown in an embedded spotify player in browser