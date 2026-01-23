# Simple RAG 简单 RAG 0.3
```实现简单``````几乎所有框架的基础```
# Semantic Chunking 语义分块 0.2
不再硬性规定chunk size，而是根据计算相邻句子间的相似度，当相似度低于阈值时进行分块。
# Small-to-Big Retrieval 小到大检索 0.85
检索时匹配小的chunk,但在喂给模型时，自动替换为包含该小块的父文档或更大的chunk.
# Context Enriched Retrieval 上下文增强检索 0.6
检索到最相关的chunk后，自动带出其物理位置前后的n个chunk，补充上下文环境
# Contextual Chunk Headers 上下文分块标题 0.5
在分块时，将全文标题或章节摘要作为Header拼接在每个chunk的开头。
拼接格式：`[Header] [Chunk]` 
存储时使用 `(embedding(chunk) + embedding(header)) / 2` 进行检索
# Document Augmentation 文档增强 0.8
在索引阶段，让llm针对每个chunk预生成几个可能的问题，检索时匹配这些预设的问题
# Query Transformation 查询转换 0.5
包括查询重写（Rewrite）和回溯提示（Step-back）和子查询分解
1、查询重写模糊的问题变精确
2、回溯提示（Step-back）：把问题和背景信息变宽，查询更广泛的问题
3、子查询分解：将复杂问题分解为多个简单问题，分别检索最后整合一个答案
# Reranker 重新排序 0.7
通过向量匹配初筛出Top50，再用高精度二分排位模型（Cross-Encoder）精选Top5
# RSE(Relevant Segment Extraction) 相关分块提取 0.8
检索连续的、具有聚合相关性的片段。而不是孤立的向量Top-K
1、相似度过滤
2、上下文窗口查找
3、判断总分值计算
4、阈值筛选
# Contextual Compression 上下文压缩 0.75
获取更多的chunk,然后压缩它，过滤只和query相关的句子再给到llm
- 通过提升词让模型从长文档片段中“脱水”，仅保留核心干货

# Feedback Loop 反馈循环 0.8
记录用户交互和llm反思，动态调整文档权重，实现检索自进化
- 用户可以从用户反馈中学习，持续改进检索质量
用户查询->检索->生成->收集反馈->存储并反思->权重重标定

# Self RAG 模型自我反思
是否需要检索？检索结果是否相关？生成内容是否由证据支撑？
-- 模型可以过滤和问题相关的检索结果，减少噪声数据，用相关性高的片段进行回答
当一个用户问题过来的时候，先判断是否需要检索。如果不需要检索的话就直接回答；如果需要检索
的话，去向量库检索k个片段，对拿到的k个片段进行相关性评估

# Knnowledge Graph 知识图谱
构建实体与关系的图谱，跨节点检索关联信息（GraphRAG）
从文档中抽取实体（Entity）和关系（Relationship）。在检索时，不仅根据向量搜索相关实体，还沿着关系边进行图搜索
（Graph Traversal），挖掘跨章节、跨文档的隐形关联信息。

# Hierarchical Indices 分层索引
系统通过两级向量库（Summary/Chunk）实现：Query先在粗粒度的Summary库定位相关章节，再在these
特定章节的细粒度Chunk库中检精确检索。

# HyDE(Hypothetical Document Embeddings) 假设文档嵌入
先让llm生成一个“假答案”，用假答案的向量去检索真文档
通过让llm基于Query生成一个假设的文档，用假设文档的向量去检索真文档.缓解用户Query与文档原文之间的语义鸿沟

# Fusion 融合检索 0.83  医疗 法律
向量（语义）检索+BM25（关键词）检索，通过RRF算法进行结果融合。
融合召回A（向量）和召回B（关键词）。向量检索找“意思相近”，关键词检索找“精确命中”

# CRAG （Corrective RAG） 
C是指Corrective：纠错的过程。评估检索相关性，如果不佳则转而搜索Web。
- 系统需要能够评估检索质量并在必要时寻找替代信息源
通过对检索到的内容进行相关性评分（高/中/低），动态决定回答策略。高相关直接回答，中相关结合web补充，
低相关完全依靠web