var findOrder = function(numCourses, prerequisites) {
    // 统计每个节点入度
       let inDegree = new Array(numCourses).fill(0);
       const map = {};
       // 遍历每一对课程关系，统计指向节点的集合信息
       for (let i = 0; i < prerequisites.length; i++) {
           // x[1] -> x[0]
           // x[0]的入度加1
           inDegree[prerequisites[i][0]]++;
           // 统计x[1] -> 指向的节点
           if (map[prerequisites[i][1]]){
               map[prerequisites[i][1]].push(prerequisites[i][0]);
           } else {
               map[prerequisites[i][1]] = [prerequisites[i][0]];
           }
       }
   
       // 处理入度为0的节点
       const queue = []; 
       for (let i = 0; i < inDegree.length; i++) {
           if (inDegree[i] === 0) {
               queue.push(i);
           }
       }
   
       let list = []
       while(queue.length) {
           const selected = queue.shift();
           // 将度为0的节点，也就是当前上的课程插入到顺序列表中
           list.push(selected)
           // 获取度为0节点所指向的所有节点
           const toEnQueue = map[selected];
           if (toEnQueue && toEnQueue.length) {
               // 遍历这些节点
               for (let i = 0; i < toEnQueue.length; i++) {
                   // 这些节点的入度减1，因为前置节点已经走完
                   inDegree[toEnQueue[i]]--;
                   // 如果入度为0，则插入到度为0的队列中
                   if (inDegree[toEnQueue[i]] == 0) {
                       queue.push(toEnQueue[i])
                   }
               }
           }
       }
       // 相等时，证明拓扑序可以走完，也就是课程可以修完
       return list.length == numCourses ? list : [];
   };