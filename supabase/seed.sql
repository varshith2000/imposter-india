-- Auto-generated from src/lib/data/categories.ts — do not edit by hand.
-- Run AFTER schema.sql in the Supabase SQL editor.

insert into public.categories (id, name, emoji, grp, difficulty) values ('bollywood-movies', 'Bollywood Movies', '🎬', 'Entertainment', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('bollywood-movies', 'Sholay'),
  ('bollywood-movies', 'Dilwale Dulhania Le Jayenge'),
  ('bollywood-movies', '3 Idiots'),
  ('bollywood-movies', 'Lagaan'),
  ('bollywood-movies', 'Dangal'),
  ('bollywood-movies', 'Kabhi Khushi Kabhie Gham'),
  ('bollywood-movies', 'Zindagi Na Milegi Dobara'),
  ('bollywood-movies', 'Gully Boy'),
  ('bollywood-movies', 'Andhadhun'),
  ('bollywood-movies', 'Queen'),
  ('bollywood-movies', 'Barfi'),
  ('bollywood-movies', 'PK'),
  ('bollywood-movies', 'Chennai Express'),
  ('bollywood-movies', 'Bajrangi Bhaijaan'),
  ('bollywood-movies', 'Kuch Kuch Hota Hai'),
  ('bollywood-movies', 'Om Shanti Om'),
  ('bollywood-movies', 'Rockstar'),
  ('bollywood-movies', 'Dil Chahta Hai'),
  ('bollywood-movies', 'Swades'),
  ('bollywood-movies', 'Rang De Basanti'),
  ('bollywood-movies', 'Munna Bhai MBBS'),
  ('bollywood-movies', 'Pathaan'),
  ('bollywood-movies', 'Jawan'),
  ('bollywood-movies', 'Animal')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('bollywood-actors', 'Bollywood Stars', '⭐', 'Entertainment', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('bollywood-actors', 'Shah Rukh Khan'),
  ('bollywood-actors', 'Amitabh Bachchan'),
  ('bollywood-actors', 'Deepika Padukone'),
  ('bollywood-actors', 'Salman Khan'),
  ('bollywood-actors', 'Aamir Khan'),
  ('bollywood-actors', 'Alia Bhatt'),
  ('bollywood-actors', 'Ranbir Kapoor'),
  ('bollywood-actors', 'Priyanka Chopra'),
  ('bollywood-actors', 'Hrithik Roshan'),
  ('bollywood-actors', 'Katrina Kaif'),
  ('bollywood-actors', 'Akshay Kumar'),
  ('bollywood-actors', 'Ranveer Singh'),
  ('bollywood-actors', 'Madhuri Dixit'),
  ('bollywood-actors', 'Kajol'),
  ('bollywood-actors', 'Ajay Devgn'),
  ('bollywood-actors', 'Kareena Kapoor'),
  ('bollywood-actors', 'Shahid Kapoor'),
  ('bollywood-actors', 'Anushka Sharma'),
  ('bollywood-actors', 'Vicky Kaushal'),
  ('bollywood-actors', 'Kiara Advani')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('south-cinema', 'South Indian Cinema', '🌟', 'Entertainment', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('south-cinema', 'Baahubali'),
  ('south-cinema', 'RRR'),
  ('south-cinema', 'Pushpa'),
  ('south-cinema', 'KGF'),
  ('south-cinema', 'Kantara'),
  ('south-cinema', 'Vikram'),
  ('south-cinema', 'Master'),
  ('south-cinema', 'Rajinikanth'),
  ('south-cinema', 'Kamal Haasan'),
  ('south-cinema', 'Allu Arjun'),
  ('south-cinema', 'Prabhas'),
  ('south-cinema', 'Yash'),
  ('south-cinema', 'Vijay'),
  ('south-cinema', 'Mahesh Babu'),
  ('south-cinema', 'Jr NTR'),
  ('south-cinema', 'Ram Charan'),
  ('south-cinema', 'Suriya'),
  ('south-cinema', 'Ponniyin Selvan'),
  ('south-cinema', 'Drishyam'),
  ('south-cinema', '96'),
  ('south-cinema', 'Jai Bhim'),
  ('south-cinema', 'Mohanlal'),
  ('south-cinema', 'Mammootty'),
  ('south-cinema', 'Dulquer Salmaan')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('famous-songs', 'Iconic Songs', '🎵', 'Entertainment', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('famous-songs', 'Jai Ho'),
  ('famous-songs', 'Chaiyya Chaiyya'),
  ('famous-songs', 'Kal Ho Naa Ho'),
  ('famous-songs', 'Tum Hi Ho'),
  ('famous-songs', 'Naatu Naatu'),
  ('famous-songs', 'Kajra Re'),
  ('famous-songs', 'Munni Badnaam'),
  ('famous-songs', 'Gallan Goodiyan'),
  ('famous-songs', 'Channa Mereya'),
  ('famous-songs', 'Tujhe Dekha Toh'),
  ('famous-songs', 'Badtameez Dil'),
  ('famous-songs', 'Kesariya'),
  ('famous-songs', 'Apna Time Aayega'),
  ('famous-songs', 'Zinda'),
  ('famous-songs', 'Malhari'),
  ('famous-songs', 'Ghungroo'),
  ('famous-songs', 'London Thumakda'),
  ('famous-songs', 'Nagada Sang Dhol'),
  ('famous-songs', 'Senorita'),
  ('famous-songs', 'Kun Faya Kun')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tv-shows', 'Indian TV & OTT', '📺', 'Entertainment', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('tv-shows', 'Taarak Mehta Ka Ooltah Chashmah'),
  ('tv-shows', 'Kaun Banega Crorepati'),
  ('tv-shows', 'Bigg Boss'),
  ('tv-shows', 'Sacred Games'),
  ('tv-shows', 'Mirzapur'),
  ('tv-shows', 'The Family Man'),
  ('tv-shows', 'Panchayat'),
  ('tv-shows', 'Kota Factory'),
  ('tv-shows', 'Scam 1992'),
  ('tv-shows', 'Indian Idol'),
  ('tv-shows', 'Shark Tank India'),
  ('tv-shows', 'CID'),
  ('tv-shows', 'Balika Vadhu'),
  ('tv-shows', 'Anupamaa'),
  ('tv-shows', 'Aspirants'),
  ('tv-shows', 'Farzi'),
  ('tv-shows', 'Ramayan'),
  ('tv-shows', 'Mahabharat'),
  ('tv-shows', 'Shaktimaan'),
  ('tv-shows', 'Malgudi Days')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('movie-characters', 'Movie Characters', '🎭', 'Entertainment', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('movie-characters', 'Gabbar Singh'),
  ('movie-characters', 'Mogambo'),
  ('movie-characters', 'Munna Bhai'),
  ('movie-characters', 'Circuit'),
  ('movie-characters', 'Baahubali'),
  ('movie-characters', 'Kattappa'),
  ('movie-characters', 'Chulbul Pandey'),
  ('movie-characters', 'Rancho'),
  ('movie-characters', 'Raj Malhotra'),
  ('movie-characters', 'Poo'),
  ('movie-characters', 'Bhallaladeva'),
  ('movie-characters', 'Rocky Bhai'),
  ('movie-characters', 'Pushpa Raj'),
  ('movie-characters', 'Kabir Singh'),
  ('movie-characters', 'Geet'),
  ('movie-characters', 'Bunny'),
  ('movie-characters', 'Naina'),
  ('movie-characters', 'Simran'),
  ('movie-characters', 'Don'),
  ('movie-characters', 'Vijay Dinanath Chauhan')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-movies', 'Tollywood Movies', '🎥', 'Tollywood', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('tollywood-movies', 'Baahubali'),
  ('tollywood-movies', 'RRR'),
  ('tollywood-movies', 'Pushpa'),
  ('tollywood-movies', 'Magadheera'),
  ('tollywood-movies', 'Arjun Reddy'),
  ('tollywood-movies', 'Rangasthalam'),
  ('tollywood-movies', 'Ala Vaikunthapurramuloo'),
  ('tollywood-movies', 'Eega'),
  ('tollywood-movies', 'Pokiri'),
  ('tollywood-movies', 'Athadu'),
  ('tollywood-movies', 'Mahanati'),
  ('tollywood-movies', 'Sita Ramam'),
  ('tollywood-movies', 'Jathi Ratnalu'),
  ('tollywood-movies', 'Salaar'),
  ('tollywood-movies', 'Devara'),
  ('tollywood-movies', 'Hi Nanna'),
  ('tollywood-movies', 'Bommarillu'),
  ('tollywood-movies', 'Attarintiki Daredi'),
  ('tollywood-movies', 'Srimanthudu'),
  ('tollywood-movies', 'Bheemla Nayak'),
  ('tollywood-movies', 'Sarileru Neekevvaru'),
  ('tollywood-movies', 'Geetha Govindam'),
  ('tollywood-movies', 'Fidaa'),
  ('tollywood-movies', 'Mayabazar')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-heroes', 'Tollywood Heroes', '🦸', 'Tollywood', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('tollywood-heroes', 'Chiranjeevi'),
  ('tollywood-heroes', 'Pawan Kalyan'),
  ('tollywood-heroes', 'Mahesh Babu'),
  ('tollywood-heroes', 'Prabhas'),
  ('tollywood-heroes', 'Allu Arjun'),
  ('tollywood-heroes', 'Jr NTR'),
  ('tollywood-heroes', 'Ram Charan'),
  ('tollywood-heroes', 'Nagarjuna'),
  ('tollywood-heroes', 'Venkatesh'),
  ('tollywood-heroes', 'Balakrishna'),
  ('tollywood-heroes', 'Ravi Teja'),
  ('tollywood-heroes', 'Nani'),
  ('tollywood-heroes', 'Vijay Deverakonda'),
  ('tollywood-heroes', 'Naga Chaitanya'),
  ('tollywood-heroes', 'Ram Pothineni'),
  ('tollywood-heroes', 'Nithiin'),
  ('tollywood-heroes', 'NT Rama Rao'),
  ('tollywood-heroes', 'Akkineni Nageswara Rao'),
  ('tollywood-heroes', 'Krishna'),
  ('tollywood-heroes', 'Sai Dharam Tej')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-heroines', 'Tollywood Heroines', '💃', 'Tollywood', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('tollywood-heroines', 'Samantha'),
  ('tollywood-heroines', 'Anushka Shetty'),
  ('tollywood-heroines', 'Rashmika Mandanna'),
  ('tollywood-heroines', 'Pooja Hegde'),
  ('tollywood-heroines', 'Kajal Aggarwal'),
  ('tollywood-heroines', 'Keerthy Suresh'),
  ('tollywood-heroines', 'Sai Pallavi'),
  ('tollywood-heroines', 'Tamannaah'),
  ('tollywood-heroines', 'Savitri'),
  ('tollywood-heroines', 'Sridevi'),
  ('tollywood-heroines', 'Vijayashanti'),
  ('tollywood-heroines', 'Nayanthara'),
  ('tollywood-heroines', 'Shruti Haasan'),
  ('tollywood-heroines', 'Genelia'),
  ('tollywood-heroines', 'Ileana D''Cruz'),
  ('tollywood-heroines', 'Rakul Preet Singh'),
  ('tollywood-heroines', 'Krithi Shetty'),
  ('tollywood-heroines', 'Mrunal Thakur'),
  ('tollywood-heroines', 'Anupama Parameswaran'),
  ('tollywood-heroines', 'Jayasudha')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-songs', 'Tollywood Songs', '🎶', 'Tollywood', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('tollywood-songs', 'Naatu Naatu'),
  ('tollywood-songs', 'Butta Bomma'),
  ('tollywood-songs', 'Oo Antava'),
  ('tollywood-songs', 'Srivalli'),
  ('tollywood-songs', 'Saami Saami'),
  ('tollywood-songs', 'Samajavaragamana'),
  ('tollywood-songs', 'Ramuloo Ramulaa'),
  ('tollywood-songs', 'Inkem Inkem Inkem Kaavaale'),
  ('tollywood-songs', 'Vachinde'),
  ('tollywood-songs', 'Seeti Maar'),
  ('tollywood-songs', 'Pakka Local'),
  ('tollywood-songs', 'Ringa Ringa'),
  ('tollywood-songs', 'Mind Block'),
  ('tollywood-songs', 'Bullettu Bandi'),
  ('tollywood-songs', 'Top Lesi Poddi'),
  ('tollywood-songs', 'Aa Ante Amalapuram'),
  ('tollywood-songs', 'Kevvu Keka'),
  ('tollywood-songs', 'Nee Kannu Neeli Samudram'),
  ('tollywood-songs', 'Kurchi Madathapetti'),
  ('tollywood-songs', 'Chuttamalle')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tollywood-directors', 'Directors & Composers', '🎬', 'Tollywood', 'hard')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('tollywood-directors', 'SS Rajamouli'),
  ('tollywood-directors', 'Trivikram Srinivas'),
  ('tollywood-directors', 'Sukumar'),
  ('tollywood-directors', 'Puri Jagannadh'),
  ('tollywood-directors', 'Koratala Siva'),
  ('tollywood-directors', 'Harish Shankar'),
  ('tollywood-directors', 'Anil Ravipudi'),
  ('tollywood-directors', 'Vamshi Paidipally'),
  ('tollywood-directors', 'Nag Ashwin'),
  ('tollywood-directors', 'Sandeep Reddy Vanga'),
  ('tollywood-directors', 'Ram Gopal Varma'),
  ('tollywood-directors', 'K Viswanath'),
  ('tollywood-directors', 'K Raghavendra Rao'),
  ('tollywood-directors', 'Dasari Narayana Rao'),
  ('tollywood-directors', 'Prashanth Neel'),
  ('tollywood-directors', 'Devi Sri Prasad'),
  ('tollywood-directors', 'MM Keeravani'),
  ('tollywood-directors', 'Thaman S'),
  ('tollywood-directors', 'Mickey J Meyer'),
  ('tollywood-directors', 'Anirudh Ravichander')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('cricket-legends', 'Cricket Legends', '🏏', 'Cricket', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('cricket-legends', 'Sachin Tendulkar'),
  ('cricket-legends', 'MS Dhoni'),
  ('cricket-legends', 'Virat Kohli'),
  ('cricket-legends', 'Kapil Dev'),
  ('cricket-legends', 'Rohit Sharma'),
  ('cricket-legends', 'Sourav Ganguly'),
  ('cricket-legends', 'Rahul Dravid'),
  ('cricket-legends', 'Yuvraj Singh'),
  ('cricket-legends', 'Anil Kumble'),
  ('cricket-legends', 'Virender Sehwag'),
  ('cricket-legends', 'Jasprit Bumrah'),
  ('cricket-legends', 'Hardik Pandya'),
  ('cricket-legends', 'Ravindra Jadeja'),
  ('cricket-legends', 'Sunil Gavaskar'),
  ('cricket-legends', 'VVS Laxman'),
  ('cricket-legends', 'Harbhajan Singh'),
  ('cricket-legends', 'Zaheer Khan'),
  ('cricket-legends', 'Shubman Gill'),
  ('cricket-legends', 'KL Rahul'),
  ('cricket-legends', 'Rishabh Pant'),
  ('cricket-legends', 'Smriti Mandhana'),
  ('cricket-legends', 'Mithali Raj')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('ipl', 'IPL Fever', '🏆', 'Cricket', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('ipl', 'Mumbai Indians'),
  ('ipl', 'Chennai Super Kings'),
  ('ipl', 'Royal Challengers Bengaluru'),
  ('ipl', 'Kolkata Knight Riders'),
  ('ipl', 'Sunrisers Hyderabad'),
  ('ipl', 'Rajasthan Royals'),
  ('ipl', 'Delhi Capitals'),
  ('ipl', 'Punjab Kings'),
  ('ipl', 'Gujarat Titans'),
  ('ipl', 'Lucknow Super Giants'),
  ('ipl', 'Orange Cap'),
  ('ipl', 'Purple Cap'),
  ('ipl', 'Super Over'),
  ('ipl', 'Strategic Timeout'),
  ('ipl', 'Wankhede Stadium'),
  ('ipl', 'Chepauk'),
  ('ipl', 'Eden Gardens'),
  ('ipl', 'Chinnaswamy Stadium'),
  ('ipl', 'Auction'),
  ('ipl', 'Hat-trick')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('cricket-moments', 'Cricket Moments', '🎯', 'Cricket', 'hard')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('cricket-moments', '2011 World Cup Final'),
  ('cricket-moments', 'Dhoni''s Helicopter Shot'),
  ('cricket-moments', 'Yuvraj''s Six Sixes'),
  ('cricket-moments', 'Sachin''s 100th Century'),
  ('cricket-moments', '2007 T20 World Cup'),
  ('cricket-moments', 'Kohli''s Chase Masterclass'),
  ('cricket-moments', 'Gabba 2021'),
  ('cricket-moments', 'NatWest Final 2002'),
  ('cricket-moments', 'Sehwag''s Triple Century'),
  ('cricket-moments', 'Kumble''s 10 Wickets'),
  ('cricket-moments', 'Miandad''s Last Ball Six'),
  ('cricket-moments', 'Slower Ball'),
  ('cricket-moments', 'Reverse Swing'),
  ('cricket-moments', 'Doosra'),
  ('cricket-moments', 'Nightwatchman'),
  ('cricket-moments', 'Duckworth Lewis'),
  ('cricket-moments', 'Powerplay'),
  ('cricket-moments', 'Third Umpire'),
  ('cricket-moments', 'Leg Glance'),
  ('cricket-moments', 'Cover Drive')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('indian-sports', 'Indian Sports Icons', '🥇', 'Sports', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('indian-sports', 'Neeraj Chopra'),
  ('indian-sports', 'PV Sindhu'),
  ('indian-sports', 'Saina Nehwal'),
  ('indian-sports', 'Mary Kom'),
  ('indian-sports', 'Milkha Singh'),
  ('indian-sports', 'PT Usha'),
  ('indian-sports', 'Abhinav Bindra'),
  ('indian-sports', 'Sania Mirza'),
  ('indian-sports', 'Viswanathan Anand'),
  ('indian-sports', 'Gukesh D'),
  ('indian-sports', 'Major Dhyan Chand'),
  ('indian-sports', 'Sunil Chhetri'),
  ('indian-sports', 'Bajrang Punia'),
  ('indian-sports', 'Mirabai Chanu'),
  ('indian-sports', 'Pro Kabaddi'),
  ('indian-sports', 'Kho Kho'),
  ('indian-sports', 'Hockey India'),
  ('indian-sports', 'Lakshya Sen'),
  ('indian-sports', 'Praggnanandhaa'),
  ('indian-sports', 'Leander Paes')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('street-food', 'Street Food', '🥘', 'Food', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('street-food', 'Pani Puri'),
  ('street-food', 'Vada Pav'),
  ('street-food', 'Pav Bhaji'),
  ('street-food', 'Bhel Puri'),
  ('street-food', 'Samosa'),
  ('street-food', 'Kachori'),
  ('street-food', 'Chole Bhature'),
  ('street-food', 'Momos'),
  ('street-food', 'Dahi Puri'),
  ('street-food', 'Aloo Tikki'),
  ('street-food', 'Sev Puri'),
  ('street-food', 'Frankie'),
  ('street-food', 'Kathi Roll'),
  ('street-food', 'Dabeli'),
  ('street-food', 'Misal Pav'),
  ('street-food', 'Jhal Muri'),
  ('street-food', 'Litti Chokha'),
  ('street-food', 'Pakora'),
  ('street-food', 'Bread Pakoda'),
  ('street-food', 'Egg Roll')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('south-food', 'South Indian Food', '🍛', 'Food', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('south-food', 'Masala Dosa'),
  ('south-food', 'Idli'),
  ('south-food', 'Vada'),
  ('south-food', 'Uttapam'),
  ('south-food', 'Pongal'),
  ('south-food', 'Upma'),
  ('south-food', 'Bisi Bele Bath'),
  ('south-food', 'Hyderabadi Biryani'),
  ('south-food', 'Rasam'),
  ('south-food', 'Sambar'),
  ('south-food', 'Appam'),
  ('south-food', 'Puttu'),
  ('south-food', 'Chettinad Chicken'),
  ('south-food', 'Filter Coffee'),
  ('south-food', 'Pesarattu'),
  ('south-food', 'Neer Dosa'),
  ('south-food', 'Avial'),
  ('south-food', 'Kerala Parotta'),
  ('south-food', 'Curd Rice'),
  ('south-food', 'Rava Kesari')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('sweets', 'Indian Sweets', '🍮', 'Food', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('sweets', 'Gulab Jamun'),
  ('sweets', 'Rasgulla'),
  ('sweets', 'Jalebi'),
  ('sweets', 'Ladoo'),
  ('sweets', 'Barfi'),
  ('sweets', 'Kaju Katli'),
  ('sweets', 'Rasmalai'),
  ('sweets', 'Kheer'),
  ('sweets', 'Gajar Ka Halwa'),
  ('sweets', 'Mysore Pak'),
  ('sweets', 'Soan Papdi'),
  ('sweets', 'Peda'),
  ('sweets', 'Modak'),
  ('sweets', 'Sandesh'),
  ('sweets', 'Kulfi'),
  ('sweets', 'Malpua'),
  ('sweets', 'Ghevar'),
  ('sweets', 'Basundi'),
  ('sweets', 'Payasam'),
  ('sweets', 'Balushahi')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('festivals', 'Festivals of India', '🪔', 'Festivals', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('festivals', 'Diwali'),
  ('festivals', 'Holi'),
  ('festivals', 'Pongal'),
  ('festivals', 'Onam'),
  ('festivals', 'Ugadi'),
  ('festivals', 'Ganesh Chaturthi'),
  ('festivals', 'Durga Puja'),
  ('festivals', 'Navratri'),
  ('festivals', 'Raksha Bandhan'),
  ('festivals', 'Eid'),
  ('festivals', 'Christmas'),
  ('festivals', 'Baisakhi'),
  ('festivals', 'Lohri'),
  ('festivals', 'Makar Sankranti'),
  ('festivals', 'Janmashtami'),
  ('festivals', 'Karva Chauth'),
  ('festivals', 'Chhath Puja'),
  ('festivals', 'Ram Navami'),
  ('festivals', 'Maha Shivaratri'),
  ('festivals', 'Gudi Padwa')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('monuments', 'Monuments & Wonders', '🕌', 'Places', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('monuments', 'Taj Mahal'),
  ('monuments', 'Red Fort'),
  ('monuments', 'Qutub Minar'),
  ('monuments', 'Gateway of India'),
  ('monuments', 'India Gate'),
  ('monuments', 'Hawa Mahal'),
  ('monuments', 'Charminar'),
  ('monuments', 'Mysore Palace'),
  ('monuments', 'Golden Temple'),
  ('monuments', 'Konark Sun Temple'),
  ('monuments', 'Ajanta Caves'),
  ('monuments', 'Ellora Caves'),
  ('monuments', 'Hampi'),
  ('monuments', 'Meenakshi Temple'),
  ('monuments', 'Victoria Memorial'),
  ('monuments', 'Amer Fort'),
  ('monuments', 'Sanchi Stupa'),
  ('monuments', 'Statue of Unity'),
  ('monuments', 'Lotus Temple'),
  ('monuments', 'Khajuraho')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('tourist-places', 'Tourist Places', '🏔️', 'Places', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('tourist-places', 'Goa'),
  ('tourist-places', 'Manali'),
  ('tourist-places', 'Ooty'),
  ('tourist-places', 'Munnar'),
  ('tourist-places', 'Shimla'),
  ('tourist-places', 'Darjeeling'),
  ('tourist-places', 'Ladakh'),
  ('tourist-places', 'Rishikesh'),
  ('tourist-places', 'Varanasi'),
  ('tourist-places', 'Jaipur'),
  ('tourist-places', 'Udaipur'),
  ('tourist-places', 'Kodaikanal'),
  ('tourist-places', 'Coorg'),
  ('tourist-places', 'Andaman Islands'),
  ('tourist-places', 'Rann of Kutch'),
  ('tourist-places', 'Kashmir'),
  ('tourist-places', 'Pondicherry'),
  ('tourist-places', 'Mahabalipuram'),
  ('tourist-places', 'Khajjiar'),
  ('tourist-places', 'Araku Valley')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('states-capitals', 'States & Cities', '🗺️', 'Places', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('states-capitals', 'Mumbai'),
  ('states-capitals', 'Delhi'),
  ('states-capitals', 'Bengaluru'),
  ('states-capitals', 'Hyderabad'),
  ('states-capitals', 'Chennai'),
  ('states-capitals', 'Kolkata'),
  ('states-capitals', 'Kerala'),
  ('states-capitals', 'Rajasthan'),
  ('states-capitals', 'Punjab'),
  ('states-capitals', 'Gujarat'),
  ('states-capitals', 'Tamil Nadu'),
  ('states-capitals', 'Telangana'),
  ('states-capitals', 'Uttar Pradesh'),
  ('states-capitals', 'West Bengal'),
  ('states-capitals', 'Assam'),
  ('states-capitals', 'Sikkim'),
  ('states-capitals', 'Ahmedabad'),
  ('states-capitals', 'Lucknow'),
  ('states-capitals', 'Chandigarh'),
  ('states-capitals', 'Bhopal')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('ramayana', 'Ramayana', '🏹', 'Mythology', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('ramayana', 'Rama'),
  ('ramayana', 'Sita'),
  ('ramayana', 'Lakshmana'),
  ('ramayana', 'Hanuman'),
  ('ramayana', 'Ravana'),
  ('ramayana', 'Bharata'),
  ('ramayana', 'Ayodhya'),
  ('ramayana', 'Lanka'),
  ('ramayana', 'Vanvas'),
  ('ramayana', 'Swayamvar'),
  ('ramayana', 'Pushpaka Vimana'),
  ('ramayana', 'Sanjeevani'),
  ('ramayana', 'Jatayu'),
  ('ramayana', 'Sugriva'),
  ('ramayana', 'Vibhishana'),
  ('ramayana', 'Kumbhakarna'),
  ('ramayana', 'Shabari'),
  ('ramayana', 'Ram Setu'),
  ('ramayana', 'Panchavati'),
  ('ramayana', 'Agni Pariksha')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('mahabharata', 'Mahabharata', '⚔️', 'Mythology', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('mahabharata', 'Arjuna'),
  ('mahabharata', 'Krishna'),
  ('mahabharata', 'Bhima'),
  ('mahabharata', 'Yudhishthira'),
  ('mahabharata', 'Draupadi'),
  ('mahabharata', 'Karna'),
  ('mahabharata', 'Duryodhana'),
  ('mahabharata', 'Bhishma'),
  ('mahabharata', 'Dronacharya'),
  ('mahabharata', 'Abhimanyu'),
  ('mahabharata', 'Kurukshetra'),
  ('mahabharata', 'Bhagavad Gita'),
  ('mahabharata', 'Chakravyuha'),
  ('mahabharata', 'Hastinapura'),
  ('mahabharata', 'Gandiva'),
  ('mahabharata', 'Sudarshan Chakra'),
  ('mahabharata', 'Shakuni'),
  ('mahabharata', 'Eklavya'),
  ('mahabharata', 'Ashwatthama'),
  ('mahabharata', 'Draupadi Swayamvar')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('gods', 'Gods & Goddesses', '🕉️', 'Mythology', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('gods', 'Ganesha'),
  ('gods', 'Shiva'),
  ('gods', 'Vishnu'),
  ('gods', 'Brahma'),
  ('gods', 'Lakshmi'),
  ('gods', 'Saraswati'),
  ('gods', 'Durga'),
  ('gods', 'Kali'),
  ('gods', 'Hanuman'),
  ('gods', 'Krishna'),
  ('gods', 'Murugan'),
  ('gods', 'Ayyappa'),
  ('gods', 'Venkateswara'),
  ('gods', 'Jagannath'),
  ('gods', 'Kamadhenu'),
  ('gods', 'Indra'),
  ('gods', 'Surya'),
  ('gods', 'Varuna'),
  ('gods', 'Agni'),
  ('gods', 'Nataraja')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('freedom-fighters', 'Freedom Fighters', '🇮🇳', 'History', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('freedom-fighters', 'Mahatma Gandhi'),
  ('freedom-fighters', 'Bhagat Singh'),
  ('freedom-fighters', 'Subhas Chandra Bose'),
  ('freedom-fighters', 'Jawaharlal Nehru'),
  ('freedom-fighters', 'Sardar Patel'),
  ('freedom-fighters', 'Rani Lakshmibai'),
  ('freedom-fighters', 'Chandra Shekhar Azad'),
  ('freedom-fighters', 'Bal Gangadhar Tilak'),
  ('freedom-fighters', 'Lala Lajpat Rai'),
  ('freedom-fighters', 'Sarojini Naidu'),
  ('freedom-fighters', 'Mangal Pandey'),
  ('freedom-fighters', 'Ashfaqulla Khan'),
  ('freedom-fighters', 'Dandi March'),
  ('freedom-fighters', 'Quit India Movement'),
  ('freedom-fighters', 'Jallianwala Bagh'),
  ('freedom-fighters', 'Swadeshi Movement'),
  ('freedom-fighters', 'Azad Hind Fauj'),
  ('freedom-fighters', 'Salt Satyagraha'),
  ('freedom-fighters', 'Non-Cooperation Movement'),
  ('freedom-fighters', 'Purna Swaraj')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('kings-dynasties', 'Kings & Dynasties', '👑', 'History', 'hard')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('kings-dynasties', 'Chhatrapati Shivaji'),
  ('kings-dynasties', 'Ashoka'),
  ('kings-dynasties', 'Akbar'),
  ('kings-dynasties', 'Maharana Pratap'),
  ('kings-dynasties', 'Tipu Sultan'),
  ('kings-dynasties', 'Chandragupta Maurya'),
  ('kings-dynasties', 'Prithviraj Chauhan'),
  ('kings-dynasties', 'Krishnadevaraya'),
  ('kings-dynasties', 'Rani Padmini'),
  ('kings-dynasties', 'Raja Raja Chola'),
  ('kings-dynasties', 'Samudragupta'),
  ('kings-dynasties', 'Harshavardhana'),
  ('kings-dynasties', 'Mughal Empire'),
  ('kings-dynasties', 'Maratha Empire'),
  ('kings-dynasties', 'Vijayanagara Empire'),
  ('kings-dynasties', 'Chola Dynasty'),
  ('kings-dynasties', 'Gupta Empire'),
  ('kings-dynasties', 'Battle of Panipat'),
  ('kings-dynasties', 'Battle of Haldighati'),
  ('kings-dynasties', 'Peshwa Bajirao')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('startups', 'Startups & Tech', '🚀', 'Technology', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('startups', 'Flipkart'),
  ('startups', 'Zomato'),
  ('startups', 'Swiggy'),
  ('startups', 'Paytm'),
  ('startups', 'PhonePe'),
  ('startups', 'Ola'),
  ('startups', 'BYJU''S'),
  ('startups', 'Zerodha'),
  ('startups', 'CRED'),
  ('startups', 'Dream11'),
  ('startups', 'Nykaa'),
  ('startups', 'Meesho'),
  ('startups', 'Razorpay'),
  ('startups', 'Unacademy'),
  ('startups', 'UPI'),
  ('startups', 'Aadhaar'),
  ('startups', 'JioMart'),
  ('startups', 'BigBasket'),
  ('startups', 'MakeMyTrip'),
  ('startups', 'boAt')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('isro-science', 'ISRO & Science', '🛰️', 'Technology', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('isro-science', 'Chandrayaan-3'),
  ('isro-science', 'Mangalyaan'),
  ('isro-science', 'ISRO'),
  ('isro-science', 'APJ Abdul Kalam'),
  ('isro-science', 'CV Raman'),
  ('isro-science', 'Homi Bhabha'),
  ('isro-science', 'Vikram Sarabhai'),
  ('isro-science', 'Gaganyaan'),
  ('isro-science', 'Aditya-L1'),
  ('isro-science', 'PSLV'),
  ('isro-science', 'GSLV'),
  ('isro-science', 'Satish Dhawan Space Centre'),
  ('isro-science', 'Aryabhata'),
  ('isro-science', 'DRDO'),
  ('isro-science', 'Agni Missile'),
  ('isro-science', 'BrahMos'),
  ('isro-science', 'Param Supercomputer'),
  ('isro-science', 'Srinivasa Ramanujan'),
  ('isro-science', 'Jagadish Chandra Bose'),
  ('isro-science', 'Tejas')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('brands', 'Iconic Brands', '🏢', 'Brands', 'easy')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('brands', 'Amul'),
  ('brands', 'Tata'),
  ('brands', 'Reliance'),
  ('brands', 'Infosys'),
  ('brands', 'Mahindra'),
  ('brands', 'Haldiram''s'),
  ('brands', 'Parle-G'),
  ('brands', 'Britannia'),
  ('brands', 'Bajaj'),
  ('brands', 'Godrej'),
  ('brands', 'Titan'),
  ('brands', 'Royal Enfield'),
  ('brands', 'Asian Paints'),
  ('brands', 'Dabur'),
  ('brands', 'Patanjali'),
  ('brands', 'MDH'),
  ('brands', 'Fevicol'),
  ('brands', 'Maggi'),
  ('brands', 'Thums Up'),
  ('brands', 'Lijjat Papad')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('culture', 'Indian Culture', '🎨', 'General India', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('culture', 'Bharatanatyam'),
  ('culture', 'Kathak'),
  ('culture', 'Kathakali'),
  ('culture', 'Kuchipudi'),
  ('culture', 'Yoga'),
  ('culture', 'Ayurveda'),
  ('culture', 'Mehendi'),
  ('culture', 'Rangoli'),
  ('culture', 'Sari'),
  ('culture', 'Kurta'),
  ('culture', 'Tabla'),
  ('culture', 'Sitar'),
  ('culture', 'Veena'),
  ('culture', 'Carnatic Music'),
  ('culture', 'Madhubani Painting'),
  ('culture', 'Warli Art'),
  ('culture', 'Namaste'),
  ('culture', 'Bindi'),
  ('culture', 'Bangles'),
  ('culture', 'Turban')
  on conflict (category_id, word) do nothing;

insert into public.categories (id, name, emoji, grp, difficulty) values ('famous-personalities', 'Famous Personalities', '🌟', 'General India', 'medium')
  on conflict (id) do update set name = excluded.name, emoji = excluded.emoji, grp = excluded.grp, difficulty = excluded.difficulty;
insert into public.words (category_id, word) values
  ('famous-personalities', 'APJ Abdul Kalam'),
  ('famous-personalities', 'Ratan Tata'),
  ('famous-personalities', 'Mukesh Ambani'),
  ('famous-personalities', 'Narayana Murthy'),
  ('famous-personalities', 'Lata Mangeshkar'),
  ('famous-personalities', 'AR Rahman'),
  ('famous-personalities', 'Amitabh Bachchan'),
  ('famous-personalities', 'Mother Teresa'),
  ('famous-personalities', 'Rabindranath Tagore'),
  ('famous-personalities', 'Swami Vivekananda'),
  ('famous-personalities', 'Dr BR Ambedkar'),
  ('famous-personalities', 'Kiran Bedi'),
  ('famous-personalities', 'Sundar Pichai'),
  ('famous-personalities', 'Satya Nadella'),
  ('famous-personalities', 'Verghese Kurien'),
  ('famous-personalities', 'MS Subbulakshmi'),
  ('famous-personalities', 'Zakir Hussain'),
  ('famous-personalities', 'Ruskin Bond'),
  ('famous-personalities', 'RK Laxman'),
  ('famous-personalities', 'Premchand')
  on conflict (category_id, word) do nothing;

