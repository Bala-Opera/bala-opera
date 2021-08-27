# Bala Opera
Bala Opera is a publication conceived by Cindy Hsu, Jessica Tsai, and Sharon Yu to celebrate the wide array of creative tools through which people express themselves as individuals. We strongly believe that creativity can be born from anything, and we wish to use this platform to highlight people who are actively creating through uncatalogued outputs in varying mediums. 

The word Bala (Bá - Là) is the Taiwanese Hokkien word for guava, a fruit found so abundantly across Taiwan that the word is adopted colloquially as a synonym for trite, unrefined, or mundane. ‘Bala’ aligns with our intention to focus on the conventional, and ‘Opera’ speaks to our format, which derives meaning from the orchestration of a cast of characters. 

## Setup
```bash
$ git clone https://github.com/daniellehu/bala-opera.git
$ cd bala-opera/src
```

There are some files not committed to the repository that you'll have to manually add:
1. Local environment file
    - You'll need access to the secrets in GCP (message me to be added to project)
      ```
      $ cd bala-opera/src/
      $ cp .env.local.template .env.local
      ```

2. Videos for homepage background (work in progress to make this process better)
    - You'll need access to the drive folder where the videos are stored
    - Will also need to place them in `src/public/videos` (create the directory)
    - Add the files in and rename to match `./videos/homepage-{a number [0,32]}.mp4`

### Running Locally
```
$ npm install
$ npm run dev
>> http://localhost:3000/
```

### Additional Resources
- Run through [this tutorial](https://nextjs.org/learn/basics/create-nextjs-app) for a quick rundown on Next.js