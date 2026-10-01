-- Auto-generated from src/lib/data/categories.ts — do not edit by hand.
-- Run AFTER schema.sql in the Supabase SQL editor.

insert into public.categories (id, name, emoji, grp, difficulty) values ('bollywood-movies', 'Bollywood Movies', '🎬', 'Entertainment', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('bollywood-movies', 'Sholay', 'Iconic 1975 film with Gabbar Singh and Jai-Veeru friendship'),
  ('bollywood-movies', 'Dilwale Dulhania Le Jayenge', 'Raj and Simran''s Europe train romance, ''Palat...'''),
  ('bollywood-movies', '3 Idiots', 'Engineering college comedy about following passion, ''All is well'''),
  ('bollywood-movies', 'Lagaan', 'Village cricket match against British tax, set in Gujarat'),
  ('bollywood-movies', 'Dangal', 'Father trains daughters for wrestling, based on true story'),
  ('bollywood-movies', 'Kabhi Khushi Kabhie Gham', 'Family drama with Shah Rukh, Amitabh, ''It''s all about loving your parents'''),
  ('bollywood-movies', 'Zindagi Na Milegi Dobara', 'Three friends'' Spain road trip, ''Señorita'''),
  ('bollywood-movies', 'Gully Boy', 'Street rapper from Mumbai slums, ''Apna Time Aayega'''),
  ('bollywood-movies', 'Andhadhun', 'Blind pianist thriller with Ayushmann, mysterious murder'),
  ('bollywood-movies', 'Queen', 'Kangana''s solo honeymoon trip to Europe after wedding canceled'),
  ('bollywood-movies', 'Barfi', 'Ranbir as mute deaf man, Priyanka as autistic woman, love story'),
  ('bollywood-movies', 'PK', 'Aamir as alien questioning religious practices, ''Jaggu Jaaoo'''),
  ('bollywood-movies', 'Chennai Express', 'Deepika-SRK train romance, ''Lungi Dance'', South India journey'),
  ('bollywood-movies', 'Bajrangi Bhaijaan', 'Salman helps mute Pakistani girl return home, cross-border love'),
  ('bollywood-movies', 'Kuch Kuch Hota Hai', 'College love triangle, SRK-Kajol-Rani, ''Tina...'''),
  ('bollywood-movies', 'Om Shanti Om', 'SRK rebirth revenge, Deepika debut, ''Deewangi Deewangi'''),
  ('bollywood-movies', 'Rockstar', 'Ranbir''s journey to become rockstar, Jordan-Heer tragedy'),
  ('bollywood-movies', 'Dil Chahta Hai', 'Three friends'' relationship journeys, Goa trip classic'),
  ('bollywood-movies', 'Swades', 'Shah Rukh returns to India from NASA, rural development'),
  ('bollywood-movies', 'Rang De Basanti', 'Students awaken patriotism through film within film'),
  ('bollywood-movies', 'Munna Bhai MBBS', 'Sanjay Dutt as fake doctor with Gandhi''s ghost, ''Jaadu ki Jhappi'''),
  ('bollywood-movies', 'Pathaan', 'SRK spy action comeback, Deepika-John, ''Jhoome Jo Pathaan'''),
  ('bollywood-movies', 'Jawan', 'SRK dual role as father-son, social message action thriller'),
  ('bollywood-movies', 'Animal', 'Ranbir Kapoor violent revenge drama, father-son obsession')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('bollywood-actors', 'Bollywood Stars', '⭐', 'Entertainment', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('bollywood-actors', 'Shah Rukh Khan', 'King of Romance, ''Baazigar'', ''DDLJ'', owns Kolkata Knight Riders'),
  ('bollywood-actors', 'Amitabh Bachchan', 'Legendary actor, ''Angry Young Man'', ''Sholay'', Kaun Banega Crorepati host'),
  ('bollywood-actors', 'Deepika Padukone', 'Padmaavat, Chennai Express, mental health advocate, married to Ranveer'),
  ('bollywood-actors', 'Salman Khan', 'Dabangg, Bajrangi Bhaijaan, Being Human foundation, Bigg Boss host'),
  ('bollywood-actors', 'Aamir Khan', 'Mr. Perfectionist, 3 Idiots, Dangal, Lagaan, social issue films'),
  ('bollywood-actors', 'Alia Bhatt', 'Student of the Year, Gangubai Kathiawadi, married to Ranbir Kapoor'),
  ('bollywood-actors', 'Ranbir Kapoor', 'Barfi, Rockstar, Animal, Kapoor family scion'),
  ('bollywood-actors', 'Priyanka Chopra', 'Desi Girl, Quantico, married to Nick Jonas, global icon'),
  ('bollywood-actors', 'Hrithik Roshan', 'Greek God, Krrish superhero series, excellent dancer'),
  ('bollywood-actors', 'Katrina Kaif', 'Chikni Chameli, Tiger series, married to Vicky Kaushal'),
  ('bollywood-actors', 'Akshay Kumar', 'Khiladi, action star, patriotic films, Padma Shri awardee'),
  ('bollywood-actors', 'Ranveer Singh', 'Padmaavat, Gully Boy, energetic performer, married to Deepika'),
  ('bollywood-actors', 'Madhuri Dixit', 'Dhak Dhak girl, ''Hum Aapke Hain Koun!'', classical dancer'),
  ('bollywood-actors', 'Kajol', 'DDLJ, Kuch Kuch Hota Hai, iconic pairing with SRK'),
  ('bollywood-actors', 'Ajay Devgn', 'Singham, Golmaal, intense action star, director'),
  ('bollywood-actors', 'Kareena Kapoor', 'Poo from K3G, Jab We Met, Kapoor family, married to Saif'),
  ('bollywood-actors', 'Shahid Kapoor', 'Kabir Singh, Haider, excellent dancer, married to Mira'),
  ('bollywood-actors', 'Anushka Sharma', 'Band Baaja Baaraat, PK, producer, married to Virat Kohli'),
  ('bollywood-actors', 'Vicky Kaushal', 'Uri: The Surgical Strike, Masaan, versatile actor'),
  ('bollywood-actors', 'Kiara Advani', 'Kabir Singh, Bhool Bhulaiyaa 2, Satyaprem Ki Katha')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('south-cinema', 'South Indian Cinema', '🌟', 'Entertainment', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('south-cinema', 'Baahubali', 'Epic two-part Indian film, ''Why did Kattappa kill Baahubali?'''),
  ('south-cinema', 'RRR', 'Rajamouli''s fictional freedom fighters, Oscar-winning ''Naatu Naatu'''),
  ('south-cinema', 'Pushpa', 'Allu Arjun as red sandalwood smuggler, ''Thaggede Le'''),
  ('south-cinema', 'KGF', 'Yash as Rocky, gold mine empire, Kannada blockbuster'),
  ('south-cinema', 'Kantara', 'Kannada folklore film, Bhoota Kola tradition, Rishab Shetty'),
  ('south-cinema', 'Vikram', 'Kamal Haasan spy thriller, Lokesh Kanagaraj universe'),
  ('south-cinema', 'Master', 'Vijay-Thalapathy vs Vijay Sethupathi, action drama'),
  ('south-cinema', 'Rajinikanth', 'Superstar, Thalaivar, Robot, Kabali, mass icon'),
  ('south-cinema', 'Kamal Haasan', 'Ulaganayagan, versatile actor, Indian 2, Dasavathaaram'),
  ('south-cinema', 'Allu Arjun', 'Stylish Star, Pushpa, Ala Vaikunthapurramuloo, excellent dancer'),
  ('south-cinema', 'Prabhas', 'Baahubali, Saaho, Pan-India star, Rebel Star'),
  ('south-cinema', 'Yash', 'KGF fame, Rocky Bhai, Kannada superstar'),
  ('south-cinema', 'Vijay', 'Thalapathy, Master, Mersal, Tamil cinema icon'),
  ('south-cinema', 'Mahesh Babu', 'Prince, Pokiri, Sarkaru Vaari Paata, Telugu superstar'),
  ('south-cinema', 'Jr NTR', 'Young Tiger, RRR, Temper, Nannaku Prematho'),
  ('south-cinema', 'Ram Charan', 'Mega Power Star, RRR, Magadheera, Chiranjeevi''s son'),
  ('south-cinema', 'Suriya', 'Soorarai Pottru, Jai Bhim, versatile Tamil actor'),
  ('south-cinema', 'Ponniyin Selvan', 'Mani Ratnam''s Chola empire historical epic'),
  ('south-cinema', 'Drishyam', 'Family covering up crime, remake of Malayalam hit'),
  ('south-cinema', '96', 'Vijay Sethupathi-Trisha school reunion romance'),
  ('south-cinema', 'Jai Bhim', 'Suriya tribal rights film, based on true events'),
  ('south-cinema', 'Mohanlal', 'Complete Actor, Malayalam legend, Drishyam original'),
  ('south-cinema', 'Mammootty', 'Mega Star, Malayalam legend, Bheeshma Parvam'),
  ('south-cinema', 'Dulquer Salmaan', 'Charlie, Malayalam actor, Mammootty''s son')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('famous-songs', 'Iconic Songs', '🎵', 'Entertainment', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('famous-songs', 'Jai Ho', 'Slumdog Millionaire Oscar winner, AR Rahman, ''Jai Ho'''),
  ('famous-songs', 'Chaiyya Chaiyya', 'Dil Se train top song, Shah Rukh, Malaika'),
  ('famous-songs', 'Kal Ho Naa Ho', 'Title track, Shah Rukh, emotional, Sonu Nigam'),
  ('famous-songs', 'Tum Hi Ho', 'Aashiqui 2 romantic ballad, Arijit Singh'),
  ('famous-songs', 'Naatu Naatu', 'RRR Oscar-winning dance song, Telugu'),
  ('famous-songs', 'Kajra Re', 'Bunty Aur Babli, Aishwarya Rai item number'),
  ('famous-songs', 'Munni Badnaam', 'Dabangg item song, Malaika Arora'),
  ('famous-songs', 'Gallan Goodiyan', 'Dil Dhadakne Do family dance song'),
  ('famous-songs', 'Channa Mereya', 'Ae Dil Hai Mushkil, heartbreak, Arijit'),
  ('famous-songs', 'Tujhe Dekha Toh', 'DDLJ train song, SRK-Kajol romance'),
  ('famous-songs', 'Badtameez Dil', 'Yeh Jawaani Hai Deewani party song, Ranbir'),
  ('famous-songs', 'Kesariya', 'Brahmastra romantic song, Ranbir-Alia, Arijit'),
  ('famous-songs', 'Apna Time Aayega', 'Gully Boy motivational rap, Ranveer Singh'),
  ('famous-songs', 'Zinda', 'Bhaag Milkha Bhaag inspirational, Shankar-Ehsaan-Loy'),
  ('famous-songs', 'Malhari', 'Bajirao Mastani victory song, Ranveer Singh'),
  ('famous-songs', 'Ghungroo', 'War party song, Hrithik-Tiger, Vaani Kapoor'),
  ('famous-songs', 'London Thumakda', 'Queen wedding song, Kangana Ranaut'),
  ('famous-songs', 'Nagada Sang Dhol', 'Ram-Leela garba song, Deepika Padukone'),
  ('famous-songs', 'Senorita', 'Zindagi Na Milegi Dobara Spanish song, Hrithik'),
  ('famous-songs', 'Kun Faya Kun', 'Rockstar Sufi song, AR Rahman, Ranbir Kapoor')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tv-shows', 'Indian TV & OTT', '📺', 'Entertainment', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('tv-shows', 'Taarak Mehta Ka Ooltah Chashmah', 'Longest running comedy show, Gokuldham Co-op Society'),
  ('tv-shows', 'Kaun Banega Crorepati', 'Indian version of Who Wants to Be a Millionaire, Amitabh host'),
  ('tv-shows', 'Bigg Boss', 'Reality show with contestants locked in house, Salman host'),
  ('tv-shows', 'Sacred Games', 'Netflix thriller, Saif Ali Khan, Nawazuddin Siddiqui'),
  ('tv-shows', 'Mirzapur', 'Amazon Prime crime drama, Guddu-Bablu Pandit brothers'),
  ('tv-shows', 'The Family Man', 'Amazon Prime spy thriller, Manoj Bajpayee'),
  ('tv-shows', 'Panchayat', 'Amazon Prime comedy, rural India, Jitendra Kumar'),
  ('tv-shows', 'Kota Factory', 'TVF IIT coaching drama, Jeetu Bhaiya'),
  ('tv-shows', 'Scam 1992', 'SonyLIV Harshad Mehta stock market scam, Pratik Gandhi'),
  ('tv-shows', 'Indian Idol', 'Singing reality show, Aditya Narayan host'),
  ('tv-shows', 'Shark Tank India', 'Business pitch show, entrepreneurs seek funding'),
  ('tv-shows', 'CID', 'Crime investigation drama, Daya breaks doors, ACP Pradyuman'),
  ('tv-shows', 'Balika Vadhu', 'Child marriage social issue drama, Colors TV'),
  ('tv-shows', 'Anupamaa', 'Star Plus family drama, Rupali Ganguly, empowered housewife'),
  ('tv-shows', 'Aspirants', 'TVF UPSC preparation drama, Naveen, Sandeep, Abhilash'),
  ('tv-shows', 'Farzi', 'Amazon Prime counterfeit currency thriller, Shahid Kapoor'),
  ('tv-shows', 'Ramayan', 'Epic mythological series, Arun Govil as Ram, DD National'),
  ('tv-shows', 'Mahabharat', 'Epic mythological series, BR Chopra, Draupadi cheerharan'),
  ('tv-shows', 'Shaktimaan', 'Indian superhero TV series, Mukesh Khanna'),
  ('tv-shows', 'Malgudi Days', 'Classic Doordarshan series, RK Narayan stories')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('movie-characters', 'Movie Characters', '🎭', 'Entertainment', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('movie-characters', 'Gabbar Singh', 'Sholay villain, ''Kitne aadmi the?'', iconic dacoit'),
  ('movie-characters', 'Mogambo', 'Mr. India villain, ''Mogambo khush hua'''),
  ('movie-characters', 'Munna Bhai', 'Munna Bhai MBBS, fake doctor with heart of gold'),
  ('movie-characters', 'Circuit', 'Munna Bhai''s loyal sidekick, Arshad Warsi'),
  ('movie-characters', 'Baahubali', 'Amarendra Baahubali, Mahishmati king, Prabhas'),
  ('movie-characters', 'Kattappa', 'Baahubali''s loyal servant, killed Amarendra'),
  ('movie-characters', 'Chulbul Pandey', 'Dabangg cop, Salman Khan, ''Humpty Sharma ki Dulhania'''),
  ('movie-characters', 'Rancho', '3 Idiots, Aamir Khan, ''All is well'', engineering genius'),
  ('movie-characters', 'Raj Malhotra', 'DDLJ, SRK, European romance with Simran'),
  ('movie-characters', 'Poo', 'K3G, Kareena Kapoor, ''Pooh'', fashion icon'),
  ('movie-characters', 'Bhallaladeva', 'Baahubali antagonist, Rana Daggubati, cruel king'),
  ('movie-characters', 'Rocky Bhai', 'KGF, Yash, gold mine empire builder'),
  ('movie-characters', 'Pushpa Raj', 'Pushpa, Allu Arjun, red sandalwood smuggler'),
  ('movie-characters', 'Kabir Singh', 'Shahid Kapoor, surgeon with anger issues, prequel to Arjun Reddy'),
  ('movie-characters', 'Geet', 'Jab We Met, Kareena Kapoor, bubbly Punjabi girl'),
  ('movie-characters', 'Bunny', 'Yeh Jawaani Hai Deewani, Ranbir Kapoor, travel enthusiast'),
  ('movie-characters', 'Naina', 'YJHD, Deepika Padukone, ambitious medical student'),
  ('movie-characters', 'Simran', 'DDLJ, Kajol, ''Palat...'', Europe trip romance'),
  ('movie-characters', 'Don', 'SRK underworld don, ''Don ko pakadna mushkil hi nahi namumkin hai'''),
  ('movie-characters', 'Vijay Dinanath Chauhan', 'Agneepath, SRK or Hrithik, father''s revenge')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-movies', 'Tollywood Blockbusters', '🎥', 'Tollywood', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('tollywood-movies', 'Baahubali', 'Rajamouli epic, Prabhas, two-part Indian masterpiece'),
  ('tollywood-movies', 'RRR', 'Rajamouli fictional freedom fighters, Oscar-winning ''Naatu Naatu'''),
  ('tollywood-movies', 'Pushpa', 'Allu Arjun red sandalwood smuggler, ''Thaggede Le'''),
  ('tollywood-movies', 'Magadheera', 'Ram Charan reincarnation action, SS Rajamouli'),
  ('tollywood-movies', 'Arjun Reddy', 'Vijay Deverakonda surgeon with anger issues, raw romance'),
  ('tollywood-movies', 'Rangasthalam', 'Ram Charan village drama, Sukumar, 1980s setting'),
  ('tollywood-movies', 'Ala Vaikunthapurramuloo', 'Allu Arjun family drama, Trivikram, ''Butta Bomma'''),
  ('tollywood-movies', 'Eega', 'SS Rajamouli fly reincarnation revenge, unique concept'),
  ('tollywood-movies', 'Pokiri', 'Mahesh Babu undercover cop, Puri Jagannadh, blockbuster'),
  ('tollywood-movies', 'Athadu', 'Mahesh Babu assassin mistaken for someone else, Trivikram'),
  ('tollywood-movies', 'Mahanati', 'Savitri biopic, Keerthy Suresh, legendary actress'),
  ('tollywood-movies', 'Sita Ramam', 'Dulquer-Naga Chaitanya period romance, beautiful cinematography'),
  ('tollywood-movies', 'Jathi Ratnalu', 'Comedy about village friends in city, hilarious'),
  ('tollywood-movies', 'Salaar', 'Prabhas gangster action, Prashanth Neel, high-octane'),
  ('tollywood-movies', 'Devara', 'NTR Jr ocean-themed action, Koratala Siva'),
  ('tollywood-movies', 'Hi Nanna', 'Nani father-daughter emotional drama, Mrunal Thakur'),
  ('tollywood-movies', 'Bommarillu', 'Siddharth family comedy, ''Happy Days'' vibes'),
  ('tollywood-movies', 'Attarintiki Daredi', 'Pawan Kalyan family entertainer, Trivikram'),
  ('tollywood-movies', 'Srimanthudu', 'Mahesh Babu adopts village, Koratala Siva social message'),
  ('tollywood-movies', 'Bheemla Nayak', 'Pawan Kalyan-Rana power clash, remake of Ayyappanum Koshiyum'),
  ('tollywood-movies', 'Sarileru Neekevvaru', 'Mahesh Babu army officer, Anil Ravipudi action'),
  ('tollywood-movies', 'Geetha Govindam', 'Vijay Deverakonda romantic comedy, ''Inkem Inkem'''),
  ('tollywood-movies', 'Fidaa', 'Varun Tej-Sai Pallavi cross-cultural romance, Sekhar Kammula'),
  ('tollywood-movies', 'Kalki 2898 AD', 'Prabhas-Amitabh sci-fi epic, futuristic mythology'),
  ('tollywood-movies', 'Hanu-Man', 'Teja Sajja superhero film, low budget blockbuster'),
  ('tollywood-movies', 'Tillu Square', 'Siddhu Jonnalagadda comedy sequel, DJ Tillu follow-up'),
  ('tollywood-movies', 'Sye Raa', 'Chiranjeevi historical epic, Uyyalawada Narasimha Reddy'),
  ('tollywood-movies', 'DJ Tillu', 'Siddhu Jonnalagadda DJ comedy, cult favorite'),
  ('tollywood-movies', 'C/o Kancharapalem', 'Multiple stories in Kancharapalem village, realistic'),
  ('tollywood-movies', 'Jersey', 'Nani cricket comeback drama, emotional sports film'),
  ('tollywood-movies', 'Sarrainodu', 'Allu Arjun mass action, Boyapati Srinu'),
  ('tollywood-movies', 'Race Gurram', 'Allu Arjun action comedy, Surender Reddy'),
  ('tollywood-movies', 'Temper', 'Jr NTR corrupt cop transformation, Puri Jagannadh'),
  ('tollywood-movies', 'Legend', 'Balakrishna dual role, historical action')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-classics', 'Telugu Classics & Legends', '🎞️', 'Tollywood', 'hard')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('tollywood-classics', 'Mayabazar', '1957 mythological comedy, SVR as Ghatotkacha, ''Sahasra Siracheda Apuranabham'''),
  ('tollywood-classics', 'Pathala Bhairavi', '1951 fantasy adventure, NTR as hero, SVR as villain'),
  ('tollywood-classics', 'Missamma', '1955 comedy, NTR-Savitri, mistaken identity classic'),
  ('tollywood-classics', 'Gundamma Katha', '1962 family drama, NTR-ANR together, Cinderella story'),
  ('tollywood-classics', 'Muga Manasulu', '1964 romantic drama, ANR-Savitri, social message'),
  ('tollywood-classics', 'Doctor Chakravarthy', '1964 medical drama, ANR, ethical dilemmas'),
  ('tollywood-classics', 'Ramu', '1968 ANR film, emotional family drama'),
  ('tollywood-classics', 'Bhookailas', '1958 mythological, NTR as Ravana, SVR'),
  ('tollywood-classics', 'Bobbili Yuddham', '1964 historical war film, NTR as Ranga Rao'),
  ('tollywood-classics', 'Ramudu Bheemudu', '1964 dual role comedy, NTR as twins'),
  ('tollywood-classics', 'Maa Bhoomi', '1979 Telangana farmers struggle, G N Rao, realistic'),
  ('tollywood-classics', 'Muthyala Muggu', '1969 family drama, Krishna, Vijaya Nirmala'),
  ('tollywood-classics', 'Sankarabharanam', '1980 classical music masterpiece, KV Mahadevan, K Viswanath'),
  ('tollywood-classics', 'Sagara Sangamam', '1983 dance drama, Kamal Haasan, K Viswanath'),
  ('tollywood-classics', 'Swati Mutyam', '1986 Kamal Haasan, mentally challenged man, K Viswanath'),
  ('tollywood-classics', 'Rudraveena', '1988 Chiranjeevi, K Viswanath, social message'),
  ('tollywood-classics', 'Anand', '1971 romantic drama, ANR, Shobhan Babu'),
  ('tollywood-classics', 'Mithunam', '1993 family drama, NTR, Vijayashanti'),
  ('tollywood-classics', 'Nuvve Kavali', '2000 college romance, Tarun, Richa, classic love story'),
  ('tollywood-classics', 'Murari', '2001 Mahesh Babu family drama, village setting'),
  ('tollywood-classics', 'Kshanakshanam', '1991 Ram Gopal Varma thriller, Venkatesh'),
  ('tollywood-classics', 'Shiva', '1989 Ram Gopal Varma debut, Nagarjuna, gangster drama'),
  ('tollywood-classics', 'Money', '1993 comedy thriller, JD Chakravarthy, RGV'),
  ('tollywood-classics', 'Aithe', '2003 heist thriller, low budget cult classic')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-heroes', 'Tollywood Heroes', '🦸', 'Tollywood', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('tollywood-heroes', 'Chiranjeevi', 'Megastar of Telugu cinema'),
  ('tollywood-heroes', 'Pawan Kalyan', 'Power Star and actor-politician'),
  ('tollywood-heroes', 'Mahesh Babu', 'Prince of Telugu cinema'),
  ('tollywood-heroes', 'Prabhas', 'Pan-India star known for epic films'),
  ('tollywood-heroes', 'Allu Arjun', 'Stylish Star and National Award winner'),
  ('tollywood-heroes', 'Jr NTR', 'Young Tiger from Nandamuri family'),
  ('tollywood-heroes', 'Ram Charan', 'Mega Power Star and global icon'),
  ('tollywood-heroes', 'Nagarjuna', 'King of Telugu cinema'),
  ('tollywood-heroes', 'Venkatesh', 'Victory Venkatesh and versatile actor'),
  ('tollywood-heroes', 'Balakrishna', 'Nandamuri star and politician'),
  ('tollywood-heroes', 'Ravi Teja', 'Mass Raja known for energetic roles'),
  ('tollywood-heroes', 'Nani', 'Natural Star and versatile performer'),
  ('tollywood-heroes', 'Vijay Deverakonda', 'Youth icon and Arjun Reddy fame'),
  ('tollywood-heroes', 'Naga Chaitanya', 'Akkineni family actor'),
  ('tollywood-heroes', 'Ram Pothineni', 'Energetic dancer and actor'),
  ('tollywood-heroes', 'Nithiin', 'Consistent performer and producer'),
  ('tollywood-heroes', 'NT Rama Rao', 'Legendary actor and former CM'),
  ('tollywood-heroes', 'Akkineni Nageswara Rao', 'ANR, legendary romantic hero'),
  ('tollywood-heroes', 'Krishna', 'Superstar and veteran actor'),
  ('tollywood-heroes', 'Sai Dharam Tej', 'Mega family actor'),
  ('tollywood-heroes', 'Varun Tej', 'Mega family actor known for varied roles'),
  ('tollywood-heroes', 'Sharwanand', 'Versatile actor with critical acclaim'),
  ('tollywood-heroes', 'Adivi Sesh', 'Writer-actor known for thrillers'),
  ('tollywood-heroes', 'Rana Daggubati', 'Actor from Daggubati family'),
  ('tollywood-heroes', 'Gopichand', 'Action hero known for mass films'),
  ('tollywood-heroes', 'Siddhu Jonnalagadda', 'Comedy sensation known for DJ Tillu'),
  ('tollywood-heroes', 'Panja Vaisshnav Tej', 'Mega family actor with romantic debut'),
  ('tollywood-heroes', 'Bellamkonda Sreenivas', 'Action hero from film family'),
  ('tollywood-heroes', 'Raj Tarun', 'Youthful actor known for romantic films'),
  ('tollywood-heroes', 'Naga Shaurya', 'Versatile actor with varied roles')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-heroines', 'Tollywood Heroines', '💃', 'Tollywood', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('tollywood-heroines', 'Samantha', 'Popular South Indian actress known for versatile roles in Telugu and Tamil films'),
  ('tollywood-heroines', 'Anushka Shetty', 'Leading actress in South Indian cinema, known for powerful female-centric roles'),
  ('tollywood-heroines', 'Rashmika Mandanna', 'Young actress who gained popularity across multiple Indian film industries'),
  ('tollywood-heroines', 'Pooja Hegde', 'Actress and model known for her work in Telugu and Hindi films'),
  ('tollywood-heroines', 'Kajal Aggarwal', 'Established actress in South Indian cinema with a long career'),
  ('tollywood-heroines', 'Keerthy Suresh', 'National Award-winning actress known for her performance in a biographical film'),
  ('tollywood-heroines', 'Sai Pallavi', 'Actress known for her natural acting style and classical dance background'),
  ('tollywood-heroines', 'Tamannaah', 'Actress who has worked in multiple Indian film industries'),
  ('tollywood-heroines', 'Savitri', 'Legendary actress from the golden era of Indian cinema'),
  ('tollywood-heroines', 'Sridevi', 'Iconic actress who was a star in both Hindi and South Indian cinema'),
  ('tollywood-heroines', 'Vijayashanti', 'Veteran actress known for strong female characters in the 80s-90s'),
  ('tollywood-heroines', 'Nayanthara', 'Leading actress in South Indian cinema, known as ''Lady Superstar'''),
  ('tollywood-heroines', 'Shruti Haasan', 'Actress and singer who works in multiple Indian languages'),
  ('tollywood-heroines', 'Genelia', 'Actress known for her charming roles in romantic films'),
  ('tollywood-heroines', 'Ileana D''Cruz', 'Actress who started in South Indian cinema before moving to Bollywood'),
  ('tollywood-heroines', 'Rakul Preet Singh', 'Actress who has appeared in various Indian film industries'),
  ('tollywood-heroines', 'Krithi Shetty', 'Young actress who gained fame with a successful debut film'),
  ('tollywood-heroines', 'Mrunal Thakur', 'Actress who works in both Bollywood and South Indian cinema'),
  ('tollywood-heroines', 'Anupama Parameswaran', 'Actress known for her natural acting in romantic films'),
  ('tollywood-heroines', 'Jayasudha', 'Veteran actress from the 70s-80s era known for character roles'),
  ('tollywood-heroines', 'Sreeleela', 'Young actress who is a rising star in South Indian cinema'),
  ('tollywood-heroines', 'Trisha', 'Popular actress with a long career in Tamil and Telugu cinema'),
  ('tollywood-heroines', 'Bhanupriya', 'Veteran actress from the 80s-90s known for classical dance'),
  ('tollywood-heroines', 'Ramya Krishnan', 'Actress known for powerful character roles including a queen in a epic film'),
  ('tollywood-heroines', 'Sobhita Dhulipala', 'Actress and model who has appeared in web series and films'),
  ('tollywood-heroines', 'Nithya Menen', 'Versatile actress known for her work in multiple languages'),
  ('tollywood-heroines', 'Raveena Tandon', '90s Bollywood actress who has appeared in recent films'),
  ('tollywood-heroines', 'Meena', 'Veteran actress known for roles in Tamil and Telugu cinema'),
  ('tollywood-heroines', 'Soundarya', 'Late actress known for her performances in South Indian films'),
  ('tollywood-heroines', 'Raasi', 'Actress known for her work in Telugu cinema in the 90s'),
  ('tollywood-heroines', 'Preity Zinta', 'Bollywood actress who also appeared in South Indian films'),
  ('tollywood-heroines', 'Lakshmi Manchu', 'Actress and producer from Telugu film family'),
  ('tollywood-heroines', 'Lavanya Tripathi', 'Actress known for her work in Telugu cinema'),
  ('tollywood-heroines', 'Mehreen Pirzada', 'Actress who works in Telugu and Tamil films'),
  ('tollywood-heroines', 'Catherine Tresa', 'Actress known for her roles in South Indian cinema'),
  ('tollywood-heroines', 'Ritu Varma', 'Actress known for her work in Telugu films')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-villains', 'Tollywood Villains & Actors', '😈', 'Tollywood', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('tollywood-villains', 'Kattappa', 'Loyal servant character from a epic film who made a difficult choice'),
  ('tollywood-villains', 'Bhallaladeva', 'Antagonist king from a epic Indian film series'),
  ('tollywood-villains', 'Jagapathi Babu', 'Versatile actor who transitioned from hero to villain roles'),
  ('tollywood-villains', 'Prakash Raj', 'Iconic character actor known for villain roles across Indian cinema'),
  ('tollywood-villains', 'Sonu Sood', 'Actor known for villain roles in Hindi and South Indian films'),
  ('tollywood-villains', 'Ashutosh Rana', 'Actor known for intense villain roles in thrillers'),
  ('tollywood-villains', 'Mukesh Rishi', 'Actor known for playing gangster and villain characters'),
  ('tollywood-villains', 'Rao Ramesh', 'Character actor known for negative roles in family dramas'),
  ('tollywood-villains', 'Posani Krishna Murali', 'Character actor known for comedy-villain roles'),
  ('tollywood-villains', 'Kota Srinivasa Rao', 'Legendary character actor known for villain roles'),
  ('tollywood-villains', 'Tanikella Bharani', 'Character actor and writer known for negative roles'),
  ('tollywood-villains', 'Nasser', 'Versatile actor known for villain roles in multiple languages'),
  ('tollywood-villains', 'Suman', 'Actor known for antagonist roles in 90s and 2000s films'),
  ('tollywood-villains', 'Ravi Shankar', 'Actor known for villain and character roles'),
  ('tollywood-villains', 'Sampath Raj', 'Actor known for negative roles in action films'),
  ('tollywood-villains', 'Ajay Ghosh', 'Character actor known for villain roles in recent films'),
  ('tollywood-villains', 'Bobby Simha', 'Actor known for a memorable villain role in a gangster film'),
  ('tollywood-villains', 'Sunil Varma', 'Actor who transitioned from comedy to villain roles'),
  ('tollywood-villains', 'Brahmaji', 'Character actor known for comedy and negative roles'),
  ('tollywood-villains', 'Ajay', 'Actor known for villain roles in action films'),
  ('tollywood-villains', 'Mukesh Rishi', 'Actor known for villain roles in Indian cinema'),
  ('tollywood-villains', 'Shiyaji Shinde', 'Character actor known for negative roles'),
  ('tollywood-villains', 'Vijay Sethupathi', 'Versatile actor known for villain roles in recent films'),
  ('tollywood-villains', 'Arvind Swamy', 'Actor known for antagonist roles in thriller films')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-comedians', 'Tollywood Comedians', '🤣', 'Tollywood', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('tollywood-comedians', 'Brahmanandam', 'Legendary comedian who holds a Guinness record for most film appearances'),
  ('tollywood-comedians', 'Ali', 'Versatile comedian known for his comic timing in 90s and 2000s films'),
  ('tollywood-comedians', 'Sunil', 'Comedian who later became a leading actor in comedy films'),
  ('tollywood-comedians', 'Vennela Kishore', 'Modern comedian known for his expressive comic style'),
  ('tollywood-comedians', 'Saptagiri', 'Comedian known for character roles in contemporary films'),
  ('tollywood-comedians', 'Rajababu', 'Legendary comedian from the golden era of Telugu cinema'),
  ('tollywood-comedians', 'Relangi', 'Classic comedian known for his work with legendary actors'),
  ('tollywood-comedians', 'Ramana Reddy', 'Veteran comedian from the early days of Telugu cinema'),
  ('tollywood-comedians', 'Allu Ramalingaiah', 'Legendary character actor and comedian from a famous film family'),
  ('tollywood-comedians', 'MS Narayana', 'Comedian known for his roles in 2000s Telugu films'),
  ('tollywood-comedians', 'Krishna Bhagavan', 'Character actor known for comic roles and dialogue delivery'),
  ('tollywood-comedians', 'Prudhvi Raj', 'Comedian known for his character roles in recent films'),
  ('tollywood-comedians', 'Raghu Babu', 'Character actor and comedian from a film family'),
  ('tollywood-comedians', 'Thagubothu Ramesh', 'Comedian known for playing drunkard characters'),
  ('tollywood-comedians', 'Satyam Rajesh', 'Comedian known for supporting roles in films'),
  ('tollywood-comedians', 'Priyadarshi', 'Comedian known for his work in recent hit films'),
  ('tollywood-comedians', 'Hyper Aadi', 'Comedian known for his energetic performances'),
  ('tollywood-comedians', 'Getup Srinu', 'Comedian known for his getup-based comedy'),
  ('tollywood-comedians', 'Shakalaka Shankar', 'Comedian who started from TV and moved to films'),
  ('tollywood-comedians', 'Sudigali Sudheer', 'TV comedian who has appeared in films'),
  ('tollywood-comedians', 'Dharmavarapu Subramanyam', 'Comedian known for his character roles'),
  ('tollywood-comedians', 'L B Sriram', 'Character actor known for comic roles'),
  ('tollywood-comedians', 'Chitti Babu', 'Comedian from the 90s era'),
  ('tollywood-comedians', 'Kota Srinivasa Rao', 'Character actor also known for comic timing')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-songs', 'Tollywood Songs', '🎶', 'Tollywood', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('tollywood-songs', 'Naatu Naatu', 'Oscar-winning dance song from a Indian film that became globally popular'),
  ('tollywood-songs', 'Butta Bomma', 'Popular dance song that went viral for its catchy beat and dance moves'),
  ('tollywood-songs', 'Oo Antava', 'Item song that became very popular for its catchy lyrics and dance'),
  ('tollywood-songs', 'Srivalli', 'Romantic song from a blockbuster action film'),
  ('tollywood-songs', 'Saami Saami', 'Energetic dance song from a popular action film'),
  ('tollywood-songs', 'Samajavaragamana', 'Melodic romantic song from a family drama film'),
  ('tollywood-songs', 'Ramuloo Ramulaa', 'Mass beat song from a successful family drama'),
  ('tollywood-songs', 'Inkem Inkem Inkem Kaavaale', 'Beautiful romantic melody from a cross-cultural love story'),
  ('tollywood-songs', 'Vachinde', 'Romantic song featuring a popular actress'),
  ('tollywood-songs', 'Seeti Maar', 'Mass dance song from an action film'),
  ('tollywood-songs', 'Pakka Local', 'Energetic song from a blockbuster action film'),
  ('tollywood-songs', 'Ringa Ringa', 'Viral dance song from a romantic comedy'),
  ('tollywood-songs', 'Mind Block', 'Catchy song from an action comedy film'),
  ('tollywood-songs', 'Bullettu Bandi', 'Mass song from a successful action film'),
  ('tollywood-songs', 'Top Lesi Poddi', 'Energetic song from a blockbuster action film'),
  ('tollywood-songs', 'Aa Ante Amalapuram', 'Catchy dance number from a cult film'),
  ('tollywood-songs', 'Kevvu Keka', 'Mass song from a blockbuster action film'),
  ('tollywood-songs', 'Nee Kannu Neeli Samudram', 'Romantic melody from a comedy film'),
  ('tollywood-songs', 'Kurchi Madathapetti', 'Mass beat song from a recent action film'),
  ('tollywood-songs', 'Chuttamalle', 'Romantic song from a recent blockbuster'),
  ('tollywood-songs', 'Oosupodu', 'Emotional song from a family drama'),
  ('tollywood-songs', 'Samayama', 'Beautiful melody from a family drama'),
  ('tollywood-songs', 'Neeli Neeli Aakasam', 'Emotional song from a patriotic film'),
  ('tollywood-songs', 'Priyathama Priyathama', 'Romantic melody from a love story'),
  ('tollywood-songs', 'Arere Ye Pilla', 'Catchy song from a successful film'),
  ('tollywood-songs', 'Pilla Puli', 'Energetic song from a comedy film'),
  ('tollywood-songs', 'Ekkada Ekkada', 'Catchy beat song from a comedy film'),
  ('tollywood-songs', 'Meghale Lekha', 'Romantic song from a romantic comedy'),
  ('tollywood-songs', 'Dil Mein Chhupa Loonga', 'Romantic song from a family drama'),
  ('tollywood-songs', 'Yenti Yenti', 'Melodic song from a romantic film'),
  ('tollywood-songs', 'Nuvve Nuvve', 'Classic romantic melody'),
  ('tollywood-songs', 'Manasu Palike', 'Emotional song from a family drama'),
  ('tollywood-songs', 'Nenena', 'Romantic song from a successful film'),
  ('tollywood-songs', 'Potti Pilla', 'Folk-style song from a comedy film'),
  ('tollywood-songs', 'Gudilo Badilo', 'Energetic dance song from a romantic film'),
  ('tollywood-songs', 'Rangasthalam', 'Title song from a blockbuster period film'),
  ('tollywood-songs', 'Jigelu Rani', 'Mass song from a blockbuster action film')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-music', 'Tollywood Music Directors', '🎼', 'Tollywood', 'hard')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('tollywood-music', 'Devi Sri Prasad', 'Popular music composer known for mass beat songs in Telugu cinema'),
  ('tollywood-music', 'MM Keeravani', 'Oscar-winning composer known for epic film scores'),
  ('tollywood-music', 'Thaman S', 'Music director known for his mass beat compositions'),
  ('tollywood-music', 'Anirudh Ravichander', 'Popular composer who has worked in multiple Indian film industries'),
  ('tollywood-music', 'Ilaiyaraaja', 'Legendary composer with thousands of film songs to his credit'),
  ('tollywood-music', 'Mani Sharma', 'Composer known for his melodies in 90s and 2000s films'),
  ('tollywood-music', 'Mickey J Meyer', 'Composer known for romantic melodies in Telugu cinema'),
  ('tollywood-music', 'Gopi Sundar', 'Composer who has worked in multiple Indian languages'),
  ('tollywood-music', 'Ravi Basrur', 'Composer known for his intense background scores'),
  ('tollywood-music', 'SP Balasubrahmanyam', 'Legendary singer and composer with thousands of songs'),
  ('tollywood-music', 'Shreya Ghoshal', 'Leading playback singer with numerous hit songs'),
  ('tollywood-music', 'Geetha Madhuri', 'Singer known for her mass songs in Telugu cinema'),
  ('tollywood-music', 'Sid Sriram', 'Singer known for his romantic melodies and classical fusion'),
  ('tollywood-music', 'Hemachandra', 'Singer and composer known for his work in Telugu cinema'),
  ('tollywood-music', 'Anup Rubens', 'Composer known for romantic melodies in Telugu films'),
  ('tollywood-music', 'Vishal Chandrasekhar', 'Composer who has worked in Tamil and Telugu cinema'),
  ('tollywood-music', 'Pradeep Kumar', 'Singer known for his romantic songs'),
  ('tollywood-music', 'Ramya Behara', 'Singer known for her work in Telugu cinema'),
  ('tollywood-music', 'Karthik', 'Singer known for his work in multiple Indian languages'),
  ('tollywood-music', 'Sunidhi Chauhan', 'Leading playback singer known for her energetic songs')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-directors', 'Tollywood Directors', '🎬', 'Tollywood', 'hard')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('tollywood-directors', 'SS Rajamouli', 'Director known for epic films that achieved international recognition'),
  ('tollywood-directors', 'Trivikram Srinivas', 'Director known for his witty dialogues and family entertainers'),
  ('tollywood-directors', 'Sukumar', 'Director known for his intelligent screenplays and unique storytelling'),
  ('tollywood-directors', 'Puri Jagannadh', 'Director known for mass action films and gangster dramas'),
  ('tollywood-directors', 'Koratala Siva', 'Director known for films with social messages and mass appeal'),
  ('tollywood-directors', 'Harish Shankar', 'Director known for mass entertainers with comedy elements'),
  ('tollywood-directors', 'Anil Ravipudi', 'Director known for comedy entertainers and family films'),
  ('tollywood-directors', 'Vamshi Paidipally', 'Director known for versatile films across genres'),
  ('tollywood-directors', 'Nag Ashwin', 'Director known for biographical films and ambitious projects'),
  ('tollywood-directors', 'Sandeep Reddy Vanga', 'Director known for raw and intense emotional dramas'),
  ('tollywood-directors', 'Ram Gopal Varma', 'Director known for revolutionizing Indian cinema with gangster films'),
  ('tollywood-directors', 'K Viswanath', 'Legendary director known for artistic films with classical themes'),
  ('tollywood-directors', 'K Raghavendra Rao', 'Legendary director known for commercial cinema with devotional themes'),
  ('tollywood-directors', 'Dasari Narayana Rao', 'Legendary director known for films with social messages'),
  ('tollywood-directors', 'Prashanth Neel', 'Director known for high-octane action films'),
  ('tollywood-directors', 'Bapu', 'Legendary director known for artistic films in the golden era'),
  ('tollywood-directors', 'Jandhyala', 'Legendary director known for comedy films'),
  ('tollywood-directors', 'Vamsi', 'Director known for his unique artistic style in the 80s-90s'),
  ('tollywood-directors', 'Krish Jagarlamudi', 'Director known for patriotic and historical films'),
  ('tollywood-directors', 'Hanu Raghavapudi', 'Director known for romantic dramas with unique storytelling'),
  ('tollywood-directors', 'Vivek Athreya', 'Director known for intelligent and unconventional films'),
  ('tollywood-directors', 'Maruthi', 'Director known for comedy entertainers')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-pairs', 'Iconic Telugu Pairs', '💞', 'Tollywood', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('tollywood-pairs', 'Prabhas & Anushka', 'Popular on-screen couple from a epic film series'),
  ('tollywood-pairs', 'Jr NTR & Samantha', 'On-screen pairing from a blockbuster action film'),
  ('tollywood-pairs', 'Mahesh Babu & Trisha', 'Popular romantic pairing from a successful film'),
  ('tollywood-pairs', 'Allu Arjun & Pooja Hegde', 'On-screen couple from a hit family drama'),
  ('tollywood-pairs', 'Naga Chaitanya & Samantha', 'Real-life couple who acted together in films'),
  ('tollywood-pairs', 'Chiranjeevi & Radhika', 'Popular pairing from 90s Telugu cinema'),
  ('tollywood-pairs', 'Venkatesh & Meena', 'Popular romantic pairing from family entertainers'),
  ('tollywood-pairs', 'Nagarjuna & Tabu', 'Successful on-screen pairing from the 90s'),
  ('tollywood-pairs', 'Pawan Kalyan & Ileana', 'Popular pairing from successful action films'),
  ('tollywood-pairs', 'Nani & Nithya Menen', 'On-screen couple known for romantic chemistry'),
  ('tollywood-pairs', 'Ram Charan & Rakul Preet Singh', 'On-screen pairing from an action film'),
  ('tollywood-pairs', 'Ravi Teja & Ileana', 'Popular pairing from a successful action comedy'),
  ('tollywood-pairs', 'Balakrishna & Simran', 'Popular pairing from 90s action films'),
  ('tollywood-pairs', 'Adivi Sesh & Aditi Rao', 'On-screen couple from a patriotic film'),
  ('tollywood-pairs', 'Vijay Deverakonda & Rashmika', 'Popular pairing from romantic comedies'),
  ('tollywood-pairs', 'Sai Dharam Tej & Anupama', 'On-screen couple from a romantic film')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('cricket-legends', 'Cricket Legends', '🏏', 'Cricket', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('cricket-legends', 'Sachin Tendulkar', 'Legendary cricketer known as the God of Cricket with numerous records'),
  ('cricket-legends', 'MS Dhoni', 'Captain Cool who led India to multiple World Cup victories'),
  ('cricket-legends', 'Virat Kohli', 'Modern batting superstar known for his chase master abilities'),
  ('cricket-legends', 'Kapil Dev', 'Former captain who led India to its first World Cup win'),
  ('cricket-legends', 'Rohit Sharma', 'Current captain known for his ability to score big centuries'),
  ('cricket-legends', 'Sourav Ganguly', 'Former captain known as the Prince of Kolkata'),
  ('cricket-legends', 'Rahul Dravid', 'Known as The Wall for his dependable batting'),
  ('cricket-legends', 'Yuvraj Singh', 'All-rounder famous for hitting six sixes in an over'),
  ('cricket-legends', 'Anil Kumble', 'Legendary spinner who took 10 wickets in an innings'),
  ('cricket-legends', 'Virender Sehwag', 'Destructive opener known for his aggressive batting'),
  ('cricket-legends', 'Jasprit Bumrah', 'Current fast bowler known for his yorkers and death bowling'),
  ('cricket-legends', 'Hardik Pandya', 'All-rounder known for his finishing abilities'),
  ('cricket-legends', 'Ravindra Jadeja', 'All-rounder known for his fielding and left-arm spin'),
  ('cricket-legends', 'Sunil Gavaskar', 'Legendary opener who was the first to score 10000 runs'),
  ('cricket-legends', 'VVS Laxman', 'Elegant batsman known for his famous innings against Australia'),
  ('cricket-legends', 'Harbhajan Singh', 'Off-spinner known for his hat-trick against Australia'),
  ('cricket-legends', 'Zaheer Khan', 'Left-arm pacer who was instrumental in India''s World Cup win'),
  ('cricket-legends', 'Shubman Gill', 'Young batting sensation known for his elegant strokeplay'),
  ('cricket-legends', 'KL Rahul', 'Wicketkeeper-batsman known for his elegant batting'),
  ('cricket-legends', 'Rishabh Pant', 'Aggressive wicketkeeper-batsman known for his match-winning knocks'),
  ('cricket-legends', 'Smriti Mandhana', 'Leading Indian women''s cricketer and opener'),
  ('cricket-legends', 'Mithali Raj', 'Legendary Indian women''s cricketer and former captain'),
  ('cricket-legends', 'Gautam Gambhir', 'Opener who played crucial roles in World Cup wins'),
  ('cricket-legends', 'Irfan Pathan', 'Swing bowler who was instrumental in India''s early 2000s success'),
  ('cricket-legends', 'Yusuf Pathan', 'Hard-hitting all-rounder known for his aggressive batting'),
  ('cricket-legends', 'Suresh Raina', 'Middle-order batsman known for his finishing abilities'),
  ('cricket-legends', 'Mohammed Shami', 'Fast bowler known for his swing and seam bowling'),
  ('cricket-legends', 'Ishant Sharma', 'Tall fast bowler with experience in Test cricket'),
  ('cricket-legends', 'Cheteshwar Pujara', 'Test specialist known for his solid batting technique'),
  ('cricket-legends', 'Ajinkya Rahane', 'Test batsman known for his overseas performances'),
  ('cricket-legends', 'R Ashwin', 'Off-spinner and all-rounder with numerous Test wickets'),
  ('cricket-legends', 'Ravichandran Ashwin', 'Leading spinner known for his variations and batting'),
  ('cricket-legends', 'Mohammed Siraj', 'Fast bowler who rose through domestic cricket'),
  ('cricket-legends', 'Shreyas Iyer', 'Middle-order batsman known for his elegant batting'),
  ('cricket-legends', 'Sanju Samson', 'Wicketkeeper-batsman known for his aggressive batting'),
  ('cricket-legends', 'Shikhar Dhawan', 'Opener known for his stylish batting and performances in ICC tournaments')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('ipl', 'IPL Fever', '🏆', 'Cricket', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('ipl', 'Mumbai Indians', 'Five-time IPL champions owned by a business conglomerate'),
  ('ipl', 'Chennai Super Kings', 'Five-time IPL champions known for their consistent performance'),
  ('ipl', 'Royal Challengers Bengaluru', 'Popular franchise that has never won the IPL title'),
  ('ipl', 'Kolkata Knight Riders', 'Two-time champions owned by a Bollywood superstar'),
  ('ipl', 'Sunrisers Hyderabad', '2016 champions known for their orange jersey'),
  ('ipl', 'Rajasthan Royals', 'Inaugural champions known as underdogs'),
  ('ipl', 'Delhi Capitals', 'Delhi franchise that rebranded from Daredevils'),
  ('ipl', 'Punjab Kings', 'Franchise that was previously known as Kings XI Punjab'),
  ('ipl', 'Gujarat Titans', 'New franchise that won the title in their debut season'),
  ('ipl', 'Lucknow Super Giants', 'New franchise from the city of Nawabs'),
  ('ipl', 'Orange Cap', 'Award given to the highest run-scorer in IPL season'),
  ('ipl', 'Purple Cap', 'Award given to the highest wicket-taker in IPL season'),
  ('ipl', 'Super Over', 'Tie-breaker mechanism used in T20 cricket'),
  ('ipl', 'Strategic Timeout', 'Mandatory break during an IPL innings for strategy'),
  ('ipl', 'Wankhede Stadium', 'Mumbai''s iconic cricket stadium known for high-scoring matches'),
  ('ipl', 'Chepauk', 'Chennai''s historic cricket stadium'),
  ('ipl', 'Eden Gardens', 'Kolkata''s iconic cricket stadium'),
  ('ipl', 'Chinnaswamy Stadium', 'Bengaluru''s cricket stadium known for its batting-friendly pitch'),
  ('ipl', 'Auction', 'Annual event where teams bid for players'),
  ('ipl', 'Hat-trick', 'Bowling achievement of taking three wickets in consecutive balls')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('cricket-moments', 'Cricket Moments', '🎯', 'Cricket', 'hard')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('cricket-moments', '2011 World Cup Final', 'Historic cricket final where India won after a long wait'),
  ('cricket-moments', 'Dhoni''s Helicopter Shot', 'Signature batting technique that became very popular'),
  ('cricket-moments', 'Yuvraj''s Six Sixes', 'Rare cricketing achievement in a World Cup match'),
  ('cricket-moments', 'Sachin''s 100th Century', 'Milestone achievement by a legendary batsman'),
  ('cricket-moments', '2007 T20 World Cup', 'First T20 World Cup that India won unexpectedly'),
  ('cricket-moments', 'Kohli''s Chase Masterclass', 'Famous batting performance while chasing a target'),
  ('cricket-moments', 'Gabba 2021', 'Historic Test victory by India in Australia'),
  ('cricket-moments', 'NatWest Final 2002', 'Memorable chase where the captain celebrated uniquely'),
  ('cricket-moments', 'Sehwag''s Triple Century', 'Massive score by an aggressive opener'),
  ('cricket-moments', 'Kumble''s 10 Wickets', 'Rare bowling achievement in Test cricket'),
  ('cricket-moments', 'Miandad''s Last Ball Six', 'Famous last-ball finish in cricket history'),
  ('cricket-moments', 'Slower Ball', 'Bowling variation used to deceive batsmen'),
  ('cricket-moments', 'Reverse Swing', 'Bowling technique where the ball swings in opposite direction'),
  ('cricket-moments', 'Doosra', 'Special delivery from an off-spinner that spins the other way'),
  ('cricket-moments', 'Nightwatchman', 'Tactical batting position used in Test cricket'),
  ('cricket-moments', 'Duckworth Lewis', 'Method used to calculate targets in rain-affected matches'),
  ('cricket-moments', 'Powerplay', 'Fielding restrictions in limited overs cricket'),
  ('cricket-moments', 'Third Umpire', 'Umpire who reviews decisions using technology'),
  ('cricket-moments', 'Leg Glance', 'Classic batting shot played on the leg side'),
  ('cricket-moments', 'Cover Drive', 'Elegant batting shot played through the off side'),
  ('cricket-moments', 'Pull Shot', 'Aggressive batting shot played on the back foot'),
  ('cricket-moments', 'Square Cut', 'Batting shot played through the off side on the back foot'),
  ('cricket-moments', 'Slog Sweep', 'Aggressive batting shot used in limited overs cricket'),
  ('cricket-moments', 'Yorker', 'Delivery aimed at the batsman''s feet'),
  ('cricket-moments', 'Bouncer', 'Short-pitched delivery aimed at the batsman''s head'),
  ('cricket-moments', 'Googly', 'Delivery from a leg-spinner that spins the other way'),
  ('cricket-moments', 'Carrom Ball', 'Special delivery from a finger spinner')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('indian-sports', 'Indian Sports Icons', '🥇', 'Sports', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('indian-sports', 'Neeraj Chopra', 'Olympic gold medalist in javelin throw, first Indian in athletics'),
  ('indian-sports', 'PV Sindhu', 'Badminton player who won Olympic medal and world championship'),
  ('indian-sports', 'Saina Nehwal', 'Former world number one badminton player and Olympic medalist'),
  ('indian-sports', 'Mary Kom', 'Legendary boxer with multiple world championships'),
  ('indian-sports', 'Milkha Singh', 'Legendary sprinter known as the Flying Sikh'),
  ('indian-sports', 'PT Usha', 'Legendary track and field athlete known as Payyoli Express'),
  ('indian-sports', 'Abhinav Bindra', 'First Indian individual Olympic gold medalist in shooting'),
  ('indian-sports', 'Sania Mirza', 'Former world number one in doubles tennis'),
  ('indian-sports', 'Viswanathan Anand', 'Former world chess champion known as the Tiger of Madras'),
  ('indian-sports', 'Gukesh D', 'Young chess grandmaster who challenged for world championship'),
  ('indian-sports', 'Major Dhyan Chand', 'Legendary hockey player with three Olympic gold medals'),
  ('indian-sports', 'Sunil Chhetri', 'Indian football captain and leading goal scorer'),
  ('indian-sports', 'Bajrang Punia', 'Wrestler who won Olympic medal and world championship'),
  ('indian-sports', 'Mirabai Chanu', 'Weightlifter who won Olympic silver medal'),
  ('indian-sports', 'Pro Kabaddi', 'Professional kabaddi league in India'),
  ('indian-sports', 'Kho Kho', 'Traditional Indian tag team sport'),
  ('indian-sports', 'Hockey India', 'Indian national hockey team that won Olympic bronze'),
  ('indian-sports', 'Lakshya Sen', 'Young badminton player who was part of Thomas Cup winning team'),
  ('indian-sports', 'Praggnanandhaa', 'Young chess grandmaster who defeated world champion'),
  ('indian-sports', 'Leander Paes', 'Tennis player with multiple Grand Slam doubles titles'),
  ('indian-sports', 'Mahesh Bhupathi', 'Tennis player with multiple Grand Slam doubles titles'),
  ('indian-sports', 'Rohit Sharma', 'Indian cricket captain and opening batsman'),
  ('indian-sports', 'Kidambi Srikanth', 'Badminton player who was world number one'),
  ('indian-sports', 'Satwiksairaj Rankireddy', 'Badminton player known for doubles success'),
  ('indian-sports', 'Chirag Shetty', 'Badminton player known for doubles success'),
  ('indian-sports', 'Vinesh Phogat', 'Wrestler who won multiple international medals'),
  ('indian-sports', 'Bajrang Punia', 'Wrestler with Olympic and World Championship medals'),
  ('indian-sports', 'Ravi Kumar Dahiya', 'Wrestler who won Olympic silver medal'),
  ('indian-sports', 'Deepika Kumari', 'Archer who was world number one')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('street-food', 'Street Food', '🥘', 'Food', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('street-food', 'Pani Puri', 'Popular street food consisting of crispy hollow puris with spicy water'),
  ('street-food', 'Vada Pav', 'Mumbai''s popular street food similar to a burger'),
  ('street-food', 'Pav Bhaji', 'Spicy vegetable mash served with bread, popular in Mumbai'),
  ('street-food', 'Bhel Puri', 'Snack made with puffed rice and vegetables'),
  ('street-food', 'Samosa', 'Triangular pastry filled with spiced potatoes'),
  ('street-food', 'Kachori', 'Fried pastry filled with lentils or spices'),
  ('street-food', 'Chole Bhature', 'North Indian dish of chickpea curry with fried bread'),
  ('street-food', 'Momos', 'Steamed dumplings popular in North India'),
  ('street-food', 'Dahi Puri', 'Variation of pani puri with yogurt instead of water'),
  ('street-food', 'Aloo Tikki', 'Potato patties popular as street food'),
  ('street-food', 'Sev Puri', 'Puri topped with sev and chutneys'),
  ('street-food', 'Frankie', 'Roll filled with various ingredients, popular in Mumbai'),
  ('street-food', 'Kathi Roll', 'Wrap filled with meat or vegetables, originated in Kolkata'),
  ('street-food', 'Dabeli', 'Spicy potato filling in a bun, popular in Gujarat'),
  ('street-food', 'Misal Pav', 'Spicy curry served with bread, popular in Maharashtra'),
  ('street-food', 'Jhal Muri', 'Spicy puffed rice snack from Bengal'),
  ('street-food', 'Litti Chokha', 'Traditional dish from Bihar made with wheat balls'),
  ('street-food', 'Pakora', 'Fried fritters made with vegetables and gram flour'),
  ('street-food', 'Bread Pakoda', 'Bread stuffed with potato and fried'),
  ('street-food', 'Egg Roll', 'Wrap filled with egg and vegetables, popular in Kolkata'),
  ('street-food', 'Chaat', 'Savory snack popular across India'),
  ('street-food', 'Papdi Chaat', 'Crispy flatbreads topped with yogurt and chutneys'),
  ('street-food', 'Aloo Chaat', 'Spiced potato snack popular in North India'),
  ('street-food', 'Dahi Vada', 'Fried lentil dumplings soaked in yogurt'),
  ('street-food', 'Kachori Sabzi', 'Fried pastry served with potato curry'),
  ('street-food', 'Maggi', 'Instant noodles popular as street food'),
  ('street-food', 'Spring Roll', 'Fried roll filled with vegetables'),
  ('street-food', 'Momos Chutney', 'Spicy chutney served with momos'),
  ('street-food', 'Tandoori Momos', 'Momos cooked in tandoor with spices')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('south-food', 'South Indian Food', '🍛', 'Food', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('south-food', 'Masala Dosa', 'Crispy crepe served with spiced potato filling'),
  ('south-food', 'Idli', 'Steamed rice cakes, a popular South Indian breakfast'),
  ('south-food', 'Vada', 'Fried lentil donut, often served with chutney'),
  ('south-food', 'Uttapam', 'Thick pancake topped with vegetables'),
  ('south-food', 'Pongal', 'Rice and lentil dish, associated with a harvest festival'),
  ('south-food', 'Upma', 'Semolina dish, popular as breakfast'),
  ('south-food', 'Bisi Bele Bath', 'Spicy rice and lentil dish from Karnataka'),
  ('south-food', 'Hyderabadi Biryani', 'Aromatic rice dish with meat, famous in Hyderabad'),
  ('south-food', 'Rasam', 'Tangy soup made with tamarind and tomatoes'),
  ('south-food', 'Sambar', 'Lentil and vegetable stew, staple in South Indian cuisine'),
  ('south-food', 'Appam', 'Fermented rice pancake, popular in Kerala'),
  ('south-food', 'Puttu', 'Steamed rice cake cylinder, popular in Kerala'),
  ('south-food', 'Chettinad Chicken', 'Spicy chicken curry from Tamil Nadu'),
  ('south-food', 'Filter Coffee', 'Traditional South Indian coffee preparation'),
  ('south-food', 'Pesarattu', 'Green gram dosa, popular in Andhra Pradesh'),
  ('south-food', 'Neer Dosa', 'Thin watery dosa, popular in Karnataka'),
  ('south-food', 'Avial', 'Mixed vegetable curry with coconut'),
  ('south-food', 'Kerala Parotta', 'Layered flatbread, popular in Kerala'),
  ('south-food', 'Curd Rice', 'Rice mixed with yogurt, comfort food'),
  ('south-food', 'Rava Kesari', 'Semolina dessert with orange color'),
  ('south-food', 'Medu Vada', 'Fried lentil fritter, crispy outside and soft inside'),
  ('south-food', 'Ghee Roast', 'Dosa cooked with generous ghee'),
  ('south-food', 'Set Dosa', 'Soft, thick dosa served as a set'),
  ('south-food', 'Onion Rava Dosa', 'Semolina dosa topped with onions'),
  ('south-food', 'Mysore Bonda', 'Fried lentil fritter from Karnataka'),
  ('south-food', 'Puliogare', 'Tamarind rice dish from Karnataka'),
  ('south-food', 'Lemon Rice', 'Rice flavored with lemon juice'),
  ('south-food', 'Coconut Rice', 'Rice flavored with coconut'),
  ('south-food', 'Tamarind Rice', 'Rice flavored with tamarind')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('sweets', 'Indian Sweets', '🍮', 'Food', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('sweets', 'Gulab Jamun', 'Deep-fried milk balls soaked in sugar syrup'),
  ('sweets', 'Rasgulla', 'Spongy cottage cheese balls in sugar syrup'),
  ('sweets', 'Jalebi', 'Crispy spiral sweets soaked in sugar syrup'),
  ('sweets', 'Ladoo', 'Round sweet balls made with various ingredients'),
  ('sweets', 'Barfi', 'Milk-based fudge cut into diamond shapes'),
  ('sweets', 'Kaju Katli', 'Cashew fudge, popular during festivals'),
  ('sweets', 'Rasmalai', 'Cottage cheese dumplings in creamed milk'),
  ('sweets', 'Kheer', 'Rice pudding made with milk and sugar'),
  ('sweets', 'Gajar Ka Halwa', 'Carrot pudding made with ghee and nuts'),
  ('sweets', 'Mysore Pak', 'Ghee-based sweet from Karnataka'),
  ('sweets', 'Soan Papdi', 'Flaky sweet made with gram flour and ghee'),
  ('sweets', 'Peda', 'Milk-based sweet with various flavors'),
  ('sweets', 'Modak', 'Sweet dumpling associated with a Hindu deity'),
  ('sweets', 'Sandesh', 'Bengali sweet made with cottage cheese'),
  ('sweets', 'Kulfi', 'Indian ice cream made with condensed milk'),
  ('sweets', 'Malpua', 'Fried pancake soaked in sugar syrup'),
  ('sweets', 'Ghevar', 'Rajasthani sweet with honeycomb texture'),
  ('sweets', 'Basundi', 'Sweetened thickened milk from Maharashtra'),
  ('sweets', 'Payasam', 'South Indian rice pudding'),
  ('sweets', 'Balushahi', 'Fried glazed sweet from North India')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('festivals', 'Festivals of India', '🪔', 'Festivals', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('festivals', 'Diwali', 'Festival of lights celebrated with lamps and fireworks'),
  ('festivals', 'Holi', 'Festival of colors celebrated with colored powders'),
  ('festivals', 'Pongal', 'Harvest festival celebrated in Tamil Nadu'),
  ('festivals', 'Onam', 'Harvest festival celebrated in Kerala with a grand feast'),
  ('festivals', 'Ugadi', 'New Year festival celebrated in Andhra and Karnataka'),
  ('festivals', 'Ganesh Chaturthi', 'Festival celebrating the elephant-headed god'),
  ('festivals', 'Durga Puja', 'Festival celebrating the goddess Durga, popular in Bengal'),
  ('festivals', 'Navratri', 'Nine-night festival dedicated to goddess worship'),
  ('festivals', 'Raksha Bandhan', 'Festival celebrating brother-sister bond'),
  ('festivals', 'Eid', 'Islamic festival celebrated at the end of Ramadan'),
  ('festivals', 'Christmas', 'Christian festival celebrating the birth of Jesus'),
  ('festivals', 'Baisakhi', 'Harvest festival celebrated in Punjab'),
  ('festivals', 'Lohri', 'Winter festival celebrated in Punjab'),
  ('festivals', 'Makar Sankranti', 'Harvest festival celebrated with kite flying'),
  ('festivals', 'Janmashtami', 'Festival celebrating the birth of Krishna'),
  ('festivals', 'Karva Chauth', 'Fasting festival observed by married women'),
  ('festivals', 'Chhath Puja', 'Sun worship festival celebrated in Bihar'),
  ('festivals', 'Ram Navami', 'Festival celebrating the birth of Rama'),
  ('festivals', 'Maha Shivaratri', 'Festival dedicated to Lord Shiva'),
  ('festivals', 'Gudi Padwa', 'New Year festival celebrated in Maharashtra')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('monuments', 'Monuments & Wonders', '🕌', 'Places', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('monuments', 'Taj Mahal', 'White marble mausoleum, symbol of love, UNESCO World Heritage Site'),
  ('monuments', 'Red Fort', 'Historic fort in Delhi, symbol of Mughal architecture'),
  ('monuments', 'Qutub Minar', 'Tallest brick minaret in India, UNESCO World Heritage Site'),
  ('monuments', 'Gateway of India', 'Iconic monument in Mumbai overlooking the harbor'),
  ('monuments', 'India Gate', 'War memorial in Delhi honoring Indian soldiers'),
  ('monuments', 'Hawa Mahal', 'Palace with honeycomb facade in Jaipur'),
  ('monuments', 'Charminar', 'Historic monument with four minarets in Hyderabad'),
  ('monuments', 'Mysore Palace', 'Indo-Saracenic palace known for its architecture'),
  ('monuments', 'Golden Temple', 'Holiest gurdwara in Sikhism, located in Amritsar'),
  ('monuments', 'Konark Sun Temple', 'Sun temple shaped like a chariot, UNESCO World Heritage Site'),
  ('monuments', 'Ajanta Caves', 'Ancient Buddhist caves with paintings, UNESCO World Heritage Site'),
  ('monuments', 'Ellora Caves', 'Rock-cut caves with temples, UNESCO World Heritage Site'),
  ('monuments', 'Hampi', 'Ancient ruins of Vijayanagara Empire, UNESCO World Heritage Site'),
  ('monuments', 'Meenakshi Temple', 'Historic temple in Madurai dedicated to goddess Meenakshi'),
  ('monuments', 'Victoria Memorial', 'Marble monument in Kolkata built during British era'),
  ('monuments', 'Amer Fort', 'Fortress in Jaipur known for its artistic elements'),
  ('monuments', 'Sanchi Stupa', 'Ancient Buddhist monument, UNESCO World Heritage Site'),
  ('monuments', 'Statue of Unity', 'World''s tallest statue, located in Gujarat'),
  ('monuments', 'Lotus Temple', 'Bahá''í House of Worship shaped like a lotus flower'),
  ('monuments', 'Khajuraho', 'Temple complex known for its intricate sculptures'),
  ('monuments', 'Jallianwala Bagh', 'Historic garden and memorial in Amritsar'),
  ('monuments', 'Cellular Jail', 'Colonial prison in Andaman and Nicobar Islands'),
  ('monuments', 'Brihadeeswarar Temple', 'Chola dynasty temple in Tamil Nadu'),
  ('monuments', 'Sun Temple Konark', '13th-century Sun temple in Odisha'),
  ('monuments', 'Fatehpur Sikri', 'Abandoned Mughal city near Agra'),
  ('monuments', 'Jantar Mantar', 'Astronomical observatory in Jaipur'),
  ('monuments', 'City Palace', 'Royal palace complex in Jaipur'),
  ('monuments', 'Udaipur Palace', 'Lake palace in Udaipur'),
  ('monuments', 'Golconda Fort', 'Historic fort in Hyderabad')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tourist-places', 'Tourist Places', '🏔️', 'Places', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('tourist-places', 'Goa', 'Popular tourist destination known for its beaches and nightlife'),
  ('tourist-places', 'Manali', 'Hill station in Himachal Pradesh known for adventure sports'),
  ('tourist-places', 'Ooty', 'Queen of Hills, hill station in Tamil Nadu'),
  ('tourist-places', 'Munnar', 'Hill station in Kerala known for tea plantations'),
  ('tourist-places', 'Shimla', 'Capital of Himachal Pradesh, popular hill station'),
  ('tourist-places', 'Darjeeling', 'Hill station in West Bengal known for tea'),
  ('tourist-places', 'Ladakh', 'Himalayan region known for monasteries and adventure'),
  ('tourist-places', 'Rishikesh', 'Spiritual town known for yoga and adventure sports'),
  ('tourist-places', 'Varanasi', 'Ancient city on the banks of Ganges, spiritual center'),
  ('tourist-places', 'Jaipur', 'Pink City, known for forts and palaces'),
  ('tourist-places', 'Udaipur', 'City of Lakes, known for lakes and palaces'),
  ('tourist-places', 'Kodaikanal', 'Hill station in Tamil Nadu known for its scenic beauty'),
  ('tourist-places', 'Coorg', 'Hill station in Karnataka known for coffee plantations'),
  ('tourist-places', 'Andaman Islands', 'Island archipelago known for beaches and coral reefs'),
  ('tourist-places', 'Rann of Kutch', 'White desert in Gujarat, known for Rann Utsav'),
  ('tourist-places', 'Kashmir', 'Paradise on Earth, known for Dal Lake and mountains'),
  ('tourist-places', 'Pondicherry', 'Former French colony known for beaches and spirituality'),
  ('tourist-places', 'Mahabalipuram', 'Coastal town known for rock-cut temples'),
  ('tourist-places', 'Khajjiar', 'Hill station in Himachal Pradesh called Mini Switzerland'),
  ('tourist-places', 'Araku Valley', 'Hill station in Andhra Pradesh known for coffee'),
  ('tourist-places', 'Gangtok', 'Capital of Sikkim, known for monasteries'),
  ('tourist-places', 'Shillong', 'Capital of Meghalaya, known as Scotland of the East'),
  ('tourist-places', 'Mysore', 'City known for palaces and Dasara festival'),
  ('tourist-places', 'Hampi', 'UNESCO World Heritage Site with ancient ruins'),
  ('tourist-places', 'Agra', 'City known for Taj Mahal'),
  ('tourist-places', 'Delhi', 'Capital of India with historic monuments'),
  ('tourist-places', 'Mumbai', 'Financial capital of India'),
  ('tourist-places', 'Bangalore', 'IT hub of India'),
  ('tourist-places', 'Chennai', 'Capital of Tamil Nadu, cultural center')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('states-capitals', 'States & Cities', '🗺️', 'Places', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('states-capitals', 'Mumbai', 'Financial capital of India, home to Bollywood'),
  ('states-capitals', 'Delhi', 'Capital of India, known for its historical monuments'),
  ('states-capitals', 'Bengaluru', 'IT hub of India, known as Silicon Valley of India'),
  ('states-capitals', 'Hyderabad', 'Capital of Telangana, known for IT and biryani'),
  ('states-capitals', 'Chennai', 'Capital of Tamil Nadu, known for its culture and beaches'),
  ('states-capitals', 'Kolkata', 'Cultural capital of India, known for literature and art'),
  ('states-capitals', 'Kerala', 'State known as God''s Own Country, famous for backwaters'),
  ('states-capitals', 'Rajasthan', 'State known for deserts, forts, and palaces'),
  ('states-capitals', 'Punjab', 'State known for agriculture and Golden Temple'),
  ('states-capitals', 'Gujarat', 'State known for Gir lions and business'),
  ('states-capitals', 'Tamil Nadu', 'State known for temples and classical arts'),
  ('states-capitals', 'Telangana', 'Youngest state in India, known for Hyderabad'),
  ('states-capitals', 'Uttar Pradesh', 'Most populous state, home to Taj Mahal'),
  ('states-capitals', 'West Bengal', 'State known for culture, literature, and sweets'),
  ('states-capitals', 'Assam', 'State known for tea gardens and one-horned rhinos'),
  ('states-capitals', 'Sikkim', 'Himalayan state known for organic farming'),
  ('states-capitals', 'Ahmedabad', 'Largest city in Gujarat, known for textiles'),
  ('states-capitals', 'Lucknow', 'City known for its cuisine and etiquette'),
  ('states-capitals', 'Chandigarh', 'Planned city, capital of Punjab and Haryana'),
  ('states-capitals', 'Bhopal', 'Capital of Madhya Pradesh, known as City of Lakes'),
  ('states-capitals', 'Pune', 'City in Maharashtra known for education and IT'),
  ('states-capitals', 'Surat', 'City in Gujarat known for textiles and diamonds'),
  ('states-capitals', 'Jaipur', 'Pink City, capital of Rajasthan'),
  ('states-capitals', 'Lucknow', 'City of Nawabs, capital of Uttar Pradesh'),
  ('states-capitals', 'Kanpur', 'Industrial city in Uttar Pradesh'),
  ('states-capitals', 'Nagpur', 'Orange City, major city in Maharashtra'),
  ('states-capitals', 'Indore', 'Commercial capital of Madhya Pradesh'),
  ('states-capitals', 'Patna', 'Capital of Bihar, ancient city'),
  ('states-capitals', 'Ranchi', 'Capital of Jharkhand')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('ramayana', 'Ramayana', '🏹', 'Mythology', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('ramayana', 'Rama', 'Seventh avatar of Vishnu, ideal king in Hindu mythology'),
  ('ramayana', 'Sita', 'Wife of Rama, avatar of Lakshmi, ideal woman in Hindu texts'),
  ('ramayana', 'Lakshmana', 'Rama''s devoted brother who accompanied him to exile'),
  ('ramayana', 'Hanuman', 'Monkey god and devotee of Rama, symbol of strength and devotion'),
  ('ramayana', 'Ravana', 'Demon king who abducted Sita, antagonist in Ramayana'),
  ('ramayana', 'Bharata', 'Rama''s brother who ruled the kingdom in his absence'),
  ('ramayana', 'Ayodhya', 'Birthplace of Rama, holy city in Hinduism'),
  ('ramayana', 'Lanka', 'Kingdom of Ravana, modern-day Sri Lanka'),
  ('ramayana', 'Vanvas', 'Fourteen-year exile of Rama, Sita, and Lakshmana'),
  ('ramayana', 'Swayamvar', 'Marriage ceremony where Sita chose her husband'),
  ('ramayana', 'Pushpaka Vimana', 'Flying chariot used by Rama to return to his kingdom'),
  ('ramayana', 'Sanjeevani', 'Herb that revived Lakshmana when he was injured'),
  ('ramayana', 'Jatayu', 'Vulture king who tried to save Sita from Ravana'),
  ('ramayana', 'Sugriva', 'Monkey king who helped Rama in his quest'),
  ('ramayana', 'Vibhishana', 'Ravana''s brother who helped Rama'),
  ('ramayana', 'Kumbhakarna', 'Ravana''s brother known for sleeping for six months'),
  ('ramayana', 'Shabari', 'Devoted woman who fed Rama during his exile'),
  ('ramayana', 'Ram Setu', 'Bridge built by Rama''s army to reach Lanka'),
  ('ramayana', 'Panchavati', 'Forest where Rama, Sita, and Lakshmana lived during exile'),
  ('ramayana', 'Agni Pariksha', 'Fire test that Sita underwent to prove her purity')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('mahabharata', 'Mahabharata', '⚔️', 'Mythology', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('mahabharata', 'Arjuna', 'Master archer and warrior, one of the Pandava brothers'),
  ('mahabharata', 'Krishna', 'Eighth avatar of Vishnu, charioteer and guide in Mahabharata'),
  ('mahabharata', 'Bhima', 'Strongest of the Pandava brothers, known for his strength'),
  ('mahabharata', 'Yudhishthira', 'Eldest Pandava, known for his truthfulness and righteousness'),
  ('mahabharata', 'Draupadi', 'Wife of the five Pandavas, fire-born princess'),
  ('mahabharata', 'Karna', 'Tragic hero, son of Surya, fought for Kauravas'),
  ('mahabharata', 'Duryodhana', 'Eldest Kaurava, antagonist who wanted the throne'),
  ('mahabharata', 'Bhishma', 'Grandsire of both Pandavas and Kauravas, invincible warrior'),
  ('mahabharata', 'Dronacharya', 'Guru who taught both Pandavas and Kauravas'),
  ('mahabharata', 'Abhimanyu', 'Arjuna''s son who entered a difficult military formation'),
  ('mahabharata', 'Kurukshetra', 'Battlefield where the great war of Mahabharata was fought'),
  ('mahabharata', 'Bhagavad Gita', 'Sacred scripture containing Krishna''s teachings to Arjuna'),
  ('mahabharata', 'Chakravyuha', 'Military formation that was difficult to penetrate'),
  ('mahabharata', 'Hastinapura', 'Capital city of the Kuru kingdom'),
  ('mahabharata', 'Gandiva', 'Divine bow given to Arjuna by Agni'),
  ('mahabharata', 'Sudarshan Chakra', 'Divine weapon of Krishna, spinning discus'),
  ('mahabharata', 'Shakuni', 'Duryodhana''s uncle who was skilled at dice'),
  ('mahabharata', 'Eklavya', 'Talented archer who learned from a statue of Drona'),
  ('mahabharata', 'Ashwatthama', 'Son of Drona, immortal warrior'),
  ('mahabharata', 'Draupadi Swayamvar', 'Competition where Arjuna won Draupadi''s hand')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('gods', 'Gods & Goddesses', '🕉️', 'Mythology', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('gods', 'Ganesha', 'Elephant-headed god, remover of obstacles, worshipped first'),
  ('gods', 'Shiva', 'Destroyer god, known for meditation and third eye'),
  ('gods', 'Vishnu', 'Preserver god, has ten avatars, protector of the universe'),
  ('gods', 'Brahma', 'Creator god, has four faces, least worshipped among the trinity'),
  ('gods', 'Lakshmi', 'Goddess of wealth, consort of Vishnu, symbol of prosperity'),
  ('gods', 'Saraswati', 'Goddess of knowledge, consort of Brahma, symbol of arts'),
  ('gods', 'Durga', 'Goddess of power, demon slayer, worshipped during Navratri'),
  ('gods', 'Kali', 'Fierce goddess, consort of Shiva, symbol of time and destruction'),
  ('gods', 'Hanuman', 'Monkey god, devotee of Rama, symbol of strength and loyalty'),
  ('gods', 'Krishna', 'Eighth avatar of Vishnu, known for flute and butter stealing'),
  ('gods', 'Murugan', 'War god, son of Shiva, popular in South India'),
  ('gods', 'Ayyappa', 'Deity worshipped in Kerala, son of Shiva and Vishnu'),
  ('gods', 'Venkateswara', 'Form of Vishnu worshipped at Tirupati, richest temple'),
  ('gods', 'Jagannath', 'Form of Vishnu worshipped in Puri, known for Rath Yatra'),
  ('gods', 'Kamadhenu', 'Divine cow that fulfills wishes, mother of all cows'),
  ('gods', 'Indra', 'King of gods, god of rain and thunderbolt'),
  ('gods', 'Surya', 'Sun god, rides a chariot with seven horses'),
  ('gods', 'Varuna', 'God of water, cosmic order, and justice'),
  ('gods', 'Agni', 'Fire god, messenger between gods and humans'),
  ('gods', 'Nataraja', 'Shiva as cosmic dancer, symbol of creation and destruction')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('freedom-fighters', 'Freedom Fighters', '🇮🇳', 'History', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('freedom-fighters', 'Mahatma Gandhi', 'Father of the Nation, leader of Indian independence movement'),
  ('freedom-fighters', 'Bhagat Singh', 'Revolutionary freedom fighter who was martyred at a young age'),
  ('freedom-fighters', 'Subhas Chandra Bose', 'Founder of Indian National Army, revolutionary leader'),
  ('freedom-fighters', 'Jawaharlal Nehru', 'First Prime Minister of independent India'),
  ('freedom-fighters', 'Sardar Patel', 'Known as Iron Man, played key role in unifying India'),
  ('freedom-fighters', 'Rani Lakshmibai', 'Queen of Jhansi who fought against British rule'),
  ('freedom-fighters', 'Chandra Shekhar Azad', 'Revolutionary who never surrendered to British'),
  ('freedom-fighters', 'Bal Gangadhar Tilak', 'Freedom fighter who gave the slogan for self-rule'),
  ('freedom-fighters', 'Lala Lajpat Rai', 'Freedom fighter known as Punjab Kesari'),
  ('freedom-fighters', 'Sarojini Naidu', 'Known as Nightingale of India, freedom fighter and poet'),
  ('freedom-fighters', 'Mangal Pandey', 'Soldier who sparked the 1857 rebellion'),
  ('freedom-fighters', 'Ashfaqulla Khan', 'Revolutionary who participated in Kakori train robbery'),
  ('freedom-fighters', 'Dandi March', 'Salt March led by Gandhi as a protest against salt tax'),
  ('freedom-fighters', 'Quit India Movement', 'Mass movement demanding British to leave India'),
  ('freedom-fighters', 'Jallianwala Bagh', 'Massacre site where British fired on peaceful gathering'),
  ('freedom-fighters', 'Swadeshi Movement', 'Movement promoting Indian goods and boycotting British goods'),
  ('freedom-fighters', 'Azad Hind Fauj', 'Indian National Army formed to fight British'),
  ('freedom-fighters', 'Salt Satyagraha', 'Nonviolent protest against British salt monopoly'),
  ('freedom-fighters', 'Non-Cooperation Movement', 'Movement led by Gandhi to boycott British institutions'),
  ('freedom-fighters', 'Purna Swaraj', 'Declaration of complete independence from British rule')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('kings-dynasties', 'Kings & Dynasties', '👑', 'History', 'hard')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('kings-dynasties', 'Chhatrapati Shivaji', 'Founder of Maratha Empire, known for guerrilla warfare'),
  ('kings-dynasties', 'Ashoka', 'Mauryan emperor who embraced Buddhism after a war'),
  ('kings-dynasties', 'Akbar', 'Mughal emperor known for religious tolerance and administration'),
  ('kings-dynasties', 'Maharana Pratap', 'Rajput king known for his resistance against Mughals'),
  ('kings-dynasties', 'Tipu Sultan', 'Ruler of Mysore who fought against British expansion'),
  ('kings-dynasties', 'Chandragupta Maurya', 'Founder of Mauryan Empire, united much of India'),
  ('kings-dynasties', 'Prithviraj Chauhan', 'Rajput king known for his battles against invaders'),
  ('kings-dynasties', 'Krishnadevaraya', 'Vijayanagara emperor known for his patronage of arts'),
  ('kings-dynasties', 'Rani Padmini', 'Rajput queen known for her beauty and courage'),
  ('kings-dynasties', 'Raja Raja Chola', 'Chola emperor known for his naval conquests'),
  ('kings-dynasties', 'Samudragupta', 'Gupta emperor known for his military conquests'),
  ('kings-dynasties', 'Harshavardhana', 'Emperor who ruled much of North India in the 7th century'),
  ('kings-dynasties', 'Mughal Empire', 'Empire that ruled much of India from the 16th to 19th century'),
  ('kings-dynasties', 'Maratha Empire', 'Empire that challenged Mughal rule in the 17th-18th century'),
  ('kings-dynasties', 'Vijayanagara Empire', 'South Indian empire known for its prosperity and culture'),
  ('kings-dynasties', 'Chola Dynasty', 'South Indian dynasty known for its naval power and temples'),
  ('kings-dynasties', 'Gupta Empire', 'Ancient empire known as the Golden Age of India'),
  ('kings-dynasties', 'Battle of Panipat', 'Historic battle that established Mughal rule in India'),
  ('kings-dynasties', 'Battle of Haldighati', 'Battle between Rajputs and Mughals in 16th century'),
  ('kings-dynasties', 'Peshwa Bajirao', 'Maratha prime minister known for his military campaigns')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('startups', 'Startups & Tech', '🚀', 'Technology', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('startups', 'Flipkart', 'E-commerce company known for Big Billion Days sales'),
  ('startups', 'Zomato', 'Food delivery platform that went public recently'),
  ('startups', 'Swiggy', 'Food delivery company that also offers grocery services'),
  ('startups', 'Paytm', 'Digital payments company with a digital wallet'),
  ('startups', 'PhonePe', 'Digital payments platform that started as a Flipkart spin-off'),
  ('startups', 'Ola', 'Ride-hailing company that also makes electric scooters'),
  ('startups', 'BYJU''S', 'Edtech company known for learning apps and courses'),
  ('startups', 'Zerodha', 'Discount brokerage platform for stock trading'),
  ('startups', 'CRED', 'Fintech platform for credit card payments and rewards'),
  ('startups', 'Dream11', 'Fantasy sports platform that sponsors IPL'),
  ('startups', 'Nykaa', 'Beauty e-commerce platform that went public'),
  ('startups', 'Meesho', 'Social commerce platform for reselling products'),
  ('startups', 'Razorpay', 'Payment gateway company for businesses'),
  ('startups', 'Unacademy', 'Edtech platform for competitive exam preparation'),
  ('startups', 'UPI', 'Digital payment system for instant money transfers'),
  ('startups', 'Aadhaar', 'Biometric identification system for Indian residents'),
  ('startups', 'JioMart', 'E-commerce platform for grocery and retail'),
  ('startups', 'BigBasket', 'Online grocery delivery platform'),
  ('startups', 'MakeMyTrip', 'Online travel booking platform for flights and hotels'),
  ('startups', 'boAt', 'Audio products brand known for earphones and speakers')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('isro-science', 'ISRO & Science', '🛰️', 'Technology', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('isro-science', 'Chandrayaan-3', 'Indian moon mission that successfully landed on lunar surface'),
  ('isro-science', 'Mangalyaan', 'Indian Mars mission that was the first Asian Mars orbiter'),
  ('isro-science', 'ISRO', 'Indian space research organization that launches satellites'),
  ('isro-science', 'APJ Abdul Kalam', 'Former President known as Missile Man of India'),
  ('isro-science', 'CV Raman', 'Nobel Prize-winning physicist known for light scattering'),
  ('isro-science', 'Homi Bhabha', 'Father of Indian nuclear program'),
  ('isro-science', 'Vikram Sarabhai', 'Father of Indian space program'),
  ('isro-science', 'Gaganyaan', 'Indian human spaceflight mission'),
  ('isro-science', 'Aditya-L1', 'Indian solar observation mission'),
  ('isro-science', 'PSLV', 'Indian rocket known for its reliability and cost-effectiveness'),
  ('isro-science', 'GSLV', 'Indian rocket for heavier satellite launches'),
  ('isro-science', 'Satish Dhawan Space Centre', 'Indian rocket launch center in Sriharikota'),
  ('isro-science', 'Aryabhata', 'First Indian satellite named after ancient mathematician'),
  ('isro-science', 'DRDO', 'Defense research organization that develops military technology'),
  ('isro-science', 'Agni Missile', 'Indian ballistic missile series'),
  ('isro-science', 'BrahMos', 'Supersonic cruise missile developed with Russia'),
  ('isro-science', 'Param Supercomputer', 'Indian high-performance computing system'),
  ('isro-science', 'Srinivasa Ramanujan', 'Mathematical genius known for his contributions to number theory'),
  ('isro-science', 'Jagadish Chandra Bose', 'Scientist who contributed to plant physiology and radio waves'),
  ('isro-science', 'Tejas', 'Indigenous Indian fighter aircraft')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('brands', 'Iconic Brands', '🏢', 'Brands', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('brands', 'Amul', 'Dairy cooperative known for butter and milk products'),
  ('brands', 'Tata', 'Conglomerate with businesses in steel, cars, and technology'),
  ('brands', 'Reliance', 'Conglomerate known for oil, telecom, and retail'),
  ('brands', 'Infosys', 'IT services company known for software development'),
  ('brands', 'Mahindra', 'Conglomerate known for SUVs and tractors'),
  ('brands', 'Haldiram''s', 'Brand known for snacks and sweets'),
  ('brands', 'Parle-G', 'Popular biscuit brand known for its glucose biscuits'),
  ('brands', 'Britannia', 'Food company known for biscuits and cakes'),
  ('brands', 'Bajaj', 'Company known for two-wheelers and electrical appliances'),
  ('brands', 'Godrej', 'Conglomerate known for consumer goods and locks'),
  ('brands', 'Titan', 'Brand known for watches and jewelry'),
  ('brands', 'Royal Enfield', 'Motorcycle brand known for its heritage bikes'),
  ('brands', 'Asian Paints', 'Paint company known for home decor products'),
  ('brands', 'Dabur', 'Company known for ayurvedic products'),
  ('brands', 'Patanjali', 'Brand known for ayurvedic and natural products'),
  ('brands', 'MDH', 'Brand known for spices and masalas'),
  ('brands', 'Fevicol', 'Brand known for adhesives and glue'),
  ('brands', 'Maggi', 'Brand known for instant noodles'),
  ('brands', 'Thums Up', 'Cola brand that is popular in India'),
  ('brands', 'Lijjat Papad', 'Brand known for papads run by women''s cooperative')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('culture', 'Indian Culture', '🎨', 'General India', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('culture', 'Bharatanatyam', 'Classical dance form from Tamil Nadu'),
  ('culture', 'Kathak', 'Classical dance form from North India'),
  ('culture', 'Kathakali', 'Dance drama form from Kerala with elaborate costumes'),
  ('culture', 'Kuchipudi', 'Classical dance form from Andhra Pradesh'),
  ('culture', 'Yoga', 'Ancient practice for physical and mental wellness'),
  ('culture', 'Ayurveda', 'Traditional Indian system of medicine'),
  ('culture', 'Mehendi', 'Art of decorating hands with henna'),
  ('culture', 'Rangoli', 'Floor art made with colored powders'),
  ('culture', 'Sari', 'Traditional Indian garment for women'),
  ('culture', 'Kurta', 'Traditional Indian garment for men'),
  ('culture', 'Tabla', 'Indian percussion instrument'),
  ('culture', 'Sitar', 'Indian string instrument'),
  ('culture', 'Veena', 'Indian string instrument associated with goddess Saraswati'),
  ('culture', 'Carnatic Music', 'Classical music tradition from South India'),
  ('culture', 'Madhubani Painting', 'Folk art from Bihar with nature themes'),
  ('culture', 'Warli Art', 'Tribal art from Maharashtra with geometric patterns'),
  ('culture', 'Namaste', 'Traditional Indian greeting gesture'),
  ('culture', 'Bindi', 'Decorative dot worn on forehead'),
  ('culture', 'Bangles', 'Traditional wrist ornaments worn by women'),
  ('culture', 'Turban', 'Traditional headwear worn by men in some regions')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('famous-personalities', 'Famous Personalities', '🌟', 'General India', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('famous-personalities', 'APJ Abdul Kalam', 'Former President known as Missile Man of India'),
  ('famous-personalities', 'Ratan Tata', 'Industrialist and former chairman of Tata Group'),
  ('famous-personalities', 'Mukesh Ambani', 'Business tycoon and chairman of Reliance Industries'),
  ('famous-personalities', 'Narayana Murthy', 'Founder of Infosys and IT industry pioneer'),
  ('famous-personalities', 'Lata Mangeshkar', 'Legendary singer known as Nightingale of India'),
  ('famous-personalities', 'AR Rahman', 'Oscar-winning music composer'),
  ('famous-personalities', 'Amitabh Bachchan', 'Legendary Bollywood actor with a long career'),
  ('famous-personalities', 'Mother Teresa', 'Nobel Peace Prize winner who worked with the poor'),
  ('famous-personalities', 'Rabindranath Tagore', 'Nobel laureate poet and writer'),
  ('famous-personalities', 'Swami Vivekananda', 'Spiritual leader who introduced Indian philosophy to the West'),
  ('famous-personalities', 'Dr BR Ambedkar', 'Architect of Indian Constitution and social reformer'),
  ('famous-personalities', 'Kiran Bedi', 'First woman IPS officer in India'),
  ('famous-personalities', 'Sundar Pichai', 'CEO of Google, Indian-origin tech executive'),
  ('famous-personalities', 'Satya Nadella', 'CEO of Microsoft, Indian-origin tech executive'),
  ('famous-personalities', 'Verghese Kurien', 'Father of White Revolution who transformed dairy industry'),
  ('famous-personalities', 'MS Subbulakshmi', 'Legendary classical singer from South India'),
  ('famous-personalities', 'Zakir Hussain', 'Renowned tabla player and percussionist'),
  ('famous-personalities', 'Ruskin Bond', 'Author known for nature writing and children''s books'),
  ('famous-personalities', 'RK Laxman', 'Cartoonist known for creating the Common Man character'),
  ('famous-personalities', 'Premchand', 'Hindi-Urdu writer known for social themes in literature')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('political-leaders', 'Political Leaders', '🏛️', 'Politics', 'hard')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('political-leaders', 'Narendra Modi', 'Current Prime Minister of India'),
  ('political-leaders', 'Indira Gandhi', 'Former Prime Minister, first woman PM of India'),
  ('political-leaders', 'Jawaharlal Nehru', 'First Prime Minister of independent India'),
  ('political-leaders', 'Mahatma Gandhi', 'Father of the Nation, leader of independence movement'),
  ('political-leaders', 'Sardar Patel', 'Known as Iron Man, played key role in unifying India'),
  ('political-leaders', 'Rahul Gandhi', 'Congress leader and politician'),
  ('political-leaders', 'Amit Shah', 'Home Minister of India'),
  ('political-leaders', 'Mamata Banerjee', 'Chief Minister of West Bengal'),
  ('political-leaders', 'Arvind Kejriwal', 'Chief Minister of Delhi'),
  ('political-leaders', 'Nitish Kumar', 'Chief Minister of Bihar'),
  ('political-leaders', 'Yogi Adityanath', 'Chief Minister of Uttar Pradesh'),
  ('political-leaders', 'N Chandrababu Naidu', 'Chief Minister of Andhra Pradesh'),
  ('political-leaders', 'KCR', 'Former Chief Minister of Telangana'),
  ('political-leaders', 'Sharad Pawar', 'Veteran politician and founder of NCP'),
  ('political-leaders', 'Lalu Prasad Yadav', 'Veteran politician from Bihar')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('literature', 'Indian Literature', '📚', 'Literature', 'hard')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('literature', 'Premchand', 'Hindi-Urdu writer known for social themes in literature'),
  ('literature', 'Rabindranath Tagore', 'Nobel laureate poet and writer'),
  ('literature', 'Ruskin Bond', 'Author known for nature writing and children''s books'),
  ('literature', 'Vikram Seth', 'Writer known for his novel A Suitable Boy'),
  ('literature', 'Arundhati Roy', 'Booker Prize winner and activist'),
  ('literature', 'Chetan Bhagat', 'Popular writer known for youth fiction'),
  ('literature', 'Jhumpa Lahiri', 'Pulitzer winner known for stories about Indian diaspora'),
  ('literature', 'R.K. Narayan', 'Beloved author known for stories about Indian life'),
  ('literature', 'Khushwant Singh', 'Writer and journalist known for Train to Pakistan'),
  ('literature', 'Amrita Pritam', 'Punjabi writer known for Partition themes'),
  ('literature', 'Sarat Chandra', 'Bengali writer known for romantic novels'),
  ('literature', 'Bankim Chandra', 'Bengali writer who composed Vande Mataram'),
  ('literature', 'Mirza Ghalib', 'Urdu poet from the Mughal era'),
  ('literature', 'Kabir', 'Mystic poet known for his dohas'),
  ('literature', 'Kalidasa', 'Ancient Sanskrit poet known for Shakuntala')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('artists', 'Indian Artists', '🎨', 'Artists', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('artists', 'M.F. Husain', 'Painter known as Picasso of India'),
  ('artists', 'Raja Ravi Varma', 'Painter known for mythological themes'),
  ('artists', 'Jamini Roy', 'Bengal School artist known for folk art style'),
  ('artists', 'Amrita Sher-Gil', 'Painter known for modern art and feminist themes'),
  ('artists', 'Tyeb Mehta', 'Modernist painter known for abstract expressionism'),
  ('artists', 'S.H. Raza', 'Painter known for his Bindu series'),
  ('artists', 'Nandalal Bose', 'Artist from Shantiniketan known for nationalist art'),
  ('artists', 'B. V. Doshi', 'Architect who won the Pritzker Prize'),
  ('artists', 'Charles Correa', 'Architect known for urban planning and modern design'),
  ('artists', 'Satish Gujral', 'Artist known as a multifaceted creator'),
  ('artists', 'Anish Kapoor', 'Sculptor known for Cloud Gate and Turner Prize'),
  ('artists', 'Subodh Gupta', 'Contemporary artist known for using everyday objects'),
  ('artists', 'Atul Dodiya', 'Contemporary painter known for social commentary'),
  ('artists', 'Bhupen Khakhar', 'Painter known for figurative art and gay themes')
  on conflict (category_id, word) do update set hint = excluded.hint;

insert into public.categories (id, name, emoji, grp, difficulty) values ('business-tycoons', 'Business Tycoons', '💼', 'Business', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word, hint) values
  ('business-tycoons', 'Mukesh Ambani', 'Chairman of Reliance Industries'),
  ('business-tycoons', 'Gautam Adani', 'Chairman of Adani Group'),
  ('business-tycoons', 'Shiv Nadar', 'Founder of HCL and philanthropist'),
  ('business-tycoons', 'Cyrus Poonawalla', 'Founder of Serum Institute'),
  ('business-tycoons', 'Dilip Shanghvi', 'Founder of Sun Pharma'),
  ('business-tycoons', 'Azim Premji', 'Founder of Wipro and philanthropist'),
  ('business-tycoons', 'Kumar Mangalam Birla', 'Chairman of Aditya Birla Group'),
  ('business-tycoons', 'Uday Kotak', 'Founder of Kotak Bank'),
  ('business-tycoons', 'Lakshmi Mittal', 'Steel magnate and chairman of Arcelor Mittal'),
  ('business-tycoons', 'Radhakishan Damani', 'Founder of DMart'),
  ('business-tycoons', 'Nandan Nilekani', 'Co-founder of Infosys and architect of Aadhaar'),
  ('business-tycoons', 'Falguni Nayar', 'Founder of Nykaa'),
  ('business-tycoons', 'Vijay Sankeshwar', 'Founder of VRL Logistics'),
  ('business-tycoons', 'Rahul Bajaj', 'Chairman of Bajaj Group')
  on conflict (category_id, word) do update set hint = excluded.hint;

