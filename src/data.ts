export interface AnalysisData {
  type: 'vocab' | 'phrase' | 'sentence';
  text: string;
  explanation: string;
}

export interface AnswerVersion {
  score: string;
  answer: string | string[];
  analysis?: AnalysisData[];
}

export interface SampleAnswerData {
  question: string;
  versions: AnswerVersion[];
}

export interface CueCardData {
  id: string;
  title: string;
  category: string;
  categoryClass: string;
  status?: 'New';
  // Part 1
  part1Questions?: string[];
  sampleAnswers?: SampleAnswerData[];
  // Part 2+3
  part2Title?: string;
  part2Description?: string;
  part2Prompts?: string[];
  part3Questions?: string[];
}

export interface TopicData {
  id: string;
  title: string;
  cards: CueCardData[];
  isNew?: boolean;
}

export const initialPart1Data: TopicData[] = [
  {
    id: 'box-part1-topic-a',
    title: '话题: 人物与社交',
    cards: [
      {
        id: 'p1-c1',
        title: 'Friends',
        category: '人物题',
        categoryClass: 'person-card',
        status: 'New',
        part1Questions: [
          'Do you have a friend you have known for a long time?',
          'What do you usually do with your friends?',
          'Where do you often meet each other?',
          'How often do you go out with your friends?',
          'How important are friends to you?',
          'Do you prefer to spend time with one friend or with a group of friends?',
          'Would you invite friends to your home?',
          'Is there a difference between where you meet friends now and where you used to meet them in the past?',
          'Why are some places suitable for meeting while others are not?',
        ],
        sampleAnswers: [
          {
            question: 'Do you have a friend you have known for a long time?',
            versions: [
              {
                  score: '5.5',
                  answer: "Yes, I have a very good friend. Her name is Li Mei. We met in middle school, so we have known each other for more than ten years.",
                  analysis: [
                    { type: 'phrase', text: 'have known each other for', explanation: '使用现在完成时，准确表达“认识(并持续)了多久”。' },
                    { type: 'vocab', text: 'middle school', explanation: '“中学”，是描述学习阶段的常用词。' },
                  ],
              },
              {
                  score: '6.0',
                  answer: "Yes, definitely. My best friend is someone I've known since middle school, so we've been friends for over a decade. Her name is Li Mei, and she's practically like a sister to me.",
                  analysis: [
                      { type: 'vocab', text: 'definitely', explanation: '“当然”，比 "yes" 语气更强，更显流利。' },
                      { type: 'vocab', text: 'decade', explanation: '“十年”，比 "ten years" 更简洁、书面化，用在口语中可以加分。' },
                      { type: 'vocab', text: 'practically', explanation: '“几乎，实际上”，用来强调关系非常亲密，接近于家人。' },
                  ]
              },
              {
                  score: '6.5',
                  answer: "Absolutely. I have a very close friend whom I've known for what feels like a lifetime. We actually met back in middle school, so it must be over ten years now. She's one of my closest confidantes, and our bond is more like sisters than just friends.",
                  analysis: [
                      { type: 'vocab', text: 'Absolutely', explanation: '“当然，毫无疑问”，比 "yes" 或 "definitely" 语气更强烈，表达非常肯定的态度。' },
                      { type: 'phrase', text: 'what feels like a lifetime', explanation: '一个地道的习语，意思是“感觉像一辈子那么久”，夸张地强调了认识时间之长。' },
                      { type: 'vocab', text: 'confidantes', explanation: '“闺蜜，知己”，一个更高级的词汇，特指可以分享秘密的亲密朋友。' },
                      { type: 'vocab', text: 'bond', explanation: '名词，意为“纽带，联系”，用来形容人与人之间的紧密关系，比 "relationship" 更强调情感联系。' },
                  ]
              }
            ]
          },
          {
            question: 'What do you usually do with your friends?',
            versions: [
                {
                    score: '5.5',
                    answer: "We do many things together. We often go to a cafe to chat for a few hours. Sometimes we go shopping or watch a new movie.",
                    analysis: [
                      { type: 'phrase', text: 'chat for a few hours', explanation: '表达“聊上几个小时”，生动地描述了与朋友相聚的愉快时光。' },
                    ],
                },
                {
                    score: '6.0',
                    answer: "Well, it really depends, but we have a few favorite activities. We often hang out at a local café to catch up. If we have more time, we might go shopping downtown or see the latest blockbuster at the cinema.",
                    analysis: [
                        { type: 'phrase', text: 'it really depends', explanation: '一个非常实用的口语开场白，表示情况不一，让回答更具弹性。' },
                        { type: 'phrase', text: 'hang out', explanation: '“一起玩，待在一起”，非常地道口语化的表达，比 "spend time together" 更自然。' },
                        { type: 'phrase', text: 'catch up', explanation: '“聊聊近况”，指与有段时间没见的人更新彼此的最新消息。' },
                        { type: 'vocab', text: 'blockbuster', explanation: '“大片”，特指非常成功、受欢迎的电影。' },
                    ]
                },
                {
                    score: '6.5',
                    answer: "Our activities vary quite a bit, but we generally enjoy low-key meetups. A typical get-together for us would be grabbing a coffee and just chatting for hours. Occasionally, if we're feeling more adventurous, we might explore a new restaurant in a different part of the city or go to a live music show.",
                    analysis: [
                        { type: 'vocab', text: 'vary', explanation: '动词，“变化，不同”，比 "are different" 更简洁。' },
                        { type: 'phrase', text: 'low-key meetups', explanation: '指“轻松随意的聚会”，表明不喜欢太吵闹或复杂的活动。' },
                        { type: 'phrase', text: 'A typical get-together', explanation: '“一次典型的聚会”，非常地道的说法。' },
                        { type: 'vocab', text: 'Occasionally', explanation: '“偶尔”，比 "sometimes" 更正式一点，可以替换使用以展示词汇多样性。' },
                        { type: 'vocab', text: 'adventurous', explanation: '“有冒险精神的”，在这里用来形容愿意尝试新事物。' },
                    ]
                }
            ]
          },
          {
            question: 'Where do you often meet each other?',
            versions: [{
              score: '5.5',
              answer: "We usually meet at a coffee shop near my house because it is quiet and comfortable. Sometimes we also meet at a big shopping mall in the city center. It is convenient because we can eat and shop in the same place. It depends on what we want to do that day.",
              analysis: [
                  { type: 'vocab', text: 'convenient', explanation: '意为“方便的”，是描述地点、服务或时间安排时非常有用的高频词。'},
                  { type: 'phrase', text: 'in the city center', explanation: '表示“在市中心”，是描述地点时常用的固定搭配。'},
                  { type: 'sentence', text: 'It depends on what we want to do that day', explanation: '一个非常实用的口语表达，意思是“这取决于我们那天想做什么”，可以用来回答很多不确定的问题，展示语言的灵活性。'}
              ]
            }]
          },
          { question: 'How often do you go out with your friends?', versions: [{ score: '5.5', answer: "I try to meet my friends every week, maybe on Saturday or Sunday. But sometimes we are all very busy with our work or study. So, maybe we meet two or three times a month. We use phone to chat when we cannot meet." }] },
          { question: 'How important are friends to you?', versions: [{ score: '5.5', answer: "For me, friends are very, very important. They are like my second family. When I have problems, I can talk to them and they always give me good advice. When I am happy, I share my happiness with them. Life would be very boring without friends." }] },
          { question: 'Do you prefer to spend time with one friend or with a group of friends?', versions: [{ score: '5.5', answer: "I think both are good, but for different situations. If I want to have a deep conversation, I prefer to meet with only one friend. But if I want to have fun, like for a birthday party, I like to be with a big group of friends. It is more lively with more people." }] },
          { question: 'Would you invite friends to your home?', versions: [{ score: '5.5', answer: "Yes, of course. I like inviting my close friends to my home. We can cook dinner together, watch TV, and just relax. It feels more comfortable and private than meeting outside. My parents also like to meet my friends." }] },
          { question: 'Is there a difference between where you meet friends now and where you used to meet them in the past?', versions: [{ score: '5.5', answer: "Yes, there is a big difference. When we were students, we usually met at school or near our homes, like in a park. We didn't have much money. Now, we are working, so we have more money. We often meet in nice restaurants or cafes in the city." }] },
          { question: 'Why are some places suitable for meeting while others are not?', versions: [{ score: '5.5', answer: "I think some places like cafes or parks are good for meeting because they are not too loud, so we can talk easily. A library is not suitable because we must be very quiet. Also, a very crowded place like a train station is not good because it is hard to find each other and have a good conversation." }] }
        ]
      },
      { 
        id: 'p1-c11', 
        title: 'Staying with old people', 
        category: '事件题', 
        categoryClass: 'event-card', 
        status: 'New',
        part1Questions: [
          'Have you ever worked with old people?',
          'Are you happy to work with people who are older than you?',
          'What are the benefits of being friends with or working with old people?',
          'Do you enjoy spending time with old people?',
        ],
        sampleAnswers: [
          { question: 'Have you ever worked with old people?', versions: [{ score: '5.5', answer: "No, I have never had a job where I worked with old people. I am a student now. But I often help my grandparents with things at their home, like cleaning or using the computer. So in a way, I have some experience with them." }] },
          { question: 'Are you happy to work with people who are older than you?', versions: [{ score: '5.5', answer: "Yes, I think I would be happy. Older people have a lot of experience in work and life. I believe I can learn many useful things from them. They are usually more patient and can be good teachers for young people like me." }] },
          { question: 'What are the benefits of being friends with or working with old people?', versions: [{ score: '5.5', answer: "There are many benefits. First, they can share their wisdom and give very good advice for problems. Second, they often tell interesting stories about the past, which is like a history lesson. Also, being friends with them can make you feel more calm and patient." }] },
          { question: 'Do you enjoy spending time with old people?', versions: [{ score: '5.5', answer: "Yes, I really enjoy it, especially with my own grandparents. It is very relaxing to spend time with them. We usually just talk, drink tea, and watch TV. I feel very peaceful and loved when I am with them." }] }
        ]
      },
    ]
  },
  {
    id: 'box-part1-topic-b',
    title: '话题: 地点',
    cards: [
      { 
        id: 'p1-c4', 
        title: 'Museum', 
        category: '地点题', 
        categoryClass: 'place-card', 
        status: 'New',
        part1Questions: [
            'Do you think museums are important?',
            'Are there many museums in your hometown?',
            'Do you often visit a museum?',
            'When was the last time you visited a museum?',
        ],
        sampleAnswers: [
            { question: 'Do you think museums are important?', versions: [{ score: '5.5', answer: "Yes, I think museums are very important. They are like history books, but with real things. We can learn a lot about the past, about art, and about science from museums. They help us understand where we come from and protect important things for the future." }] },
            { question: 'Are there many museums in your hometown?', versions: [{ score: '5.5', answer: "In my hometown, there are not many museums. It is a small city. We have one main museum about the history of our city. But if you go to a big city like Beijing or Shanghai, there are many different kinds of museums." }] },
            { question: 'Do you often visit a museum?', versions: [{ score: '5.5', answer: "To be honest, I don't visit museums very often. Maybe once or twice a year. I am usually busy with my studies. But I do enjoy it when I go. I like to go with friends or family, so we can talk about the things we see." }] },
            { question: 'When was the last time you visited a museum?', versions: [{ score: '5.5', answer: "The last time I visited a museum was about six months ago. I went to the city's history museum with my classmates for a school project. We saw many old photos and objects from our city's past. It was quite interesting." }] }
        ]
      },
      { 
        id: 'p1-c9', 
        title: 'Crowded place', 
        category: '地点题', 
        categoryClass: 'place-card', 
        status: 'New',
        part1Questions: [
            'Is the city where you live crowded?',
            'Is there a crowded place near where you live?',
            'Do you like crowded places?',
            'Do most people like crowded places?',
            'When was the last time you were in a crowded place?',
        ],
        sampleAnswers: [
            { question: 'Is the city where you live crowded?', versions: [{ score: '5.5', answer: "Yes, the city where I live is quite crowded, especially in the city center. There are many people, cars, and buses everywhere during the day. It is a big city with a large population, so it's always busy." }] },
            { question: 'Is there a crowded place near my home?', versions: [{ score: '5.5', answer: "Yes, there is a very crowded place near my home. It's a big shopping mall. On weekends, it is full of people. There are many shops, restaurants, and a cinema inside, so it attracts a lot of visitors." }] },
            { question: 'Do you like crowded places?', versions: [{ score: '5.5', answer: "It depends. Sometimes I like the energy of a crowded place, like at a concert. But most of the time, I prefer quiet places. I don't like being in a crowded subway. It can be a bit stressful." }] },
            { question: 'Do most people like crowded places?', versions: [{ score: '5.5', answer: "I think many young people do. Crowded places are often popular for a reason - they have good shopping, food, or entertainment. They enjoy the lively atmosphere of busy places." }] },
            { question: 'When was the last time you were in a crowded place?', versions: [{ score: '5.5', answer: "The last time was just last weekend. I went to a shopping mall to buy a birthday present for my friend. It was Saturday afternoon, so it was extremely crowded. It was difficult to walk around." }] }
        ]
      },
      { 
        id: 'p1-c15', 
        title: 'Public places', 
        category: '地点题', 
        categoryClass: 'place-card', 
        status: 'New',
        part1Questions: [
            'Have you ever talked with someone you don\'t know in public places?',
            'Do you wear headphones in public places?',
            'Would you like to see more public places near where you live?',
            'Do you often go to public places with your friends?',
        ],
        sampleAnswers: [
            { question: 'Have you ever talked with someone you don\'t know in public places?', versions: [{ score: '5.5', answer: "Not really. I'm a bit shy, so I usually don't start conversations with strangers. Sometimes an older person might ask for directions, and I'm happy to help, but I don't usually have long talks with people I don't know." }] },
            { question: 'Do you wear headphones in public places?', versions: [{ score: '5.5', answer: "Yes, I almost always wear headphones when I'm on the bus or subway. I like to listen to music or podcasts. It makes the travel time more enjoyable and helps me relax. It also blocks out the noise of the city." }] },
            { question: 'Would you like to see more public places near where you live?', versions: [{ score: '5.5', answer: "Yes, definitely. I would love to have more parks or green spaces near my home. A nice park is a great place to relax, exercise, or just enjoy nature. Right now, the nearest park is a bit far from my apartment." }] },
            { question: 'Do you often go to public places with your friends?', versions: [{ score: '5.5', answer: "Yes, I do. My friends and I often meet in public places like cafes, shopping malls, or cinemas. These places are convenient for everyone to get to. In the summer, we sometimes go to a park to have a picnic or play sports." }] }
        ]
      },
    ]
  },
  {
    id: 'box-part1-topic-c',
    title: '话题: 活动与爱好',
    cards: [
      { 
        id: 'p1-c2', 
        title: 'Sharing', 
        category: '事件题', 
        categoryClass: 'event-card', 
        status: 'New',
        part1Questions: [
            'Did your parents teach you to share when you were a child?',
            'What kind of things do you like to share with others?',
            'What kind of things are not suitable for sharing?',
            'Do you have anything to share with others recently?',
            'Who is the first person you would like to share good news with?',
            'Do you prefer to share news with your friends or your parents?',
        ],
        sampleAnswers: [
            { question: 'Did your parents teach you to share when you were a child?', versions: [{ score: '5.5', answer: "Yes, they did. When I was a child, my parents always taught me that sharing is a good thing. They encouraged me to share my toys and snacks with my brother and my friends. I think it was a very important lesson." }] },
            { question: 'What kind of things do you like to share with others?', versions: [{ score: '5.5', answer: "I like to share many things. For example, I enjoy sharing food with my colleagues at work. I also like to share interesting articles or funny videos I find online with my friends. It's a good way to connect with people." }] },
            { question: 'What kind of things are not suitable for sharing?', versions: [{ score: '5.5', answer: "I think very personal items are not suitable for sharing, like a toothbrush or a towel, for hygiene reasons. Also, I believe we shouldn't share secrets that other people have told us. It's a matter of trust." }] },
            { question: 'Do you have anything to share with others recently?', versions: [{ score: '5.5', answer: "Yes, I recently read a very interesting book. I shared the story and my thoughts about it with my best friend yesterday. She seemed to enjoy it and said she might read the book too." }] },
            { question: 'Who is the first person you would like to share good news with?', versions: [{ score: '5.5', answer: "The first person I share good news with is usually my best friend. We are very close, and I know she will be genuinely happy for me. I always call her as soon as something exciting happens." }] },
            { question: 'Do you prefer to share news with your friends or your parents?', versions: [{ score: '5.5', answer: "It depends on the news. For small, daily things, I usually share them with my friends. But for very important news, like getting a new job, I would tell my parents first. They have more life experience and can give me good advice." }] }
        ]
      },
      { 
        id: 'p1-c6', 
        title: 'Borrowing/lending', 
        category: '事件题', 
        categoryClass: 'event-card', 
        status: 'New',
        part1Questions: [
            'Have you borrowed books from others?',
            'Have you ever borrowed money from others?',
            'Do you like to lend things to others?',
            'How do you feel when people don\'t return things they borrowed from you?',
            'Do you mind if others borrow money from you?',
        ],
        sampleAnswers: [
            { question: 'Have you borrowed books from others?', versions: [{ score: '5.5', answer: "Yes, many times. When I was a student, I often borrowed textbooks from the library or from older students to save money. I also like to borrow novels from my friends if they recommend a good one." }] },
            { question: 'Have you ever borrowed money from others?', versions: [{ score: '5.5', answer: "Yes, I have, but only for small amounts. For example, if I forget my wallet, I might borrow some money from a friend for lunch. I always make sure to pay them back as soon as possible, usually the same day." }] },
            { question: 'Do you like to lend things to others?', versions: [{ score: '5.5', answer: "I'm happy to lend things to my close friends and family because I trust them. If they need a book or my charger, it's no problem. But I am more careful about lending things to people I don't know very well." }] },
            { question: 'How do you feel when people don\'t return things they borrowed from you?', versions: [{ score: '5.5', answer: "I feel a little annoyed and disappointed. It's not usually about the object itself, but more about the principle. I think it's important to be responsible and return things. I might politely remind them once." }] },
            { question: 'Do you mind if others borrow money from you?', versions: [{ score: '5.5', answer: "For my close friends, if it's a small amount of money, I don't mind at all. I'm happy to help. However, I would feel uncomfortable lending a large sum of money. I think money can sometimes complicate friendships." }] }
        ]
      },
      { 
        id: 'p1-c7', 
        title: 'Chatting', 
        category: '事件题', 
        categoryClass: 'event-card', 
        status: 'New',
        part1Questions: [
            'Do you like chatting with friends?',
            'What do you usually chat about with friends?',
            'Do you prefer to chat with a group of people or with only one friend?',
            'Do you prefer to communicate face-to-face or via social media?',
            'Do you argue with friends?',
        ],
        sampleAnswers: [
            { question: 'Do you like chatting with friends?', versions: [{ score: '5.5', answer: "Yes, I love chatting with my friends. It's one of my favorite things to do. It helps me to relax and forget about any stress from work or study. Talking with them always makes me feel happy." }] },
            { question: 'What do you usually chat about with friends?', versions: [{ score: '5.5', answer: "We chat about all sorts of things. We talk about our daily lives, what happened at work or school, and our plans for the weekend. We also share opinions about movies, music, and sometimes we talk about our dreams for the future." }] },
            { question: 'Do you prefer to chat with a group of people or with only one friend?', versions: [{ score: '5.5', answer: "I like both, but they are different. When I am with only one friend, we can have a more serious and deep conversation. But chatting with a group of friends is more fun and lively. There's a lot of laughing and joking." }] },
            { question: 'Do you prefer to communicate face-to-face or via social media?', versions: [{ score: '5.5', answer: "I prefer face-to-face communication because you can see the person's expressions and body language. It feels more personal and real. However, social media is very convenient for quick chats and for staying in touch with friends who live far away." }] },
            { question: 'Do you argue with friends?', versions: [{ score: '5.5', answer: "Not really. We have disagreements sometimes, but we don't really argue. My friends and I respect each other's opinions. If we think differently about something, we just discuss it calmly. I believe good communication is key to a strong friendship." }] }
        ]
      },
      {
        id: 'p1-c3',
        title: 'Having a break',
        category: '事件题',
        categoryClass: 'event-card',
        status: 'New',
        part1Questions: [
          'How often do you take a rest or a break?',
          'What do you usually do when you are resting?',
          'Do you take a nap when you are taking your rest?',
          'How do you feel after taking a nap?',
        ],
        sampleAnswers: [
          {
            question: 'How often do you take a rest or a break?',
            versions: [{
                score: '5.5',
                answer: "I try to take a short break every hour when I'm studying or working. Besides that, I make sure to take a longer rest during the weekends. Life can be quite busy, so these breaks are really important for me to recharge my batteries.",
                analysis: [
                  { type: 'phrase', text: 'recharge my batteries', explanation: '一个地道的习语，意思是“恢复精力”，非常适合用在讨论休息的话题中。' }
                ]
            }]
          },
          {
            question: 'What do you usually do when you are resting?',
            versions: [{
                score: '5.5',
                answer: 'During my short breaks, I usually stand up and walk around a bit, or just listen to a piece of music. For longer rests, like on weekends, I enjoy watching a movie or reading a book. It helps me to take my mind off work.',
                analysis: [
                  { type: 'phrase', text: 'take my mind off work', explanation: '意思是“把思绪从工作中移开”，表达通过做某事来忘记烦恼或压力。' }
                ]
            }]
          },
          {
            question: 'Do you take a nap when you are taking your rest?',
            versions: [{
                score: '5.5',
                answer: "Yes, I'm a big fan of napping. I usually take a short nap for about 20 minutes after lunch if I have time. I find it's a very effective way to boost my energy for the afternoon.",
                analysis: [
                  { type: 'vocab', text: 'effective', explanation: '意为“有效的”，用来描述午睡带来的好效果，是高频实用词汇。' },
                  { type: 'phrase', text: 'boost my energy', explanation: '意思是“提升我的精力”，生动地表达了午睡的好处。' }
                ]
            }]
          },
          {
            question: 'How do you feel after taking a nap?',
            versions: [{
                score: '5.5',
                answer: 'Most of the time, I feel very refreshed and much more focused after a short nap. It’s like my brain has been reset. However, if I sleep for too long, I sometimes feel a bit groggy.',
                analysis: [
                  { type: 'vocab', text: 'refreshed', explanation: '意为“精神焕发的”，非常准确地描述了小睡后的良好感觉。' },
                  { type: 'vocab', text: 'groggy', explanation: '意为“昏昏沉沉的，头脑不清醒的”，用来描述睡太久后可能出现的不适感，是加分词汇。' }
                ]
            }]
          }
        ]
      },
      {
        id: 'p1-c8',
        title: 'Growing vegetables/fruits',
        category: '事件题',
        categoryClass: 'event-card',
        status: 'New',
        part1Questions: [
          'Are you interested in growing vegetables and fruits?',
          'Is growing vegetables popular in your country?',
          'Do many people grow vegetables in your city?',
          'Do you think it\'s easy to grow vegetables?',
          'Should schools teach students how to grow vegetables?',
        ],
        sampleAnswers: [
          {
            question: 'Are you interested in growing vegetables and fruits?',
            versions: [{ score: '5.5', answer: "Yes, I am quite interested. I think it would be very satisfying to eat something you grew yourself. I live in an apartment, so I don't have a garden, but I've tried growing some herbs like mint and basil on my balcony." }]
          },
          {
            question: 'Is growing vegetables popular in your country?',
            versions: [{ score: '5.5', answer: 'I would say it is more popular among the older generation, especially in the countryside where people have big yards. However, in recent years, it seems more young people are getting interested in it too, as a hobby.' }]
          },
          {
            question: 'Do many people grow vegetables in your city?',
            versions: [{
                score: '5.5',
                answer: 'Not many, because most people live in high-rise buildings and space is limited. Some people do grow small plants on their balconies, and I know a few community gardens are available, but it is not a common practice.',
                 analysis: [
                  { type: 'phrase', text: 'high-rise buildings', explanation: '指“高楼大厦”，准确描述了城市居民的居住环境。' },
                  { type: 'phrase', text: 'space is limited', explanation: '意思是“空间有限”，是解释为什么城市里种菜不普遍的常见原因。' }
                ]
            }]
          },
          {
            question: 'Do you think it\'s easy to grow vegetables?',
            versions: [{ score: '5.5', answer: "I don't think it's very easy. It requires knowledge about the right amount of sunlight and water. Also, you have to be patient and deal with pests. I think it takes some effort to be successful." }]
          },
          {
            question: 'Should schools teach students how to grow vegetables?',
            versions: [{
                score: '5.5',
                answer: "Yes, I think that's a great idea. It can be a very practical lesson. It teaches children where their food comes from, and it also helps them to develop a sense of responsibility as they need to take care of the plants every day.",
                analysis: [
                  { type: 'phrase', text: 'a sense of responsibility', explanation: '意思是“责任感”，是讨论教育类话题时非常有用的词组。' }
                ]
            }]
          }
        ]
      },
      {
        id: 'p1-c10',
        title: 'Going out',
        category: '事件题',
        categoryClass: 'event-card',
        status: 'New',
        part1Questions: [
          'Do you bring food or snacks with you when going out?',
          'Do you always take your mobile phone with you when going out?',
          'Do you often bring cash with you?',
          'How often do you use cash?',
        ],
        sampleAnswers: [
          {
            question: 'Do you bring food or snacks with you when going out?',
            versions: [{ score: '5.5', answer: "Not usually, unless I am going on a long trip, like hiking. If I'm just going out for a few hours in the city, it's very convenient to buy something to eat or drink, so I don't feel the need to carry snacks with me." }]
          },
          {
            question: 'Do you always take your mobile phone with you when going out?',
            versions: [{
                score: '5.5',
                answer: "Absolutely, I never leave home without it. It's essential for me. I use it for communication, for paying for things, and for navigation. I would feel quite lost and disconnected without my phone.",
                 analysis: [
                  { type: 'vocab', text: 'essential', explanation: '意为“必不可少的，极其重要的”，比 important 语气更强。' },
                  { type: 'vocab', text: 'disconnected', explanation: '意为“与外界失去联系的”，生动地描述了没有手机的感受。' }
                ]
            }]
          },
          {
            question: 'Do you often bring cash with you?',
            versions: [{ score: '5.5', answer: "Not really. Mobile payment is so common in my country that I rarely need cash. I might keep a small amount of cash in my wallet for emergencies, but I almost never use it." }]
          },
          {
            question: 'How often do you use cash?',
            versions: [{ score: '5.5', answer: 'Very rarely. Maybe once a month, if at all. The only time I might use cash is at some very small, traditional street food stalls that don\'t accept mobile payments. For everything else, from shopping to taking a taxi, I use my phone.' }]
          }
        ]
      },
      {
        id: 'p1-c12',
        title: 'Doing something well',
        category: '事件题',
        categoryClass: 'event-card',
        status: 'New',
        part1Questions: [
          'Do you have an experience when you did something well?',
          'Do you have an experience when your teacher thought you did a good job?',
          'Do you often tell your friends when they do something well?',
        ],
        sampleAnswers: [
          {
            question: 'Do you have an experience when you did something well?',
            versions: [{
                score: '5.5',
                answer: "Yes, I remember a time in university when I had to give a presentation for a project. I was very nervous, but I prepared a lot for it. In the end, the presentation went very smoothly and I got a high score. I felt a great sense of accomplishment.",
                analysis: [
                  { type: 'phrase', text: 'a great sense of accomplishment', explanation: '意思是“巨大的成就感”，是描述成功完成某事后心情的绝佳表达。' }
                ]
            }]
          },
          {
            question: 'Do you have an experience when your teacher thought you did a good job?',
            versions: [{ score: '5.5', answer: "Yes. In my high school English class, we had to write a short story. I spent a lot of time on it and tried to be creative. My teacher really liked it and she even read it out to the whole class as an example. I felt very proud of myself that day." }]
          },
          {
            question: 'Do you often tell your friends when they do something well?',
            versions: [{
                score: '5.5',
                answer: "Yes, I do. I believe it's important to give encouragement and compliments. When I see my friend achieve something, whether it's big or small, I always tell them they did a good job. It makes them happy and it strengthens our friendship.",
                analysis: [
                  { type: 'vocab', text: 'compliments', explanation: '意为“赞美，称赞”，是比 praise 更日常的用词。' },
                  { type: 'phrase', text: 'strengthens our friendship', explanation: '意思是“增进我们的友谊”，说明了赞美朋友的积极作用。' }
                ]
            }]
          }
        ]
      },
    ]
  },
  {
    id: 'box-part1-topic-d',
    title: '话题: 事物',
    cards: [
      { 
        id: 'p1-c5', 
        title: 'Advertisement', 
        category: '事物题', 
        categoryClass: 'object-card', 
        status: 'New',
        part1Questions: [
          'Is there an advertisement that made an impression on you when you were a child?',
          'Do you see a lot of advertising on trains or other transport?',
          'Do you like advertisements?',
          'What kind of advertising do you like?',
          'Do you often see advertisements when you are on your phone or computer?',
        ],
        sampleAnswers: [
          {
            question: 'Is there an advertisement that made an impression on you when you were a child?',
            versions: [
              {
                score: '5.5',
                answer: "Yes, I remember an ad for a kind of candy. It was very colorful and had a happy song. Many children in my school sang the song. Every time I saw it, I wanted to eat that candy.",
                analysis: [
                  { type: 'phrase', text: 'made an impression on you', explanation: '直接使用问题中的短语，是开始回答的一个好方法。' },
                  { type: 'vocab', text: 'colorful', explanation: '“色彩鲜艳的”，一个简单但有效的形容词，用来描述广告的视觉效果。' },
                ],
              },
              {
                score: '6.0',
                answer: "Yes, definitely. There was this one TV commercial for a soft drink that was really memorable. It featured a famous pop star and had a very catchy jingle. The ad was so popular that everyone at school knew the song, and it made me really want to try that drink.",
                analysis: [
                  { type: 'vocab', text: 'commercial', explanation: '“商业广告”，比 "ad" 更具体，尤其指电视或广播广告。' },
                  { type: 'vocab', text: 'memorable', explanation: '“难忘的”，一个很好的词汇，用来形容广告效果。' },
                  { type: 'phrase', text: 'catchy jingle', explanation: '“上口的广告歌曲”，非常地道和专业的表达，是描述广告音乐的绝佳词组。' },
                ],
              },
              {
                score: '6.5',
                answer: "Absolutely. An advertisement that has stuck with me since childhood is one for a public service announcement about saving water. It wasn't for a product, but its message was powerful. It showed a single drop of water turning into a tear, which was visually striking and emotionally impactful. It really made me aware of the importance of conservation from a young age.",
                analysis: [
                  { type: 'phrase', text: 'stuck with me', explanation: '一个地道的习语，意思是“给我留下了深刻印象，至今难忘”。' },
                  { type: 'phrase', text: 'public service announcement', explanation: '“公益广告”，一个更高级和具体的词汇。' },
                  { type: 'vocab', text: 'powerful', explanation: '“有力量的，有感染力的”，用来形容信息的冲击力。' },
                  { type: 'phrase', text: 'visually striking', explanation: '“视觉上很震撼”，用来描述画面效果的高分词组。' },
                ],
              },
            ]
          },
          {
            question: 'Do you see a lot of advertising on trains or other transport?',
            versions: [{
              score: '5.5',
              answer: "Yes, a lot. On the subway, the walls are covered with ads. There are also small TVs that show video ads. You see them everywhere, for phones, for food, for movies. It is impossible not to see them.",
              analysis: [
                { type: 'phrase', text: 'covered with ads', explanation: '“贴满了广告”，生动地描述了广告的数量之多。' },
                { type: 'vocab', text: 'impossible', explanation: '“不可能的”，用来强调广告的无处不在，语气强烈。' },
              ],
            }]
          },
          {
            question: 'Do you like advertisements?',
            versions: [{
              score: '5.5',
              answer: "It depends. Some ads are interesting and funny, I like those. But some ads are very boring and they appear again and again. I don't like those. Also, some ads on the internet are very annoying.",
              analysis: [
                { type: 'phrase', text: 'It depends', explanation: '一个非常实用的口语开场白，表示情况不一，让回答更具弹性，而不是简单的“是”或“否”。' },
                { type: 'phrase', text: 'again and again', explanation: '“一次又一次”，简单地表达了“重复”的意思。' },
                { type: 'vocab', text: 'annoying', explanation: '“烦人的”，准确地描述了对某些广告的负面感受。' },
              ],
            }]
          },
          {
            question: 'What kind of advertising do you like?',
            versions: [{
              score: '5.5',
              answer: "I like advertisements that tell a short story. Some ads are like a mini-movie, they are very creative. They don't just sell a product, they make you feel something. I think these are the best kinds of ads.",
              analysis: [
                { type: 'phrase', text: 'tell a short story', explanation: '描述了叙事性广告的特点，使回答更具体。' },
                { type: 'vocab', text: 'creative', explanation: '“有创意的”，是评价广告时非常常用的正面词汇。' },
                { type: 'phrase', text: 'make you feel something', explanation: '简单而有效地表达了广告能引发情感共鸣。' },
              ],
            }]
          },
          {
            question: 'Do you often see advertisements when you are on your phone or computer?',
            versions: [{
              score: '5.5',
              answer: "Yes, all the time. When I watch videos online, there are always ads before the video starts. Also, when I use social media apps, I see many ads between the posts. Sometimes they are for things I searched for before, which is a bit strange.",
              analysis: [
                { type: 'phrase', text: 'all the time', explanation: '“一直，总是”，非常口语化的表达，强调频率之高。' },
                { type: 'phrase', text: 'social media apps', explanation: '“社交媒体应用”，准确的现代术语。' },
                { type: 'sentence', text: 'Sometimes they are for things I searched for before, which is a bit strange.', explanation: '用简单的语言描述了“定向广告”(targeted ads) 的现象，并表达了Lipstick感受，使回答更具个人色彩。' },
              ],
            }]
          },
        ],
      },
      { 
        id: 'p1-c14', 
        title: 'Rules', 
        category: '事物题', 
        categoryClass: 'object-card', 
        status: 'New',
        part1Questions: [
          'Are there any rules for students at your school?',
          'Do you think students would benefit more from more rules?',
          'Have you ever had a really dedicated teacher?',
          'Do you prefer to have more or fewer rules at school?',
          'Have you ever had a really strict teacher?',
          'Would you like to work as a teacher in a rule-free school?',
        ],
      },
      { 
        id: 'p1-c13', 
        title: 'Shoes', 
        category: '事物题', 
        categoryClass: 'object-card', 
        status: 'New',
        part1Questions: [
          'Do you like buying shoes? How often?',
          'Have you ever bought shoes online?',
          'How much money do you usually spend on shoes?',
          'Which do you prefer, fashionable shoes or comfortable shoes?',
        ],
      },
      { 
        id: 'p1-c16', 
        title: 'Plants', 
        category: '事物题', 
        categoryClass: 'object-card', 
        status: 'New',
        part1Questions: [
          'Do you keep plants at home?',
          'What plant did you grow when you were young?',
          'Do you know anything about growing a plant?',
          'Do Chinese people send plants as gifts?',
        ],
      },
    ]
  }
];

export const initialPart2Data: TopicData[] = [
    {
        id: 'box-topic-people',
        title: '话题: 人物题',
        cards: [
            { 
              id: 'p2-c1', 
              title: '重要的好朋友',
              category: '人物题', 
              categoryClass: 'person-card', 
              status: 'New',
              part2Title: 'Describe a good friend who is important to you',
              part2Description: 'You should say:',
              part2Prompts: [
                  'Who he/she is',
                  'How/where you got to know him/her',
                  'How long you have known each other',
                  'And explain why he/she is important to you',
              ],
              part3Questions: [
                  'How do children make friends at school?',
                  'How do children make friends when they are not at school?',
                  'Do you think it is better for children to have a few close friends or many casual friends?',
                  "Do you think a child's relationship with friends can be replaced by that with other people, like parents or other family members?",
                  'What are the differences between friends made inside and outside the workplace?',
                  "Do you think it's possible for bosses and their employees to become friends?",
              ],
              sampleAnswers: [
                {
                  question: "Part 2: Describe a good friend who is important to you",
                  versions: [{
                    score: '5.5',
                    answer: [
                      "I’d like to talk about a good friend who is very important to me. She is my roommate in school. She is older than me by one year, and she is very tall and beautiful. She is also the first good friend I made when I came to this new school.",
                      "We first got to know each other because we live in the same dormitory. At the beginning, I felt a bit lonely in the new school, but she always talked with me and made me feel comfortable. We later found out that we have the same hobbies. For example, we both like playing the same games, so our conversations are always fun and interesting.",
                      "I have known her for about one year. During this time, she has taken good care of me. She often shares snacks with me in the dormitory. When I feel unhappy, she will comfort me and tell some jokes to make me laugh. She also helps me with my studies. For example, if I don’t understand a math problem, she will explain it to me patiently.",
                      "On weekends or holidays, we usually go shopping together. Sometimes we buy some delicious food like milk tea, cake, or ice cream. Sometimes we buy clothes and take photos together. I always feel happy when I spend time with her.",
                      "She is important to me because she is not only a good friend but also like a sister. She supports me when I face difficulties and makes my school life more colorful. I really hope our friendship can last forever."
                    ],
                    analysis: [
                      { type: 'phrase', text: 'got to know each other', explanation: '一个非常自然的动词短语，意思是“开始认识对方”，比 "we met" 更具描述性。' },
                      { type: 'phrase', text: 'made me feel comfortable', explanation: '表达“让我感到自在”，生动地描述了朋友带来的积极影响。' },
                      { type: 'vocab', text: 'hobbies', explanation: '意为“爱好”，是谈论个人兴趣时的高频词汇。' },
                      { type: 'phrase', text: 'taken good care of me', explanation: '一个温暖的表达，意思是“把我照顾得很好”，体现了朋友的关心。' },
                      { type: 'vocab', text: 'comfort', explanation: '动词，意为“安慰”，准确地描述了朋友在自己不开心时所做的事情。' },
                      { type: 'phrase', text: 'makes my school life more colorful', explanation: '一个生动的比喻，意思是“让我的校园生活更加丰富多彩”，是加分表达。' },
                      { type: 'phrase', text: 'last forever', explanation: '意思是“永远持续下去”，常用来表达对友谊或感情的美好祝愿。' },
                    ],
                  }]
                },
                {
                  question: "How do children make friends at school?",
                  versions: [{
                    score: '5.5',
                    answer: "In my view, children primarily make friends at school through shared activities and being in the same class. The main reason is that school provides a structured environment where they spend a lot of time together, which naturally leads to interaction. For instance, they might become friends with the person sitting next to them, or with teammates in a sports club like basketball, because they have to cooperate and communicate regularly.",
                    analysis: [
                      { type: 'phrase', text: 'In my view', explanation: ' (Point) - 这是表明个人观点的常用短语，是 PRE 结构的一个很好的开始。' },
                      { type: 'phrase', text: 'The main reason is that', explanation: ' (Reason) - 清晰地引出解释，让你的论述更有条理。' },
                      { type: 'phrase', text: 'For instance', explanation: ' (Example) - 引出具体例子来支撑你的理由，使回答更有说服力。' },
                    ],
                  }]
                },
                {
                    question: "How do children make friends when they are not at school?",
                    versions: [{
                        score: '5.5',
                        answer: "I believe that outside of school, children often make friends through neighborhood connections or organized extracurricular activities. This is because these settings offer chances to meet peers who share similar interests or live in the same area. For example, a child might befriend others who live on the same street and play together in a local park. Also, joining a weekend piano class can lead to new friendships.",
                        analysis: [
                            { type: 'phrase', text: 'I believe that', explanation: '(Point) - 用来引出你的主要观点。' },
                            { type: 'sentence', text: 'This is because these settings offer chances to meet peers who share similar interests.', explanation: '(Reason) - 解释为什么这些地方是交朋友的好机会，逻辑清晰。' },
                            { type: 'phrase', text: 'For example', explanation: '(Example) - 提供具体的例子，如在公园玩或上钢琴课，让回答更具体。' }
                        ]
                    }]
                },
                {
                    question: "Do you think it is better for children to have a few close friends or many casual friends?",
                    versions: [{
                        score: '5.5',
                        answer: "I think it's more beneficial for children to have a few close friends. The primary reason is that close friendships provide deeper emotional support and help children develop important social skills like trust and empathy. For example, a child with one or two best friends has someone they can confide in when they are sad. This is more valuable for their emotional development than having many acquaintances.",
                        analysis: [
                            { type: 'sentence', text: "I think it's more beneficial for children to have a few close friends.", explanation: '(Point) - 直接明了地回答问题，表明你的立场。' },
                            { type: 'vocab', text: 'emotional support', explanation: '(Reason) - “情感支持”，一个很好的词组，解释了亲密友谊的核心价值。' },
                            { type: 'phrase', text: 'confide in', explanation: '(Example) - “向……倾诉”，动词短语，用在例子中非常贴切，展示了词汇量。' }
                        ]
                    }]
                },
                {
                    question: "Do you think a child's relationship with friends can be replaced by that with other people, like parents or other family members?",
                    versions: [{
                        score: '5.5',
                        answer: "In my opinion, relationships with family members cannot completely replace friendships. This is because friends offer a different type of relationship based on peer equality, which is crucial for developing a social identity. For instance, a child learns how to negotiate and resolve conflicts with friends in a way they wouldn't with their parents. These peer interactions are an essential part of growing up.",
                        analysis: [
                            { type: 'phrase', text: 'In my opinion', explanation: '(Point) - 开始回答，清晰地表达你的观点。' },
                            { type: 'vocab', text: 'peer equality', explanation: '(Reason) - “同伴间的平等”，一个非常准确的术语，点出了友谊和亲子关系的关键区别。' },
                            { type: 'phrase', text: 'resolve conflicts', explanation: '(Example) - “解决冲突”，用具体的例子说明孩子们能从朋友那里学到什么。' }
                        ]
                    }]
                },
                {
                    question: "What are the differences between friends made inside and outside the workplace?",
                    versions: [{
                        score: '5.5',
                        answer: "I'd say there are several key differences, mainly about the context of the relationship. Workplace friendships are often formed based on shared professional experiences, while friendships outside of work are typically based on personal interests. For example, you might be friendly with a colleague because you work on the same projects. In contrast, a friend you made in a hiking group shares a personal passion, and the bond is often less formal.",
                        analysis: [
                            { type: 'sentence', text: "I'd say there are several key differences...", explanation: '(Point) - 直接回答问题，并预告你将要讨论的内容。' },
                            { type: 'phrase', text: 'based on', explanation: '(Reason) - 一个非常有用的短语，用来解释两种友谊的基础有何不同。' },
                            { type: 'vocab', text: 'colleague', explanation: '(Example) - “同事”，工作场景下的高频词汇。' }
                        ]
                    }]
                },
                {
                    question: "Do you think it's possible for bosses and their employees to become friends?",
                    versions: [{
                        score: '5.5',
                        answer: "Yes, I think it's possible, but it can be complicated. The reason is the inherent power imbalance in the boss-employee relationship can make a genuine friendship difficult. For example, if a manager is close friends with one employee, other team members might feel it's unfair when it comes to promotions. To make it work, they must maintain clear boundaries.",
                        analysis: [
                            { type: 'vocab', text: 'complicated', explanation: '(Point) - “复杂的”，一个很好的词来概括这种情况，展示了你思考的深度。' },
                            { type: 'phrase', text: 'power imbalance', explanation: '(Reason) - “权力不平衡”，一个高级词组，准确地指出了问题的核心。' },
                            { type: 'phrase', text: 'maintain clear boundaries', explanation: '(Example) - “保持清晰的界限”，一个地道的表达，说明了如何处理这种复杂关系。' }
                        ]
                    }]
                }
              ],
            },
            {
              id: 'p2-c1-popular',
              title: '受欢迎的人',
              category: '人物题',
              categoryClass: 'person-card',
              status: 'New',
              part2Title: 'Describe a popular person',
              part2Description: 'You should say:',
              part2Prompts: [
                  'Who this person is',
                  'What kind of person he or she is',
                  'When you see him/her normally',
                  'And explain why you think this person is popular',
              ],
              part3Questions: [
                  'Why are some students popular in school?',
                  'Is it important for a teacher to be popular?',
                  'Do you think good teachers are always popular among students?',
                  'What are the qualities of being a good teacher?',
                  'Is it easier to become popular nowadays?',
                  'Why do people want to be popular?',
              ],
            },
            { 
              id: 'p2-c1-music', 
              title: '擅长音乐的朋友', 
              category: '人物题', 
              categoryClass: 'person-card', 
              status: 'New',
              part2Title: 'Describe a friend of yours who is a good musician',
              part2Description: 'You should say:',
              part2Prompts: [
                  'Who this friend is',
                  'What kind of music they play',
                  'How often you see them play',
                  'And explain why you think they are a good musician',
              ],
              part3Questions: [
                  'What kind of music is popular in your country?',
                  'Do you think it\'s important for schools to have music classes?',
                  'Do you think technology has changed the way we listen to music?',
                  'Is it better to learn music at a young age or as an adult?',
                  'What are the benefits of being able to play a musical instrument?',
                  'Do you think famous musicians have a responsibility to be good role models?',
              ],
              sampleAnswers: [
                {
                  question: "Part 2: Describe a friend of yours who is a good musician",
                  versions: [{
                    score: '5.5',
                    answer: [
                      "I'd like to talk about my good friend, Wang Lei, who is a very talented musician. We met in a university club and we've been friends for about three years.",
                      "Wang Lei plays the acoustic guitar. He doesn't just play songs by other people; he also writes his own music, which I think is really cool. His style is mostly folk and a little bit of pop. His songs are often about his daily life and feelings, so they are very relatable.",
                      "I see him play quite often. Our university sometimes holds small concerts or events on campus, and he usually performs at them. Also, when our group of friends hangs out, he sometimes brings his guitar and plays for us. It creates a very relaxed and happy atmosphere.",
                      "I think he is a good musician for a couple of reasons. First, he is technically skilled. His fingers move so fast on the guitar, and he never makes a mistake. But more importantly, he plays with a lot of emotion. When you listen to his music, you can really feel what he is trying to express, whether it's happiness or sadness. He practices for at least an hour every day, so his skill comes from a lot of hard work. That dedication is really admirable."
                    ],
                    analysis: [
                      { type: 'vocab', text: 'talented', explanation: '意为“有天赋的”，是形容某人有才华的常用词。' },
                      { type: 'phrase', text: 'writes his own music', explanation: '“写他自己的音乐”，说明他不仅仅是演奏家，还是创作者。' },
                      { type: 'vocab', text: 'relatable', explanation: '意为“能引起共鸣的”，说明他的音乐容易让人理解和产生联系。' },
                      { type: 'phrase', text: 'creates a very relaxed and happy atmosphere', explanation: '“营造了一种非常放松和快乐的氛围”，生动地描述了他音乐的影响力。' },
                      { type: 'phrase', text: 'technically skilled', explanation: '“技术娴熟”，说明他在演奏技巧上很出色。' },
                      { type: 'phrase', text: 'plays with a lot of emotion', explanation: '“演奏时充满感情”，指出了他音乐的感染力，这比单纯的技术更重要。' },
                      { type: 'vocab', text: 'dedication', explanation: '名词，意为“奉献，投入”，用来赞扬他的努力。' },
                    ],
                  }]
                },
                {
                  question: "What kind of music is popular in your country?",
                  versions: [{
                    score: '5.5',
                    answer: "In my country, pop music, or 'C-pop', is definitely the most popular genre, especially among young people. The main reason is that these songs have catchy melodies and are heavily promoted on social media and TV. For example, you can hear the latest pop hits everywhere, from shopping malls to cafes. They are very easy to listen to.",
                    analysis: [
                      { type: 'vocab', text: 'genre', explanation: '(Point) - “类型，流派”，是讨论音乐、电影等艺术形式时的常用词。' },
                      { type: 'phrase', text: 'catchy melodies', explanation: '(Reason) - “上口的旋律”，准确地描述了流行音乐的特点。' },
                      { type: 'phrase', text: 'heavily promoted', explanation: '(Reason) - “被大力推广”，说明了流行音乐普及的原因。' }
                    ]
                  }]
                },
                {
                  question: "Do you think it's important for schools to have music classes?",
                  versions: [{
                    score: '5.5',
                    answer: "Yes, I believe it's very important for schools to offer music classes. This is because learning music can help students develop their creativity and it's also a great way to relieve stress from their academic studies. For instance, my high school had a school band, and my friends who joined it said it was their favorite part of the week because it allowed them to be creative and work as a team.",
                    analysis: [
                      { type: 'phrase', text: 'develop their creativity', explanation: '(Reason) - “发展他们的创造力”，是教育类话题中常见的加分点。' },
                      { type: 'phrase', text: 'relieve stress', explanation: '(Reason) - “缓解压力”，说明了音乐教育的另一个好处。' },
                      { type: 'phrase', text: 'work as a team', explanation: '(Example) - “团队合作”，通过例子具体说明了音乐课的益处。' }
                    ]
                  }]
                },
                {
                  question: "Do you think technology has changed the way we listen to music?",
                  versions: [{
                    score: '5.5',
                    answer: "Absolutely, technology has completely transformed how we consume music. The biggest reason is the rise of streaming services, which give us instant access to millions of songs. For example, I use an app on my phone to listen to music from all over the world anytime I want. This is very different from the past when we had to buy physical CDs or tapes.",
                    analysis: [
                      { type: 'vocab', text: 'transformed', explanation: '(Point) - “彻底改变”，比 changed 语气更强。' },
                      { type: 'phrase', text: 'streaming services', explanation: '(Reason) - “流媒体服务”，是讨论现代音乐时必须知道的术语。' },
                      { type: 'phrase', text: 'instant access', explanation: '(Reason) - “即时访问”，准确描述了流媒体的便利性。' }
                    ]
                  }]
                },
                {
                  question: "Is it better to learn music at a young age or as an adult?",
                  versions: [{
                    score: '5.5',
                    answer: "In my opinion, it is generally better to start learning music at a young age. This is because children often have more free time to dedicate to practice, and their brains are considered to be more adaptable for learning new skills. For instance, many world-famous pianists and violinists began their training when they were just four or five years old. It's harder for adults to find that much time.",
                    analysis: [
                      { type: 'phrase', text: 'In my opinion', explanation: '(Point) - 清晰地表达个人观点。' },
                      { type: 'vocab', text: 'adaptable', explanation: '(Reason) - “适应性强的”，用来解释为什么孩子学东西更快。' },
                      { type: 'phrase', text: 'world-famous', explanation: '(Example) - “世界闻名的”，用来举例更有说服力。' }
                    ]
                  }]
                },
                {
                  question: "What are the benefits of being able to play a musical instrument?",
                  versions: [{
                    score: '5.5',
                    answer: "I think there are numerous benefits. One major benefit is that it improves discipline and patience, as you have to practice regularly to get better. It's also a wonderful way to express your emotions. For example, my friend who plays the guitar told me that when he feels stressed, playing a sad song helps him release his negative feelings.",
                    analysis: [
                      { type: 'vocab', text: 'numerous', explanation: '(Point) - “许多的”，比 many 更正式。' },
                      { type: 'vocab', text: 'discipline', explanation: '(Reason) - “纪律性”，指出了学乐器对性格的积极影响。' },
                      { type: 'phrase', text: 'express your emotions', explanation: '(Reason) - “表达你的情感”，是音乐的一个核心功能。' }
                    ]
                  }]
                },
                {
                  question: "Do you think famous musicians have a responsibility to be good role models?",
                  versions: [{
                    score: '5.5',
                    answer: "Yes, I do. I believe they have a significant responsibility because they have a huge influence, especially on their younger fans. These fans often look up to them and copy their behavior. For example, if a popular singer gets involved in charity work, it can encourage thousands of young people to also do good things for society. The opposite is also true if they set a bad example.",
                    analysis: [
                      { type: 'vocab', text: 'significant', explanation: '(Point) - “重大的”，强调责任之大。' },
                      { type: 'phrase', text: 'huge influence', explanation: '(Reason) - “巨大的影响”，是讨论名人效应时的常用词组。' },
                      { type: 'phrase', text: 'look up to them', explanation: '(Reason) - “仰慕他们”，是 admire 的一个常用同义词组。' }
                    ]
                  }]
                }
              ],
            },
            {
              id: 'p2-c-creative-person',
              title: '钦佩的有创造力的人',
              category: '人物题',
              categoryClass: 'person-card',
              status: 'New',
              part2Title: 'Describe a creative person (e.g. an artist, a musician, an architect, etc.) you admire',
              part2Description: 'You should say:',
              part2Prompts: [
                  'Who he/she is',
                  'How you knew him/her',
                  'What his/her greatest achievement is',
                  'And explain why you think he/she is creative',
              ],
              part3Questions: [
                  'Do you think children should learn to play musical instruments?',
                  'How do artists acquire inspiration?',
                  'Do you think pictures and videos in news reports are important?',
                  'What can we do to help children keep creative?',
                  'How does drawing help to enhance children\'s creativity?',
                  'What kind of jobs require creativity?',
              ],
            },
            {
              id: 'p2-c1-family-business',
              title: '在家族企业工作的人',
              category: '人物题',
              categoryClass: 'person-card',
              status: 'New',
              part2Title: 'Describe a person you know who enjoys working for a family business (e.g. a shop, etc.)',
              part2Description: 'You should say:',
              part2Prompts: [
                  'Who he/she is',
                  'What the business is',
                  'What his/her job is',
                  'And explain why he/she enjoys working there',
              ],
              part3Questions: [
                  'Would you like to start a family business?',
                  'Would you like to work for a family business?',
                  'Why do some people choose to start their own company?',
                  'What are the advantages and disadvantages of family businesses?',
                  'What family businesses do you know in your local area?',
                  'What makes a successful family business?',
              ],
            },
            {
              id: 'p2-c-sportsperson',
              title: '钦佩的运动员',
              category: '人物题',
              categoryClass: 'person-card',
              status: 'New',
              part2Title: 'Describe a successful sportsperson you admire',
              part2Description: 'You should say:',
              part2Prompts: [
                  'Who he/she is',
                  'What you know about him/her',
                  'What he/she is like in real life',
                  'What achievement he/she has made',
                  'And explain why you admire him/her',
              ],
              part3Questions: [
                  'Should students have physical education and do sports at school?',
                  'What qualities should an athlete have?',
                  'Is talent important in sports?',
                  'Is it easy to identify children\'s talents?',
                  'What is the most popular sport in your country?',
                  'Why are there so few top athletes?',
              ],
            },
        ]
    },
    {
        id: 'box-topic-places',
        title: '话题: 地点题',
        cards: [
            {
              id: 'p2-c-natural-place',
              title: '自然之地',
              category: '地点题',
              categoryClass: 'place-card',
              status: 'New',
              part2Title: 'Describe a natural place (e.g. parks, mountains, etc.)',
              part2Description: 'You should say:',
              part2Prompts: [
                  'Where this place is',
                  'How you knew this place',
                  'What it is like',
                  'And explain why you like to visit it',
              ],
              part3Questions: [
                  'What kind of people like to visit natural places?',
                  'What are the differences between a natural place and a city?',
                  'Do you think going to the park is the only way to get close to nature?',
                  'What can people gain from going to natural places?',
                  'Are there any wild animals in the city?',
                  'Do you think it is a good idea to let animals stay in local parks for people to see?',
              ],
            },
        ]
    },
    {
        id: 'box-topic-events',
        title: '话题: 事件题',
        cards: [
            {
              id: 'p2-c-exciting-activity',
              title: '第一次尝试的兴奋活动',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe an exciting activity you have tried for the first time',
              part2Description: 'You should say:',
              part2Prompts: [
                  'What it is',
                  'When/where you did it',
                  'Why you thought it was exciting',
                  'And explain how you felt about it',
              ],
              part3Questions: [
                  'Why are some people unwilling to try new things?',
                  'Do you think fear stops people from trying new things?',
                  'Why are some people keen on doing dangerous activities?',
                  'Do you think that children adapt to new things more easily than adults?',
                  'What can people learn from doing dangerous activities?',
                  'What are the benefits of trying new things?',
              ],
            },
            {
              id: 'p2-c-daily-routine',
              title: '近期日常改变',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe a positive change that you have made recently in your daily routine',
              part2Description: 'You should say:',
              part2Prompts: [
                  'What the change is',
                  'How you have changed the routine',
                  'Why you think it is a positive change',
                  'And explain how you feel about the change',
              ],
              part3Questions: [
                  'What do people normally plan in their daily lives?',
                  'Is time management very important in our daily lives?',
                  'What changes would people often make?',
                  'Do you think it is good to change jobs frequently?',
                  'Who do you think would make changes more often, young people or old people?',
                  'Who should get more promotion opportunities in the workplace, young people or older people?',
              ],
            },
            {
              id: 'p2-c-unusual-meal',
              title: '不寻常的一餐',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe an unusual meal you had',
              part2Description: 'You should say:',
              part2Prompts: [
                  'When you had it',
                  'Where you had it',
                  'Whom you had it with',
                  'And explain why it was unusual',
              ],
              part3Questions: [
                  'What are the advantages and disadvantages of eating in restaurants?',
                  'What fast food restaurants are there in your country?',
                  'Do people eat fast food at home?',
                  'Why do some people choose to eat out instead of ordering takeout?',
                  'Do people in your country socialize in restaurants? Why?',
                  'Do people in your country value food culture?',
              ],
            },
            {
              id: 'p2-c-decision-help',
              title: '别人帮忙做的决定',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe an important decision made with the help of other people',
              part2Description: 'You should say:',
              part2Prompts: [
                  'What the decision was',
                  'Why you made the decision',
                  'Who helped you make the decision',
                  'And how you felt about it',
              ],
              part3Questions: [
                  'What kind of decisions do you think are meaningful?',
                  'What important decisions should be made by teenagers themselves?',
                  'Why are some people unwilling to make quick decisions?',
                  'Do people like to ask for advice more for their personal life or their work?',
                  'Why do some people like to ask others for advice?',
              ],
            },
            {
              id: 'p2-c-wait-special',
              title: '等待特别事情',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe a time when you waited for something special that would happen',
              part2Description: 'You should say:',
              part2Prompts: [
                  'What you waited for',
                  'Where you waited',
                  'Why it was special',
                  'And explain how you felt while you were waiting',
              ],
              part3Questions: [
                  'On what occasions do people usually need to wait?',
                  'Who behave better when waiting, children or adults?',
                  'Compared to the past, are people less patient now? Why?',
                  'What are the positive and negative effects of waiting on society?',
                  'Why are some people unwilling to wait?',
                  'Where do children learn to be patient, at home or at school?',
              ],
            },
            {
              id: 'p2-c-good-service',
              title: '购物服务',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe a time when you received good service in a shop/store',
              part2Description: 'You should say:',
              part2Prompts: [
                  'Where the shop is',
                  'When you went to the shop',
                  'What service you received from the staff',
                  'And explain how you felt about the service',
              ],
              part3Questions: [
                  'Why are shopping malls so popular in China?',
                  'What are the advantages and disadvantages of shopping in small shops?',
                  'Why do some people not like shopping in small shops?',
                  'What are the differences between online shopping and in-store shopping?',
                  'What are the advantages and disadvantages of shopping online?',
                  'Can consumption drive economic growth?',
              ],
            },
            {
              id: 'p2-c-foreign-language',
              title: '第一次用外语',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe the time when you first talked in a foreign language',
              part2Description: 'You should say:',
              part2Prompts: [
                  'Where you were',
                  'Who you were with',
                  'What you talked about',
                  'And explain how you felt about it',
              ],
              part3Questions: [
                  'At what age should children start learning a foreign language?',
                  'Which skill is more important, speaking or writing?',
                  'Does a person still need to learn other languages, if he or she is good at English?',
                  'Do you think minority languages will disappear?',
                  'Does learning a foreign language help in finding a job?',
                  'Which stage of life do you think is the best for learning a foreign language?',
              ],
            },
            {
              id: 'p2-c-social-media',
              title: '社交媒体趣事',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe a time you saw something interesting on social media',
              part2Description: 'You should say:',
              part2Prompts: [
                  'When it was',
                  'Where you saw it',
                  'What you saw',
                  'And explain why you think it was interesting',
              ],
              part3Questions: [
                  'Why do people like to use social media?',
                  'What kinds of things are popular on social media?',
                  'What are the advantages and disadvantages of using social media?',
                  'What do you think of making friends on social network?',
                  'Are there any people who shouldn\'t use social media?',
                  'Do you think people spend too much time on social media?',
              ],
            },
            {
              id: 'p2-c-broke-something',
              title: '弄坏东西',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe a time when you broke something',
              part2Description: 'You should say:',
              part2Prompts: [
                  'What it was',
                  'When/where that happened',
                  'How you broke it',
                  'And explain what you did after that',
              ],
              part3Questions: [
                  'What kind of things are more likely to be broken by people at home?',
                  'What kind of people like to fix things by themselves?',
                  'Do you think clothes produced in the factory are of better quality than those made by hand?',
                  'Do you think handmade clothes are more valuable?',
                  'Is the older generation better at fixing things?',
                  'Do you think elderly people should teach young people how to fix things?',
              ],
            },
            {
              id: 'p2-c-apology',
              title: '别人向你道歉',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe a time when someone apologized to you',
              part2Description: 'You should say:',
              part2Prompts: [
                  'When it was',
                  'Who this person is',
                  'Why he or she apologized to you',
                  'And how you felt about it',
              ],
              part3Questions: [
                  'Do you think people should apologize for anything wrong they do?',
                  'Do people in your country like to say "sorry"?',
                  'On what occasion do people usually apologize to others?',
                  'Why do some people refuse to say "sorry" to others?',
                  'Do you think every "sorry" is from the bottom of the heart?',
                  'Are women better than men at recognizing emotions?',
              ],
            },
            {
              id: 'p2-c-good-habit',
              title: '学习朋友好习惯',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe a good habit your friend has and you want to develop',
              part2Description: 'You should say:',
              part2Prompts: [
                  'Who your friend is',
                  'What habit he/she has',
                  'When you noticed this habit',
                  'And explain why you want to develop this habit',
              ],
              part3Questions: [
                  'What habits should children have?',
                  'What should parents do to teach their children good habits?',
                  'What influences do children with bad habits have on other children?',
                  'Why do some habits change when people get older?',
                  'How do we develop bad habits?',
                  'What can we do to get rid of bad habits?',
              ],
            },
            {
              id: 'p2-c-power-off',
              title: '突然停电',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe a time when the electricity suddenly went off',
              part2Description: 'You should say:',
              part2Prompts: [
                  'When/where it happened',
                  'How long it lasted',
                  'What you did during that time',
                  'And explain how you felt about it',
              ],
              part3Questions: [
                  'Which is better, electric bicycles or ordinary bicycles?',
                  'Do you think electric bicycles will replace ordinary bicycles in the future?',
                  'Which is better, electric cars or petrol cars?',
                  'How did people manage to live without electricity in the ancient world?',
                  'Is it difficult for the government to replace all the petrol cars with electric cars?',
                  'Do people use more electricity now than before?',
              ],
            },
            {
              id: 'p2-c-lost-way',
              title: '迷路',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe an occasion when you lost your way',
              part2Description: 'You should say:',
              part2Prompts: [
                  'Where you were',
                  'What happened',
                  'How you felt',
                  'And explain how you found your way',
              ],
              part3Questions: [
                  'Why do some people get lost more easily than others?',
                  'Do you think it is important to be able to read a map?',
                  'Do you think it is important to do some preparation before you travel to new places?',
                  'How can people find their way when they are lost?',
                  'Is a paper map still necessary?',
                  'How do people react when they get lost?',
              ],
            },
            {
              id: 'p2-c-dinner',
              title: '和亲友享受的晚餐',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe a great dinner you and your friends or family members enjoyed',
              part2Description: 'You should say:',
              part2Prompts: [
                  'What you had',
                  'Who you had the dinner with',
                  'What you talked about during the dinner',
                  'And explain why you enjoyed it',
              ],
              part3Questions: [
                  'Do people prefer to eat out at restaurants or eat at home during the Spring Festival?',
                  'What food do you eat on special occasions, like during the Spring Festival or the Mid-autumn Festival?',
                  'Why do people like to have meals together during important festivals?',
                  'Is it a hassle to prepare a meal at home?',
                  'What do people often talk about during meals?',
                  'People are spending less and less time having meals with their families these days. Is this good or bad?',
              ],
            },
            {
              id: 'p2-c-long-journey',
              title: '想再去一次的远行',
              category: '事件题',
              categoryClass: 'event-card',
              status: 'New',
              part2Title: 'Describe a long journey you had and would like to take again',
              part2Description: 'You should say:',
              part2Prompts: [
                  'When/where you went',
                  'Who you had the journey with',
                  'Why you had the journey',
                  'And explain why you would like to have it again',
              ],
              part3Questions: [
                  'Do you think it is a good choice to travel by plane?',
                  'What are the differences between group travelling and travelling alone?',
                  'What do we need to prepare for a long journey?',
                  'Why do some people prefer to travel in their own country?',
                  'Why do some people prefer to travel abroad?',
              ],
            },
        ]
    },
    {
        id: 'box-topic-objects',
        title: '话题: 事物题',
        cards: [
            {
              id: 'p2-c-science',
              title: '感兴趣的科学学科/领域',
              category: '事物题',
              categoryClass: 'object-card',
              status: 'New',
              part2Title: 'Describe an area/subject of science (biology, robotics, etc.) that you are interested in and would like to learn more about',
              part2Description: 'You should say:',
              part2Prompts: [
                  'Which area/subject it is',
                  'When and where you came to know this area/subject',
                  'How you get information about this area/subject',
                  'And explain why you are interested in this area/subject',
              ],
              part3Questions: [
                  'Why do some children not like learning science at school?',
                  'Is it important to study science at school?',
                  'Which science subject is the most important for children to learn?',
                  'Should people continue to study science after graduating from school?',
                  'How do you get to know about scientific news?',
                  'Should scientists explain the research process to the public?',
              ],
            },
            {
              id: 'p2-c-book',
              title: '有用的书',
              category: '事物题',
              categoryClass: 'object-card',
              status: 'New',
              part2Title: 'Describe a book you read that you found useful',
              part2Description: 'You should say:',
              part2Prompts: [
                  'What it is',
                  'When you read it',
                  'Why you think it is useful',
                  'And explain how you felt about it',
              ],
              part3Questions: [
                  'What are the types of books that young people like to read?',
                  'What should the government do to make libraries better?',
                  'Do you think old people spend more time reading than young people?',
                  'Which one is better, paper books or e-books?',
                  'Have libraries changed a lot with the development of the internet?',
                  'What should we do to prevent modern libraries from closing down?',
              ],
            },
            {
              id: 'p2-c-toy',
              title: '童年喜欢的玩具',
              category: '事物题',
              categoryClass: 'object-card',
              status: 'New',
              part2Title: 'Describe a toy you liked in your childhood',
              part2Description: 'You should say:',
              part2Prompts: [
                  'What kind of toy it is',
                  'When you received it',
                  'How you played it',
                  'And how you felt about it',
              ],
              part3Questions: [
                  'How do advertisements influence children?',
                  'Should advertising aimed at kids be prohibited?',
                  'What\'s the difference between the toys kids play now and those they played in the past?',
                  'Do you think parents should buy more toys for their kids or spend more time with them?',
                  'What\'s the difference between the toys boys play with and girls play with?',
                  'What are the advantages and disadvantages of modern toys?',
              ],
            },
            {
              id: 'p2-c-old-thing',
              title: '家中老物件',
              category: '事物题',
              categoryClass: 'object-card',
              status: 'New',
              part2Title: 'Describe an important old thing that your family has kept for a long time',
              part2Description: 'You should say:',
              part2Prompts: [
                  'What it is',
                  'How/when your family first got this thing',
                  'How long your family has kept it',
                  'And explain why this thing is important to your family',
              ],
              part3Questions: [
                  'What kind of old things do people in your country like to keep?',
                  'Why do people keep old things?',
                  'What are the differences between the things old people keep and those young people keep?',
                  'What are the differences between the things that people keep today and the things that people kept in the past?',
                  'What can we see in a museum?',
                  'What can we learn from a museum?',
              ],
            },
            {
              id: 'p2-c-wild-animal',
              title: '想多了解的野生动物',
              category: '事物题',
              categoryClass: 'object-card',
              status: 'New',
              part2Title: 'Describe a wild animal that you want to learn more about',
              part2Description: 'You should say:',
              part2Prompts: [
                  'What it is',
                  'When/where you saw it',
                  'Why you want to learn more about it',
                  'And explain what you want to learn more about it',
              ],
              part3Questions: [
                  'Why should we protect wild animals?',
                  'Why are some people more willing to protect wild animals than others?',
                  'Do you think it\'s important to take children to the zoo to see animals?',
                  'Why do some people attach more importance to protecting rare animals?',
                  'Should people educate children to protect wild animals?',
                  'Is it more important to protect wild animals or the environment?',
              ],
            },
            {
              id: 'p2-c-talent',
              title: '想提升的天赋',
              category: '事物题',
              categoryClass: 'object-card',
              status: 'New',
              part2Title: 'Describe a natural talent (sports, music, etc.) you want to improve',
              part2Description: 'You should say:',
              part2Prompts: [
                  'What it is',
                  'When you discovered it',
                  'How you want to improve it',
                  'And how you feel about it',
              ],
              part3Questions: [
                  'Do you think artists with talents should focus on their talents?',
                  'Is it possible for us to know whether children who are 3 or 4 years old will become musicians and painters when they grow up?',
                  'Why do people like to watch talent shows?',
                  'Do you think it is more interesting to watch famous people\'s or ordinary people\'s shows?',
                  'Do you think it\'s important to develop children\'s talents?',
                  'Why do some people like to show their talents online?',
              ],
            },
            {
              id: 'p2-c-traditional-story',
              title: '传统故事',
              category: '事物题',
              categoryClass: 'object-card',
              status: 'New',
              part2Title: 'Describe an interesting traditional story',
              part2Description: 'You should say:',
              part2Prompts: [
                  'What the story is about',
                  'When/how you knew it',
                  'Who told you the story',
                  'And explain how you felt when you first heard it',
              ],
              part3Questions: [
                  'What kind of stories do children like?',
                  'What are the benefits of bedtime stories for children?',
                  'Why do most children like listening to stories before bedtime?',
                  'What can children learn from stories?',
                  'Do all stories for children have happy endings?',
                  'Is a good storyline important for a movie?',
              ],
            },
        ]
    }
];