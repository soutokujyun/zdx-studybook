// import 'dotenv/config';

// import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
// import { OpenAIEmbeddings } from '@langchain/openai';
// import { HumanMessage } from '@langchain/core/messages';

// const embeddings = new OpenAIEmbeddings({
//   apiKey: process.env.DEEPSEEK_API_KEY!,
// });


// async function run() {
//   const docs = [
//     new Document({ pageContent: '我是小循，我在厦门上班。' }),
//   ];

//   const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);

//   const query = '小循在哪里上班？';
//   const result = await vectorStore.similaritySearch(query, 1);

//   const context = result.map(d => d.pageContent).join('\n');

//   const answer = await llm.invoke([
//     new HumanMessage(`已知信息：${context}\n问题：${query}`)
//   ]);

//   console.log(answer.content);
// }

// run();
