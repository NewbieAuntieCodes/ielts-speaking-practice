export interface AnalysisData {
  type: 'vocab' | 'phrase' | 'sentence';
  text: string;
  explanation: string;
}

export interface SampleAnswerData {
  question: string;
  answer: string;
  analysis?: AnalysisData[];
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
            answer: "Yes, I have a very good friend. Her name is Li Mei. We met in middle school, so we know each other for more than ten years now. She is like a sister to me. We are very close and share many secrets together.",
            analysis: [
              { type: 'phrase', text: 'know each other for more than ten years', explanation: '这是一个非常地道的表达，说明你们认识了很长时间，比 "we have been friends for ten years" 更自然。' },
              { type: 'phrase', text: 'like a sister to me', explanation: '一个常用的比喻，用来形容关系非常亲密、像家人一样的朋友。' },
              { type: 'vocab', text: 'close', explanation: '在这里是形容词，意为“亲密的”，常用来描述朋友或家人之间的关系。例如: a close friend, a close family.' },
            ],
          },
          {
            question: 'What do you usually do with your friends?',
            answer: "With my friends, we do many things. We often go to a cafe to drink coffee and chat for a few hours. Sometimes, if the weather is good, we go to the park for a walk. We also like to go shopping together or watch the newest movies at the cinema.",
            analysis: [
              { type: 'phrase', text: 'chat for a few hours', explanation: '表达“聊上几个小时”，生动地描述了与朋友相聚的愉快时光。' },
              { type: 'sentence', text: 'if the weather is good, we go to the park for a walk', explanation: '这是一个简单的条件状语从句 (if-clause)，结构清晰，是口语中常用的句式，用来描述在特定条件下的活动。' },
            ],
          },
          {
            question: 'Where do you often meet each other?',
            answer: "We usually meet at a coffee shop near my house because it is quiet and comfortable. Sometimes we also meet at a big shopping mall in the city center. It is convenient because we can eat and shop in the same place. It depends on what we want to do that day.",
            analysis: [
                { type: 'vocab', text: 'convenient', explanation: '意为“方便的”，是描述地点、服务或时间安排时非常有用的高频词。'},
                { type: 'phrase', text: 'in the city center', explanation: '表示“在市中心”，是描述地点时常用的固定搭配。'},
                { type: 'sentence', text: 'It depends on what we want to do that day', explanation: '一个非常实用的口语表达，意思是“这取决于我们那天想做什么”，可以用来回答很多不确定的问题，展示语言的灵活性。'}
            ]
          },
          { question: 'How often do you go out with your friends?', answer: "I try to meet my friends every week, maybe on Saturday or Sunday. But sometimes we are all very busy with our work or study. So, maybe we meet two or three times a month. We use phone to chat when we cannot meet." },
          { question: 'How important are friends to you?', answer: "For me, friends are very, very important. They are like my second family. When I have problems, I can talk to them and they always give me good advice. When I am happy, I share my happiness with them. Life would be very boring without friends." },
          { question: 'Do you prefer to spend time with one friend or with a group of friends?', answer: "I think both are good, but for different situations. If I want to have a deep conversation, I prefer to meet with only one friend. But if I want to have fun, like for a birthday party, I like to be with a big group of friends. It is more lively with more people." },
          { question: 'Would you invite friends to your home?', answer: "Yes, of course. I like inviting my close friends to my home. We can cook dinner together, watch TV, and just relax. It feels more comfortable and private than meeting outside. My parents also like to meet my friends." },
          { question: 'Is there a difference between where you meet friends now and where you used to meet them in the past?', answer: "Yes, there is a big difference. When we were students, we usually met at school or near our homes, like in a park. We didn't have much money. Now, we are working, so we have more money. We often meet in nice restaurants or cafes in the city." },
          { question: 'Why are some places suitable for meeting while others are not?', answer: "I think some places like cafes or parks are good for meeting because they are not too loud, so we can talk easily. A library is not suitable because we must be very quiet. Also, a very crowded place like a train station is not good because it is hard to find each other and have a good conversation." }
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
          { question: 'Have you ever worked with old people?', answer: "No, I have never had a job where I worked with old people. I am a student now. But I often help my grandparents with things at their home, like cleaning or using the computer. So in a way, I have some experience with them." },
          { question: 'Are you happy to work with people who are older than you?', answer: "Yes, I think I would be happy. Older people have a lot of experience in work and life. I believe I can learn many useful things from them. They are usually more patient and can be good teachers for young people like me." },
          { question: 'What are the benefits of being friends with or working with old people?', answer: "There are many benefits. First, they can share their wisdom and give very good advice for problems. Second, they often tell interesting stories about the past, which is like a history lesson. Also, being friends with them can make you feel more calm and patient." },
          { question: 'Do you enjoy spending time with old people?', answer: "Yes, I really enjoy it, especially with my own grandparents. It is very relaxing to spend time with them. We usually just talk, drink tea, and watch TV. I feel very peaceful and loved when I am with them." }
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
            { question: 'Do you think museums are important?', answer: "Yes, I think museums are very important. They are like history books, but with real things. We can learn a lot about the past, about art, and about science from museums. They help us understand where we come from and protect important things for the future." },
            { question: 'Are there many museums in your hometown?', answer: "In my hometown, there are not many museums. It is a small city. We have one main museum about the history of our city. But if you go to a big city like Beijing or Shanghai, there are many different kinds of museums." },
            { question: 'Do you often visit a museum?', answer: "To be honest, I don't visit museums very often. Maybe once or twice a year. I am usually busy with my studies. But I do enjoy it when I go. I like to go with friends or family, so we can talk about the things we see." },
            { question: 'When was the last time you visited a museum?', answer: "The last time I visited a museum was about six months ago. I went to the city's history museum with my classmates for a school project. We saw many old photos and objects from our city's past. It was quite interesting." }
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
            { question: 'Is the city where you live crowded?', answer: "Yes, the city where I live is quite crowded, especially in the city center. There are many people, cars, and buses everywhere during the day. It is a big city with a large population, so it's always busy." },
            { question: 'Is there a crowded place near where you live?', answer: "Yes, there is a very crowded place near my home. It's a big shopping mall. On weekends, it is full of people. There are many shops, restaurants, and a cinema inside, so it attracts a lot of visitors." },
            { question: 'Do you like crowded places?', answer: "It depends. Sometimes I like the energy of a crowded place, like at a concert. But most of the time, I prefer quiet places. I don't like being in a crowded subway. It can be a bit stressful." },
            { question: 'Do most people like crowded places?', answer: "I think many young people do. Crowded places are often popular for a reason - they have good shopping, food, or entertainment. They enjoy the lively atmosphere of busy places." },
            { question: 'When was the last time you were in a crowded place?', answer: "The last time was just last weekend. I went to a shopping mall to buy a birthday present for my friend. It was Saturday afternoon, so it was extremely crowded. It was difficult to walk around." }
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
            { question: 'Have you ever talked with someone you don\'t know in public places?', answer: "Not really. I'm a bit shy, so I usually don't start conversations with strangers. Sometimes an older person might ask for directions, and I'm happy to help, but I don't usually have long talks with people I don't know." },
            { question: 'Do you wear headphones in public places?', answer: "Yes, I almost always wear headphones when I'm on the bus or subway. I like to listen to music or podcasts. It makes the travel time more enjoyable and helps me relax. It also blocks out the noise of the city." },
            { question: 'Would you like to see more public places near where you live?', answer: "Yes, definitely. I would love to have more parks or green spaces near my home. A nice park is a great place to relax, exercise, or just enjoy nature. Right now, the nearest park is a bit far from my apartment." },
            { question: 'Do you often go to public places with your friends?', answer: "Yes, I do. My friends and I often meet in public places like cafes, shopping malls, or cinemas. These places are convenient for everyone to get to. In the summer, we sometimes go to a park to have a picnic or play sports." }
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
            { question: 'Did your parents teach you to share when you were a child?', answer: "Yes, they did. When I was a child, my parents always taught me that sharing is a good thing. They encouraged me to share my toys and snacks with my brother and my friends. I think it was a very important lesson." },
            { question: 'What kind of things do you like to share with others?', answer: "I like to share many things. For example, I enjoy sharing food with my colleagues at work. I also like to share interesting articles or funny videos I find online with my friends. It's a good way to connect with people." },
            { question: 'What kind of things are not suitable for sharing?', answer: "I think very personal items are not suitable for sharing, like a toothbrush or a towel, for hygiene reasons. Also, I believe we shouldn't share secrets that other people have told us. It's a matter of trust." },
            { question: 'Do you have anything to share with others recently?', answer: "Yes, I recently read a very interesting book. I shared the story and my thoughts about it with my best friend yesterday. She seemed to enjoy it and said she might read the book too." },
            { question: 'Who is the first person you would like to share good news with?', answer: "The first person I share good news with is usually my best friend. We are very close, and I know she will be genuinely happy for me. I always call her as soon as something exciting happens." },
            { question: 'Do you prefer to share news with your friends or your parents?', answer: "It depends on the news. For small, daily things, I usually share them with my friends. But for very important news, like getting a new job, I would tell my parents first. They have more life experience and can give me good advice." }
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
            { question: 'Have you borrowed books from others?', answer: "Yes, many times. When I was a student, I often borrowed textbooks from the library or from older students to save money. I also like to borrow novels from my friends if they recommend a good one." },
            { question: 'Have you ever borrowed money from others?', answer: "Yes, I have, but only for small amounts. For example, if I forget my wallet, I might borrow some money from a friend for lunch. I always make sure to pay them back as soon as possible, usually the same day." },
            { question: 'Do you like to lend things to others?', answer: "I'm happy to lend things to my close friends and family because I trust them. If they need a book or my charger, it's no problem. But I am more careful about lending things to people I don't know very well." },
            { question: 'How do you feel when people don\'t return things they borrowed from you?', answer: "I feel a little annoyed and disappointed. It's not usually about the object itself, but more about the principle. I think it's important to be responsible and return things. I might politely remind them once." },
            { question: 'Do you mind if others borrow money from you?', answer: "For my close friends, if it's a small amount of money, I don't mind at all. I'm happy to help. However, I would feel uncomfortable lending a large sum of money. I think money can sometimes complicate friendships." }
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
            { question: 'Do you like chatting with friends?', answer: "Yes, I love chatting with my friends. It's one of my favorite things to do. It helps me to relax and forget about any stress from work or study. Talking with them always makes me feel happy." },
            { question: 'What do you usually chat about with friends?', answer: "We chat about all sorts of things. We talk about our daily lives, what happened at work or school, and our plans for the weekend. We also share opinions about movies, music, and sometimes we talk about our dreams for the future." },
            { question: 'Do you prefer to chat with a group of people or with only one friend?', answer: "I like both, but they are different. When I am with only one friend, we can have a more serious and deep conversation. But chatting with a group of friends is more fun and lively. There's a lot of laughing and joking." },
            { question: 'Do you prefer to communicate face-to-face or via social media?', answer: "I prefer face-to-face communication because you can see the person's expressions and body language. It feels more personal and real. However, social media is very convenient for quick chats and for staying in touch with friends who live far away." },
            { question: 'Do you argue with friends?', answer: "Not really. We have disagreements sometimes, but we don't really argue. My friends and I respect each other's opinions. If we think differently about something, we just discuss it calmly. I believe good communication is key to a strong friendship." }
        ]
      },
      { id: 'p1-c3', title: 'Having a break', category: '事件题', categoryClass: 'event-card', status: 'New' },
      { id: 'p1-c8', title: 'Growing vegetables/fruits', category: '事件题', categoryClass: 'event-card', status: 'New' },
      { id: 'p1-c10', title: 'Going out', category: '事件题', categoryClass: 'event-card', status: 'New' },
      { id: 'p1-c12', title: 'Doing something well', category: '事件题', categoryClass: 'event-card', status: 'New' },
    ]
  },
  {
    id: 'box-part1-topic-d',
    title: '话题: 事物',
    cards: [
      { id: 'p1-c5', title: 'Advertisement', category: '事物题', categoryClass: 'object-card', status: 'New' },
      { id: 'p1-c14', title: 'Rules', category: '事物题', categoryClass: 'object-card', status: 'New' },
      { id: 'p1-c13', title: 'Shoes', category: '事物题', categoryClass: 'object-card', status: 'New' },
      { id: 'p1-c16', title: 'Plants', category: '事物题', categoryClass: 'object-card', status: 'New' },
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
            },
            { id: 'p2-c1-admire', title: 'Describe a person you admire', category: '人物题', categoryClass: 'person-card', status: 'New' },
        ]
    },
    {
        id: 'box-topic-places',
        title: '话题: 地点题',
        cards: [
            { id: 'p2-c2', title: 'Describe a park you enjoyed visiting', category: '地点题', categoryClass: 'place-card', status: 'New' },
        ]
    },
    {
        id: 'box-topic-events',
        title: '话题: 事件题',
        cards: [
            { id: 'p2-c3', title: 'Describe a memorable trip', category: '事件题', categoryClass: 'event-card', status: 'New' },
            { id: 'p2-c5', title: 'Describe a hobby you enjoy', category: '事件题', categoryClass: 'event-card', status: 'New' },
        ]
    },
    {
        id: 'box-topic-objects',
        title: '话题: 事物题',
        cards: [
            { id: 'p2-c4', title: 'Describe a book you recently read', category: '事物题', categoryClass: 'object-card', status: 'New' },
        ]
    }
];
