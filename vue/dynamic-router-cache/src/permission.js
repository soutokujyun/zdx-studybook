import router from '@/router'
import { useStore } from '@/store';

router.afterEach((to, from) => {
  const store = useStore();
  store.addTag(to)
})