<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <router-link v-for="route in routers" :key="route.path" :to="route.path">
          {{ route.meta.title }}
        </router-link>
      </el-aside>
      <el-main>
        <div class="tags">
          <div v-for="tag in tags" class="tag" @click="router.push(tag.path)">
            {{ tag.meta.title }}
            <span class="close">x</span>
        </div>
        </div>
        <el-button @click="onChange">获取keep-alive</el-button>
        <router-view v-slot="{ Component, route }">
          <p>Some slotted content</p>
          <keep-alive :include="cacheRoutes" :max="10">
            <component :is="getComponent(Component, route)" :key="route.name" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineOptions, computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import { h } from 'vue';
defineOptions({
  name: 'Layout',
})

const store = useStore();
const router = useRouter();

const routers = computed(() => router.getRoutes());

const tags = computed(() => store.tags);

const onChange = () => {
  console.log(cacheRoutes)
  console.log(componentCacheMap)
}

const cacheRoutes = [];

const addCacheRoute = (route) => {
  if (!cacheRoutes.includes(route)) {
    cacheRoutes.push(route);
  }
}

// 实现LRU算法
class LRUCache {
  constructor(limit) {
    this.limit = limit;
    this.cache = new Map();
  }

  // has
  has(key) {
    return this.cache.has(key);
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.limit) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

const componentCacheMap = new LRUCache(10);

const getComponent = (Component, route) => {
  const name = route.name;
  if (componentCacheMap.has(name)) {
    return h(componentCacheMap.get(name));
  }
  addCacheRoute(name);
  const Comp = defineComponent({
    name,
    setup() {
      return () => ('div', { class: 'box' } ,[h(Component)]);
    }
  });
  componentCacheMap.set(name, Comp);
  return h(defineComponent(Comp));
}
</script>

<style scoped>
.tags {
  display: flex;
  border: 1px solid #ccc;
  height: 30px;
  padding: 5px;
}
.tag {
  margin-right: 10px;
  line-height: 30px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.close {
  color: white;
  padding: 5px;
  background-color: red;
}
</style>